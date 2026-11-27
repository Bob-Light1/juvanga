# Handoff — 2026-11-27 — Claude

- **Ticket(s), branch and commit:** JUV-116 on `docs/JUV-116-launch-offer`. The branch starts from `docs/JUV-113-acceptance-artifact` (`84997e5`), which is not yet merged.
- **Session objective:** review the course content before tester sessions, then rethink the whole offer at the owner's request.
- **Completed / evidence:**
  - Reviewed the published `meeting-notes-action-plan` v1. The final exercise reuses answers already given in the worked examples. The scenario deadlines (17–19 November 2026) are already past.
  - Analyzed the owner's six-level proposal and its prices. Recorded the owner-approved launch range in [OFFERS.md](../product/OFFERS.md) and [DEC-15](../product/DECISIONS.md#dec-15-launch-offer--2026-11-27).
  - Updated BRIEF. Marked FREE-COURSE as superseded.
  - Added JUV-116 (done) and JUV-117 (todo). JUV-113 now depends on JUV-117.
- **Commands actually run and results:** `npm run backlog:generate` (90 tickets). `npm run verify` on Node 24.22.3 passed: 90 valid tickets, 95 tests with 0 failures, lint, typecheck and build. Browser suites were not run because no code changed.
- **Not verified:**
  - Market prices and demand: these are hypotheses.
  - AI subscription prices: an unresearched estimate of about 20 USD per month.
  - The applicable tax regime.
  - Capacity figures: planning estimates.
- **New decisions:** DEC-15. It also updates DEC-02, DEC-04 and DEC-05.
- **Blockers / owner / next action:** the owner should settle the open points in OFFERS.md and name the second finance operator before any sale.
- **Files in progress and conflict risks:** STATUS and backlog. Merge `docs/JUV-113-acceptance-artifact` first.
- **Next task and first command:** JUV-117 — `npm run task -- JUV-117`.
