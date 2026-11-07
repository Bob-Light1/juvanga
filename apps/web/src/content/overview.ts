import type { Course } from './schema.ts';

export type CourseOverview = Pick<Course, 'id' | 'version' | 'title' | 'summary' | 'objectives' | 'prerequisites'> & {
  availability: 'published' | 'coming-soon';
  modules: { id: string; title: string; lessons: { id: string; title: string }[] }[];
};

// Explicit projection: approved descriptions never expose teaching blocks or solutions.
export function toOverview(course: Course): CourseOverview {
  return {
    id: course.id, version: course.version, title: course.title, summary: course.summary,
    objectives: course.objectives, prerequisites: course.prerequisites,
    availability: course.status === 'published' ? 'published' : 'coming-soon',
    modules: course.modules.map(module => ({
      id: module.id, title: module.title,
      lessons: module.lessons.map(lesson => ({ id: lesson.id, title: lesson.title })),
    })),
  };
}

export const coursePath = (course: Pick<CourseOverview, 'id'>) => `/courses/${course.id}`;
