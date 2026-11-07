import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { loadOverviews } from '../scripts/discovery.mjs';
import { getPage, publicPaths } from '../apps/web/src/routing.ts';
import { pageDocument, siteOrigin, sitemap, robots, headers } from '../scripts/site-output.mjs';

const fixture = JSON.parse(fs.readFileSync(new URL('./fixtures/content/valid-course.json', import.meta.url), 'utf8'));
fixture.locale = 'fr';
function library(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'juvanga-discovery-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const drafts = path.join(root, 'drafts'), publicDirectory = path.join(root, 'public');
  fs.mkdirSync(path.join(drafts, fixture.id), { recursive: true });
  fs.mkdirSync(publicDirectory);
  const catalogue = path.join(root, 'catalogue.json');
  const inventory = { schemaVersion: 1, courses: [{ id: fixture.id, version: fixture.version }] };
  fs.writeFileSync(catalogue, JSON.stringify(inventory));
  fs.writeFileSync(path.join(publicDirectory, 'catalogue.json'), JSON.stringify({ schemaVersion: 1, courses: [] }));
  const course = { ...structuredClone(fixture), status: 'review', publishedAt: null };
  const file = path.join(drafts, fixture.id, `v${fixture.version}.json`);
  const write = () => fs.writeFileSync(file, JSON.stringify(course));
  write();
  return { options: { catalogue, drafts, publicDirectory }, course, file, write, inventory };
}

test('explicit reviewed discovery projects only presentation fields without publishing lessons', t => {
  const { options } = library(t);
  const [overview] = loadOverviews(options);
  assert.equal(overview.availability, 'coming-soon');
  assert.equal(overview.title, fixture.title);
  assert.deepEqual(Object.keys(overview).sort(), ['id', 'version', 'title', 'summary', 'objectives', 'prerequisites', 'availability', 'modules'].sort());
  for (const module of overview.modules) for (const lesson of module.lessons) assert.deepEqual(Object.keys(lesson).sort(), ['id', 'title']);
  assert.equal(JSON.stringify(overview).includes('workedSolution'), false);
  assert.equal(JSON.stringify(overview).includes('reviewedAt'), false);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(options.publicDirectory, 'catalogue.json'))).courses, []);
});

for (const [label, change] of [
  ['unreviewed', course => { course.review = null; }],
  ['draft', course => { course.status = 'draft'; }],
  ['wrong identity', course => { course.id = 'other-course'; }],
  ['wrong version', course => { course.version += 1; }],
  ['wrong locale', course => { course.locale = 'en'; }],
  ['released source', course => { course.status = 'published'; }],
]) test(`discovery rejects ${label} before rendering`, t => {
  const { options, course, write } = library(t); change(course); write();
  assert.throws(() => loadOverviews(options));
});

test('discovery rejects traversal and symlinks', t => {
  const { options, file } = library(t);
  const original = `${file}.original`;
  fs.renameSync(file, original); fs.symlinkSync(original, file);
  assert.throws(() => loadOverviews(options), /regular file/);
  fs.writeFileSync(options.catalogue, JSON.stringify({ schemaVersion: 1, courses: [{ id: '../secret', version: 1 }] }));
  assert.throws(() => loadOverviews(options));
});

test('a published course supersedes an upcoming description and selects its latest version', t => {
  const { options } = library(t);
  const first = structuredClone(fixture), second = { ...structuredClone(fixture), version: fixture.version + 1 };
  fs.mkdirSync(path.join(options.publicDirectory, first.id));
  for (const course of [first, second]) fs.writeFileSync(path.join(options.publicDirectory, course.id, `v${course.version}.json`), JSON.stringify(course));
  fs.writeFileSync(path.join(options.publicDirectory, 'catalogue.json'), JSON.stringify({ schemaVersion: 1, courses: [first, second].map(({ id, version }) => ({ id, version })) }));
  const [overview] = loadOverviews(options);
  assert.equal(overview.version, second.version);
  assert.equal(overview.availability, 'published');
});

test('empty inventory and route resolution preserve a real missing-page state', t => {
  const { options } = library(t);
  fs.writeFileSync(options.catalogue, JSON.stringify({ schemaVersion: 1, courses: [] }));
  assert.deepEqual(loadOverviews(options), []);
  assert.deepEqual(publicPaths([]), ['/', '/courses']);
  assert.equal(getPage(`/courses/${fixture.id}`, []).kind, 'not-found');
  assert.equal(getPage('/courses/', []).kind, 'catalogue');
  assert.equal(getPage('/workshop', []).indexable, false);
  assert.equal(getPage('/courses/missing/nested', []).indexable, false);
});

test('real discovery inventory contains only the approved course presentation', () => {
  const courses = loadOverviews();
  assert.equal(courses.length, 1);
  assert.equal(getPage(publicPaths(courses)[2], courses).description, courses[0].summary);
  assert.equal(courses[0].availability, 'coming-soon');
});

test('release origin must be an HTTPS origin, preview has no invented canonical or sitemap URLs', () => {
  assert.equal(siteOrigin(), '');
  assert.equal(siteOrigin('https://juvanga.example/'), 'https://juvanga.example');
  for (const value of ['http://juvanga.example', 'https://user:secret@juvanga.example', 'https://juvanga.example/path', 'https://juvanga.example/?a=1', 'https://juvanga.example/#x']) assert.throws(() => siteOrigin(value));
  assert.equal(sitemap(['/', '/courses'], '').includes('<loc>'), false);
  assert.equal(robots(''), 'User-agent: *\nDisallow: /\n');
});

test('HTML metadata is escaped and sitemap, robots and headers share the release policy', () => {
  const origin = 'https://juvanga.example';
  const paths = publicPaths(loadOverviews());
  const page = { ...getPage('/', []), title: 'Title & "quote" <script>', description: 'Summary & description' };
  const template = '<html><head><title>old</title><meta name="robots" content="noindex" /><meta name="description" content="old" /></head><body><div id="root"></div></body></html>';
  const html = pageDocument(template, { page, html: '<h1>Literal $& content</h1>' }, origin);
  assert.match(html, /Title &amp; &quot;quote&quot; &lt;script&gt;/);
  assert.match(html, /<h1>Literal \$& content<\/h1>/);
  assert.match(html, /content="index, follow"/);
  assert.equal((html.match(/name="description"/g) || []).length, 1);
  for (const route of paths) assert.ok(sitemap(paths, origin).includes(`<loc>${origin}${route}</loc>`));
  assert.ok(!sitemap(paths, origin).includes('/workshop'));
  assert.match(robots(origin), /Sitemap: https:\/\/juvanga.example\/sitemap.xml/);
  assert.doesNotMatch(headers('/*\n  X-Robots-Tag: noindex, nofollow\n', origin).split('\n/workshop')[0], /X-Robots/);
  const missing = pageDocument(template, { page: getPage('/missing', []), html: '<h1>404</h1>' }, origin);
  assert.match(missing, /noindex, nofollow/);
  assert.doesNotMatch(missing, /rel="canonical"/);
  assert.doesNotMatch(pageDocument(template, { page, html: '' }, ''), /rel="canonical"/);
});
