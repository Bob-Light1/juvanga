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
| DEC-11 | Public domain, name availability and asset rights | Domain purchased; DNS/HTTPS, name and asset rights remain unverified; see dated update below | Project owner | Before final public identity |
| DEC-12 | External SMTP, sender domain and quota | Not configured | Operations | Before public M1 registration |
| DEC-13 | Repository maintainer and reviewers | To appoint | Project owner | Before remote teamwork |
| DEC-14 | English documentation, code, identifiers and code comments; French launch interface | Confirmed by the user on 2026-11-06 | Codex for JUV-007; contributors thereafter | Applies to all maintained documentation and new comments; preserve source archives with English companions |

## Recording a decision

Add date, decision maker, exact decision, alternatives, scope, effect and affected tickets. Do not replace an old value without retaining its superseding decision. No demonstration price is approved; the flyer's 100,000 XAF remains a historical example.

## DEC-07 update — 2026-11-07

The project owner explicitly volunteered to take responsibility for the M0 course and its pedagogical review. Codex prepares the drafts; the project owner reviews them. This supersedes the unassigned M0 responsibilities, without assigning C1 roles or recording a review that has not happened.

JUV-101 proposes the [free-course plan](FREE-COURSE.md), including the outcome, three lessons, fictional exercise, worked solution, alternative considered and publication gates. The project owner explicitly approved the plan on 2026-11-07, superseding the pending plan review. Complete lessons still require review in JUV-103. Delegating review to an unnamed person was not selected because the owner volunteered. JUV-103 still requires a walkthrough by someone who did not write the course. This update affects JUV-101/JUV-103; it changes neither architecture nor milestone scope.

JUV-103 provides the [complete-lesson review copy](../reviews/meeting-notes-action-plan-v1.md) and [editorial provenance](../../content/drafts/meeting-notes-action-plan/README.md). After authoring commit `fa9b20d`, the project owner explicitly confirmed reading the complete lessons, performing all three exercises and approving the course without corrections on 2026-11-07. This supersedes the pending lesson-review and non-author walkthrough state. Actual review metadata is now recorded; the content remains outside the public inventory with no publication timestamp. No new architecture or public deployment is authorized by this editorial acceptance.

JUV-106 adds selected public course descriptions under [ADR-008](../architecture/decisions/008-public-pages.md), derived from the approved source and marked as coming soon. This does not record lesson publication, change the review/publication timestamp or authorize a deployment.

## DEC-07 publication decision — 2026-11-26

The project owner explicitly decided to publish the owner-approved French course `meeting-notes-action-plan` version 1 in the public inventory so real testers can use it for JUV-113 acceptance. The published file is the JUV-103 approved text unchanged; only `status: published` and `publishedAt: 2026-11-26T07:50:59Z` (the time the decision was recorded) differ, and a test enforces that equality. Its discovery teaser is retired because the published version supersedes it. Alternatives offered: attach the custom domain first, start M1 locally, or only merge the JUV-111 closure; the owner chose publication. JUV-113 is reassigned from Codex to Claude at the owner's request on branch `feat/JUV-113-course-publication`.

Effect: once merged to `main`, the course is readable on the public nonindexable `pages.dev` technical site. This is publication for acceptance, not official launch: it does not authorize `SITE_URL`, indexing, `juvanga.com` attachment or JUV-114. Public reading grants no reuse license. Version 1 is now immutable; any lesson, exercise or rubric correction requires version 2 with its own review. Affects JUV-113 and JUV-114; no architecture change.

## DEC-11 update — 2026-11-12

The project owner selected and purchased the brand's exact `.com` domain through Cloudflare Registrar, following comparison with another registrar and an optional `.cm` companion. The owner requested that this registration be retained for future sessions. Canonical registration facts and screenshot evidence limits are in [the release record](../operations/M0-RELEASE.md#domain-registration-evidence--2026-11-12).

This supersedes the pending domain-acquisition state, without establishing trademark/name clearance, asset rights, DNS/HTTPS configuration, verified registrant email or a public deployment. The existing Cloudflare hosting architecture is unchanged; no new ADR is needed. JUV-114 remains blocked by acceptance and operational gates. Domain registration alone does not authorize release or set `SITE_URL`.

## Prepare without waiting for these decisions

M0 journey, public content, accessibility, tokens, technical contracts, tests using fictional data and procedures. Open financial decisions do not prevent development and testing of mechanisms, but do prevent their actual commercial activation.

## DEC-10 implementation note — 2026-11-07

JUV-111 exposes the actual local-data notice and minimal feedback guidance through the existing static pages. No support address, delivery test, operator or feedback-retention policy has been supplied. Hosting location and log retention are unverified. These remain release blockers; the notice states the configuration gap without inventing provider settings. Local erasure removes only the consented reading record, not potential hosting logs. See [JUV-111 evidence](../delivery/VALIDATION-JUV-111.md).

