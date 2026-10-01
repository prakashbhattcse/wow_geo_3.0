import list from './countries.json';
export const countries = list;
export const byId = Object.fromEntries(list.map(c => [c.id, c]));
export const byName = Object.fromEntries(list.map(c => [c.name, c]));
export const bySlug = Object.fromEntries(list.map(c => [c.slug, c]));
export const CONTINENTS = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];
export const continentSlug = c => c.toLowerCase().replace(' ', '-');
export const continentBySlug = Object.fromEntries(CONTINENTS.map(c => [continentSlug(c), c]));
// Countries most people have heard of. Used for the easier games.
const POPULAR = 'us ca mx br ar cl pe co ve gb ie fr de es pt it nl be ch at se no fi dk is pl cz gr tr ru ua eg ma za ng ke et gh dz tz in cn jp kr kp id th vn my ph pk bd np lk ir iq sa ae il af kz mn au nz cu jm nl sg mm kh la qa ro hu hr rs bg cd sd ly ao mz zw zm mg cm sn ml ne td so uz ec bo py uy'.split(' ');
export const popular = list.filter(c => POPULAR.includes(c.id));
export const obscure = list.filter(c => !POPULAR.includes(c.id));
