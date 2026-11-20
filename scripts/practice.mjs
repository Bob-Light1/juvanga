import path from 'node:path';
import { publicContentDirectory, validatePublicContent } from './content.mjs';
import { toPracticeCourse } from '../apps/web/src/content/practice.ts';

export function loadPracticeCourses(directory = publicContentDirectory) {
  return validatePublicContent(directory).filter(course => course.locale === 'fr').map(toPracticeCourse);
}

export function practicePlugin(directory = publicContentDirectory) {
  return {
    name: 'published-course-practice',
    resolveId(id) { if (id === 'virtual:public-practice') return '\0public-practice'; },
    load(id) {
      if (id !== '\0public-practice') return;
      const courses = loadPracticeCourses(directory);
      this.addWatchFile(path.join(directory, 'catalogue.json'));
      for (const course of courses) this.addWatchFile(path.join(directory, course.id, `v${course.version}.json`));
      return `export default ${JSON.stringify(courses)};`;
    },
  };
}
