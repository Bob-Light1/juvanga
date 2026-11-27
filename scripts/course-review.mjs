import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCourseDocument } from './content.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
// Each draft has its canonical JSON, a generated review copy and its verification record.
const drafts = [
  { source: 'content/drafts/meeting-notes-action-plan/v1.json', output: 'docs/reviews/meeting-notes-action-plan-v1.md', record: '../delivery/VALIDATION-JUV-103.md' },
  { source: 'content/drafts/premiers-pas-ia/v1.json', output: 'docs/reviews/premiers-pas-ia-v1.md', record: '../product/N0-COURSE.md', media: 'content/drafts/premiers-pas-ia/media' },
];
const escapeText = value => value.replace(/[\\`*_{}[\]()#+.!|]/g, '\\$&');
const quote = value => value.split('\n').map(line => `> ${line}`).join('\n');
const quoteText = value => quote(escapeText(value));
const list = items => quote(items.map((item, i) => `${i + 1}. ${escapeText(item)}`).join('\n'));

const noteLabels = { tip: 'Astuce', try: 'Essayez' };

function renderBlocks(blocks, draft) {
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph': return quoteText(block.text);
      // Information and warning notes keep their historical rendering; new tones show their label.
      case 'note': return quoteText(noteLabels[block.tone] ? `${noteLabels[block.tone]} — ${block.text}` : block.text);
      case 'image': {
        const name = block.src.slice('/media/'.length);
        const local = draft.media && fs.existsSync(path.join(root, draft.media, name));
        const preview = local ? `\n\n![${escapeText(block.alt)}](../../${draft.media}/${name})` : '';
        return quoteText(`Illustration (${block.display ?? 'request'}, ${block.width}×${block.height}) — ${block.alt}${local ? '' : ' — asset not supplied yet'}`) + preview;
      }
      case 'heading': return quote(`### ${escapeText(block.text)}`);
      case 'list': return quote(block.items.map((item, index) =>
        `${block.ordered ? `${index + 1}.` : '-'} ${escapeText(item)}`).join('\n'));
      case 'link': return quoteText(`${block.text} — ${block.url}`);
      case 'lesson-link': return quoteText(`${block.text} — ${block.courseId}@${block.courseVersion}/${block.lessonId}`);
      default: throw new Error(`Unsupported review block: ${block.type}`);
    }
  }).join('\n\n');
}

export function renderCourseReview(course, draft = drafts[0]) {
  const sections = [
    `# Course review — ${course.id} v${course.version}`,
    `Generated from [the canonical French draft](../../${draft.source}) by \`npm run course:review\`. Do not edit this view; edit the JSON and regenerate.`,
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
      '### Teaching content', renderBlocks(lesson.blocks, draft),
      '### Guided example', renderBlocks(lesson.example, draft),
      '### Exercise', quoteText(lesson.exercise.prompt), list(lesson.exercise.instructions),
      '### Self-assessment criteria', list(lesson.exercise.rubric.criteria.map(criterion => criterion.description)),
      '### Worked solution — read after attempting the exercise', renderBlocks(lesson.exercise.workedSolution, draft),
    );
  }
  sections.push('## Review record',
    `Report your review and full non-author walkthrough result to the delivery owner; the canonical [verification record](${draft.record}) tracks the current outcome and limitations. No review timestamp or publication date is inferred from reading this file.`);
  return sections.join('\n\n') + '\n';
}

function main() {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && args[0] !== '--check')) throw new Error('Usage: node scripts/course-review.mjs [--check]');
  for (const draft of drafts) {
    const course = validateCourseDocument(path.join(root, draft.source));
    const rendered = renderCourseReview(course, draft);
    const file = path.join(root, draft.output);
    if (args[0] === '--check') {
      if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== rendered) {
        throw new Error(`${draft.output}: Stale review copy; run npm run course:review`);
      }
      console.log(`${draft.source}: course schema and generated review copy are valid.`);
    } else {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, rendered);
      console.log(`${draft.output}: generated from the validated French course draft.`);
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
