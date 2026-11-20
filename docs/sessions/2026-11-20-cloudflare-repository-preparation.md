# Cloudflare repository preparation

Date: 2026-11-20. Owner: Codex, reassigned after interruption for repository preparation on `feat/JUV-114-domain-record`. JUV-114 remains `blocked`; JUV-113 acceptance is incomplete. The owner requested appropriate commits and a PR before continuing Cloudflare setup.

The existing linear history includes JUV-107–110 beyond remote `main`, then JUV-111/112, acceptance/release preparation, JUV-201 and verified email integration. Preserve those commits in one integration PR rather than recreating ticket implementations. Commit `69f0e87` records the previously uncommitted domain documentation. The [release record](../operations/M0-RELEASE.md) contains canonical screenshot evidence and its limits.

Commit `f098d48` fixes the CI zoom check by selecting full Chromium for its persistent profile, retaining the assertions for actual 200% zoom. Default headless shell measured 100% in the initial remote run; see [the source reference](../SOURCES.md#juv-114-ci-browser-zoom-reference). No application behavior, dependency or architecture changed.

Validation used isolated Node 24.22.2/npm 11.21.2:

- `npm run verify` passed: 94 tests, documentation/course/contrast checks, lint, TypeScript and the full noindex build. Log: `/tmp/juvanga-pr-verify.log`.
- The initial Chrome browser suite passed 23/25 tests; 200% zoom timed out and desktop font CLS exceeded 0.01. Both passed in the focused rerun without application changes. Logs: `/tmp/juvanga-pr-browser.log`, `/tmp/juvanga-pr-browser-focused.log`; initial artifacts: `/tmp/juvanga-pr-browser-initial-results`.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:reader` passed all 17 scenarios. Its cleanup restored the ordinary French noindex artifact without synthetic published courses. Log: `/tmp/juvanga-pr-reader.log`.
- [Quality run 44762029742](https://github.com/Bob-Light1/juvanga/actions/runs/44762029742) on `f098d48` passed both jobs: full verify (94 tests), all 25 default Chromium browser scenarios and two database reset cycles with 39 assertions each, migration-history checks and actual anonymous Data API denial. The database stack was stopped by CI. This supersedes the initial remote zoom failure on `69f0e87`.
- The sandbox could not start the browser test server; permitted reruns outside it produced the results above. An additional local default-Chromium check could not launch because its required browser executable was not installed; the successful remote run verifies that corrected path. Log: `/tmp/juvanga-pr-zoom-chromium.log`. No threshold was relaxed and no test skipped.

Author consistency review covered the screenshot limits, blocked ticket dependencies, existing ADRs and public/fictional data boundaries. The canonical backlog and generated views were updated. Final `npm run check:docs` and `git diff --check` passed; STATUS contains fewer than 700 words.

The branch was pushed normally, preserving existing history. [PR #1](https://github.com/Bob-Light1/juvanga/pull/1) targets `main`; it was subsequently observed open under the owner's account after the connector rejected PR creation with HTTP 403 (`Resource not accessible by integration`). The attempted title/description update also returned 403. A prepared English PR body is available at `/tmp/juvanga-pull-request-body.txt`; the generic remote title/description remains unchanged. No merge or deployment has been performed.

Local database tests, physical-device/non-Chromium testing, real-tester acceptance, domain DNS/HTTPS, hosting operations and rollback were not executed in this session. The remote database results above concern fictional CI data only. Cloudflare setup does not establish a deployed project or resolve acceptance and operational gates. Review and merge the PR before continuing the Cloudflare build from `main`; keep `SITE_URL` unset until release readiness and the application origin are verified.
