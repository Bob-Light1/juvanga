# ADR-013 — Build-selected public offline snapshot

Date: 2026-11-07. Status: adopted for M0. Owner: Codex (JUV-112).

## Context and decision

M0 consists of statically rendered public pages, published immutable course versions and optional reading progress. A service worker may retain only the public build, never future accounts or personal data.

The complete build generates a web manifest, a standalone no-script offline page, a worker with an exact URL allowlist and a content-derived release cache name. Core assets and generated public HTML (including published exercises and latest aliases) are installed atomically as a small M0 snapshot. Same-origin images referenced by published lessons/examples/solutions are optional and cached only after an explicit image request. Missing optional images retain reader fallback behavior. Workshop, progress documents, unknown/private routes, query strings, API requests, non-GET requests and cross-origin resources never enter the cache. Runtime public requests omit credentials; redirected, opaque, private/no-store or cookie/authorization-varying responses are rejected. Cache Storage is separate from consented reading storage and holds no user response.

Cache-first resources keep HTML and hashed assets from the same release. A failed installation leaves the active release intact. A new worker waits and offers an explicit reload, with an exercise-text warning; activation removes only old `juvanga-public-` caches and claims clients. The UI reloads only after acceptance and does not change localStorage. Existing tabs finish with already loaded code; their next navigation/reload uses the active release. A missing document with failed networking gets a standalone 503 offline explanation, never an invented lesson or home page. Local progress is a position, not a promise of offline availability.

## Alternatives

- No worker: simpler, but cannot satisfy the public offline requirement.
- Wildcard runtime or SPA caching: rejected because future private/account routes could leak or receive misleading successful home responses.
- Automatic skip-waiting/reload: rejected because it interrupts reading and discards ephemeral exercise text.
- Network-first HTML: rejected to avoid mixing a newer document with the active snapshot's assets.
- A new caching dependency: unnecessary for the small explicit build.

## Consequences and migration

Installation transfers the public M0 snapshot in addition to the first page. It remains small for the current empty publication inventory. Images stay on demand. The build enforces total JavaScript gzip ≤250 KiB (a conservative upper bound on initial JS) and initial home image bytes ≤300 KiB; its JSON report records actual sizes. Before the public catalogue grows, remeasure installation traffic and consider explicit per-course downloads with a cache budget and eviction UI. Browser eviction, denied storage and unsupported workers remain possible; there is no offline guarantee.

Reduced-motion CSS disables transitions/animations in addition to the existing Motion user preference. No essential motion or media autoplay is introduced. Before M1, review the allowlist and credential policy and ensure any personalized route is excluded; a server must never personalize a public cache path. A new worker release changes the cache identity when code, metadata, paths or asset bytes change. Hosting must serve `/sw.js` with no-cache and correct scope; remote headers and real-device installability remain release checks. Rolling back requires serving the earlier complete artifact, including its worker. Local storage schema migration remains governed by ADR-012, independently of cache replacement.

Validation: [JUV-112 evidence](../../delivery/VALIDATION-JUV-112.md); full verify (94 tests), all 25 default scenarios across full/focused runs and all 17 synthetic-reader scenarios passed. No deviation from the public M0 scope.
