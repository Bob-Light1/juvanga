import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { readerFixtures } from './reader-fixture.mjs';
import { toReadingCourse, readingLessons } from '../apps/web/src/content/reader.ts';
import { exercisePath, exercisePaths, findExercise, selfAssessmentState, toPracticeCourse } from '../apps/web/src/content/practice.ts';
import { loadPracticeCourses } from '../scripts/practice.mjs';
import { getPage, publicPaths } from '../apps/web/src/routing.ts';

const courses = readerFixtures();
const readers = courses.map(toReadingCourse);
const practice = courses.map(toPracticeCourse);

test('practice paths keep exact exercise/rubric versions and latest aliases; they are noindex', () => {
  assert.equal(exercisePaths(readers).length, 9);
  for (const course of readers) for (const lesson of readingLessons(course)) {
    const path = exercisePath(course, lesson);
    const page = getPage(path, [], readers);
    assert.equal(page.kind, 'exercise');
    assert.equal(page.indexable, false);
    assert.equal(page.path, path);
    assert.ok(!publicPaths([], readers).includes(path));
    assert.equal(getPage(`/learn/${course.id}/${lesson.id}/exercise`, [], readers).readingCourse.version, 2);
    assert.deepEqual(findExercise(practice, course.id, course.version, lesson.id), courses[course.version - 1].modules.flatMap(m => m.lessons).find(l => l.id === lesson.id).exercise);
  }
  for (const url of ['/learn/fixture-course/v/99/fixture-lesson-1/exercise', '/learn/fixture-course/v/2/missing/exercise']) assert.equal(getPage(url, [], readers).kind, 'missing-lesson');
  assert.equal(findExercise(practice, 'fixture-course', 99, 'fixture-lesson-1'), undefined);
});

test('self-assessment describes declarations, including all checked and missing essential criteria', () => {
  const criteria = practice[1].lessons[0].exercise.rubric.criteria;
  assert.equal(selfAssessmentState(criteria, new Set()), 'unreviewed');
  assert.equal(selfAssessmentState(criteria, new Set(['unknown'])), 'unreviewed');
  assert.equal(selfAssessmentState(criteria, new Set([criteria[1].id])), 'review-needed');
  assert.equal(selfAssessmentState(criteria, new Set([criteria[0].id])), 'review-needed');
  assert.equal(selfAssessmentState(criteria, new Set(criteria.map(c => c.id))), 'declared');
});

test('practice projection contains public exercise material without editorial or teaching metadata', () => {
  assert.deepEqual(Object.keys(practice[0]).sort(), ['id', 'version', 'title', 'lessons'].sort());
  assert.deepEqual(Object.keys(practice[0].lessons[0]).sort(), ['id', 'title', 'exercise'].sort());
  assert.ok(practice[1].lessons[0].exercise.workedSolution.length);
  assert.doesNotMatch(JSON.stringify(practice), /reviewedAt|publishedAt|reader-paragraph/);
});

test('practice boundary rejects unpublished content and excludes unadvertised languages', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'juvanga-practice-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const course = structuredClone(courses[0]);
  fs.mkdirSync(path.join(root, course.id));
  fs.writeFileSync(path.join(root, 'catalogue.json'), JSON.stringify({ schemaVersion: 1, courses: [{ id: course.id, version: 1 }] }));
  const write = () => fs.writeFileSync(path.join(root, course.id, 'v1.json'), JSON.stringify(course));
  write(); assert.equal(loadPracticeCourses(root).length, 1);
  for (const status of ['draft', 'review', 'archived']) { course.status = status; write(); assert.throws(() => loadPracticeCourses(root)); }
  course.status = 'published'; course.locale = 'en'; write(); assert.deepEqual(loadPracticeCourses(root), []);
  assert.deepEqual(loadPracticeCourses(), []);
});

test('a lesson ID named exercise remains a reading route with its own exercise child', () => {
  const course = structuredClone(readers[1]);
  course.modules[0].lessons[0].id = 'exercise';
  for (const path of ['/learn/fixture-course/v/2/exercise', '/learn/fixture-course/exercise']) {
    assert.equal(getPage(path, [], [course]).kind, 'lesson');
    assert.equal(getPage(`${path}/exercise`, [], [course]).kind, 'exercise');
  }
});
