# Public course authoring contract

Implemented by JUV-102. Decision: [ADR-006](decisions/006-public-content.md). Canonical types and validation: [schema.ts](../../apps/web/src/content/schema.ts). Example: [synthetic valid fixture](../../tests/fixtures/content/valid-course.json); it is not learner content or publication evidence.

## Files and publication boundary

- `content/public/catalogue.json`: `{ "schemaVersion": 1, "courses": [{ "id": "course-id", "version": 1 }] }`.
- `content/public/course-id/v1.json`: the matching reviewed, published course document.
- Drafts, private files and real learner data must stay outside `content/public` and the frontend's static assets. Unlisted files and symlinks in this tree fail validation.

The catalogue lists only versions whose publication the owner explicitly decided; the first is `meeting-notes-action-plan` v1 ([DEC-07 publication decision](../product/DECISIONS.md#dec-07-publication-decision--2026-11-26)). `content/public` is an authoring inventory, not Vite's automatically copied `public` folder. JUV-106 projects public descriptions; JUV-108 consumes only validated published French reading content. Neither feature publishes an editorial draft.

## Document structure

All objects reject unknown fields. No values are silently coerced. Every string intended for display is plain text, nonblank and bounded; literal angle brackets and unsafe control characters are rejected. Renderers must escape text and must not use `dangerouslySetInnerHTML` or interpret it as Markdown.

| Object | Required fields |
| --- | --- |
| Course | `schemaVersion`, `id`, `version`, `status`, `access`, `level`, `locale`, `title`, `summary`, `objectives`, `prerequisites`, `authors`, `review`, `publishedAt`, `modules` |
| Module | `id`, `title`, `lessons` |
| Lesson | `id`, `title`, `objectives`, `blocks`, `example`, `exercise` |
| Exercise | `id`, `version`, `prompt`, `instructions`, `rubric`, `workedSolution` |
| Rubric | `id`, `version`, `criteria` |
| Criterion | `id`, `description`, `critical` |
| Review | `reviewer`, `reviewedAt` |

`schemaVersion` is 1 for existing text-only documents. Version 2 additionally permits same-origin image blocks; version 1 continues to reject images and accepts all unchanged existing documents. A new media-bearing course requires an explicitly reviewed new version; do not rewrite a published version. IDs are stable lowercase alphanumeric words separated by hyphens; versions are positive safe integers. Preserve lesson, exercise, rubric and criterion IDs across new versions when they represent the same entity. IDs are unique across entities within each course version. M1 must preserve these public IDs alongside its database UUIDs.

`access` is `public`; `level` is 0. `locale` is `fr` or `en`; the real initial course is French. `status` is `draft`, `review`, `published` or `archived`; the public inventory accepts only `published`. The executable schema can validate draft-shaped documents in tests or future editorial tools, while the public checker rejects their inclusion in the inventory.

`review` and `publishedAt` are required keys but may be `null` for an unpublished draft. Published and archived versions require both; review must precede or equal publication. Timestamps must be UTC ISO strings ending in `Z`. Product displays use `Africa/Douala`. Review metadata records an actual review; populating it alone does not perform that review.

Every lesson has nonempty objectives, teaching blocks, example blocks and a versioned exercise with a rubric and worked-solution blocks. The schema does not enforce a course's pedagogical accuracy or a three-lesson minimum for every future course; JUV-103 and the approved M0 plan require three complete reviewed lessons for this release.

## Blocks and links

All blocks have a stable `id` and one of these `type` values:

| Type | Additional fields |
| --- | --- |
| `paragraph` | `text` |
| `heading` | `level` (2 or 3), `text` |
| `list` | `ordered` (boolean), nonempty `items` (plain strings) |
| `note` | `tone` (`information` or `warning`), `text` |
| `link` | `text`, `url` (absolute HTTPS, no credentials, whitespace or backslashes) |
| `lesson-link` | `text`, `courseId`, `courseVersion`, `lessonId` |
| `image` (schema 2 only) | `src` (same-origin `/media/<lowercase-name>.(png\|jpg\|webp\|avif)`), nonblank `alt`, integer `width`/`height` (1–8192), optional `caption` |

An internal lesson link must resolve to a lesson in a version listed in the same public catalogue. The checker inspects teaching blocks, examples and worked solutions. JUV-108 generates `/learn/:course/v/:version/:lesson` references preserving the exact version. External links are validated without fetching their targets; review destination availability and relevance before publication.

## Validation and correction

For the first course draft, `npm run course:review` validates the canonical French JSON and generates a readable review copy. `npm run check:course`, included in `npm run verify`, rejects an invalid draft or a stale review copy. See the [editorial record](../../content/drafts/meeting-notes-action-plan/README.md). This authoring check uses the unchanged schema; it does not add the draft to the public inventory or perform a human review. Application UI copy remains separate in JUV-107.

Run `npm run check:content` for focused diagnostics. Every Vite production build runs the same check, including `npm run build -w @juvanga/web`. Tests run through `npm test` under Node 24. Example diagnostic shape:

```text
content/public/course-id/v1.json: $.modules[0].lessons[0].blocks[4].url: Use an absolute HTTPS URL without credentials, whitespace or backslashes
```

Correct a draft before publication. Correct a published course by adding a new version file and catalogue entry while retaining its earlier version. Increment exercise/rubric versions when their content changes. Release review must verify that previously published files were not edited; the schema cannot establish historical immutability or certify review.

## Public presentation inventory (JUV-106)

[ADR-008](decisions/008-public-pages.md) adds a separate explicit `content/discovery/catalogue.json` for approved upcoming descriptions. The build projects presentation fields from reviewed French documents; blocks, exercises, rubrics and solutions remain excluded. It does not change this published-lesson inventory or add publication timestamps. The UI marks unreleased descriptions as coming soon. Published entries supersede upcoming descriptions with the same stable course ID. See [projection/validation](../../scripts/discovery.mjs).

## Reader and illustration contract (JUV-108)

The reader projection excludes exercise instructions, rubrics, worked solutions and editorial metadata. It renders plain text, objectives and examples; exercise interaction remains JUV-109. See [ADR-010](decisions/010-lesson-reader.md). Canonical URLs retain course versions; `/learn/:course/:lesson` selects the latest published French version and points its canonical to the versioned route. Only canonical routes enter the sitemap.

An image must have a meaningful equivalent description, intrinsic dimensions, reviewed rights and a matching raster asset in `apps/web/public/media/`. No remote URL, traversal, SVG, data URL, video or iframe is accepted. Images require an explicit load action, retain their description during failure and offer retry. Text remains readable with JavaScript disabled; optional images need JavaScript to load. The schema validates source syntax and dimensions; it does not verify asset existence, bytes, relevance or rights. Check those before publication. Current real content remains text-only and unpublished.

## Exercise presentation (JUV-109)

A separate public exercise projection adds the prompt, instructions, rubric and worked solution for published French versions only. Reading projections remain unchanged. Exact-version `/learn/:course/v/:version/:lesson/exercise` routes and latest short aliases show instructions/criteria before a collapsed public solution. Exercise pages are noindex and excluded from the sitemap. Responses and personal checkbox choices are ephemeral, never submitted or retained; there is no score, human review or competency result. See [ADR-011](decisions/011-practice.md).
