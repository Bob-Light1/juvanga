import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CatalogueSchema, CourseSchema } from '../apps/web/src/content/schema.ts';

export const publicContentDirectory = fileURLToPath(new URL('../content/public/', import.meta.url));
const fieldPath = parts => parts.reduce((result, part) =>
  typeof part === 'number' ? `${result}[${part}]` : `${result}.${String(part)}`, '$');

function readDocument(file, schema) {
  if (!fs.existsSync(file)) throw new Error(`${file}: $: Missing content file`);
  if (!fs.lstatSync(file).isFile()) throw new Error(`${file}: $: Content must be a regular file, not a symlink`);
  let value;
  try { value = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { throw new Error(`${file}: $: Invalid JSON`); }
  const result = schema.safeParse(value);
  if (!result.success) {
    const messages = result.error.issues.flatMap(issue => {
      const paths = issue.code === 'unrecognized_keys'
        ? issue.keys.map(key => [...issue.path, key]) : [issue.path];
      return paths.map(parts => `${file}: ${fieldPath(parts)}: ${issue.message}`);
    });
    throw new Error(messages.join('\n'));
  }
  return result.data;
}

export function validatePublicContent(directory = publicContentDirectory) {
  if (!fs.existsSync(directory) || !fs.lstatSync(directory).isDirectory()) {
    throw new Error(`${directory}: $: Public content must be a directory, not a symlink`);
  }
  const catalogueFile = path.join(directory, 'catalogue.json');
  const catalogue = readDocument(catalogueFile, CatalogueSchema);
  const expected = new Set(['catalogue.json']);
  const courses = new Map();
  for (const [index, entry] of catalogue.courses.entries()) {
    const relative = `${entry.id}/v${entry.version}.json`;
    const folder = path.join(directory, entry.id);
    if (fs.existsSync(folder) && !fs.lstatSync(folder).isDirectory()) {
      throw new Error(`${folder}: $: Course folder must be a directory, not a symlink`);
    }
    const file = path.join(directory, relative);
    const course = readDocument(file, CourseSchema);
    if (course.id !== entry.id || course.version !== entry.version) {
      throw new Error(`${file}: $.id / $.version: Must match ${catalogueFile}: $.courses[${index}]`);
    }
    if (course.status !== 'published') throw new Error(`${file}: $.status: Only published courses belong in public content`);
    expected.add(relative);
    courses.set(`${entry.id}@${entry.version}`, { file, course });
  }

  const walk = (folder, prefix = '') => {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const relative = prefix + entry.name;
      if (entry.isDirectory()) walk(path.join(folder, entry.name), relative + '/');
      else if (!entry.isFile() || !expected.has(relative)) {
        throw new Error(`${path.join(directory, relative)}: $: Unexpected public file or symlink; keep drafts and private files outside content/public`);
      }
    }
  };
  walk(directory);

  for (const { file, course } of courses.values()) {
    course.modules.forEach((module, mi) => module.lessons.forEach((lesson, li) => {
      const groups = [
        { blocks: lesson.blocks, path: ['blocks'] },
        { blocks: lesson.example, path: ['example'] },
        { blocks: lesson.exercise.workedSolution, path: ['exercise', 'workedSolution'] },
      ];
      for (const group of groups) group.blocks.forEach((block, bi) => {
        if (block.type !== 'lesson-link') return;
        const target = courses.get(`${block.courseId}@${block.courseVersion}`)?.course;
        const found = target?.modules.some(m => m.lessons.some(l => l.id === block.lessonId));
        if (!found) throw new Error(`${file}: ${fieldPath(['modules', mi, 'lessons', li, ...group.path, bi])}: Lesson link must resolve to a published course version and lesson`);
      });
    }));
  }
  return [...courses.values()].map(({ course }) => course);
}

export function contentValidationPlugin(directory = publicContentDirectory) {
  return {
    name: 'validate-public-content',
    apply: 'build',
    buildStart() { validatePublicContent(directory); },
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const courses = validatePublicContent();
    console.log(`${courses.length} public course version(s): schemas, IDs and links validated.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
