# ADR-011 — Public practice and personal self-assessment

- Date: 2026-11-07
- Status: adopted for JUV-109.

## Context and decision

A learner needs instructions and criteria before comparing a concrete attempt with the worked solution. Reading, checking boxes and seeing a solution must never imply a human review, grade or certified competence. M0 needs no account and must not retain deliverables.

Add `/learn/:course/v/:version/:lesson/exercise` with the same latest-version short aliases as reading routes. Derive route eligibility from published French readers and serve a separate explicit exercise projection from that same validated inventory. Preserve exercise/rubric IDs and versions unchanged. Keep reading projections free of exercise data and editorial metadata. Exercise pages are prerendered for direct links and no-JavaScript use, but noindex and excluded from the sitemap. Missing/unpublished versions use reader recovery/404s. The real approved draft remains unpublished.

Show the fictional prompt, instructions, optional response textarea and criteria before a native collapsed details element containing the solution. Paper attempts are equally supported; do not require a typed response or force a submission to reveal the solution. A learner may freely compare and change their personal declarations. Feedback describes unreviewed, partially checked or all-declared criteria; none is a pass/fail outcome or competency assessment. Mark essential criteria without assigning a score. Explain the distinction from human review/certification beside the exercise and in all-declared feedback.

The textarea has no form or submission action and is not named for serialization. No response, selection or comparison state enters storage, URLs, analytics or a server. State lasts only within the current exercise view. Retry clears the response/checkboxes, closes the solution and returns keyboard focus to the response. Route changes/reload reset the attempt. Native textarea, checkboxes and details remain usable without JavaScript; manual reset instructions explain that fallback. Reading progress remains a separate JUV-110 concern and must never retain attempts or claim exercise completion.

## Alternatives and consequences

A scored quiz would misrepresent the reviewed open-ended course task and would not establish mastery. Forcing an answer before comparison excludes paper work without improving trust. Inline practice would lengthen every lesson and make direct exercise links harder; use a dedicated route with a reading return action. A backend submission or persistent draft adds personal-data and account workflows outside M0.

Worked solutions are public instructional material and are included in public exercise HTML/client data. A collapsed details element is presentation, not access control or secrecy. Escaped typed blocks retain the existing safe link/image contracts; optional solution images still require an explicit request.

## Migration, rollback and validation

No schema, published course or persisted data changes. Add a separate exercise module, eligible static routes and a reader practice action; the reader projection contract remains intact. Remove the feature commit and rebuild to roll back. Versioned content stays immutable.

Unit tests cover projection/publication boundaries, exact-version routes/aliases and declaration-only feedback. Browser tests cover attempt/compare/retry, no submission or storage, reload reset, paper/no-JavaScript use, keyboard, responsive layout and axe. Technical semantic review checks that no result claims review or competence. [Validation](../../delivery/VALIDATION-JUV-109.md).
