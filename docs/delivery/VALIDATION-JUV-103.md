# JUV-103 — free-course content verification

Date: 2026-11-07. Owner: Codex. Branch: `feat/JUV-103-free-course-content`. Status: `done` after explicit human review, reported non-author walkthrough and successful closure verification.

Canonical content: [French draft v1](../../content/drafts/meeting-notes-action-plan/v1.json). [Generated readable review copy](../reviews/meeting-notes-action-plan-v1.md). [Editorial provenance and rights](../../content/drafts/meeting-notes-action-plan/README.md). [Approved plan](../product/FREE-COURSE.md).

## Criteria and evidence

| Criterion | Evidence / state |
| --- | --- |
| Every lesson has an objective, example, exercise and worked solution | Three complete French lessons validated against the existing schema; each includes explanatory blocks, guided practice, an exercise, rubric v1 and solution. |
| Sources/licenses recorded; reviewer identified | Original text and fictional approved scenario; no third-party media or copied excerpts. Codex drafts; project owner is the designated reviewer under DEC-07. Publication terms remain the owner's release responsibility. |
| No paid/private content in build | Free fictional draft kept outside `content/public` and web static assets; public catalogue unchanged. Production scan of 12 files found none of the course title, ID or lesson IDs. No paid/private material was added in this ticket. |
| Human pedagogical review | The designated project owner explicitly approved the complete lessons on 2026-11-07 without requesting corrections. This is separate from JUV-101 plan approval. |
| Full walkthrough by a non-author | The project owner explicitly reported reading the course and completing all three exercises before approval. Codex remains the draft author; no co-authored lesson changes were submitted. No completion time was reported. |

## Author desk review

Codex compared all exercises and solutions with N1–N6 in the approved plan:

- Lesson 1 retains the agreed topic, eight laptops, sixteen people in pairs, the unresolved room and missing follow-up owner/deadline. It explains that a room request is known while room availability remains unknown.
- Lesson 2 keeps drafting and review as separate actions, preserves their roles/deadlines and never converts either into an invitation sent or already approved.
- Lesson 3 has a two-sentence summary, three assigned actions, a proposed venue follow-up, one clarification question and all six approved final criteria. The venue remains unconfirmed, with no invented owner or deadline.
- All three deadline displays match the approved UTC instants in Africa/Douala; three `Intl.DateTimeFormat` assertions passed. Estimated lesson durations remain planning hypotheses (35–50 minutes total), not measured results.
- The text distinguishes reading, self-assessment and human competence review, with correction guidance instead of a certificate or fabricated achievement.

This author desk review does not satisfy either human verification requirement.

## Human acceptance recorded

The project owner's response in this conversation explicitly confirmed reading the course, performing all three exercises and approving it. The human verification requirements are satisfied by that reported review and walkthrough. The canonical JSON records `Project owner` as reviewer with the acceptance-recording timestamp `2026-11-07T08:22:14Z`. Lesson text, exercises and rubric versions are unchanged from commit `fa9b20d`.

The content remains unpublished in the editorial directory, with `status: review` and `publishedAt: null`. The public catalogue remains empty; course-page implementation and release checks remain separate tickets. No duration, representative beginner study or browser walkthrough of a future course renderer is inferred.

## Executed checks

- `npm run course:review` under isolated Node 24.22.2/npm 11.21.2: passed schema validation and generated the readable review copy.
- `npm run verify` through isolated Node 24.22.2/npm 11.21.2: passed draft schema and generated-copy consistency, 87 tickets/links/generated backlog views, all 14 contrast pairs, all 49 tests, lint, typecheck and production build.
- Targeted content inspection at authoring: all three lessons validated, with 3/4/6 rubric criteria respectively. The real review metadata was added after human acceptance; publication remains unset and the public inventory remains empty.
- UTC assertions: `2026-11-17T11:00:00Z` → 17 November at 12:00; `2026-11-18T15:00:00Z` → 18 November at 16:00; `2026-11-19T11:00:00Z` → 19 November at 12:00 in Africa/Douala; all passed.
- Production-output scan: 12 built files contain none of the unpublished course's title, course ID or lesson IDs. This is a targeted draft-exclusion check, not a general secrets audit.
- `npm run check:docs` and `git diff --check`: passed after report updates.

No new architecture or schema format was introduced. The small authoring helper reuses JUV-102's validator; `npm run check:course` checks the real draft and generated copy in the normal verification command. Published inventory/build checks remain separate from draft authoring.

Closure verification after the metadata update: full `npm run verify` passed again under isolated Node 24.22.2/npm 11.21.2 (draft/copy consistency, 87 tickets/links/views, 14 contrast pairs, 49 tests, lint, typecheck and production build). The course diff against `fa9b20d` contains only the review metadata; approved lesson text, exercises and rubrics are unchanged. `git diff --check` passed.

Not run: browser E2E, screen-reader/mobile testing of a course renderer, remote CI or deployment. The current application remains the brand workshop; JUV-106/JUV-108 deliver actual course pages and reading.
