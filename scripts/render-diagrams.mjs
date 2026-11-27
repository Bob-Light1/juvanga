// Renders course diagram sources (HTML fragments using design tokens) to WebP.
// Usage: node scripts/render-diagrams.mjs <source-dir> <out-dir> [png-preview-dir]
// Uses the existing Playwright browser; no image dependency is added (ADR-015).
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { autoImageMaxBytes } from './content.mjs';

const [source, out, preview] = process.argv.slice(2);
if (!source || !out) throw new Error('Usage: node scripts/render-diagrams.mjs <source-dir> <out-dir> [png-preview-dir]');
const root = new URL('../', import.meta.url);
const read = relative => fs.readFileSync(new URL(relative, root));
// Embedded fonts avoid file:// font loading restrictions.
const font = (family, file) => `@font-face { font-family: '${family}'; src: url(data:font/woff2;base64,${read(`apps/web/public/fonts/${file}`).toString('base64')}) format('woff2'); font-weight: 100 900; }`;
const head = `<meta charset="utf-8"><style>${font('Inter', 'inter-latin-wght-400-700.woff2')}${font('Fraunces', 'fraunces-latin-wght-600-700.woff2')}${read('packages/design/tokens.css')}${fs.readFileSync(path.join(source, 'diagrams.css'), 'utf8')}</style>`;
// Leave headroom below the automatic-image limit.
const target = autoImageMaxBytes - 2048;

fs.mkdirSync(out, { recursive: true });
if (preview) fs.mkdirSync(preview, { recursive: true });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
try {
  // Sources are authored 800 px wide and exported at 640 px: sharp on phones, lighter on the network.
  const page = await browser.newPage({ viewport: { width: 800, height: 600 }, deviceScaleFactor: 0.8 });
  for (const file of fs.readdirSync(source).filter(name => name.endsWith('.html')).sort()) {
    await page.setContent(`<!doctype html><html lang="fr"><head>${head}</head><body>${fs.readFileSync(path.join(source, file), 'utf8')}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const png = await page.locator('.diagram').screenshot();
    if (preview) fs.writeFileSync(path.join(preview, file.replace(/\.html$/, '.png')), png);
    const result = await page.evaluate(async ({ data, limit }) => {
      const image = new Image();
      image.src = `data:image/png;base64,${data}`;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      for (let quality = 0.9; quality >= 0.4; quality -= 0.05) {
        const url = canvas.toDataURL('image/webp', quality);
        if (!url.startsWith('data:image/webp')) throw new Error('This browser cannot encode WebP');
        const bytes = Math.floor((url.length - url.indexOf(',') - 1) * 3 / 4);
        if (bytes <= limit) return { url, quality, width: canvas.width, height: canvas.height };
      }
      return null;
    }, { data: png.toString('base64'), limit: target });
    if (!result) throw new Error(`${file}: cannot fit within ${target} bytes; simplify the diagram`);
    const webp = Buffer.from(result.url.slice(result.url.indexOf(',') + 1), 'base64');
    const name = file.replace(/\.html$/, '.webp');
    fs.writeFileSync(path.join(out, name), webp);
    console.log(`${name}: ${result.width}×${result.height}, ${webp.length} bytes, quality ${result.quality.toFixed(2)}`);
  }
} finally {
  await browser.close();
}
