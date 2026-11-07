import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';
import { CourseSchema } from '../apps/web/src/content/schema.ts';
import { contentValidationPlugin, validatePublicContent } from '../scripts/content.mjs';

const fixture = name => JSON.parse(fs.readFileSync(new URL(`./fixtures/content/${name}.json`, import.meta.url), 'utf8'));
const validCourse = () => fixture('valid-course');
const lesson = course => course.modules[0].lessons[0];

function sandbox(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'juvanga-content-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  return directory;
}
function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}
function library(t, courses = [validCourse()]) {
  const directory = sandbox(t);
  writeJson(path.join(directory, 'catalogue.json'), {
    schemaVersion: 1, courses: courses.map(({ id, version }) => ({ id, version })),
  });
  for (const course of courses) writeJson(path.join(directory, course.id, `v${course.version}.json`), course);
  return directory;
}

test('valid fixture preserves stable course, lesson, exercise and rubric versions', () => {
  const course = CourseSchema.parse(validCourse());
  assert.equal(course.version, 1);
  assert.equal(lesson(course).id, 'fixture-lesson');
  assert.equal(lesson(course).exercise.version, 1);
  assert.equal(lesson(course).exercise.rubric.version, 1);
});

for (const invalid of fixture('invalid-cases')) {
  test(`content schema rejects ${invalid.name} at its field path`, () => {
    const course = validCourse();
    const parent = invalid.path.slice(0, -1).reduce((value, key) => value[key], course);
    parent[invalid.path.at(-1)] = invalid.value;
    const result = CourseSchema.safeParse(course);
    assert.equal(result.success, false);
    assert.ok(result.error.issues.some(issue =>
      JSON.stringify(issue.path) === JSON.stringify(invalid.expectedPath ?? invalid.path)
      || (issue.code === 'unrecognized_keys' && invalid.path.at(-1) === issue.keys[0])),
    JSON.stringify(result.error.issues));
  });
}

test('public library resolves HTTPS and internal lesson links without network requests', t => {
  const course = validCourse();
  const directory = library(t, [course]);
  assert.deepEqual(validatePublicContent(directory), [course]);
});

test('course versions retain the same stable IDs across separate versions', t => {
  const first = validCourse();
  const second = structuredClone(first);
  second.version = 2;
  const directory = library(t, [first, second]);
  assert.equal(validatePublicContent(directory).length, 2);
});

test('cross-course links must resolve to a published version and lesson', t => {
  const first = validCourse();
  const second = validCourse();
  second.id = 'second-course';
  second.version = 2;
  const link = lesson(first).blocks.find(block => block.type === 'lesson-link');
  link.courseId = second.id;
  link.courseVersion = second.version;
  const directory = library(t, [first, second]);
  assert.equal(validatePublicContent(directory).length, 2);
  link.lessonId = 'missing-lesson';
  writeJson(path.join(directory, first.id, 'v1.json'), first);
  assert.throws(() => validatePublicContent(directory), /v1\.json: \$\.modules\[0\]\.lessons\[0\]\.blocks\[5\].*Lesson link/);
});

test('internal links in examples and solutions are checked too', t => {
  for (const field of ['example', 'workedSolution']) {
    const course = validCourse();
    const blocks = field === 'example' ? lesson(course).example : lesson(course).exercise.workedSolution;
    blocks.push({ type: 'lesson-link', id: 'broken-link', text: 'Missing lesson', courseId: 'missing-course', courseVersion: 1, lessonId: 'missing-lesson' });
    const directory = library(t, [course]);
    assert.throws(() => validatePublicContent(directory), /Lesson link must resolve/);
  }
});

test('draft, review and archived courses stay outside the public library', t => {
  for (const status of ['draft', 'review', 'archived']) {
    const course = validCourse();
    course.status = status;
    const directory = library(t, [course]);
    assert.throws(() => validatePublicContent(directory), /\$\.status: Only published/);
  }
});

test('catalogue identity and version must match the file contents', t => {
  const course = validCourse();
  const directory = library(t, [course]);
  course.version = 2;
  writeJson(path.join(directory, course.id, 'v1.json'), course);
  assert.throws(() => validatePublicContent(directory), /\$\.id \/ \$\.version: Must match/);
});

test('duplicate catalogue entries and traversal IDs are rejected before loading', t => {
  const directory = library(t);
  writeJson(path.join(directory, 'catalogue.json'), { schemaVersion: 1, courses: [
    { id: 'fixture-course', version: 1 }, { id: 'fixture-course', version: 1 },
  ] });
  assert.throws(() => validatePublicContent(directory), /\$\.courses\[1\]: Duplicate/);
  writeJson(path.join(directory, 'catalogue.json'), { schemaVersion: 1, courses: [{ id: '../private', version: 1 }] });
  assert.throws(() => validatePublicContent(directory), /\$\.courses\[0\]\.id/);
});

test('missing and malformed files produce a file path and root field', t => {
  const directory = library(t);
  const courseFile = path.join(directory, 'fixture-course/v1.json');
  fs.unlinkSync(courseFile);
  assert.throws(() => validatePublicContent(directory), /v1\.json: \$: Missing content file/);
  fs.writeFileSync(courseFile, '{broken');
  assert.throws(() => validatePublicContent(directory), /v1\.json: \$: Invalid JSON/);
});

test('unlisted files and symlinks cannot enter public content', t => {
  const directory = library(t);
  const extra = path.join(directory, 'private-notes.txt');
  fs.writeFileSync(extra, 'Synthetic private data');
  assert.throws(() => validatePublicContent(directory), /private-notes\.txt.*Unexpected public file/);
  fs.unlinkSync(extra);
  const courseFile = path.join(directory, 'fixture-course/v1.json');
  const savedFile = path.join(sandbox(t), 'outside.json');
  fs.renameSync(courseFile, savedFile);
  fs.symlinkSync(savedFile, courseFile);
  assert.throws(() => validatePublicContent(directory), /regular file, not a symlink/);
  fs.unlinkSync(courseFile);
  fs.rmdirSync(path.dirname(courseFile));
  fs.symlinkSync(path.dirname(savedFile), path.dirname(courseFile));
  assert.throws(() => validatePublicContent(directory), /Course folder must be a directory, not a symlink/);
});

test('empty catalogue is valid while the real course awaits authoring and review', t => {
  assert.deepEqual(validatePublicContent(library(t, [])), []);
});

test('Vite builds valid content and rejects unsafe content with its exact field path', async t => {
  const course = validCourse();
  const directory = library(t, [course]);
  const app = sandbox(t);
  fs.writeFileSync(path.join(app, 'index.html'), '<!doctype html><title>Content build fixture</title>');
  const options = { root: app, configFile: false, logLevel: 'silent', plugins: [contentValidationPlugin(directory)], build: { write: false } };
  await build(options);
  lesson(course).blocks[4].url = 'javascript:alert(1)';
  writeJson(path.join(directory, course.id, 'v1.json'), course);
  await assert.rejects(build(options), /v1\.json: \$\.modules\[0\]\.lessons\[0\]\.blocks\[4\]\.url: Use an absolute HTTPS URL/);
});

test('repository public catalogue is valid', () => {
  const directory = fileURLToPath(new URL('../content/public/', import.meta.url));
  assert.doesNotThrow(() => validatePublicContent(directory));
});
