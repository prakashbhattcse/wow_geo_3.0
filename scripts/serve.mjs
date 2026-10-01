// Tiny static server to preview the built site exactly like a normal web host would.
import http from 'http';
import fs from 'fs';
import path from 'path';
const root = path.resolve('dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  else if (!path.extname(file)) file = path.join(file, 'index.html');
  let status = 200;
  if (!fs.existsSync(file)) { file = path.join(root, '404.html'); status = 404; }
  res.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(4173, () => console.log('Preview at http://localhost:4173'));
