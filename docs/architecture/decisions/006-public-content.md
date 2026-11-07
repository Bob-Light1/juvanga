# ADR-006 — strict versioned public course documents

- Date: 2026-11-07.
- Status: adopted for JUV-102.
- Owner: Codex; course-plan approval remains recorded in DEC-07.

## Context and constraint

M0 needs public text-first courses without a database, account or paid provider. Course, lesson, exercise and rubric IDs must survive the M1 import. Unreviewed drafts and private files must stay out of the public content inventory. Invalid data and unsafe links must fail the production build with useful field paths.

## Decision

Use strict JSON documents validated by Zod, as planned in ADR-002's architecture. The canonical executable schema is [schema.ts](../../../apps/web/src/content/schema.ts); inferred TypeScript types avoid a second hand-maintained contract. [Authoring instructions](../PUBLIC-CONTENT.md) describe its layout and limits.

An explicit `content/public/catalogue.json` lists course ID/version pairs. A document lives at `<course-id>/v<version>.json`; only published, public level-0 courses may enter this inventory. Drafts belong outside this directory. Public stable IDs use lowercase words and hyphens; numeric content, exercise and rubric versions start at one. Module, lesson, block, exercise, rubric and criterion IDs are unique within a course version. The schema format has a separate `schemaVersion`.

Allow structured plain-text blocks, never arbitrary HTML or Markdown execution. External links require absolute HTTPS URLs without credentials, whitespace or backslashes. Internal lesson links contain typed course/version/lesson references, resolved against the entire public inventory at build time. Link resolution does not prescribe routes; JUV-106 owns those. No network request is made to verify external availability.

The [build checker](../../../scripts/content.mjs) rejects unknown fields, unexpected files, symlinks, invalid metadata and unresolved internal links. The same validator is used by the CLI and a Vite build plugin, including direct workspace builds. Published metadata requires a reviewer and UTC review/publication dates; this verifies structure, not the truth of a human review.

The public catalogue stays empty until JUV-103 supplies a reviewed course. Synthetic fixtures are kept exclusively under `tests/fixtures/content`, outside the public tree. This ticket does not publish or render a course.

## Alternatives and reasons

- Raw Markdown or HTML: convenient authoring, but introduces sanitization and renderer behavior before a demonstrated need; rejected for M0.
- JSON Schema plus separately maintained TypeScript interfaces: viable, but duplicates the contract; retain the already planned Zod dependency instead.
- Database-backed content now: adds accounts, infrastructure and editorial workflow ahead of M1; deferred.
- Fetching every external link during builds: network availability would make builds nondeterministic; external URLs are syntax/policy checked, and real usability is reviewed before release.

## Consequences and limits

Authoring is deliberately constrained: no literal angle brackets in prose, embedded media, inline executable content, root-relative URL strings or arbitrary metadata. French launch content and future English content are supported; application copy still belongs in JUV-107's catalogue. The CLI imports the TypeScript schema using the repository's Node 24 runtime.

Published versions and rubrics must be retained unchanged. A correction creates a new course version and, when changed, a new exercise/rubric version; stable entity IDs remain. Duplicate ID/version pairs are rejected, but a schema cannot prove repository history or enforce a human's source edits. Release review must compare published files against the prior release. Source history, review evidence and release procedure remain necessary; this ticket does not claim a database immutability guarantee.

No V1.3 requirement is removed. Public slugs become persistent external identifiers alongside M1 database UUIDs; the importer retains the external IDs, versions and UTC timestamps. Schema-format changes require a new `schemaVersion` and explicit conversion with fixtures. Do not reinterpret an existing published version in place. Rollback restores the previous catalogue and retained versioned documents from git, then runs validation and rebuilds; no deployment is performed by a build script.

## Validation and related work

JUV-102: valid/invalid fixtures, security and reference tests, filesystem isolation, and positive/negative real Vite builds. JUV-103: reviewed lessons and publication metadata. JUV-106/JUV-108: route generation and typed rendering that escapes plain text. JUV-110: version-aware optional reading progress. JUV-114: release and rollback checks. M1 importer: JUV-208.
