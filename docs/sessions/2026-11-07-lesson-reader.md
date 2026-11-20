# JUV-108 handoff — Versioned lesson reader

Owner: Codex. Branch: `feat/JUV-108-lesson-reader`. Date: 2026-11-07. Status: done.

The branch builds on JUV-107 commit `3fcc6da`, with a separate JUV-108 commit. Both feature branches are retained locally; `main` remains the previously integrated JUV-101–106 baseline. The project owner handles pushes.

Reader content comes only from validated published French versions. It renders typed text/examples, version-pinned programme/previous/next links and static latest aliases, with helpful missing-lesson recovery. Schema 1 stays text-only; explicit schema 2 permits local raster illustrations loaded on demand, with alternative text/status/retry and no autoplay. No real content is published and the approved draft remains unchanged. Exercises/solutions stay outside the reading projection; JUV-109 owns practice. [ADR-010](../architecture/decisions/010-lesson-reader.md) and the [authoring contract](../architecture/PUBLIC-CONTENT.md) contain canonical details.

[Validation](../delivery/VALIDATION-JUV-108.md): full verify passed (75 tests), four synthetic-reader browser scenarios passed, and 17 normal browser regressions passed. Reader QA covers all blocks, three lessons/two modules, retained versions, no-JavaScript routes, keyboard, 360/1280 px, axe, stalled/failed images and retry. The test runner restored the normal French noindex build. Source/output review found no synthetic publication or draft teaching content in that artifact. Actual hosting, remote CI, physical-device/non-Chromium and screen-reader software tests were not run.

Next: JUV-109. Do not treat this reader delivery as course publication or M0 release. No progress storage, offline support, provider configuration or deployment is added.
