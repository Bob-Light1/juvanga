---
paths:
  - "content/**"
  - "apps/web/src/content/**"
  - "tests/fixtures/content/**"
---

# Course content work

Read as needed: `docs/architecture/PUBLIC-CONTENT.md`, ADR-006, `docs/product/FREE-COURSE.md`.

- Published course versions and rubrics are immutable. Publish a new version instead.
- Editorial approval is not publication. Never add a course to the public inventory or set a publication timestamp without an explicit owner decision.
- Synthetic published content is test-only and must never remain in the default build.
- Never present self-assessment as certified competence.
- Validate with `npm run check:content` and `npm run check:course`.
