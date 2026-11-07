import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCourseDocument } from './content.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = 'content/drafts/meeting-notes-action-plan/v1.json';
const output = 'docs/reviews/meeting-notes-action-plan-v1.md';
const escapeText = value => value.replace(/[\\`*_{}[\]()#+.!|]/g, '\\$&');
const quote = value => value.split('\n').map(line => `> ${line}`).join('\n');
const quoteText = value => quote(escapeText(value));
const list = items => quote(items.map((item, i) => `${i + 1}. ${escapeText(item)}`).join('\n'));

function renderBlocks(blocks) {
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
      case 'note': return quoteText(block.text);
      case 'heading': return quote(`### ${escapeText(block.text)}`);
      case 'list': return quote(block.items.map((item, index) =>
        `${block.ordered ? `${index + 1}.` : '-'} ${escapeText(item)}`).join('\n'));
      case 'link': return quoteText(`${block.text} — ${block.url}`);
      case 'lesson-link': return quoteText(`${block.text} — ${block.courseId}@${block.courseVersion}/${block.lessonId}`);
      default: throw new Error(`Unsupported review block: ${block.type}`);
    }
  }).join('\n\n');
}

export function renderCourseReview(course) {
  const sections = [
    `# Course review — ${course.id} v${course.version}`,
    `Generated from [the canonical French draft](../../${source}) by \`npm run course:review\`. Do not edit this view; edit the JSON and regenerate.`,
    `Status: \`${course.status}\`. The French text in block quotes is learner-facing product content. English headings organize this review document and are not application copy.`,
    '## Reviewer instructions',
    'The project owner is the designated reviewer. Read every lesson, try each exercise before its solution, check every criterion, and report unclear instructions or incorrect answers. Record whether you completed the full walkthrough yourself without co-authoring the course. Plan approval is separate from complete-lesson review. This file is a review copy, not a working learner application.',
    '## Course introduction',
    quote(`# ${escapeText(course.title)}`),
    quoteText(course.summary),
    '### Objectives',
    list(course.objectives),
    '### Prerequisites',
    list(course.prerequisites),
  ];
  let number = 0;
  for (const module of course.modules) for (const lesson of module.lessons) {
    number += 1;
    sections.push(
      `## Lesson ${number}`,
      quote(`## ${escapeText(lesson.title)}`),
      '### Objectives', list(lesson.objectives),
      '### Teaching content', renderBlocks(lesson.blocks),
      '### Guided example', renderBlocks(lesson.example),
      '### Exercise', quoteText(lesson.exercise.prompt), list(lesson.exercise.instructions),
      '### Self-assessment criteria', list(lesson.exercise.rubric.criteria.map(criterion => criterion.description)),
      '### Worked solution — read after attempting the exercise', renderBlocks(lesson.exercise.workedSolution),
    );
  }
  sections.push('## Review record',
    'Report your review and full non-author walkthrough result to the delivery owner; the canonical [verification record](../delivery/VALIDATION-JUV-103.md) tracks the current outcome and limitations. No review timestamp or publication date is inferred from reading this file.');
  return sections.join('\n\n') + '\n';
}

function main() {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && args[0] !== '--check')) throw new Error('Usage: node scripts/course-review.mjs [--check]');
  const course = validateCourseDocument(path.join(root, source));
  const rendered = renderCourseReview(course);
  const file = path.join(root, output);
  if (args[0] === '--check') {
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== rendered) {
      throw new Error(`${output}: Stale review copy; run npm run course:review`);
    }
    console.log(`${source}: course schema and generated review copy are valid.`);
  } else {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, rendered);
    console.log(`${output}: generated from the validated French course draft.`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
