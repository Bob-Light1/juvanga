# M0 release and rollback record

Updated: 2026-11-21. JUV-114 preparation owner: Codex, branch `feat/JUV-114-domain-record`. JUV-111 hosting evidence owner: Claude, branch `feat/JUV-111-hosting-evidence`.
Status: **official release blocked; nonindexable technical deployment verified; rollback not run**.

## Current record

| Field | Verified state |
| --- | --- |
| JUV-113 acceptance | Incomplete; [entry gates and observation report](../reviews/M0-ACCEPTANCE.md) |
| Owner-controlled Cloudflare access/project | Pages project `juvanga` shown in owner screenshot; see [technical deployment evidence](#technical-deployment-evidence--2026-11-21). No agent account access |
| Public HTTPS origin / domain | Technical origin `https://juvanga.pages.dev` verified. `juvanga.com` remains unattached; official origin not configured |
| Accepted release commit / artifact hash | Not selected; latest implementation evidence is [JUV-112](../delivery/VALIDATION-JUV-112.md) |
| Real published course version | None; approved course remains editorial |
| Real support URL and reception test | Email reception/retention and operator wording recorded in [JUV-111 evidence](../delivery/VALIDATION-JUV-111.md); actual hosting facts remain pending |
| Hosting logs, location, retention and feedback policy | Provider role and possible transfers documented; no precise log retention found; corrected notice owner-validated on 2026-11-21, not yet deployed |
| Free-plan quotas / owning account / check date | Plan and quotas not displayed in the supplied screenshots; recheck at release |
| Production deployment ID / operator / UTC timestamp | Technical deployment `a449b027-aa67-4ed2-a0f0-0637f8f2d34a`, commit `7f78d38`, 2026-11-21T15:34:48Z. No official production release |
| Previous compatible deployment / rollback target | None |
| Actual rollback and restoration results | Not run |
| Remote HTTPS, headers, deep-link and installed-worker smoke | Passed for the technical deployment; official-release smoke not run |

The [deployment procedure](DEPLOYMENT.md) and [recorded sources](../SOURCES.md) retain prior provider research and its date. This update records owner-supplied screenshots, not independent account access or a fresh provider check. Current hosting limits remain unverified. Do not invent a production origin or store credentials or personal account identifiers in this record.

## Domain registration evidence — 2026-11-12

The project owner purchased **`juvanga.com`** through **Cloudflare Registrar**. The supplied Cloudflare registration dashboard screenshot dated 2026-11-12 16:17 Africa/Douala shows:

- Registration status: **Active**.
- Expiration date: **2027-11-12** (date as displayed by the provider; no exact UTC expiration timestamp verified).
- Automatic renewal: enabled, scheduled for **2027-10-13**.
- Displayed renewal price: **USD 11.17/year**, observed on 2026-11-12; future pricing is not guaranteed.

This supersedes the previous missing-domain state. The domain is already registered for the project, not merely available to purchase. Evidence is limited to the owner's screenshots; no independent registry or account inspection was performed. Personal details and screenshot copies are not stored in the repository.

At registration, DNS records, DNSSEC, registrant email verification, account two-factor authentication, hosting attachment, a working public HTTPS application and domain-based email were unverified. Later account-security evidence is recorded below. Leave `SITE_URL` unset until the release gates and actual application origin are verified. Purchasing the domain does not publish the application or complete JUV-114.

## Pages setup evidence — 2026-11-20

Owner-supplied screenshots show the GitHub repository selected and the Pages setup form populated with project name `juvanga`, production branch `main`, React (Vite), build command `npm ci && npm run build`, output `apps/web/dist` and `NODE_VERSION=24`. The root-directory section is collapsed, so its value is not established by the screenshot. `SITE_URL` is absent from the visible environment-variable list. The proposed `juvanga.pages.dev` address is not evidence of a successful deployment or verified origin.

Read-only GitHub inspection confirmed remote `main` at `81f6241`, behind local `main` (`500bebb`) and the current feature history. The owner authorized commits and a PR before continuing Cloudflare setup. Preserve existing feature commits and propose their integration into `main`; this does not complete acceptance, authorize production promotion or establish a public origin. Keep `SITE_URL` unset. See the [repository preparation handoff](../sessions/2026-11-20-cloudflare-repository-preparation.md) for validation and PR evidence.

## Cloudflare account security evidence — 2026-11-20

The owner reported that the Cloudflare account email is marked `(verified)`. The supplied Authentication screenshot dated 2026-11-20 18:12 Africa/Douala shows Two-Factor Authentication **Active** and a mobile-app TOTP method configured. Email authentication and a security key are not shown as enabled; the existing TOTP method already establishes active 2FA. Backup-code reminders are enabled, but the screenshot does not establish that recovery codes are retained safely or that a recovery/login test was performed. No recovery codes, QR codes, account email or screenshot copy are stored in the repository.

This records owner-reported email verification and screenshot evidence of the displayed 2FA state, not independent account access. It does not establish domain registrant email confirmation, hosting project creation, privacy/log settings or deployment. The confirmed site/hosting/support operator is recorded in [DEC-10](../product/DECISIONS.md#dec-10-operator-update--2026-11-20).

## Project inventory evidence — 2026-11-20

The owner-supplied Workers & Pages screenshot dated 2026-11-20 18:27 Africa/Douala shows one unrelated application and no `juvanga` project. Preserve the unrelated application. This establishes the displayed inventory, not current quotas or an existing Juvanga deployment. Account identifiers and screenshot copies are not retained.

## Technical bootstrap authorized — 2026-11-20

The owner explicitly authorized this first publicly reachable technical deployment before acceptance; [DEC-10](../product/DECISIONS.md#dec-10-technical-bootstrap-update--2026-11-20) records the scoped change in order. This enables actual hosting checks and does not complete or waive the official-release gates below.

1. Push the validated `feat/JUV-111-public-operator` branch, which includes the latest owner-confirmed public notice. Confirm the remote commit and CI evidence before instructing the owner to deploy.
2. Resume the existing Pages Git setup for `juvanga`, or use Workers & Pages > Create application > Pages and connect the same repository. Use project name `juvanga` (subject to availability); select `feat/JUV-111-public-operator` as the **Production branch** for this technical project. Use React (Vite), repository root (empty root-directory field), `npm ci && npm run build`, output `apps/web/dist` and `NODE_VERSION=24`. Keep `SITE_URL` absent and synthetic/pseudo-locale build variables absent. The provider's production-branch label does not mean official launch approval.
3. The owner may select **Save and Deploy** within this approved scope. Keep the free plan; no paid upgrade, custom-domain attachment or new analytics service is authorized. Record the actual selected service/plan and Node/npm versions from the resulting project/build logs rather than inferring them from account usage widgets.
4. Report the resulting deployment URL, commit and deployment ID, or the relevant build error. Verify remote HTTPS, static links/404, noindex, headers/CSP, the operator wording and normal public-content boundaries. Record actual project options and request-log/processing facts for JUV-111. Do not describe an unverified `pages.dev` address as a successful deployment or noindex as access control.
5. Keep `juvanga.com` unattached and `SITE_URL` unset. Complete hosting/support notice verification and JUV-113 real-user acceptance before official launch. Merge reviewed changes into `main` and update the Pages serving branch before the official-release procedure. Keep the serving branch until that switch is verified.

## Technical deployment evidence — 2026-11-21

An owner-supplied screenshot shows Pages project `juvanga`, production source `main` at `7f78d38`, deployment `https://a449b027.juvanga.pages.dev`, success status, automatic deployments and domain `juvanga.pages.dev`. [DEC-10](../product/DECISIONS.md#dec-10-technical-deployment-update--2026-11-21) records the serving-branch change.

Read-only checks from Camtel (AS15964) on 2026-11-21:

- All 28 public files compared by SHA-256 matched a local build of the same application tree. Five needed a later retry after network errors.
- Unknown routes returned HTTP 404; `/_headers` was not served.
- CSP, nosniff, referrer, frame and permissions headers were effective. `X-Robots-Tag: noindex, nofollow` and `robots.txt` block indexing. Noindex is not access control.
- `/privacy` displays the confirmed operator. The artifact contains no published lesson.
- Headless Chrome at 360 px loaded nine routes without console errors, failed requests or horizontal overflow. The service worker became active at scope `/`.

Findings on the deployed artifact: `/build-report.json` is public; it holds non-secret build metrics but is unnecessary. The French notice says public hosting is not configured. Branch `feat/JUV-111-hosting-evidence` prepares both corrections; the owner validated the notice on 2026-11-21 and reported Web Analytics and Logpush inactive. Neither correction is deployed yet.

Supplied settings and build log show an empty root directory, `npm ci && npm run build`, output `apps/web/dist`, `NODE_VERSION=24`, Node 24.22.1, npm 11.21.2, build system version 3, disabled build cache, no deploy hooks and automatic deployments from `main`.

Camtel did not reach some sampled Cloudflare ranges (`104.16.112.0/20`, `104.22.0.0/15`, `172.67.0.0/18`) during this check. The two current `juvanga.pages.dev` addresses in `172.66.0.0/16` worked, with intermittent TLS errors in one run and 20/20 requests in a later run. Test any custom-domain addresses from Camtel before launch.

Not verified: plan and quotas, actual request-log contents, precise log retention, exact processing locations, independent inspection of the Web Analytics and Logpush settings, rollback, real devices, non-Chromium browsers, screen readers and testers.

## Official-release entry checklist (not executed)

1. Complete JUV-111 and JUV-113; record the five real consenting tester sessions, resolved defects and named acceptance review. Select the actual accepted course and code versions. Do not use synthetic reader fixtures in a deployment.
2. Configure an owner-controlled Pages account/project and appoint the release/incident operator. Confirm the free plan, current build/file/transfer limits, availability of the proposed subdomain and no automatic paid upgrade. Record account ownership without credentials or personal account identifiers in public documentation.
3. Finalize the public privacy notice with actual hosting operator, processing locations, log retention, support/feedback operator and retention terms. Test the exact support URL with authorized nonsensitive content and verify receipt.
4. Select a clean accepted commit. Build with Node 24/npm 11, run full verify and relevant browser suites, then build the complete artifact using the verified HTTPS `SITE_URL`. Record commit, artifact checksum, course versions and generated PWA cache name. Keep `SITE_URL` unset for unready previews; the current artifact is intentionally noindex. Building must not deploy.
5. Create a compatible baseline preview deployment and a candidate preview. Archive their complete artifacts and provider deployment IDs before production promotion. Include `_headers`, static HTML, manifest, worker and all hashed assets; never upload only the Vite client bundle or add a wildcard SPA-to-home rewrite.

## Remote smoke (not executed)

Record actual URL, UTC time, browser/device, command/observation and result, without full logs or participant data. Check:

- HTTPS/certificate and the real home/catalogue/course/lesson/exercise deep links, direct reload, unknown route with actual HTTP 404 and useful recovery.
- Public canonical/robots/sitemap policy against the verified origin; noindex for progress, exercise, workshop, offline and missing pages. No draft/editorial or synthetic lesson payload in the artifact.
- Effective CSP, content types, nosniff, referrer policy, frame protection and permissions policy from the remote response. Confirm `/sw.js` and the manifest have the generated no-cache policy, root worker scope is correct and images/fonts remain same-origin. Source `_headers` alone is not remote evidence.
- Free anonymous course journey, keyboard/mobile behavior, actual help/support links and authorized receipt, consent/refusal/erasure and offline availability limits.
- Fresh browser and already controlled browser: installation, available public pages offline, uncached-address fallback and offered updates. Finish ephemeral exercise text before accepting a reload; preserve the exact consented reading position and report unavailable versions without substituting another lesson.

Save concise evidence references and outcomes in this record. HTTP errors, CSP failures, a private cache entry or a serious accessibility defect block release. A local build or preview is not a public production smoke result.

## Rollback drill (not executed)

Use two real compatible deployments, baseline A and accepted candidate B. If this is the first release, prepare A before promoting B; a missing previous version is not a successful rollback test. The rollback target must include a compatible public worker (or a separately reviewed retirement worker). Rolling the server back to an artifact without `/sw.js` can leave an installed worker serving the previous snapshot; it does not prove client rollback.

1. Publish B only after entry gates and remote preview smoke pass. Record B's deployment ID, URL, commit, artifact checksum, PWA cache name, operator and UTC timestamp.
2. Switch the provider's production deployment to A. Record the actual action and timestamp. Verify the expected A release using remote asset/worker identity and the full smoke subset, including direct lesson links and an unknown route.
3. In a browser already using B, trigger the normal update check, observe the offered older release, accept it deliberately after finishing an exercise, and verify A's active cache/content and preserved local consent/reading position. Record the behavior of another open tab. Waiting workers mean installed clients do not switch instantly with the server.
4. Restore the intended B deployment, rerun production smoke and the installed-client update, and record final active version/cache and results. Retain A's artifact and IDs for recovery. A failed rollback/restoration leaves this ticket incomplete; record the failure and repair/retest it.

Do not describe these steps as passed until performed on the actual provider and clients. No database or paid service exists in M0; this drill does not validate future database restoration. Published course/rubric immutability still applies to both artifacts.

## Completion record to fill after execution

Add the real release/rollback/restore timestamps, operator, deployment IDs and commits; verified quota source/date; production URL; support reception evidence; remote header and deep-link evidence; fresh/installed-client observations; defects/fixes/retests; limitations and the named release review. Mark JUV-114 done only after the actual rollback succeeds and the intended final version is verified.
