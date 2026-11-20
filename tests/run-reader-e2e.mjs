import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { buildWeb } from '../scripts/build-web.mjs';
import { readerFixtures } from './reader-fixture.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'juvanga-reader-browser-'));
const previousOrigin = process.env.SITE_URL;
try {
  const courses = readerFixtures();
  fs.writeFileSync(path.join(root, 'catalogue.json'), JSON.stringify({ schemaVersion: 1, courses: courses.map(({ id, version }) => ({ id, version })) }));
  for (const course of courses) {
    fs.mkdirSync(path.join(root, course.id), { recursive: true });
    fs.writeFileSync(path.join(root, course.id, `v${course.version}.json`), JSON.stringify(course));
  }
  process.env.JUVANGA_READER_FIXTURE_ROOT = root;
  process.env.SITE_URL = 'https://juvanga.example';
  await buildWeb({ configFile: fileURLToPath(new URL('./reader.vite.config.ts', import.meta.url)) });
  const result = spawnSync(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', '--config', 'tests/reader.playwright.config.ts'], { stdio: 'inherit', env: process.env });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  delete process.env.JUVANGA_READER_FIXTURE_ROOT;
  if (previousOrigin === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = previousOrigin;
  fs.rmSync(root, { recursive: true, force: true });
  await buildWeb();
}
