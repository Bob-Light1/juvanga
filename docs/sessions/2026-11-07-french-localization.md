# JUV-107 handoff — French catalogue and formats

Owner: Codex. Branch: `feat/JUV-107-french-localization`. Date: 2026-11-07. Status: done.

Extended the French catalogue to all current UI copy, added shared fallback/Intl helpers and build-only expanded-copy QA. No English selector, content publication, dependency or persisted language setting. [ADR-009](../architecture/decisions/009-localization.md) defines the contract. [Validation and limits](../delivery/VALIDATION-JUV-107.md): full verify passed (66 tests), full Chrome browser suite 16 passed, expanded-copy scenarios 2 passed at 360/1280 px. Default French artifact restored; remote/provider checks remain unrun.

Next authorized task: JUV-108, using only the published inventory for reader content; the approved first course is still unpublished. Start a separate feature branch from this commit and record its owner/status before editing.
