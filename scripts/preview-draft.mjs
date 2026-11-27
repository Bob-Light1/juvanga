// Local, unindexed preview of a course draft in the real reader, for owner review on a phone.
// Usage: node scripts/preview-draft.mjs <draft-folder> [port]
// The draft is marked published only inside a temporary inventory; the repository and the
// default build artifact are restored before serving. Nothing is deployed.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import { buildWeb } from './build-web.mjs';
import { staticPreviewPlugin } from './static-preview.mjs';

const [folder, portArgument = '4180'] = process.argv.slice(2);
if (!folder) throw new Error('Usage: node scripts/preview-draft.mjs <draft-folder> [port]');
const root = fileURLToPath(new URL('../', import.meta.url));
const draft = JSON.parse(fs.readFileSync(path.join(folder, 'v1.json'), 'utf8'));
const now = new Date().toISOString();
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'juvanga-draft-preview-'));
const content = path.join(temporary, 'content');
const site = path.join(temporary, 'site');
const media = path.join(folder, 'media');

// Synthetic preview metadata: this is not a review or a publication decision.
const course = { ...draft, status: 'published', review: { reviewer: 'Local preview only — not reviewed', reviewedAt: now }, publishedAt: now };
fs.mkdirSync(path.join(content, course.id), { recursive: true });
fs.writeFileSync(path.join(content, 'catalogue.json'), JSON.stringify({ schemaVersion: 1, courses: [{ id: course.id, version: course.version }] }));
fs.writeFileSync(path.join(content, course.id, `v${course.version}.json`), JSON.stringify(course));

const previousOrigin = process.env.SITE_URL;
try {
  process.env.JUVANGA_READER_FIXTURE_ROOT = content;
  process.env.JUVANGA_READER_FIXTURE_MEDIA = media;
  delete process.env.SITE_URL;
  await buildWeb({ configFile: path.join(root, 'tests/reader.vite.config.ts') });
  fs.cpSync(path.join(root, 'apps/web/dist'), site, { recursive: true });
  fs.mkdirSync(path.join(site, 'media'), { recursive: true });
  if (fs.existsSync(media)) for (const file of fs.readdirSync(media)) fs.copyFileSync(path.join(media, file), path.join(site, 'media', file));
} finally {
  delete process.env.JUVANGA_READER_FIXTURE_ROOT;
  delete process.env.JUVANGA_READER_FIXTURE_MEDIA;
  if (previousOrigin !== undefined) process.env.SITE_URL = previousOrigin;
  // Restore the normal default artifact.
  await buildWeb();
}

const server = await preview({
  configFile: false,
  root: site,
  build: { outDir: '.' },
  plugins: [staticPreviewPlugin()],
  preview: { host: true, port: Number(portArgument), strictPort: true },
});
const addresses = Object.values(os.networkInterfaces()).flat().filter(entry => entry?.family === 'IPv4' && !entry.internal).map(entry => entry.address);
console.log(`Draft preview of ${course.id}: http://localhost:${portArgument}/courses/${course.id}`);
for (const address of addresses) console.log(`On the same network: http://${address}:${portArgument}/courses/${course.id}`);
console.log(`Temporary files: ${temporary}. Stop with Ctrl+C.`);
const stop = () => { server.httpServer.close(); fs.rmSync(temporary, { recursive: true, force: true }); process.exit(0); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
