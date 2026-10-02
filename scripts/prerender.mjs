// Turns every route into a real HTML file so search engines (and AdSense) see full content.
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const dist = path.resolve('dist');
const { render, routes } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const { SITE } = await import(pathToFileURL(path.resolve('src/config.js')).href);
const { posts } = await import(pathToFileURL(path.resolve('src/data/extra.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

fs.writeFileSync(path.join(dist, '404.html'), template.replace('<!--app-head-->', '<title>Page not found | Wow Geography</title>'));

// --- JSON-LD generators ---
function websiteSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string'
    }
  });
}

function organizationSchema() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    contactPoint: { '@type': 'ContactPoint', email: SITE.email, contactType: 'customer support' }
  });
}

function articleSchema(post) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` }
  });
}

function breadcrumbSchema(url) {
  const parts = url.replace(/\/$/, '').split('/').filter(Boolean);
  if (parts.length === 0) return null;
  const labels = { games: 'Games', learn: 'Learn', countries: 'Countries', blog: 'Blog', maps: 'Maps', about: 'About', contact: 'Contact', 'privacy-policy': 'Privacy Policy', terms: 'Terms' };
  const items = [
    { '@type': 'ListItem', position: 1, name: SITE.name, item: SITE.url }
  ];
  let accumulated = '';
  parts.forEach((seg, i) => {
    accumulated += '/' + seg;
    const label = labels[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    items.push({ '@type': 'ListItem', position: i + 2, name: label, item: `${SITE.url}${accumulated}` });
  });
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items });
}

function buildJsonLd(url) {
  const scripts = [];
  if (url === '/') scripts.push(websiteSchema());
  if (url === '/about') scripts.push(organizationSchema());
  const blogMatch = url.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const post = posts.find(p => p.slug === blogMatch[1]);
    if (post) scripts.push(articleSchema(post));
  }
  // BreadcrumbList for all pages with a path (not homepage)
  if (url !== '/' && url !== '/search') {
    const bc = breadcrumbSchema(url);
    if (bc) scripts.push(bc);
  }
  return scripts.map(s => `<script type="application/ld+json">${s}</script>`).join('\n');
}

const list = routes();
for (const url of list) {
  const { html, head } = render(url);
  const robotsMeta = head.noindex
    ? '\n<meta name="robots" content="noindex, follow">'
    : '';
  const jsonLd = buildJsonLd(url);
  const tags = `<title>${esc(head.title)}</title>\n<meta name="description" content="${esc(head.description)}">\n<link rel="canonical" href="${SITE.url}${url === '/' ? '/' : url}">\n<meta property="og:title" content="${esc(head.title)}">\n<meta property="og:description" content="${esc(head.description)}">${robotsMeta}${jsonLd ? '\n' + jsonLd : ''}`;
  const page = template.replace('<!--app-head-->', tags).replace('<div id="root"></div>', `<div id="root" data-path="${url}">${html}</div>`);
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
}
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${list.filter(u => u !== '/search').map(u => `  <url><loc>${SITE.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);
fs.rmSync('dist-server', { recursive: true, force: true });
console.log(`Pre-rendered ${list.length} pages, sitemap.xml and robots.txt into dist/`);
