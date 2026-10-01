// Turns every route into a real HTML file so search engines (and AdSense) see full content.
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const dist = path.resolve('dist');
const { render, routes } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const { SITE } = await import(pathToFileURL(path.resolve('src/config.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

fs.writeFileSync(path.join(dist, '404.html'), template.replace('<!--app-head-->', '<title>Page not found | Wow Geography</title>'));

const list = routes();
for (const url of list) {
  const { html, head } = render(url);
  const tags = `<title>${esc(head.title)}</title>\n<meta name="description" content="${esc(head.description)}">\n<link rel="canonical" href="${SITE.url}${url === '/' ? '/' : url}">\n<meta property="og:title" content="${esc(head.title)}">\n<meta property="og:description" content="${esc(head.description)}">`;
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
