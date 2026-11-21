---
paths:
  - "apps/web/**"
  - "packages/design/**"
  - "tests/browser/**"
  - "tests/reader-browser/**"
---

# Frontend work

Read the relevant ADR only: 007 components, 008 public pages, 009 localization, 010 reader, 011 practice, 012 local progress, 013 offline.

- French product copy goes in `apps/web/src/i18n/fr.ts`, never inline.
- Colors, spacing and type come from `packages/design/tokens.css`. Run `npm run check:contrast` after changing pairs.
- Exercise answers and self-assessments must never persist. Only the consented reading position may be stored.
- Keep authorization on the server. A hidden control is not access control.
- Check keyboard use, reduced motion, no-JavaScript output and small screens when behavior changes.
- Browser tests: `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`, then `PLAYWRIGHT_CHANNEL=chrome npm run test:reader`. Run them one after the other.
