# JUV-106 — indexable public pages verification

Date: 2026-11-07. Owner: Codex. Branch: `feat/JUV-106-indexable-public-pages`. Status: `done` after local author technical and visual review.

## Delivered and review scope

Home, catalogue and an actual approved-course overview; React Router navigation and history; shared accessible actions/cards; French catalogue copy and existing design tokens/fonts. The former brand/component workshop remains at `/workshop`. Build-time rendering produces meaningful initial HTML, static direct routes, metadata and a top-level 404. Local preview returns real 404 responses. [ADR-008](../architecture/decisions/008-public-pages.md) records alternatives, consequences and migration.

The selected course description comes from an explicit reviewed-source inventory and a limited projection. Objectives, prerequisites and module/lesson titles are public presentation; lesson bodies, exercises, rubrics and solutions remain excluded. UI says free and coming soon, with no paid price, account or dead start action. The published-lesson inventory and editorial JSON stay unchanged.

Indexing is enabled by an explicitly configured HTTPS `SITE_URL` at build time, generating aligned metadata/canonicals/Open Graph/sitemap/robots/headers. Without a domain, preview output remains noindex with an empty sitemap. No actual domain is configured, and no deployment is implied.

## Executed checks

- `npm run verify` under isolated Node 24.22.2/npm 11.21.2: passed all 62 tests, 87-ticket/docs/link/generated-view checks, course review/content checks, 17 contrast pairs, ESLint, strict TypeScript and the complete client/prerender build.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`: **14 passed** against the default noindex preview. Includes all previous component/asset tests, actual 200% browser zoom, delayed-font CLS below 0.01, no external font requests, and four new public-page scenarios.
- Public scenarios cover same-document React Router navigation, main focus, current navigation, browser back/forward, metadata changes, refresh and direct URLs. Home/catalogue/course were checked at 360/1280 px with no overflow, 44 px targets and no axe WCAG 2/2.1/2.2 A/AA violations. No browser console or hydration errors occurred.
- A JavaScript-disabled context follows real links and refreshes the course page. Missing routes return HTTP 404 with useful HTML, noindex and no canonical; client-side unknown navigation shows the same recovery view.
- `SITE_URL=https://juvanga.example npm run build`, then the four public browser tests: **4 passed**. This reserved origin exists only in the local test artifact. Raw HTML contains course title/summary and index/follow/canonicals; sitemap contains exactly the three public routes, excluding workshop/404. Generated headers remove the global noindex only for the configured artifact. Default preview output is restored afterward; no actual domain is configured.
- Enhanced release-output checks inspect the JavaScript bundle for a known draft lesson marker and body text (absent), reject a draft-document URL with 404, and confirm no invented XAF price. Source inspection confirms published inventory and approved editorial JSON are unchanged, and only whitelisted overview fields enter the virtual browser module.
- `npm audit --omit=dev --fetch-timeout=20000 --fetch-retries=0`: **0 vulnerabilities** in the production dependency tree after adding React Router.
- Visual review of home, catalogue and course captures at mobile/desktop widths found readable type, wrapped headings, intact controls and a clear coming-soon notice. Screenshots/traces remain local, ignored `test-results/` artifacts; later runs replace them.

Technical author review checked the discovery boundary, course-version selection, static-versus-client route agreement, metadata escaping, build cleanup, native navigation without JavaScript, same-origin assets and the release/preview policy. The initial synthetic discovery fixture was English; it was explicitly switched to French for the new launch-inventory tests before the complete passing run. Application content was not changed to satisfy a fixture.

## Limits

Not run: public hosting/deep-link/header verification on Cloudflare, actual search-engine indexing, remote CI, screen-reader software, physical-device or non-Chromium testing. Reader, progress, offline availability and complete localization remain subsequent tickets. Author technical/visual review covers non-sensitive static frontend work; no auth or finance change is included.
