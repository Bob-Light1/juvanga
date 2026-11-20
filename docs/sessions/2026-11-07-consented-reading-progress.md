# JUV-110 handoff — Consented local resume

Owner: Codex. Branch: `feat/JUV-110-consented-reading-progress`. Date: 2026-11-07. Status: done.

Built on JUV-109 commit `af14dc5`, with a separate JUV-110 commit. The branch contains both requested tickets; previous feature branches are retained. The project owner handles integration/pushes.

A noindex `/progress` page and reader controls offer explicit personal-device opt-in and targeted erasure. One strict versioned local record stores only the last course/version/lesson, approximate position and UTC update time. It never stores an exercise response, criteria or solution state. Resume keeps exact published versions; stale/corrupt/future-format records and denied/quota storage remain recoverable. Cross-tab events and per-write consent checks prevent normal pending saves after erasure. Failed removal stays explicit and stops tracking. [ADR-012](../architecture/decisions/012-local-progress.md) contains the canonical record, consent and migration contract.

[Validation and limits](../delivery/VALIDATION-JUV-110.md): verify passed (87 tests), 16 synthetic reader/practice/progress scenarios passed, all 18 final default browser regressions passed in one run. The initial no-JavaScript progress test exposed a hidden noscript explanation; plain initial HTML now provides the fallback, and verify plus the full default suite passed afterward. Technical and visual author review completed at 360/1280 px. The normal French noindex artifact is restored and real content remains unpublished. Actual hosting/CI, physical-device/non-Chromium/screen-reader checks and independent learner review were not run. Scroll restoration is approximate; no offline guarantee or account synchronization is added.

Next: JUV-111 help/privacy/feedback. Keep release publication separate and preserve reading-only persistence in future account/offline work. No real content/rubric, provider configuration or deployment changed.
