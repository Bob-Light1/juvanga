# M0 release and rollback record

Date: 2026-11-07. Preparation owner: Codex. Branch: `feat/JUV-114-release-preparation`.
Status: **blocked; no deployment, publication or rollback executed**.

## Current record

| Field | Verified state |
| --- | --- |
| JUV-113 acceptance | Incomplete; [entry gates and observation report](../reviews/M0-ACCEPTANCE.md) |
| Owner-controlled Cloudflare access/project | Not configured (project owner confirmation) |
| Public HTTPS origin / domain | Not configured or verified |
| Accepted release commit / artifact hash | Not selected; latest implementation evidence is [JUV-112](../delivery/VALIDATION-JUV-112.md) |
| Real published course version | None; approved course remains editorial |
| Real support URL and reception test | Missing; JUV-111 blocked |
| Hosting logs, location, retention and feedback policy | Not verified; DEC-10 remains open |
| Free-plan quotas / owning account / check date | Not verified for a real project; recheck at release |
| Production deployment ID / operator / UTC timestamp | None |
| Previous compatible deployment / rollback target | None |
| Actual rollback and restoration results | Not run |
| Remote HTTPS, headers, deep-link and installed-worker smoke | Not run |

The [deployment procedure](DEPLOYMENT.md) and [recorded sources](../SOURCES.md) retain prior provider research and its date. This preparation performs no fresh provider/account check and does not claim that limits are verified today. Do not add a secret or domain to the repository to fill this table.

## Entry checklist (not executed)

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
