import { feature } from 'topojson-client';
const cache = {};
const load = url => (cache[url] ||= fetch(url).then(r => { if (!r.ok) throw new Error('Could not load ' + url); return r.json(); }));

export async function worldFeatures(res = '110m') {
  const t = await load(`/data/world-${res}.json`);
  return feature(t, t.objects.countries).features;
}
export async function indiaFeatures() {
  const g = await load('/data/india-states.json');
  return g.features;
}
// Map views used by the click games: [west, south, east, north]
export const VIEWS = {
  World: [-170, -57, 180, 80],
  Africa: [-20, -36, 53, 38],
  Asia: [25, -11, 150, 56],
  Europe: [-25, 34, 45, 71],
  'North America': [-170, 6, -50, 75],
  'South America': [-83, -56, -33, 13],
  Oceania: [110, -48, 180, 0]
};
export const bboxShape = ([w, s, e, n]) => ({ type: 'MultiPoint', coordinates: [[w, s], [e, s], [e, n], [w, n], [(w + e) / 2, s], [(w + e) / 2, n]] });
