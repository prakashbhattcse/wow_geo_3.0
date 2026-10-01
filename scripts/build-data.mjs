// Generates map + country data used by the site. Run with: npm run data
// Sources: world-countries (MIT), Natural Earth 10m countries from India's point of view
// (public domain; shows Jammu & Kashmir, Ladakh incl. Aksai Chin and Gilgit-Baltistan, and
// Arunachal Pradesh as part of India), flag-icons (MIT), India states topojson
// (github.com/udit-001/india-maps-data).
import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topo from 'topojson-client';
import { presimplify, simplify, filter, filterWeight, sphericalRingArea, sphericalTriangleArea } from 'topojson-simplify';
import { topology } from 'topojson-server';

const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const wc = read('node_modules/world-countries/countries.json');

// ---------- world maps (India's official boundaries) ----------
const SRC = 'scripts/ne_10m_admin_0_countries_ind.geojson';
if (!fs.existsSync(SRC)) {
  console.log('Downloading Natural Earth (India view)…');
  const r = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries_ind.geojson');
  fs.writeFileSync(SRC, await r.text());
}
const ne = read(SRC);
const grouped = new Map();
for (const f of ne.features) {
  const p = f.properties; const n3 = String(p.ISO_N3_EH);
  if (!f.geometry || n3 === '-99') continue;
  const id = n3.padStart(3, '0');
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  if (!grouped.has(id)) grouped.set(id, { type: 'Feature', id, properties: { name: p.NAME }, geometry: { type: 'MultiPolygon', coordinates: [] } });
  grouped.get(id).geometry.coordinates.push(...polys);
}
const worldFC = { type: 'FeatureCollection', features: [...grouped.values()] };
function buildWorld(minWeight, minRingArea) {
  let t = topology({ countries: worldFC }, 1e6);
  t = simplify(presimplify(t, sphericalTriangleArea), minWeight);
  if (minRingArea) t = filter(t, filterWeight(t, minRingArea, sphericalRingArea));
  t.objects.countries.geometries = t.objects.countries.geometries.filter(g => g.type);
  t.objects.land = topo.mergeArcs(t, t.objects.countries.geometries);
  return topo.quantize(t, 1e5);
}
const w110 = buildWorld(1.5e-5, 5e-5);
const w50 = buildWorld(5e-7, 2e-7);
fs.writeFileSync('public/data/world-110m.json', JSON.stringify(w110));
fs.writeFileSync('public/data/world-50m.json', JSON.stringify(w50));
console.log('world maps', fs.statSync('public/data/world-110m.json').size, fs.statSync('public/data/world-50m.json').size);

