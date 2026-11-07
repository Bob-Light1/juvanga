# ADR-010 — Versioned static lesson reader and requested images

- Date: 2026-11-07
- Status: adopted for JUV-108.

## Context and decision

The public reader must render reviewed published courses without accounts or a backend, preserve exact course versions and remain useful on slow connections. Upcoming descriptions must never expose the approved but unpublished teaching content.

Read the validated public inventory through a dedicated Vite module. Explicitly project French course ID/version/title, modules and reading lessons (ID, title, objectives, blocks and example). Do not export exercise instructions, rubrics, solutions or editorial metadata. This is a small text-first M0 artifact; no runtime API or storage is introduced. JUV-109 will add practice independently.

Canonical lesson URLs are `/learn/:course/v/:version/:lesson`; previous/next, outline and typed lesson links always retain the exact published version. `/learn/:course/:lesson` resolves the latest published French version and has its versioned canonical. Prerender both forms, but list only canonical versioned routes in the sitemap. The course overview offers a start action only when the matching published reader version exists. Unknown courses, versions or lessons get a useful missing-lesson view, a catalogue link, HTTP 404 and noindex; the static fallback identifies reader-shaped paths client-side, including with JavaScript disabled.

Use exhaustive typed JSX for all plain-text blocks, native ordered/unordered lists, semantic headings/notes, HTTPS anchors and React Router internal links. Do not interpret HTML or Markdown. Main focus moves after route changes; outline marks the current lesson. Reader state resets per course/version/lesson.

## Schema version 2 and media

Schema version 1 remains unchanged and text-only. Version 2 additionally permits an `image` block with stable ID, same-origin `/media/<lowercase-name>.(png|jpg|webp|avif)` source, nonblank alternative text, intrinsic integer width/height and optional plain-text caption. Reject traversal, remote URLs, SVG, data URLs and executable media. Existing released documents are neither rewritten nor reinterpreted. New media requires a newly authored version 2 document and the usual review/publication process. There is no migration command or automatic publication.

Images are absent from initial HTML requests and require a keyboard-accessible load action. The image description is readable before loading and remains available after failure. Loading status and retry controls work without blocking lesson navigation. Fixed dimensions reserve space after a request; responsive sizing keeps images within the reading column. No audio, video or iframe is supported or autostarted. The existing same-origin image CSP needs no widening. Real media assets and rights must be reviewed before release; missing images recover in the reader.

## Alternatives and consequences

Unversioned-only routes are shorter but can silently change a learner's references. Runtime fetching/lazy text chunks could reduce a large catalogue's initial payload but add loading failures and server dependencies for a small first course. The explicit reading projection can move to per-lesson chunks later without changing routes. Embedding exercises now would blur JUV-109's scope. Native lazy images still trigger requests while scrolling; explicit loading gives the learner control over bandwidth. Broad remote-image permissions create third-party requests and more CSP configuration, so use local raster illustrations.

## Migration, rollback and verification

Add the reader virtual module alongside the separate discovery projection; prerender its paths and aliases with the current static build. Schema 1 course fixtures and approved drafts continue to validate. Published and upcoming inventories remain unchanged. Revert the commit and rebuild for rollback; no database or local data migration is required.

A test-only Vite configuration builds the actual application with a separate synthetic published inventory, including multiple lessons and retained versions. It is selected explicitly by the reader test runner; production has no content override environment variable. The runner restores the default noindex artifact in a finally block. Unit checks cover schema versions, safe image paths, projection, exact-version links, aliases and missing routes. Browser checks cover an entire keyboard course, initial HTML without JavaScript, history, narrow layouts, accessibility, delayed media, unavailable images and retry. See [JUV-108 validation](../../delivery/VALIDATION-JUV-108.md).
