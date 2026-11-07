import { z } from 'zod';

export const ContentIdSchema = z.string().max(100).regex(
  /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/,
  'Use a stable lowercase ID with optional hyphen-separated words',
);
const version = z.number().int().positive().max(Number.MAX_SAFE_INTEGER);
function hasControlCharacters(value: string, allowLineBreaks = false) {
  return Array.from(value).some(character => {
    const code = character.charCodeAt(0);
    return (code < 32 && !(allowLineBreaks && [9, 10, 13].includes(code)))
      || (code >= 127 && code <= 159);
  });
}
const text = z.string().min(1).max(20_000)
  .refine(value => value.trim().length > 0, 'Text must not be blank')
  .refine(value => !/[<>]/u.test(value) && !hasControlCharacters(value, true),
    'Use plain text without HTML or control characters');
const shortText = text.max(500);

export const PublicUrlSchema = z.string().max(2_000).refine(value => {
  if (!/^https:\/\//i.test(value) || /[\s\\<>]/u.test(value) || hasControlCharacters(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}, 'Use an absolute HTTPS URL without credentials, whitespace or backslashes');

export const BlockSchema = z.discriminatedUnion('type', [
  z.strictObject({ type: z.literal('paragraph'), id: ContentIdSchema, text }),
  z.strictObject({ type: z.literal('heading'), id: ContentIdSchema, level: z.union([z.literal(2), z.literal(3)]), text: shortText }),
  z.strictObject({ type: z.literal('list'), id: ContentIdSchema, ordered: z.boolean(), items: z.array(text).min(1).max(50) }),
  z.strictObject({ type: z.literal('note'), id: ContentIdSchema, tone: z.enum(['information', 'warning']), text }),
  z.strictObject({ type: z.literal('link'), id: ContentIdSchema, text: shortText, url: PublicUrlSchema }),
  z.strictObject({
    type: z.literal('lesson-link'), id: ContentIdSchema, text: shortText,
    courseId: ContentIdSchema, courseVersion: version, lessonId: ContentIdSchema,
  }),
]);

const blocks = z.array(BlockSchema).min(1).max(100);
export const RubricSchema = z.strictObject({
  id: ContentIdSchema,
  version,
  criteria: z.array(z.strictObject({
    id: ContentIdSchema, description: shortText, critical: z.boolean(),
  })).min(1).max(30),
});
export const ExerciseSchema = z.strictObject({
  id: ContentIdSchema,
  version,
  prompt: text,
  instructions: z.array(text).min(1).max(30),
  rubric: RubricSchema,
  workedSolution: blocks,
});
export const LessonSchema = z.strictObject({
  id: ContentIdSchema,
  title: shortText,
  objectives: z.array(shortText).min(1).max(20),
  blocks,
  example: blocks,
  exercise: ExerciseSchema,
});

export const CourseSchema = z.strictObject({
  schemaVersion: z.literal(1),
  id: ContentIdSchema,
  version,
  status: z.enum(['draft', 'review', 'published', 'archived']),
  access: z.literal('public'),
  level: z.literal(0),
  locale: z.enum(['fr', 'en']),
  title: shortText,
  summary: text,
  objectives: z.array(shortText).min(1).max(20),
  prerequisites: z.array(shortText).max(20),
  authors: z.array(shortText).min(1).max(10),
  review: z.strictObject({ reviewer: shortText, reviewedAt: z.iso.datetime() }).nullable(),
  publishedAt: z.iso.datetime().nullable(),
  modules: z.array(z.strictObject({
    id: ContentIdSchema,
    title: shortText,
    lessons: z.array(LessonSchema).min(1).max(50),
  })).min(1).max(30),
}).superRefine((course, context) => {
  const ids = new Set<string>();
  const claim = (id: string, path: (string | number)[]) => {
    if (ids.has(id)) context.addIssue({ code: 'custom', path, message: 'Duplicate ID within this course version' });
    ids.add(id);
  };
  claim(course.id, ['id']);
  course.modules.forEach((module, mi) => {
    const mp = ['modules', mi];
    claim(module.id, [...mp, 'id']);
    module.lessons.forEach((lesson, li) => {
      const lp = [...mp, 'lessons', li];
      claim(lesson.id, [...lp, 'id']);
      for (const field of ['blocks', 'example'] as const) {
        lesson[field].forEach((block, bi) => claim(block.id, [...lp, field, bi, 'id']));
      }
      claim(lesson.exercise.id, [...lp, 'exercise', 'id']);
      claim(lesson.exercise.rubric.id, [...lp, 'exercise', 'rubric', 'id']);
      lesson.exercise.rubric.criteria.forEach((criterion, ci) =>
        claim(criterion.id, [...lp, 'exercise', 'rubric', 'criteria', ci, 'id']));
      lesson.exercise.workedSolution.forEach((block, bi) =>
        claim(block.id, [...lp, 'exercise', 'workedSolution', bi, 'id']));
    });
  });
  if (course.status === 'published' || course.status === 'archived') {
    if (!course.review) context.addIssue({ code: 'custom', path: ['review'], message: 'A released course requires review metadata' });
    if (!course.publishedAt) context.addIssue({ code: 'custom', path: ['publishedAt'], message: 'A released course requires a UTC publication timestamp' });
    if (course.review && course.publishedAt && Date.parse(course.review.reviewedAt) > Date.parse(course.publishedAt)) {
      context.addIssue({ code: 'custom', path: ['review', 'reviewedAt'], message: 'Review must precede or equal publication' });
    }
  }
});

export const CatalogueSchema = z.strictObject({
  schemaVersion: z.literal(1),
  courses: z.array(z.strictObject({ id: ContentIdSchema, version })).max(1_000),
}).superRefine((catalogue, context) => {
  const seen = new Set<string>();
  catalogue.courses.forEach((course, index) => {
    const key = `${course.id}@${course.version}`;
    if (seen.has(key)) context.addIssue({ code: 'custom', path: ['courses', index], message: 'Duplicate course ID/version' });
    seen.add(key);
  });
});

export type ContentBlock = z.infer<typeof BlockSchema>;
export type Course = z.infer<typeof CourseSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type Rubric = z.infer<typeof RubricSchema>;
