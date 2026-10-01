// Question generators. Each returns one question object:
// { key, prompt, visual, options: [{ label, flag?, hideLabel? }], answer, accept?, explain, clues? }
import { countries, byId, popular, obscure, CONTINENTS } from '../data';
import { landmarks, cities, emojiPuzzles, riddles, indiaRegions, indianRivers, indiaAZ } from '../data/extra';
import { pick, sample, shuffle, rand } from '../lib/util';

export const TINY = ['Chandigarh', 'Lakshadweep', 'Puducherry', 'Dadra and Nagar Haveli and Daman and Diu'];
const capitalAlt = { bo: ['La Paz'], za: ['Cape Town', 'Bloemfontein'], lk: ['Kotte'], ci: ['Abidjan'], ps: ['East Jerusalem'], us: ['Washington', 'Washington DC'] };

// Build 4 options: the answer plus distractors (preferring a "similar" pool for difficulty)
function options(answer, similar, all, label = x => x, n = 4) {
  const key = x => label(x);
  const out = [answer]; const seen = new Set([key(answer)]);
  for (const src of [shuffle(similar), shuffle(all)]) for (const x of src) {
    if (out.length >= n) break;
    if (!seen.has(key(x))) { seen.add(key(x)); out.push(x); }
  }
  const sh = shuffle(out);
  return { list: sh, answer: sh.indexOf(answer) };
}
const sameCont = (c, pool = countries) => pool.filter(x => x.continent === c.continent && x.id !== c.id);
const countryOpts = (c, pool, extraExclude = []) => {
  const ex = new Set([c.id, ...extraExclude]);
  const o = options(c, sameCont(c, pool).filter(x => !ex.has(x.id)), pool.filter(x => !ex.has(x.id)), x => x.name);
  return { options: o.list.map(x => ({ label: x.name, id: x.id })), answer: o.answer };
};
const names = c => [c.name, ...c.alt];
const fmtArea = a => a >= 1e6 ? `${(a / 1e6).toFixed(1)} million km²` : `${Math.round(a).toLocaleString('en-US')} km²`;
const hemi = (v, p, n) => `${Math.abs(v).toFixed(0)}°${v >= 0 ? p : n}`;

