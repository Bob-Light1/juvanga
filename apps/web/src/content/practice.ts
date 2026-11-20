import type { Course, Exercise, Lesson, Rubric } from './schema.ts';
import { lessonPath, latestLessonPath, latestReadingCourses, readingLessons, type ReadingCourse, type ReadingLesson } from './reader.ts';

export type PracticeCourse = Pick<Course, 'id' | 'version' | 'title'> & {
  lessons: Pick<Lesson, 'id' | 'title' | 'exercise'>[];
};

export function toPracticeCourse(course: Course): PracticeCourse {
  return {
    id: course.id, version: course.version, title: course.title,
    lessons: course.modules.flatMap(module => module.lessons.map(lesson => ({ id: lesson.id, title: lesson.title, exercise: lesson.exercise }))),
  };
}

export const exercisePath = (course: Pick<ReadingCourse, 'id' | 'version'>, lesson: Pick<ReadingLesson, 'id'>) => `${lessonPath(course, lesson)}/exercise`;
export function exercisePaths(courses: ReadingCourse[]) {
  return [
    ...courses.flatMap(course => readingLessons(course).map(lesson => exercisePath(course, lesson))),
    ...latestReadingCourses(courses).flatMap(course => readingLessons(course).map(lesson => `${latestLessonPath(course, lesson)}/exercise`)),
  ];
}

export function findExercise(courses: PracticeCourse[], courseId: string, version: number, lessonId: string): Exercise | undefined {
  return courses.find(course => course.id === courseId && course.version === version)?.lessons.find(lesson => lesson.id === lessonId)?.exercise;
}

// These states describe the learner's declarations; none is an assessment of competence.
export function selfAssessmentState(criteria: Rubric['criteria'], checked: ReadonlySet<string>): 'unreviewed' | 'review-needed' | 'declared' {
  const count = criteria.filter(criterion => checked.has(criterion.id)).length;
  if (!count) return 'unreviewed';
  return count === criteria.length ? 'declared' : 'review-needed';
}
