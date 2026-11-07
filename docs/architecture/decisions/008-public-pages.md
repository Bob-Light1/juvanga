# ADR-008 — static public pages, discovery and navigation

- Date: 2026-11-07.
- Status: adopted for JUV-106.
- Owner: Codex.

## Context and constraint

Home, catalogue and course descriptions need meaningful initial HTML, stable direct links and real missing-page responses. Preserve React/Vite, shared components, local fonts and the JUV-102 publication boundary. The approved first course is not released and its reader is still JUV-108; describing it must not expose lesson bodies, exercises or solutions.

## Decision

Use pinned React Router 8.5.1 in declarative mode: BrowserRouter for client navigation and StaticRouter for build-time rendering of the same React tree. The workspace build runs TypeScript, the Vite client build, a temporary Vite server bundle, then React rendering into static HTML. The server bundle is removed from ignored tooling storage, never deployed. No runtime server or extra framework is added. `npm run build` is the supported artifact command; bare `vite build` alone is not a complete release artifact.

Generate `/`, `/courses`, `/courses/:id`, `/workshop` and a top-level `404.html`. Extensionless public routes use matching `.html` files for Cloudflare Pages; no wildcard rewrite to home is emitted. Local Vite preview mirrors static HTML lookup and returns the rendered 404 with HTTP 404. Unknown client routes use the same missing-page UI and noindex metadata. Route transitions update title/description/canonical/Open Graph/robots, focus main and reset scroll. Initial loads preserve native focus. Existing workshop moves to `/workshop`, remains non-indexable and retains its component demonstrations.

Add an explicit [discovery inventory](../../../content/discovery/catalogue.json), separate from published lessons. It references selected French `review` documents that have actual review metadata and no publication timestamp. Build-time projection exposes only ID/version, title, summary, objectives, prerequisites and module/lesson titles. Schema validation and an explicit allowlist prevent draft globs or full-document bundling. The UI labels upcoming descriptions clearly, offers no lesson/start action yet and shows free level-0 access without inventing prices. Published inventory entries later supersede teasers; latest published versions determine the stable overview URL. Published versions/rubrics remain unchanged. Metadata validation does not itself certify a human review; the current course's evidence remains JUV-103.

`SITE_URL` is an optional, non-secret, build-time HTTPS origin. When configured, public pages have index/follow, absolute canonicals and matching sitemap URLs; workshop and 404 remain noindex. Without a domain, the complete preview has noindex, robots disallow and an empty sitemap, with no fictional canonical. Generated headers follow the same policy and preserve the security headers. Domain ownership, final deployment and actual search indexing remain JUV-114; configuring a URL does not deploy anything.

## Alternatives and reasons

- Client-only SPA: keeps empty initial HTML and soft 404s; rejected.
- A new rendering framework or plugin: unnecessary migration for three public route shapes; rejected under the project constraint.
- Publish the approved course now: would expose lessons before reader/release checks; deferred. Keeping every overview empty would prevent reviewing the actual approved course presentation. Explicit metadata projection supports the requested pages while preserving the existing publication gate.
- Guess a production domain: risks incorrect canonicals and sitemap URLs; require explicit configuration instead.

## Consequences, migration and rollback

React Router is the only new application dependency. Vite builds twice; the first release is small enough for this bounded static generation. Public copy extends the existing French catalogue; JUV-107 still owns complete localization/fallback/formatting. No API, account, payment, progress storage, provider or publication timestamp is added. This refines ADR-006 with a separate public presentation inventory; its strict published-lesson inventory is unchanged. No commercial V1.3 requirement is removed.

JUV-108 can add reader routes using the published inventory and replace the truthful availability notice after reader validation. Retain stable course IDs, add lesson routes and sitemap entries deliberately, and keep older published versions immutable. JUV-114 configures the real origin and verifies hosting headers, URL normalization, 404s and rollback. To revert JUV-106, restore the previous commit and rebuild; no database migration or published-content edit is required.

## Validation

Projection/review-boundary tests, empty/multiple-version inventories, route/metadata tests, release/preview output policy tests, built-HTML inspection, and browser tests for client navigation, history, refresh, no-JavaScript deep links, 404s, accessibility and 360 px layout. Actual outcomes and limits: [JUV-106 validation](../../delivery/VALIDATION-JUV-106.md).
