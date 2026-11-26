import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { CourseSchema } from '../apps/web/src/content/schema.ts';
import { toOverview } from '../apps/web/src/content/overview.ts';
import { findReadingLesson, latestLessonPath, lessonLinkPath, lessonPath, readingLessons, toReadingCourse } from '../apps/web/src/content/reader.ts';
import { getPage, publicPaths, readerAliases } from '../apps/web/src/routing.ts';
import { loadReadingCourses } from '../scripts/reader.mjs';
import { readerFixtures } from './reader-fixture.mjs';

const [older, current] = readerFixtures();
const image = current.modules[0].lessons[0].blocks.find(block => block.type === 'image');

function library(t, documents = readerFixtures()) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'juvanga-reader-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'catalogue.json'), JSON.stringify({ schemaVersion: 1, courses: documents.map(({ id, version }) => ({ id, version })) }));
  for (const course of documents) {
    fs.mkdirSync(path.join(root, course.id), { recursive: true });
    fs.writeFileSync(path.join(root, course.id, `v${course.version}.json`), JSON.stringify(course));
  }
  return root;
}

test('unchanged schema 1 and explicit schema 2 coexist; schema 1 stays text-only', () => {
  assert.ok(CourseSchema.safeParse(older).success);
  assert.ok(CourseSchema.safeParse(current).success);
  for (const group of ['blocks', 'example', 'workedSolution']) {
    const copy = structuredClone(older);
    const lesson = copy.modules[0].lessons[0];
    (group === 'workedSolution' ? lesson.exercise.workedSolution : lesson[group]).push(image);
    const result = CourseSchema.safeParse(copy);
    assert.equal(result.success, false);
    assert.ok(result.error.issues.some(issue => /schemaVersion 2/.test(issue.message)));
  }
  assert.equal(CourseSchema.safeParse({ ...current, schemaVersion: 3 }).success, false);
});

for (const [field, values] of [
  ['src', ['https://example.com/image.png', '//example.com/a.png', '/media/../secret.png', '/media/%2e%2e.png', '/media/a.svg', 'data:image/png;base64,a', '/media/a.png?x=1', '/media/a\\b.png']],
  ['alt', ['', ' ', '<script>', '\u0000']],
  ['width', [0, -1, 1.5, 8193]], ['height', [0, 8193]],
]) test(`image ${field} is bounded and rejects unsafe or inaccessible inputs`, () => {
  for (const value of values) {
    const copy = structuredClone(current);
    copy.modules[0].lessons[0].blocks.find(block => block.type === 'image')[field] = value;
    assert.equal(CourseSchema.safeParse(copy).success, false, String(value));
  }
});

test('reader projection excludes exercises, rubrics, solutions and editorial fields', t => {
  const courses = loadReadingCourses(library(t));
  assert.equal(courses.length, 2);
  assert.deepEqual(Object.keys(courses[1]).sort(), ['id', 'version', 'title', 'modules'].sort());
  for (const course of courses) for (const lesson of readingLessons(course)) {
    assert.deepEqual(Object.keys(lesson).sort(), ['id', 'title', 'objectives', 'blocks', 'example'].sort());
  }
  assert.doesNotMatch(JSON.stringify(courses), /workedSolution|reviewedAt|rubric|fixture-solution/);
});

test('reader accepts only published French courses and never loads discovery drafts', t => {
  for (const status of ['draft', 'review', 'archived']) assert.throws(() => loadReadingCourses(library(t, [{ ...current, status }])));
  const english = structuredClone(older);
  english.locale = 'en';
  assert.deepEqual(loadReadingCourses(library(t, [english])), []);
  assert.deepEqual(loadReadingCourses().map(({ id, version }) => [id, version]), [['meeting-notes-action-plan', 1]]);
});

test('canonical routes retain exact versions; latest aliases resolve consistently', () => {
  const readers = [older, current].map(toReadingCourse);
  const overview = toOverview(current);
  assert.equal(publicPaths([overview], readers).length, 12);
  assert.equal(readerAliases(readers).length, 3);
  for (const course of readers) for (const lesson of readingLessons(course)) {
    const url = lessonPath(course, lesson);
    const page = getPage(url, [overview], readers);
    assert.equal(page.kind, 'lesson');
    assert.equal(page.readingCourse.version, course.version);
    assert.equal(page.path, url);
    assert.equal(page.indexable, true);
    assert.ok(publicPaths([overview], readers).includes(url));
    const alias = latestLessonPath(course, lesson);
    assert.equal(getPage(alias, [overview], readers).readingCourse.version, 2);
    assert.equal(getPage(alias, [overview], readers).path, lessonPath(current, lesson));
    assert.ok(!publicPaths([overview], readers).includes(alias));
  }
  const link = current.modules[0].lessons[0].blocks.find(block => block.type === 'lesson-link');
  assert.equal(findReadingLesson(lessonLinkPath(link), readers).course.version, 2);
});

test('unpublished, missing, malformed or unknown version routes give helpful noindex recovery', () => {
  const readers = [older, current].map(toReadingCourse);
  for (const url of ['/learn/unknown/missing', '/learn/fixture-course/v/99/fixture-lesson-1', '/learn/fixture-course/v/2/missing', '/learn/fixture-course/v/02/fixture-lesson-1']) {
    const page = getPage(url, [], readers);
    assert.equal(page.kind, 'missing-lesson');
    assert.equal(page.indexable, false);
    assert.ok(page.description.includes('Vérifiez le lien'));
  }
  assert.equal(getPage('/learn/meeting-notes-action-plan/missing', [], []).kind, 'missing-lesson');
});
