// Random numbers. Normally Math.random; withSeed() makes them repeatable (used by the Daily Challenge).
let rng = Math.random;
export const rand = () => rng();
export function withSeed(seed, fn) {
  let t = seed >>> 0;
  rng = () => { t += 0x6D2B79F5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
  try { return fn(); } finally { rng = Math.random; }
}
export const dayNumber = () => Math.floor(Date.now() / 864e5);

export const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export const pick = a => a[Math.floor(rand() * a.length)];
export const sample = (a, n) => shuffle(a).slice(0, n);
export const norm = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/^the /, '').replace(/[^a-z0-9]/g, '');
export const slugify = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function distanceKm([la1, lo1], [la2, lo2]) {
  const r = Math.PI / 180, dLa = (la2 - la1) * r, dLo = (lo2 - lo1) * r;
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin(dLo / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

// Small, forgiving typo check (1 edit allowed for answers longer than 5 letters)
export function closeEnough(a, b) {
  if (a === b) return true;
  if (b.length < 6 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++; else if (a.length < b.length) j++; else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

export const store = {
  get(k, d = null) { try { const v = localStorage.getItem('wg:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('wg:' + k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
};

export const fmtTime = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export const formatDate = d => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