The project owner selected a support URL on 2026-11-07, without supplying its address or an authorized reception-test method. Five testers may be recruited but have no observations yet; Cloudflare access is not configured. JUV-113 and JUV-114 must not be recorded as completed from automated checks alone.

On 2026-11-09 the owner requested setup guidance, then selected an external contact form and retention of 90 days after closure. Provider, exact responder URL, receiving operator, actual deletion routine and reception evidence remain pending. This supersedes the earlier unspecified URL indication. The [owner action guide](../operations/OWNER-ACTIONS.md) records the setup steps; the mailbox proposal was not selected. No automatic deletion or provider-log retention is inferred.

On 2026-11-10 the owner adopted email support for the initial release, superseding the external form choice. The 90-day retention rule after closure remains selected. The actual mailbox/alias, receiving operator, deletion routine, reception/reply test and provider/hosting details remain unverified; follow the owner action guide. No contact address or successful delivery is invented.

The owner subsequently supplied a public Gmail support address on 2026-11-10. The public address is integrated through the existing static support page and i18n catalogue. Support may be handled directly in that mailbox; no second address or forwarding is required. The personal test address stays out of versioned/public artifacts. The owner confirmed receipt of both the inbound test and the support reply, and committed to tracking closure dates and manually deleting controlled correspondence/copies at 90 days. This is owner-reported evidence; automatic deletion and provider-managed retention are not inferred. Operator wording and actual hosting details remain pending in the owner action guide.

## DEC-10 operator update — 2026-11-20

The project owner confirmed personally managing the Cloudflare account and Juvanga support, and explicitly selected **Bob Guiogna** as the public name to display. This assigns the M0 site/hosting and support operator and authorizes that public wording in the French privacy notice. It supersedes the unassigned operator state, without establishing a company, assigning finance/maintainer/C1 roles or changing the previously selected support retention rule.

JUV-111 is resumed/reassigned to Codex on `feat/JUV-111-public-operator` for this bounded update. Actual hosting service configuration, processing locations and request-log availability/retention still require verification; JUV-111 cannot be completed from the operator confirmation alone. No deployment or change to the release gates is authorized. No structural change or new ADR is needed.

## DEC-10 technical bootstrap update — 2026-11-20

The owner subsequently explicitly approved a first technical deployment before hosting verification and five-person acceptance. The approved scope is a publicly reachable, nonindexable Cloudflare Pages `pages.dev` deployment, with `SITE_URL` unset and without attaching `juvanga.com`. Nonindexable is not private. This supersedes the earlier blanket ordering that prevented creation of the project needed for actual hosting checks; it does not authorize official launch or complete JUV-111/113/114.

Codex continues the bounded JUV-111 hosting preparation on `feat/JUV-111-public-operator`, which includes the confirmed public operator wording. Use this branch for the initial technical project so the latest notice can be tested without merging incomplete hosting work. Cloudflare calls that project's serving branch the production branch; that provider label does not establish the project's official release acceptance. Before official launch, merge reviewed work into `main`, update the project's serving branch and complete the existing acceptance, verified-origin, remote smoke and rollback gates. Do not delete the serving branch while it is configured in Pages.

The [release record](../operations/M0-RELEASE.md#technical-bootstrap-authorized--2026-11-20) is authoritative for the bootstrap instructions and evidence. No framework, runtime architecture, paid service, database or account feature is introduced, so no structural ADR is required. Actual account/provider settings remain unverified until observed.

## DEC-10 technical deployment update — 2026-11-21

The owner created the Pages project with `main` as its production branch after the Cloudflare form did not accept `feat/JUV-111-public-operator`. Both branches had identical trees at deployment. This supersedes the instruction to serve the feature branch for the technical bootstrap. Automatic deployments are enabled, so every merge to `main` republishes the public nonindexable technical site. This does not authorize official launch, `SITE_URL` or attachment of `juvanga.com`. JUV-111 continues under Claude on `feat/JUV-111-hosting-evidence` at the owner's request. [Evidence](../operations/M0-RELEASE.md#technical-deployment-evidence--2026-11-21).

## DEC-10 hosting notice validation — 2026-11-21

The owner validated the French hosting notice naming Cloudflare Pages, possible processing outside Cameroon, the absence of a precise published log-retention period found, and the commitment that Juvanga neither exports these logs nor uses them to identify visitors. The owner reported Web Analytics and Logpush inactive; these settings were not independently inspected. This supersedes the notice's unverified-provider wording. It is not legal review and does not authorize official launch. JUV-111 stays blocked until the notice is deployed and verified remotely.
