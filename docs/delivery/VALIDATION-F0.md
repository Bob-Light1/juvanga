# F0 foundation validation

Date: 2026-11-06. Local execution in an isolated preparation directory before project integration. Node 24.22.2 and npm 11.21.2 installed under /tmp; system installation unchanged. This historical report covers the original 86-ticket foundation; JUV-007 has a [separate validation record](../sessions/2026-11-06-english-documentation.md).

## Checks performed

| Check | Result |
| --- | --- |
| `npm run check:docs` | 86 tickets, acyclic graph, consistent references and views |
| Coverage | 39 numbered PDF requirements + 8 user needs linked to tasks |
| `npm run check:contrast` | 14 pairs meet their thresholds; night/sand 14.48:1; night/gold 8.96:1 |
| `npm test` | 9 passing backlog validation and contrast tests |
| `npm run lint` | No errors |
| `npm run typecheck` | No errors |
| `npm run build` | Passed; initial JS 116.65 kB gzip and CSS 1.51 kB gzip |
| `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e` | 3 passing tests: 1280 px, 360 px, keyboard and reduced motion |
| Axe on workshop | No violations in executed WCAG 2 A/AA and 2.1 AA rules |
| Logos | Four source PNGs inspected; selected SVGs loaded in browser and XML verified |
| Production dependency audit | `npm audit --omit=dev --json`: no known vulnerabilities reported |

Reduced-motion preference is verified by accepting CSS normalization as `0s`/`0ms`. Browser tests run sequentially to limit machine load. An initial attempt revealed a duplicate xmlns attribute in lockups: fixed, then loading verified. The nine node:test tests run without process isolation to provide detailed results in this environment; they do not depend on shared global state.

## Explicit limitations

Results cover the foundation and brand workshop, not an implemented learning, financial or multi-user application. No backend, business migration, real course, SMTP, cloud account, deployment, load test or production restoration. Remote CI not run because no remote repository is configured. Axe does not replace a full WCAG 2.2 AA review with a screen reader. The cited audit excludes development dependencies and does not prove absence of unknown vulnerabilities.

The build uses system fallback fonts; local Fraunces/Inter with licenses remain JUV-105. Production M0 requires JUV-101 to 114, including content, prerendering, PWA and acceptance testing.

## Reproduction

With Node 24/npm 11: `npm ci`, `npm run verify`, `npx playwright install chromium`, then `npm run test:e2e`. Local Chrome may be selected with PLAYWRIGHT_CHANNEL. Playwright output goes to test-results (git-ignored). Build scripts publish nothing.
