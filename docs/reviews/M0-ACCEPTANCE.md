# M0 acceptance report and observation protocol

Date: 2026-11-07. Preparation owner: Codex. Branch: `feat/JUV-113-acceptance-preparation`.
Status: **blocked; real-tester acceptance not executed**. No participants have been observed and no completion rate is available. The project owner confirmed that testers could be recruited but no observations exist. An automated scenario is not a human participant.

## Entry gates

JUV-111 must be done, including an actual support URL, authorized reception test and accurate retention notice. JUV-112 is done; its [technical results and limits](../delivery/VALIDATION-JUV-112.md) are supporting evidence only. Do not activate JUV-113 before all backlog dependencies are done.

The approved French course is still editorial and the real published inventory is empty. Select a complete reviewed course version for the acceptance artifact through the [publication contract](../architecture/PUBLIC-CONTENT.md). Record the actual publication decision and metadata; do not replace it with the synthetic reader fixture or invent a publication date. Record the exact commit/artifact and preview URL before observing the journey. No release or change to published content has been performed by this preparation.

Appoint a facilitator/reviewer, obtain five consenting real participants, and provide a working browser/device for each planned session. Recruitment, invitations and account creation have not been performed. Keep participant names/contact details and any consent evidence under the facilitator's controlled records, not in the repository. Explain the purpose, voluntary participation, ability to stop, use of redacted observations and the chosen retention/deletion date before starting. Recording audio/video/screenshots requires separate explicit agreement; it is not necessary for this protocol. Choose and record actual retention terms rather than claiming an unapproved policy.

## Session tasks (planned, not observed)

Use fictional course examples and no personal work documents. Do not coach participants through the interface; note assistance when it is needed. Reading completion and personal criterion declarations do not establish competence or certification.

1. From home, find the free course, explain its outcome and open its first lesson without an account.
2. Read all three lessons; follow previous/next navigation and a direct versioned link. Recover from a missing link.
3. Attempt an exercise on paper or in the optional field. Explain a criterion, open the solution, revise and retry. Confirm that a reload discards the response.
4. Refuse reading storage, then enable it on the participant's personal test profile. Leave/reload, resume the same version, then erase and verify the result. Use a disposable test profile on shared devices.
5. Interrupt the connection after preparation, reload an available public lesson and try an unavailable address. Explain the limits of offline copies and saved progress. Restore connectivity.
6. Find help, privacy and the real feedback channel. Describe a problem using only minimal nonsensitive information. A support delivery test needs separate authorization; do not send a real participant's data as a test.
7. Where a new release is available, finish the exercise before accepting the reload and confirm that consented reading progress survives. Do not manufacture a public deployment for this exercise.

## Coverage matrix (planned)

| Area | Evidence to collect |
| --- | --- |
| Physical mobile | Actual model, OS/browser version, viewport, portrait; at least one real mobile session |
| Desktop and keyboard | Actual browser/OS; keyboard-only journey, focus visibility/order and recovery |
| Accessibility | 200% zoom, 360 px reflow, labels/contrast, screen-reader/browser pairing; record omissions explicitly |
| Network | Actual or simulated bandwidth/latency and CPU settings; state which; cold/warm and offline recovery |
| Education | Three lessons and exercise attempted; assistance, confusion and outcome; no invented mastery score |
| Support/privacy | Usable support URL and independently observed delivery, storage choice and confirmed erasure |

Distribute coverage across the five sessions and any facilitator checks. Five participants do not imply five devices or representative accessibility coverage. [Quality targets](../delivery/QUALITY.md) remain targets until actually measured. Automated accessibility checks do not substitute for keyboard, assistive-technology or learner observations.

## Observation record

[Blank CSV](M0-OBSERVATIONS.csv) contains headers only. Add rows only after a real session. Use anonymous session references, UTC observation timestamps and coarse technical information; store no names, emails, personal documents, payment data or identifiable quotations. Record `not_run` for omitted scenarios and separate observed facts from interpretation. Every blocking/serious issue needs a reproducible ticket, owner, fix commit and focused retest; do not average it away in a completion metric.

| Report field | Current result |
| --- | --- |
| Acceptance artifact / course version / URL | Not selected |
| Facilitator / independent reviewer | Not appointed |
| Five participant sessions / consent | Not performed or recorded |
| Real-device / screen-reader observations | Not performed |
| Course start-to-finish completion | Not observed with real testers |
| New human-reported defects and fixes | No sessions to assess; no inferred absence of defects |
| Automated supporting checks | See JUV-112 evidence; synthetic course is test-only |
| Acceptance decision | Blocked; no sign-off |

## Exit and handoff

Fill observed devices/scenarios/results and limitations, link fixes/retests, and obtain the named review. Require five actual consenting participant observations, an end-to-end course journey and no unresolved serious/critical accessibility defect. Mark JUV-113 done only after those criteria and all entry gates are met. JUV-114 may then select the accepted commit; no public release or rollback has been run here.
