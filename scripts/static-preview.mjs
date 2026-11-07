import fs from 'node:fs';
import path from 'node:path';

// Mirror extensionless HTML and top-level 404 serving; never fall back to home.
export function staticPreviewPlugin() {
  return {
    name: 'prerendered-static-preview',
    configurePreviewServer(server) {
      const root = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((request, response, next) => {
        if (!['GET', 'HEAD'].includes(request.method)) return next();
        let pathname;
        try { pathname = decodeURIComponent(new URL(request.url, 'http://preview.local').pathname); }
        catch { pathname = '/404'; }
        const relative = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
        const candidate = path.resolve(root, relative || 'index.html');
        const inside = candidate.startsWith(root + path.sep);
        if (inside && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return next();
        const html = inside && relative ? `${candidate}.html` : '';
        const found = html && fs.existsSync(html) && fs.statSync(html).isFile();
        const file = found ? html : path.join(root, '404.html');
        if (!fs.existsSync(file)) return next();
        response.statusCode = found ? 200 : 404;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        if (!found) response.setHeader('X-Robots-Tag', 'noindex, nofollow');
        if (request.method === 'HEAD') return response.end();
        response.end(fs.readFileSync(file));
      });
    },
  };
}
