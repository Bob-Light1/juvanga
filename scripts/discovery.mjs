import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CatalogueSchema } from '../apps/web/src/content/schema.ts';
import { toOverview } from '../apps/web/src/content/overview.ts';
import { validateCourseDocument, validatePublicContent, publicContentDirectory } from './content.mjs';

const contentRoot = fileURLToPath(new URL('../content/', import.meta.url));
export const discoveryCatalogue = path.join(contentRoot, 'discovery/catalogue.json');
export const draftDirectory = path.join(contentRoot, 'drafts');

export function loadOverviews({ catalogue = discoveryCatalogue, drafts = draftDirectory, publicDirectory = publicContentDirectory } = {}) {
  const courses = validatePublicContent(publicDirectory).filter(course => course.locale === 'fr');
  const releasedIds = new Set(courses.map(course => course.id));
  if (!fs.lstatSync(catalogue).isFile()) throw new Error(`${catalogue}: Discovery inventory must be a regular file`);
  const inventory = CatalogueSchema.parse(JSON.parse(fs.readFileSync(catalogue, 'utf8')));
  for (const entry of inventory.courses) {
    const folder = path.join(drafts, entry.id);
    if (!fs.lstatSync(folder).isDirectory()) throw new Error(`${folder}: Discovery source must be a directory, not a symlink`);
    const file = path.join(folder, `v${entry.version}.json`);
    const course = validateCourseDocument(file);
    if (course.id !== entry.id || course.version !== entry.version || course.locale !== 'fr'
      || course.status !== 'review' || !course.review || course.publishedAt !== null) {
      throw new Error(`${file}: Discovery requires a matching, reviewed, unpublished French course`);
    }
    // A released version takes precedence over any future teaser with the same ID.
    if (!releasedIds.has(course.id)) courses.push(course);
  }
  const latest = new Map();
  for (const course of courses) {
    if (!latest.has(course.id) || latest.get(course.id).version < course.version) latest.set(course.id, course);
  }
  return [...latest.values()].map(toOverview);
}

export function overviewPlugin() {
  return {
    name: 'public-course-overviews',
    resolveId(id) { if (id === 'virtual:public-overviews') return '\0public-overviews'; },
    load(id) {
      if (id !== '\0public-overviews') return;
      const overviews = loadOverviews();
      this.addWatchFile(discoveryCatalogue);
      this.addWatchFile(path.join(publicContentDirectory, 'catalogue.json'));
      const inventory = JSON.parse(fs.readFileSync(discoveryCatalogue, 'utf8'));
      for (const entry of inventory.courses) this.addWatchFile(path.join(draftDirectory, entry.id, `v${entry.version}.json`));
      return `export default ${JSON.stringify(overviews)};`;
    },
  };
}
