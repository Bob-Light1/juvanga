import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import { pageDocument, robots, sitemap, headers, siteOrigin } from './site-output.mjs';

export async function buildWeb({ configFile } = {}) {
  const root = fileURLToPath(new URL('../apps/web/', import.meta.url));
  const out = path.join(root, 'dist');
  const origin = siteOrigin(process.env.SITE_URL);
  // Keep the server bundle outside the deployable output, with workspace resolution.
  const temporaryRoot = fileURLToPath(new URL('../node_modules/.cache/', import.meta.url));
  fs.mkdirSync(temporaryRoot, { recursive: true });
  const temporary = fs.mkdtempSync(path.join(temporaryRoot, 'juvanga-prerender-'));
  try {
    await build({ root, configFile });
    await build({ root, configFile, build: { ssr: path.join(root, 'src/entry-server.tsx'), outDir: temporary, emptyOutDir: true, copyPublicDir: false }, ssr: { noExternal: ['motion'] } });
    const { render, paths, aliases } = await import(pathToFileURL(path.join(temporary, 'entry-server.js')).href);
    const template = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
    for (const route of [...paths, ...aliases, '/workshop', '/404', '/learn/404']) {
      const file = path.join(out, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, pageDocument(template, render(route), origin));
    }
    fs.writeFileSync(path.join(out, 'sitemap.xml'), sitemap(paths, origin));
    fs.writeFileSync(path.join(out, 'robots.txt'), robots(origin));
    fs.writeFileSync(path.join(out, '_headers'), headers(fs.readFileSync(path.join(root, 'public/_headers'), 'utf8'), origin));
    console.log(`Prerendered ${paths.length} public pages, workshop and 404. Indexing: ${origin || 'not configured (preview noindex)'}.`);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await buildWeb();
