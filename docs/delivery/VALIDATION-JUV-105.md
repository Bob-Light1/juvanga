# JUV-105 — local fonts and final assets verification

Date: 2026-11-07. Owner: Codex. Branch: `feat/JUV-105-local-fonts-assets`. Status: `done` after local technical and visual review.

## Delivered

Two local Latin WOFF2 variable fonts: Inter 400–700 and Fraunces 600–700, including French accents and ligatures. Both use `font-display: swap` and anonymous same-origin preloads. Original SIL OFL 1.1 licenses, source URLs and SHA-256 hashes are retained in [font assets](../../apps/web/public/fonts/manifest.json). Total WOFF2 payload: 84,876 bytes. No new project package or runtime provider is required.

Shared typography tokens select metric-adjusted Arial/Georgia fallbacks before platform defaults. The overrides match font x-height and ascent/descent; they reduce reflow but cannot guarantee identical glyph widths on every operating system. Existing SVG/PNG/ICO artwork and its provenance are preserved. Heading weights are explicit; image width/height reserve their aspect ratios.

## Verification

`npm run verify` under isolated Node 24.22.2/npm 11.21.2 passed: 49 tests, docs/content/review checks, 17 contrast pairs, lint, typecheck and build. `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`: **10 passed**, including the existing keyboard, axe, responsive and actual 200% zoom scenarios. The new browser scenarios record all network requests and layout shifts during an intentionally delayed font swap at 360/1280 px, capture fallback/loaded pages and review symbols at 24/32 px, ICO at 16/32 px and light/dark lockups at 140 px. No external requests occurred; delayed-swap CLS was below 0.01 at both widths. Visual comparison found readable fallback and loaded text without clipped controls. The symbol remains recognizable at 24/32 px, ICO at 16/32 px, and both lockups at 140 px. Original artwork needed no correction. Artifacts are local and ignored under `test-results/`; later runs replace them.

Technical author review checked preload/source agreement, font weight ranges, fallback measurements, license retention and same-origin URLs. This is non-sensitive asset work; no independent auth/finance review applies. No structural architecture change required a new ADR.

Initial font screenshot setup waited for the deliberately blocked fonts; the harness now permits fallback capture before release. This was a test setup issue, not an application loading failure.

Not run: physical devices, non-Chromium engines, remote CI or deployment. No hosting/domain/provider configuration is claimed.
