# Handoff — 2026-11-07 — indexable public pages

- Ticket: JUV-106; owner: Codex; branch: `feat/JUV-106-indexable-public-pages`; based on JUV-105; status: done after local author review.
- Home/catalogue/course overview, React Router, static prerender/metadata/sitemap/404 and local preview contract. Workshop moved to `/workshop`.
- [ADR-008](../architecture/decisions/008-public-pages.md), [validation and limits](../delivery/VALIDATION-JUV-106.md). `npm run verify`: 62 tests plus all checks/build passed. Full preview browser suite: 14 passed. Reserved-origin release build: four public browser scenarios passed, including raw HTML/canonicals/sitemap and absence of draft lesson bodies in the bundle. Mobile/desktop captures reviewed. Default noindex output restored afterward. Production dependency audit: 0 vulnerabilities.
- Course overview is a selected projection from approved content, explicitly coming soon. Lesson inventory, release timestamp and actual course publication remain unchanged.
- `SITE_URL` is optional build-time origin configuration, not a secret or deployment action. Unset produces a noindex preview; no real domain/hosting has been configured.
- Next: JUV-107 localization, then dependency-ready reader work. No merge, push or deployment.
