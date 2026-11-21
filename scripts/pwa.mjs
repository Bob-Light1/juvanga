import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { fr } from '../apps/web/src/i18n/fr.ts';

function files(root, prefix) {
  const directory = path.join(root, prefix);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isSymbolicLink()) throw new Error('PWA resources must not be symlinks');
    const name = `${prefix}/${entry.name}`;
    return entry.isDirectory() ? files(root, name) : [name];
  });
}
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
export function writePwa(out, routes) {
  const copy = fr.pwa;
  const manifest = { id: '/', name: 'Juvanga', short_name: 'Juvanga', lang: 'fr', start_url: '/', scope: '/', display: 'standalone', background_color: '#FBF3E4', theme_color: '#14213D', icons: [192, 512].map(size => ({ src: `/brand/icon-${size}.png`, sizes: `${size}x${size}`, type: 'image/png', purpose: 'any' })) };
  fs.writeFileSync(path.join(out, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
  const styles = files(out, 'assets').filter(file => file.endsWith('.css'));
  const offline = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(copy.offlineTitle)} — Juvanga</title>${styles.map(file => `<link rel="stylesheet" href="/${file}">`).join('')}</head><body><main class="shell page-intro support-page"><h1>${escape(copy.offlineTitle)}</h1><p>${escape(copy.offlineDetail)}</p><p><a class="text-link" href="/courses">${escape(copy.catalogue)}</a></p><p><a class="text-link" href="/">${escape(copy.home)}</a></p></main></body></html>`;
  fs.writeFileSync(path.join(out, 'offline.html'), offline);
  const assets = ['assets', 'fonts', 'brand'].flatMap(prefix => files(out, prefix)).filter(file => /\.(?:js|css|woff2|svg|png|ico)$/.test(file));
  // Only media referenced by the published reader can enter the optional cache.
  const optional = [...new Set(routes.media ?? [])].sort();
  const precache = [...new Set([...routes.pages, '/offline', '/manifest.webmanifest', '/favicon.ico', ...assets.map(file => `/${file}`)])].sort();
  const source = fs.readFileSync(new URL('./public-worker.js', import.meta.url), 'utf8');
  const hash = createHash('sha256').update(source);
  for (const url of [...precache, ...optional]) {
    if (!url.startsWith('/') || url.includes('..') || /[?#]/.test(url)) throw new Error('Invalid public cache path');
    const file = url === '/' ? 'index.html' : path.extname(url) ? url.slice(1) : `${url.slice(1)}.html`;
    hash.update(url);
    if (precache.includes(url) || fs.existsSync(path.join(out, file))) hash.update(fs.readFileSync(path.join(out, file)));
  }
  const cacheName = `juvanga-public-${hash.digest('hex').slice(0, 20)}`;
  fs.writeFileSync(path.join(out, 'sw.js'), source.replace('__PUBLIC_CONFIG__', JSON.stringify({ cacheName, precache, optional })));
  const js = assets.filter(file => file.endsWith('.js'));
  const javascriptGzipBytes = js.reduce((sum, file) => sum + gzipSync(fs.readFileSync(path.join(out, file))).length, 0);
  const homeHtml = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
  const homeImages = [...new Set([...homeHtml.matchAll(/<(?:img|link)[^>]+(?:src|href)="(\/[^\"]+\.(?:svg|png|ico))"/g)].map(match => match[1]))];
  const initialImageBytes = homeImages.reduce((sum, file) => sum + fs.statSync(path.join(out, file)).size, 0);
  if (javascriptGzipBytes > 250 * 1024 || initialImageBytes > 300 * 1024) throw new Error('Public build exceeds the JavaScript or initial-image budget');
  const report = { cacheName, javascriptGzipBytes, javascriptBudgetBytes: 250 * 1024, initialImageBytes, initialImageBudgetBytes: 300 * 1024, precacheCount: precache.length, optionalMediaCount: optional.length };
  console.log(`Public PWA: ${cacheName}; ${javascriptGzipBytes} bytes gzip JS; ${initialImageBytes} bytes initial images; ${precache.length} public resources.`);
  return { cacheName, precache, optional, report };
}
