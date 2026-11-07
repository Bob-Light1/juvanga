import { findReadingLesson, latestLessonPath, latestReadingCourses, lessonPath, readingLessons, type ReadingCourse, type ReadingLesson } from './content/reader.ts';
import { exercisePath } from './content/practice.ts';
import { messages } from './i18n/index.ts';
import { coursePath, type CourseOverview } from './content/overview.ts';

export type Page = {
  kind: 'home' | 'catalogue' | 'course' | 'workshop' | 'not-found' | 'lesson' | 'exercise' | 'missing-lesson' | 'progress';
  title: string; description: string; path: string; indexable: boolean;
  course?: CourseOverview;
  readingCourse?: ReadingCourse; lesson?: ReadingLesson;
};

export function getPage(pathname: string, courses: CourseOverview[], readers: ReadingCourse[] = []): Page {
  const path = pathname.replace(/\/+$/, '') || '/';
  const copy = messages.pages;
  if (path === '/') return { kind: 'home', title: copy.homeMetaTitle, description: copy.homeDescription, path, indexable: true };
  if (path === '/courses') return { kind: 'catalogue', title: copy.catalogueMetaTitle, description: copy.catalogueDescription, path, indexable: true };
  if (path === '/progress') return { kind: 'progress', title: messages.progress.metaTitle, description: messages.progress.description, path, indexable: false };
  if (path === '/workshop') return { kind: 'workshop', title: copy.workshopTitle, description: copy.workshopDescription, path, indexable: false };
  if (path.startsWith('/learn/')) {
    const reading = findReadingLesson(path, readers);
    const exercise = !reading && path.endsWith('/exercise');
    const found = reading ?? (exercise ? findReadingLesson(path.slice(0, -9), readers) : undefined);
    if (found && exercise) return { kind: 'exercise', title: `${messages.practice.metaTitle} — ${found.lesson.title} — ${copy.brand}`, description: messages.practice.introduction, path: exercisePath(found.course, found.lesson), indexable: false, readingCourse: found.course, lesson: found.lesson };
    if (found) return { kind: 'lesson', title: `${found.lesson.title} — ${copy.brand}`, description: found.lesson.objectives.join(' '), path: lessonPath(found.course, found.lesson), indexable: true, readingCourse: found.course, lesson: found.lesson };
    return { kind: 'missing-lesson', title: messages.reader.missingMetaTitle, description: messages.reader.missingHelp, path, indexable: false };
  }
  const course = courses.find(candidate => coursePath(candidate) === path);
  if (course) return { kind: 'course', title: `${course.title} — ${copy.brand}`, description: course.summary, path, indexable: true, course };
  return { kind: 'not-found', title: copy.notFoundMetaTitle, description: copy.notFoundDescription, path, indexable: false };
}

export function publicPaths(courses: CourseOverview[], readers: ReadingCourse[] = []) {
  return ['/', '/courses', ...courses.map(coursePath), ...readers.flatMap(course => readingLessons(course).map(lesson => lessonPath(course, lesson)))];
}

export function readerAliases(readers: ReadingCourse[]) {
  return latestReadingCourses(readers).flatMap(course => readingLessons(course).map(lesson => latestLessonPath(course, lesson)));
}
