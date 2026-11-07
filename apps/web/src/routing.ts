import { fr } from './i18n/fr.ts';
import { coursePath, type CourseOverview } from './content/overview.ts';

export type Page = {
  kind: 'home' | 'catalogue' | 'course' | 'workshop' | 'not-found';
  title: string; description: string; path: string; indexable: boolean;
  course?: CourseOverview;
};

export function getPage(pathname: string, courses: CourseOverview[]): Page {
  const path = pathname.replace(/\/+$/, '') || '/';
  const copy = fr.pages;
  if (path === '/') return { kind: 'home', title: copy.homeMetaTitle, description: copy.homeDescription, path, indexable: true };
  if (path === '/courses') return { kind: 'catalogue', title: copy.catalogueMetaTitle, description: copy.catalogueDescription, path, indexable: true };
  if (path === '/workshop') return { kind: 'workshop', title: copy.workshopTitle, description: copy.workshopDescription, path, indexable: false };
  const course = courses.find(candidate => coursePath(candidate) === path);
  if (course) return { kind: 'course', title: `${course.title} — ${copy.brand}`, description: course.summary, path, indexable: true, course };
  return { kind: 'not-found', title: copy.notFoundMetaTitle, description: copy.notFoundDescription, path, indexable: false };
}

export function publicPaths(courses: CourseOverview[]) {
  return ['/', '/courses', ...courses.map(coursePath)];
}