export const generators = {
  countryFacts() {
    const c = pick(popular);
    return { key: c.id, prompt: 'Which country is this?', visual: { kind: 'facts', items: [['Continent', c.continent], ['Speaks', c.languages.slice(0, 2).join(', ')], ['Capital', c.capital]] }, ...countryOpts(c, popular), explain: `${c.name}, capital ${c.capital}.`, link: c };
  },
  mysteryCountry() {
    const c = pick(popular);
    const clues = [
      `It's in ${c.sub || c.continent}.`,
      `It covers about ${fmtArea(c.area)}.`,
      c.borders.length ? `It shares land borders with ${c.borders.length} ${c.borders.length === 1 ? 'country' : 'countries'}.` : 'It has no land borders at all.',
      `Its name starts with "${c.name[0]}".`,
      `Its capital is ${c.capital}.`
    ];
    return { key: c.id, prompt: 'Which country am I?', clues, visual: { kind: 'clues' }, ...countryOpts(c, popular), explain: `It was ${c.name}.`, link: c };
  },
  shape(pool = popular.filter(c => c.in50)) {
    const c = pick(pool);
    return { key: c.id, prompt: 'Which country has this shape?', visual: { kind: 'shape', n3: c.n3, latlng: c.latlng }, ...countryOpts(c, popular.length < pool.length ? countries : popular), explain: `That's the outline of ${c.name}.`, link: c };
  },
  countryContinent() {
    const c = pick(countries.filter(x => x.area > 5000));
    return { key: c.id, prompt: `Which continent is ${c.name} in?`, visual: { kind: 'flag', id: c.id }, options: CONTINENTS.map(l => ({ label: l })), answer: CONTINENTS.indexOf(c.continent), explain: `${c.name} is in ${c.continent}.`, link: c };
  },
  highlight() {
    const c = pick(popular.filter(x => x.in110));
    return { key: c.id, prompt: 'Which country is highlighted?', visual: { kind: 'highlight', n3: c.n3, latlng: c.latlng, area: c.area }, ...countryOpts(c, popular.filter(x => x.in110)), explain: `That was ${c.name}.`, link: c };
  },
  flagToName(cfg = {}, _i, used) {
    const pool = cfg.pool === 'all' ? countries : popular;
    const fresh = used ? pool.filter(x => !used.has(x.id)) : [];
    const c = pick(fresh.length ? fresh : pool);
    return { key: c.id, prompt: 'Which country flies this flag?', visual: { kind: 'flag', id: c.id, big: true }, ...countryOpts(c, pool), explain: `That's the flag of ${c.name}.`, link: c };
  },
  colorsToFlag() {
    const pool = countries.filter(x => x.simpleFlag);
    const c = pick(pool);
    const key = x => x.colors.join();
    const others = shuffle(pool.filter(x => key(x) !== key(c)));
    const similar = others.filter(x => x.colors.some(col => c.colors.includes(col)));
    const o = options(c, similar, others, x => x.id);
    return { key: c.id, prompt: 'Which flag uses exactly these colours, and no others?', visual: { kind: 'colors', colors: c.colors }, options: o.list.map(x => ({ label: x.name, flag: x.id, hideLabel: true })), answer: o.answer, explain: `${c.name}: ${c.colors.join(', ')}.`, link: c };
  },
  countryToCapital() {
    const c = pick(popular);
    const o = options(c, sameCont(c, countries), countries.filter(x => x.id !== c.id), x => x.capital);
    return { key: c.id, prompt: `What's the capital of ${c.name}?`, visual: { kind: 'flag', id: c.id }, options: o.list.map(x => ({ label: x.capital })), answer: o.answer, explain: `The capital of ${c.name} is ${c.capital}.`, link: c };
  },
  cityOrCountry() {
    const lower = countries.map(c => c.name.toLowerCase());
    if (rand() < 0.5) {
      const c = pick(countries);
      return { key: 'c' + c.id, prompt: `Is "${c.name}" a country or a capital city?`, visual: null, options: [{ label: 'Country' }, { label: 'Capital city' }], answer: 0, explain: `${c.name} is a country in ${c.continent}. Its capital is ${c.capital}.` };
    }
    const c = pick(countries.filter(x => x.capital && !lower.some(n => x.capital.toLowerCase().includes(n))));
    return { key: 'k' + c.id, prompt: `Is "${c.capital}" a country or a capital city?`, visual: null, options: [{ label: 'Country' }, { label: 'Capital city' }], answer: 1, explain: `${c.capital} is the capital of ${c.name}.`, link: c };
  },
  cityToCountry() {
    const city = pick(cities.filter(x => !x.capital));
    const c = byId[city.country];
    return { key: city.name, prompt: `Which country is ${city.name} in?`, visual: null, ...countryOpts(c, popular), explain: `${city.name} is in ${c.name}.`, link: c };
  },
  continentLetter() {
    const cont = pick(CONTINENTS);
    const inCont = countries.filter(x => x.continent === cont);
    const letter = pick(inCont).name[0];
    const valid = inCont.filter(x => x.name[0] === letter);
    return { key: cont + letter, prompt: `Name a country in ${cont} that starts with "${letter}".`, visual: { kind: 'letter', letter }, accept: valid.flatMap(names), answerText: valid.map(x => x.name).join(', '), explain: `Possible answers: ${valid.map(x => x.name).join(', ')}.` };
  },
  coords() {
    const c = pick(popular);
    const [lat, lng] = c.latlng;
    return { key: c.id, prompt: 'Which country is centred near these coordinates?', visual: { kind: 'big', text: `${hemi(lat, 'N', 'S')}, ${hemi(lng, 'E', 'W')}` }, ...countryOpts(c, popular), explain: `${c.name} is centred near ${hemi(lat, 'N', 'S')}, ${hemi(lng, 'E', 'W')}.`, link: c };
  },
  indiaHighlight() {
    const s = pick(indiaRegions.filter(x => !TINY.includes(x.name)));
    const o = options(s, [], indiaRegions.filter(x => !TINY.includes(x.name)), x => x.name);
    return { key: s.name, prompt: 'Which state or union territory is highlighted?', visual: { kind: 'india', name: s.name }, options: o.list.map(x => ({ label: x.name })), answer: o.answer, explain: `That was ${s.name}.` };
  },
  indiaClues() {
    const pool = indiaRegions.filter(x => x.clues);
    const s = pick(pool);
    const o = options(s, [], pool, x => x.name);
    return { key: s.name, prompt: 'Which Indian state is this?', clues: s.clues, visual: { kind: 'clues' }, options: o.list.map(x => ({ label: x.name })), answer: o.answer, explain: `It was ${s.name}.` };
  },
  indiaCapital() {
    const pool = indiaRegions.filter(x => x.name !== 'Chandigarh' && x.name !== 'Delhi');
    const s = pick(pool);
    const o = options(s, [], pool, x => x.capital);
    return { key: s.name, prompt: `What's the capital of ${s.name}?`, visual: null, options: o.list.map(x => ({ label: x.capital })), answer: o.answer, explain: `${s.capital} is the capital of ${s.name}.` };
  },
  indiaRivers() {
    const r = pick(indianRivers);
    const opts = shuffle(r.options);
    return { key: r.q, prompt: r.q, visual: null, options: opts.map(l => ({ label: l })), answer: opts.indexOf(r.answer), explain: `The answer is ${r.answer}.` };
  },
  indiaAZ(cfg, i = 0) {
    const r = indiaAZ[i % indiaAZ.length];
    return { key: r.letter, prompt: r.clue, visual: { kind: 'letter', letter: r.letter }, accept: [r.answer, ...(r.accept || [])], answerText: r.answer, explain: `${r.letter} is for ${r.answer}.` };
  },
  landmarkCountry(pool = landmarks) {
    const l = pick(pool);
    const c = byId[l.country];
    return { key: l.name, prompt: `Which country is home to ${l.name}?`, visual: { kind: 'big', text: l.name }, ...countryOpts(c, countries, l.alsoIn || []), explain: `${l.name} is in ${c.name}${l.alsoIn ? ` (shared with ${l.alsoIn.map(i => byId[i].name).join(', ')})` : ''}.`, link: c };
  },
  naturalCountry() { return generators.landmarkCountry(landmarks.filter(l => l.natural)); },
  landmarkFromClues() {
    const l = pick(landmarks);
    const o = options(l, landmarks.filter(x => !!x.natural === !!l.natural), landmarks, x => x.name);
    return { key: l.name, prompt: 'Which landmark is this?', visual: { kind: 'facts', items: l.clues.slice(0, 2).map(t => ['', t]) }, options: o.list.map(x => ({ label: x.name })), answer: o.answer, explain: `${l.name}, in ${byId[l.country].name}.` };
  },
  landmarkProgressive() {
    const l = pick(landmarks);
    const o = options(l, landmarks.filter(x => !!x.natural === !!l.natural), landmarks, x => x.name);
    return { key: l.name, prompt: 'Which landmark is this?', clues: l.clues, visual: { kind: 'clues' }, options: o.list.map(x => ({ label: x.name })), answer: o.answer, explain: `${l.name}, in ${byId[l.country].name}.` };
  },
  emoji() {
    const e = pick(emojiPuzzles);
    const opts = shuffle(e.options);
    return { key: e.emoji, prompt: 'Which country do these emoji describe?', visual: { kind: 'emoji', text: e.emoji }, options: opts.map(l => ({ label: l })), answer: opts.indexOf(e.answer), explain: `It was ${e.answer}.` };
  },
  letterCapital() {
    const c = pick(popular);
    return { key: c.id, prompt: `A country starting with "${c.name[0]}" whose capital is ${c.capital}.`, visual: { kind: 'letter', letter: c.name[0] }, accept: names(c), answerText: c.name, explain: `${c.capital} is the capital of ${c.name}.`, link: c };
  },
  borders() {
    const c = pick(countries.filter(x => x.borders.length));
    const nb = byId[pick(c.borders)];
    const non = countries.filter(x => x.id !== c.id && !c.borders.includes(x.id));
    const o = options(nb, non.filter(x => x.continent === c.continent), non, x => x.name);
    return { key: c.id, prompt: `Which of these countries shares a border with ${c.name}?`, visual: { kind: 'flag', id: c.id }, options: o.list.map(x => ({ label: x.name })), answer: o.answer, explain: `${c.name} borders ${c.borders.map(i => byId[i]?.name).filter(Boolean).join(', ')}.`, link: c };
  },
  oddOneOut() {
    const [a, b] = sample(CONTINENTS, 2);
    const three = sample(popular.filter(x => x.continent === a), 3);
    const odd = pick(popular.filter(x => x.continent === b));
    const list = shuffle([...three, odd]);
    return { key: odd.id + a, prompt: 'Which country is on a different continent from the other three?', visual: null, options: list.map(x => ({ label: x.name })), answer: list.indexOf(odd), explain: `${odd.name} is in ${b}. The others are in ${a}.`, link: odd };
  },
  riddles() {
    const r = pick(riddles);
    const opts = shuffle(r.options);
    return { key: r.q, prompt: r.q, visual: null, options: opts.map(l => ({ label: l })), answer: opts.indexOf(r.answer), explain: `The answer is ${r.answer}.` };
  },
  impossible() {
    const c = pick(obscure.filter(x => x.in50));
    const sim = countries.filter(x => x.id !== c.id && (x.sub === c.sub));
    const o = options(c, sim, sameCont(c), x => x.name);
    const asShape = rand() < 0.5;
    return { key: c.id, prompt: asShape ? 'Which country has this shape?' : 'Which country flies this flag?', visual: asShape ? { kind: 'shape', n3: c.n3, latlng: c.latlng } : { kind: 'flag', id: c.id, big: true }, options: o.list.map(x => ({ label: x.name })), answer: o.answer, explain: `It was ${c.name}, in ${c.sub}.`, link: c };
  },
  expertCapital() {
    const c = pick(obscure);
    return { key: c.id, prompt: `What's the capital of ${c.name}?`, visual: { kind: 'flag', id: c.id }, accept: [c.capital, ...(capitalAlt[c.id] || [])], answerText: c.capital, explain: `The capital of ${c.name} is ${c.capital}.`, link: c };
  }
};

