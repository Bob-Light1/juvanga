# Handoff — 2026-11-07 — accessible course components

- Ticket: JUV-104; owner: Codex; branch: `feat/JUV-104-accessible-components`; status: done after local technical and visual review.
- Delivered: native buttons/links, associated text fields, course cards, notices, navigation and resource states; token-based styling, an interactive workshop section and a small French catalogue to extend in JUV-107.
- Decision: [ADR-007](../architecture/decisions/007-accessible-components.md); [component contracts and state inventory](../design/COMPONENTS.md). No new package, route or published content.
- Verification: `npm run verify` under isolated Node 24.22.2/npm 11.21.2 passed (49 tests, content/docs/views, 17 contrast pairs, lint, typecheck, build). `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`: 7 passed. Covers full keyboard recovery, axe, 44 px controls, 360 px and actual 200% browser zoom. [Evidence and limits](../delivery/VALIDATION-JUV-104.md).
- Browser setup corrections: use Escape rather than reopening the native select, and use Chromium's partition-keyed zoom preference. Follow-up zoom-only runs refine viewport captures; Playwright replaces ignored artifacts on each run.
- Not run: screen-reader software, physical-device/other-engine checks, remote CI or deployment. Offline/access-denied states remain labelled simulations. Approved editorial documents and public catalogue are unchanged.
- Visual review: 360 px capture and native 200% Chrome viewport captures passed; the final zoom-only rerun passed. Application code is unchanged from the seven-test passing run.
- Closure: `npm run backlog:generate`, `npm run check:docs` and `git diff --check` passed after the final metadata update; next-ready output confirms JUV-105 and JUV-107. No merge, push or deployment.
- Next: `npm run task -- JUV-105` (fonts/assets); JUV-107 also becomes ready. Continue in dependency order; course pages/publication remain separate tickets.
