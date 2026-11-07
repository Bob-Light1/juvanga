# JUV-109 handoff — Practice and personal declarations

Owner: Codex. Branch: `feat/JUV-109-practice-self-assessment`. Date: 2026-11-07. Status: done.

Built on JUV-108 (`4fbee08`). Version-pinned exercise routes and latest aliases show instructions/criteria before the public solution, optional ephemeral attempts, personal declarations and retry/focus reset. No account, submission, score, certification or persistent attempt data. Reader/description projections stay separate; no real content is published. [ADR-011](../architecture/decisions/011-practice.md) defines the contract.

[Validation](../delivery/VALIDATION-JUV-109.md): verify passed (80 tests), seven reader/practice browser scenarios passed, and all 17 default regression scenarios verified across the normal run (16 passed/one zoom timeout) plus an unchanged isolated zoom rerun (passed). Source, semantic and mobile visual author review completed. No-JavaScript, keyboard, axe, version boundaries, reload reset and absence of sending/storage verified. Normal French noindex artifact restored; actual hosting, remote CI, physical-device/non-Chromium/screen-reader checks and independent learner review were not run.

Next explicitly authorized task: JUV-110, on a new branch from this commit. Persist only consented reading location, exact course version/lesson and approximate position; never serialize attempts or self-assessment. `main` remains the JUV-101–106 baseline; the project owner handles integration/pushes.
