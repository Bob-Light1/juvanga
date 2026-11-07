# JUV-112 — Public offline snapshot, network and motion

Owner: Codex. Branch: `feat/JUV-112-public-offline-pwa`. Date: 2026-11-07.
Architecture: [ADR-013](../architecture/decisions/013-public-offline.md).

## Delivered behavior

The full build emits an installable web manifest using existing 192/512 px brand icons, a content-versioned service worker, a standalone no-script offline document and a size report. Only build-selected public HTML and static assets are precached. Published-course images are cached on request. Progress/workshop documents, API/account/unknown routes, query strings, non-GET, authenticated and cross-origin requests cannot enter the public cache. Responses marked private/no-store or varying on credentials are rejected. No public course is actually published by this ticket.

Offline known public routes retain their actual content. Unknown/unavailable documents receive an honest 503 fallback with catalogue/home recovery. Device connectivity is only a hint (`navigator.onLine` can report online while requests fail); actual network failure drives the fallback. The application does not promise an offline lesson merely because its reading position was saved.

Updates wait for an explicit reload or closure of old tabs. A visible warning protects ephemeral exercise text; accepted reload keeps local consent, exact reading position and unrelated storage. Activation removes only previous Juvanga public caches. Worker installation failure retains the active release; quota/refused Cache Storage cannot turn a successful online response into an offline error. Public-copy erasure is explained separately from targeted progress erasure in the French notice.

Reduced-motion CSS disables animation and transitions alongside the existing Motion preference. No autoplay, essential animation or forced scrolling is added. Production worker/manifest cache headers are generated; remote verification remains JUV-114.

## Reproducible validation

With the isolated Node 24.22.2/npm 11.21.2 runtime, `npm run verify` passed: 94 tests, documentation/content/course/contrast checks, lint, strict TypeScript and full client/prerender/PWA build. Seven worker tests exercise allowlisting, credential omission, cache isolation, exact-version offline content, 503 fallback, failed installation, private responses, explicit activation and storage failures. Logs: `/tmp/juvanga-112-final-verify.log`.

The default run passed 23 scenarios; the four PWA scenarios passed together after a worker-network simulation correction and an isolated timeout rerun. All 25 default scenarios have passed across these runs. See the [handoff](../sessions/2026-11-07-public-offline-pwa.md) for the synthetic-reader suite. The update test temporarily changes only the generated worker and restores it in `finally`; the reader runner uses synthetic published content and restores the normal French noindex artifact.

## Measurements and limits

The default artifact reports 142,087 gzip JavaScript bytes (138.76 KiB, below 250 KiB), 12,908 initial home image bytes (12.61 KiB, below 300 KiB) and 19 precached resources, with no published-course media. JavaScript budget sums all emitted application chunks, conservatively exceeding the initial-route requirement. No code-splitting dependency was needed. `apps/web/dist/build-report.json` is generated and ignored.

An initial Chromium 148/Linux headless run at 360×800, 1.6 Mbit/s down, 750 kbit/s up, 150 ms latency and 4× CPU slowdown measured LCP 2.068 s and CLS 0.021835. This is one simulated cold browser context on the shared development machine, not a field percentile or real-device claim. Font transfers were about 48/37 kB and script transfer about 142 kB including response overhead. Subsequent run results are recorded in the handoff; timing naturally varies. No Lighthouse score, physical mobile installation, Safari/Firefox, screen-reader testing, remote headers, real-user performance or deployment/rollback is claimed.
