import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { HeadContext } from './hooks/useSeo';
import { countries, CONTINENTS, continentSlug } from './data';
import { games, categories, gamePath } from './data/games';
import { posts } from './data/extra';

export function render(url) {
  const head = {};
  const html = renderToString(<HeadContext.Provider value={head}><StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></StaticRouter></HeadContext.Provider>);
  return { html, head };
}

// Every URL that should exist as a real HTML file
export function routes() {
  return [
    '/', '/games', '/learn', '/learn/countries', '/learn/capitals', '/learn/flags', '/learn/india', '/maps', '/blog', '/about', '/contact', '/privacy-policy', '/terms', '/search',
    ...categories.map(c => `/games/${c.slug}`),
    ...games.map(gamePath),
    ...countries.map(c => `/learn/countries/${c.slug}`),
    ...CONTINENTS.map(c => `/maps/${continentSlug(c)}`),
    ...posts.map(p => `/blog/${p.slug}`)
  ];
}
