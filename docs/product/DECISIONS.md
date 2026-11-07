# Product decision register

Reference date: 2026-11-06. The roles below are responsibilities to assign, not people already appointed. Technical and design choices adopted for development preparation are in the ADRs.

| ID | Decision / hypothesis | Status | Owner | Deadline / blocker |
| --- | --- | --- | --- | --- |
| NAM-01 | Name Juvanga | Confirmed by the user | Project owner | Foundations |
| DEC-00 | Free anonymous M0 before the commercial pilot | Adopted for planning | Product | May be revisited before JUV-101 |
| DEC-01 | Mode A for pilot; Mode B disabled | Working implementation hypothesis | Management/product | Confirm before real commerce |
| DEC-02 | Orders valid for 7 days; prices and fees per offer | Pending validation | Management/finance | Before JUV-303 in production |
| DEC-03 | Rescheduling, cancellation, absence, refund and assignment deadline | To draft/validate; no deadline sold | Product/management/legal | Before sales |
| DEC-04 | Two finance operators, independent sources and review schedule | Required rule; operators missing | Finance | Before first real payment |
| DEC-05 | Issuer, taxes, numbering, credit notes and retention | Pending validation | Finance/local expert | Before real issuance |
| DEC-06 | B2B reporting; proposed threshold of 5; individual data | Pending validation | Product/legal | Before B2B activation |
| DEC-07 | C1 course, author/reviewer, critical criteria and publication | M0 plan and lessons approved; non-author walkthrough reported complete; C1 still unassigned | Project owner for M0; education for C1 | Free course before M0; C1 before M2 |
| DEC-08 | Budget, RPO/RTO, support SLA and incident owner | Pending validation | Management/technical | Before M1/M2 depending on data |
| DEC-09 | Mode B, cutoff and on-call coverage | Deferred | Finance/operations | P2 only |
| DEC-10 | Hosting, region, privacy, retention and transfers | Document according to collected data | Product/legal/technical | M0 for logs/feedback; M1 for accounts |
| DEC-11 | Public domain, name availability and asset rights | To verify | Project owner | Before final public identity |
| DEC-12 | External SMTP, sender domain and quota | Not configured | Operations | Before public M1 registration |
| DEC-13 | Repository maintainer and reviewers | To appoint | Project owner | Before remote teamwork |
| DEC-14 | English documentation, code, identifiers and code comments; French launch interface | Confirmed by the user on 2026-11-06 | Codex for JUV-007; contributors thereafter | Applies to all maintained documentation and new comments; preserve source archives with English companions |

## Recording a decision

Add date, decision maker, exact decision, alternatives, scope, effect and affected tickets. Do not replace an old value without retaining its superseding decision. No demonstration price is approved; the flyer's 100,000 XAF remains a historical example.

## DEC-07 update — 2026-11-07

The project owner explicitly volunteered to take responsibility for the M0 course and its pedagogical review. Codex prepares the drafts; the project owner reviews them. This supersedes the unassigned M0 responsibilities, without assigning C1 roles or recording a review that has not happened.

JUV-101 proposes the [free-course plan](FREE-COURSE.md), including the outcome, three lessons, fictional exercise, worked solution, alternative considered and publication gates. The project owner explicitly approved the plan on 2026-11-07, superseding the pending plan review. Complete lessons still require review in JUV-103. Delegating review to an unnamed person was not selected because the owner volunteered. JUV-103 still requires a walkthrough by someone who did not write the course. This update affects JUV-101/JUV-103; it changes neither architecture nor milestone scope.

JUV-103 provides the [complete-lesson review copy](../reviews/meeting-notes-action-plan-v1.md) and [editorial provenance](../../content/drafts/meeting-notes-action-plan/README.md). After authoring commit `fa9b20d`, the project owner explicitly confirmed reading the complete lessons, performing all three exercises and approving the course without corrections on 2026-11-07. This supersedes the pending lesson-review and non-author walkthrough state. Actual review metadata is now recorded; the content remains outside the public inventory with no publication timestamp. No new architecture or public deployment is authorized by this editorial acceptance.

## Prepare without waiting for these decisions

M0 journey, public content, accessibility, tokens, technical contracts, tests using fictional data and procedures. Open financial decisions do not prevent development and testing of mechanisms, but do prevent their actual commercial activation.
