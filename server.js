import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT = process.env.PORT || 8080;
export const ROOT = path.resolve(__dirname);
export const DIST = path.join(ROOT, 'dist');
export const ASSETS = path.join(ROOT, 'assets');

export const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.map': 'application/json'
};

export function handleRequest(req, res) {
  // Security check: reject raw path traversal and null bytes
  const rawUrl = req.url || '';
  if (rawUrl.includes('..') || rawUrl.toLowerCase().includes('%2e%2e') || rawUrl.includes('\0')) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('403 Forbidden');
    return;
  }

  const parsedUrl = new URL(rawUrl, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Legacy redirects
  if (pathname === '/events' || pathname === '/events.html') {
    res.writeHead(301, { Location: '/wedding-details' });
    res.end();
    return;
  }

  let requestedFile = pathname;
  if (requestedFile === '/') requestedFile = '/index.html';

  let filePath = null;

  // 1. Look in DIST first (compiled app, scripts, stylesheets, and copied assets)
  if (fs.existsSync(DIST)) {
    const candidateDist = path.normalize(path.join(DIST, requestedFile));
    if (candidateDist.startsWith(DIST) && fs.existsSync(candidateDist)) {
      const stat = fs.statSync(candidateDist);
      if (stat.isFile()) {
        filePath = candidateDist;
      }
    }
  }

  // 2. If not found in DIST, check ROOT/assets/ (for original source media only)
  if (!filePath && requestedFile.startsWith('/assets/')) {
    const candidateRoot = path.normalize(path.join(ROOT, requestedFile));
    if (candidateRoot.startsWith(ASSETS) && fs.existsSync(candidateRoot)) {
      const stat = fs.statSync(candidateRoot);
      if (stat.isFile()) {
        filePath = candidateRoot;
      }
    }
  }

  // 3. SPA Fallback: If no file was found and this is a page route (no file extension),
  // serve dist/index.html so React Router handles the route client-side.
  if (!filePath && !path.extname(pathname)) {
    const spaIndex = path.join(DIST, 'index.html');
    if (fs.existsSync(spaIndex) && fs.statSync(spaIndex).isFile()) {
      filePath = spaIndex;
    }
  }

  // 4. If still not found, return clean 404
  if (!filePath || !fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<!doctype html><html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1><p>The requested resource could not be found.</p></body></html>');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const range = req.headers.range;

    // HTTP Range Requests (Audio/Video seeking)
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

      if (isNaN(start) || start >= stats.size || (end && end >= stats.size)) {
        res.writeHead(416, { 'Content-Range': `bytes */${stats.size}` });
        return res.end();
      }

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': (end - start) + 1,
        'Content-Type': contentType
      });

      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': ext === '.html' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=31536000, immutable'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
}

export function createWeddingServer() {
  return http.createServer(handleRequest);
}

const server = createWeddingServer();

// Auto-start when executed directly
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Local:   http://localhost:${PORT}/`);
    try {
      import('os').then(os => {
        const nets = os.networkInterfaces();
        for (const name of Object.keys(nets)) {
          for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
              console.log(`Network: http://${net.address}:${PORT}/`);
            }
          }
        }
      });
    } catch {}
    console.log(`App routes: / , /our-story , /wedding-details , /gallery , /blessings`);
  });
}

export default server;