// ---------- countries ----------
const keep = wc.filter(c => c.unMember || ['VA', 'PS'].includes(c.cca2));
const byCca3 = Object.fromEntries(wc.map(c => [c.cca3, c.cca2]));
const PALETTE = { red:[200,16,46], white:[255,255,255], blue:[0,56,147], green:[0,122,61], yellow:[252,209,22], black:[0,0,0], orange:[255,130,0], lightblue:[92,165,230] };
const nameOf = rgb => { let best, bd = 1e9; for (const [n, p] of Object.entries(PALETTE)) { const d = (p[0]-rgb[0])**2 + (p[1]-rgb[1])**2 + (p[2]-rgb[2])**2; if (d < bd) { bd = d; best = n; } } return best === 'lightblue' ? 'blue' : best; };
const hex = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
const named = { white:[255,255,255], red:[255,0,0], black:[0,0,0], blue:[0,0,255], green:[0,128,0], yellow:[255,255,0] };
function flagColors(svg) {
  const out = new Set();
  for (const m of svg.matchAll(/(?:fill|stroke)(?:=|:)\s*"?(#[0-9a-fA-F]{3,6}|white|red|black|blue|green|yellow)/g)) {
    const v = m[1]; out.add(nameOf(v.startsWith('#') ? hex(v) : named[v]));
  }
  if (!/fill/.test(svg)) out.add('black');
  return [...out].sort();
}
const continentOf = c => c.region === 'Americas' ? (c.subregion === 'South America' ? 'South America' : 'North America') : c.region;
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

fs.mkdirSync('public/flags', { recursive: true });
const ids110 = new Set(w110.objects.countries.geometries.map(g => g.id));
const ids50 = new Set(w50.objects.countries.geometries.map(g => g.id));
const countries = keep.map(c => {
  const code = c.cca2.toLowerCase();
  const svg = fs.readFileSync(`node_modules/flag-icons/flags/4x3/${code}.svg`, 'utf8');
  fs.writeFileSync(`public/flags/${code}.svg`, svg);
  const alts = new Set([c.name.official, ...c.altSpellings].filter(a => /^[\x20-\x7E]+$/.test(a) && a.length > 2 && a !== c.name.common));
  return {
    id: code, n3: c.ccn3, slug: slug(c.name.common), name: c.name.common, alt: [...alts].slice(0, 6),
    capital: c.capital[0] || '', continent: continentOf(c), sub: c.subregion,
    latlng: c.latlng.map(n => +n.toFixed(2)), area: Math.round(c.area), landlocked: c.landlocked,
    borders: c.borders.map(b => byCca3[b]).filter(Boolean).map(s => s.toLowerCase()),
    languages: Object.values(c.languages || {}), currency: Object.values(c.currencies || {}).map(x => x.name),
    demonym: c.demonyms?.eng?.m || '', in110: ids110.has(c.ccn3), in50: ids50.has(c.ccn3), colors: flagColors(svg), simpleFlag: svg.length < 2600
  };
}).sort((a, b) => a.name.localeCompare(b.name));
// Capital fixes for countries with several / disputed capitals
const capFix = { bo: 'Sucre', za: 'Pretoria', ps: 'Ramallah' };
countries.forEach(c => { if (capFix[c.id]) c.capital = capFix[c.id]; });
const altFix = { gb: ['UK', 'Britain', 'England'], us: ['US', 'America'], ae: ['UAE'], cd: ['DRC', 'DR Congo', 'Congo Kinshasa'], cg: ['Congo Brazzaville', 'Republic of the Congo'], kr: ['Korea', 'South Korea'], kp: ['North Korea'], ci: ["Cote d'Ivoire"], mm: ['Burma'], sz: ['Swaziland'], tl: ['East Timor'], cv: ['Cape Verde'], va: ['Vatican'], mk: ['Macedonia'], ru: ['Russian Federation'], cz: ['Czech Republic'], tr: ['Turkiye', 'Türkiye'], fm: ['Micronesia'], bs: ['Bahamas'], gm: ['Gambia'], nl: ['Holland'] };
countries.forEach(c => { if (altFix[c.id]) c.alt = [...new Set([...altFix[c.id], ...c.alt])]; });
fs.writeFileSync('src/data/countries.json', JSON.stringify(countries));
console.log('countries', countries.length);

// ---------- maps for games (served from /public/data, loaded on demand) ----------
const india = read('scripts/india-source.json');
const indiaStates = { type: 'Topology', arcs: india.arcs, transform: india.transform, objects: { states: india.objects.states } };
const pre = presimplify(indiaStates);
const simp = simplify(pre, 0.0005);
// re-encode compact geojson for simplicity
const feats = topo.feature(simp, simp.objects.states).features.map(f => ({ type: 'Feature', properties: { name: f.properties.st_nm }, geometry: f.geometry }));
const round = g => JSON.parse(JSON.stringify(g, (k, v) => typeof v === 'number' ? +v.toFixed(3) : v));
fs.writeFileSync('public/data/india-states.json', JSON.stringify(round({ type: 'FeatureCollection', features: feats })));
console.log('india states', feats.length, fs.statSync('public/data/india-states.json').size);

// ---------- static art for home + maps pages (server-rendered) ----------
const all110 = topo.feature(w110, w110.objects.countries).features;
const byN3 = Object.fromEntries(wc.map(c => [c.ccn3, c]));
const regionOf = f => { const c = byN3[f.id]; if (!c) return ({ Kosovo: 'Europe', 'N. Cyprus': 'Asia', Somaliland: 'Africa' })[f.properties.name] || null; if (c.region === 'Antarctic') return null; return continentOf(c); };
const fc = { type: 'FeatureCollection', features: all110.filter(regionOf) };
const proj = d3.geoNaturalEarth1().fitExtent([[5, 5], [955, 475]], fc);
const p = d3.geoPath(proj).digits(0);
const regions = {};
for (const f of fc.features) (regions[regionOf(f)] ||= []).push(p(f));
const lbl = { 'North America': [-102, 48], 'South America': [-60, -14], Europe: [18, 53], Africa: [18, 4], Asia: [92, 46], Oceania: [134, -25] };
const g = d3.geoOrthographic().rotate([-80, -18]).scale(235).translate([250, 250]).clipAngle(90);
const gp = d3.geoPath(g).digits(1);
const land = topo.feature(w110, w110.objects.land);
const vn = topo.feature(w50, w50.objects.countries).features.find(f => f.properties.name === 'Vietnam');
const art = {
  regions: Object.fromEntries(Object.entries(regions).map(([k, v]) => [k, v.join('')])),
  labels: Object.fromEntries(Object.entries(lbl).map(([k, v]) => [k, proj(v).map(n => +n.toFixed(1))])),
  globeLand: gp(land), globeGrat: gp(d3.geoGraticule().step([20, 20])()),
  globeIndia: gp(all110.find(f => f.properties.name === 'India')),
  pts: Object.fromEntries(Object.entries({ everest: [86.925, 27.988], delhi: [77.21, 28.61], tokyo: [139.69, 35.68] }).map(([k, v]) => [k, g(v).map(n => +n.toFixed(1))])),
  vietnam: d3.geoPath(d3.geoMercator().fitExtent([[10, 10], [190, 250]], vn)).digits(1)(vn)
};
fs.writeFileSync('src/data/art.json', JSON.stringify(art));
console.log('art bytes', JSON.stringify(art).length);
