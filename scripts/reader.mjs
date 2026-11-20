import path from 'node:path';
import { publicContentDirectory, validatePublicContent } from './content.mjs';
import { toReadingCourse } from '../apps/web/src/content/reader.ts';

export function loadReadingCourses(directory = publicContentDirectory) {
  return validatePublicContent(directory).filter(course => course.locale === 'fr').map(toReadingCourse);
}

export function readerPlugin(directory = publicContentDirectory) {
  return {
    name: 'published-lesson-reader',
    resolveId(id) { if (id === 'virtual:public-reader') return '\0public-reader'; },
    load(id) {
      if (id !== '\0public-reader') return;
      const courses = loadReadingCourses(directory);
      this.addWatchFile(path.join(directory, 'catalogue.json'));
      for (const course of courses) this.addWatchFile(path.join(directory, course.id, `v${course.version}.json`));
      return `export default ${JSON.stringify(courses)};`;
    },
  };
}