// near-identical flags that people mix up
const TWINS = [['td', 'ro'], ['id', 'mc'], ['ie', 'ci'], ['nl', 'lu'], ['au', 'nz'], ['sn', 'ml'], ['co', 'ec'], ['gn', 'ml'], ['jo', 'ps'], ['iq', 'sy'], ['pl', 'id'], ['at', 'lv'], ['si', 'sk'], ['ve', 'ec'], ['ne', 'in'], ['hn', 'ni'], ['no', 'is'], ['qa', 'bh']];

Object.assign(generators, {
  biggerCountry() {
    let a, b;
    do { [a, b] = sample(popular, 2); } while (Math.max(a.area, b.area) / Math.min(a.area, b.area) < 1.25);
    const big = a.area > b.area ? a : b;
    return { key: a.id + b.id, prompt: 'Which country is bigger by area?', visual: null, options: [a, b].map(x => ({ label: x.name, icon: x.id })), answer: [a, b].indexOf(big), explain: `${a.name}: ${a.area.toLocaleString('en-US')} km². ${b.name}: ${b.area.toLocaleString('en-US')} km².` };
  },
  landlocked() {
    const c = pick(countries.filter(x => x.area > 2000));
    return { key: c.id, prompt: `Is ${c.name} landlocked?`, visual: { kind: 'flag', id: c.id }, options: [{ label: 'Landlocked' }, { label: 'Has a coastline' }], answer: c.landlocked ? 0 : 1, explain: c.landlocked ? `Yes, ${c.name} has no coastline.` : `No, ${c.name} has a coastline.`, link: c };
  },
  halfFlag() {
    const c = pick(popular);
    return { key: c.id, prompt: 'Whose flag is this half of?', visual: { kind: 'halfflag', id: c.id, side: pick(['left', 'right', 'top', 'bottom']) }, ...countryOpts(c, popular), explain: `That's half of the flag of ${c.name}.`, link: c };
  },
  blurFlag() {
    const c = pick(popular);
    return { key: c.id, prompt: 'The flag is coming into focus. Whose is it?', visual: { kind: 'blurflag', id: c.id }, ...countryOpts(c, popular), explain: `It was ${c.name}.`, link: c };
  },
  twinFlags() {
    const pair = pick(TWINS); const c = byId[pick(pair)];
    const opts = shuffle(pair.map(id => byId[id]));
    return { key: c.id, prompt: 'Careful, these two look alike. Which one is this?', visual: { kind: 'flag', id: c.id, big: true }, options: opts.map(x => ({ label: x.name })), answer: opts.indexOf(c), explain: `That's ${c.name}. ${opts.map(x => x.name).join(' and ')} are easy to mix up.`, link: c };
  }
});

const MIXED = ['flagToName', 'countryToCapital', 'shape', 'countryContinent', 'landmarkCountry', 'borders', 'cityToCountry', 'highlight', 'emoji', 'oddOneOut', 'biggerCountry', 'landlocked', 'halfFlag'];

export function makeQuestion(cfg, used, index) {
  const name = cfg.gen === 'mixed' ? pick(MIXED) : cfg.gen;
  const fn = generators[name];
  for (let t = 0; t < 40; t++) {
    const q = cfg.ordered ? fn(cfg, index) : (name === 'flagToName' ? fn(cfg, index, used) : fn());
    if (!used.has(q.key) || t === 39) { used.add(q.key); return q; }
  }
}
