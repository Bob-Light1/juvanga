import type { ContentBlock, Course, Lesson } from './schema.ts';

export type ReadingLesson = Pick<Lesson, 'id' | 'title' | 'objectives' | 'blocks' | 'example'>;
export type ReadingCourse = Pick<Course, 'id' | 'version' | 'title'> & {
  modules: { id: string; title: string; lessons: ReadingLesson[] }[];
};

// Public reader projection deliberately excludes exercises and editorial metadata.
export function toReadingCourse(course: Course): ReadingCourse {
  return {
    id: course.id, version: course.version, title: course.title,
    modules: course.modules.map(module => ({
      id: module.id, title: module.title,
      lessons: module.lessons.map(lesson => ({
        id: lesson.id, title: lesson.title, objectives: lesson.objectives,
        blocks: lesson.blocks, example: lesson.example,
      })),
    })),
  };
}

export const readingLessons = (course: ReadingCourse) => course.modules.flatMap(module => module.lessons);
export const lessonPath = (course: Pick<ReadingCourse, 'id' | 'version'>, lesson: Pick<ReadingLesson, 'id'>) => `/learn/${course.id}/v/${course.version}/${lesson.id}`;
export const lessonLinkPath = (block: Extract<ContentBlock, { type: 'lesson-link' }>) => lessonPath({ id: block.courseId, version: block.courseVersion }, { id: block.lessonId });
export const latestLessonPath = (course: Pick<ReadingCourse, 'id'>, lesson: Pick<ReadingLesson, 'id'>) => `/learn/${course.id}/${lesson.id}`;

export function latestReadingCourses(courses: ReadingCourse[]): ReadingCourse[] {
  const latest = new Map<string, ReadingCourse>();
  for (const course of courses) if (!latest.has(course.id) || latest.get(course.id)!.version < course.version) latest.set(course.id, course);
  return [...latest.values()];
}

export function findReadingLesson(path: string, courses: ReadingCourse[]) {
  for (const course of courses) for (const lesson of readingLessons(course)) {
    if (lessonPath(course, lesson) === path) return { course, lesson };
  }
  for (const course of latestReadingCourses(courses)) for (const lesson of readingLessons(course)) {
    if (latestLessonPath(course, lesson) === path) return { course, lesson };
  }
}
