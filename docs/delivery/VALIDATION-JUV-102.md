# JUV-102 — public content schema verification

Date: 2026-11-07. Owner: Codex. Branch: `feat/JUV-102-public-content-schema`.

Implementation: [schema](../../apps/web/src/content/schema.ts), [checker/build plugin](../../scripts/content.mjs), [authoring contract](../architecture/PUBLIC-CONTENT.md), [ADR-006](../architecture/decisions/006-public-content.md).

## Criteria and evidence

| Criterion | Evidence |
| --- | --- |
| Invalid content fails a build with a precise path | Real Vite integration tests accept the valid fixture and reject a `javascript:` URL at `$.modules[0].lessons[0].blocks[4].url`. The production Vite config uses that same plugin. |
| Stable IDs and explicit versions | Strict course/lesson/exercise/rubric structures; positive integer versions; per-course ID uniqueness; catalogue identity checks; fixtures retain IDs across two versions. |
| Arbitrary HTML and unsafe URLs rejected | Plain-text checks, discriminated block allowlist, strict object keys, HTTPS URL policy and invalid fixtures for HTML, JavaScript/data/protocol-relative/HTTP URLs, credentials, whitespace and backslashes. |
| Public-only boundary | Non-published/private content, unknown fields, unlisted files, symlinks, missing files, malformed JSON and unresolved version/lesson references are rejected. |

Implementation review by Codex checked the shared schema/build wiring, all block locations for reference validation, path derivation from constrained IDs and synthetic fixture isolation. This is not an independent security audit or human course-content review.

## Commands and results

- Full `npm run verify` through isolated Node 24.22.2/npm 11.21.2: **49 tests passed**, including 40 content tests and positive/negative real Vite builds; 87 tickets, links/generated views, 14 contrast pairs, lint, typecheck and production build passed.
- `npm run check:content`: passed with zero published courses; the actual course is not yet authored or reviewed.
- `npm run typecheck` and `npm run build -w @juvanga/web`: passed under isolated Node 24.22.2/npm 11.21.2.
- Zod 4.6.7 installed with npm 11; installation audit reported zero vulnerabilities. Dependency manifests/lockfile changed only for the planned validation dependency.
- Direct workspace negative build probe: `npm run build -w @juvanga/web` correctly failed on an unlisted synthetic file with its exact absolute path. The temporary file was removed immediately afterward. `git diff --check` passed.

Published-file history and the truth of review metadata require release review; the schema does not establish those facts. External URLs are checked for syntax/policy without network availability checks. No public course, rendering or deployment is claimed.

Not run: independent security review, human review of complete lessons, browser E2E, remote CI, public deployment or M1 database migration. Host Node 20 remains unchanged; the project checks use Node 24 tools in `/tmp`.
