# Setup and local development

## Prerequisites

Node **24 LTS**, npm **11.21.2**, git. `.nvmrc`, `engines` and `packageManager` describe the target. The system runtime may differ: check `node --version` and `npm --version`. Do not change a colleague's global environment unnecessarily; nvm/volta or an isolated environment is suitable.

```sh
nvm install
nvm use
npm install --global npm@11.21.2
npm ci
npm run verify
npm run dev
```

`nvm` is optional and must be installed separately if missing. `npm run dev` displays the local URL, usually http://127.0.0.1:5173. The current app serves the M0 public preview; the owner-approved French course version 1 is published for acceptance.

## Stable commands

| Command | Result |
| --- | --- |
| `npm run context` | Short STATUS and next ready tasks |
| `npm run next -- M0` | Ready M0 milestone tasks |
| `npm run task -- JUV-101` | One complete ticket without loading the entire backlog |
| `npm run backlog:generate` | Generates Markdown, CSV and traceability |
| `npm run check:docs` | Dependencies, states, coverage, views and links |
| `npm run check:contrast` | WCAG ratios for permitted pairs |
| `npm test` | Tooling and documentation invariant tests |
| `npm run lint` | Frontend code analysis |
| `npm run typecheck` | Strict TypeScript |
| `npm run build` | Validated client build + static prerender in apps/web/dist |
| `npm run verify` | Previous checks excluding browser tests |
| `npm run test:e2e` | Browser smoke and axe, after build |
| `npm run preview -- --port 4173` | Serves static route HTML and real 404 responses |

Install the test browser once: `npx playwright install chromium`. On a machine with Chrome already installed: `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e`. Do not share a personal browser profile. Browser tests cover public navigation, initial HTML without JavaScript, 404s, metadata, assets and component accessibility. They are not complete M0 learner acceptance.

## Git and teamwork

The local repository is initialized at foundation delivery. Remote, access, branch protection and CI triggering require a remote repository owned by the project owner. Do not assume they are configured. No initial commit may contain secrets or real data; inspect `git status` before staging.

## Language

Write documentation, code, identifiers and all code comments in English, including configuration comments and documentation comments. The initial product interface remains in French through the planned i18n catalogue. See [CONTRIBUTING](../../CONTRIBUTING.md).

## Future services

M0 needs no secrets or Docker. M1: Supabase CLI and Docker for the local environment, Hono/Worker through a versioned CLI added in JUV-202, schema through migrations. No installation may create a cloud resource. Contracts and fictional data must enable separate frontend/backend work. Do not install unused P2 SDKs now.

## Local database

JUV-201 uses the pinned project-local Supabase CLI and Docker. No hosted account, login, cloud link or credential is needed. Keep any local runtime credentials in ignored server-only files; never add them to `VITE_*`, static content or committed test output. The frontend remains independent of the database.

```sh
npm ci
npm run db:start
npm run test:db
npm run db:stop
```

`db:start` starts the isolated `juvanga-local` project with PostgreSQL 17, Auth and the Data API; unused services and new signups are disabled. Local API port: 56321; database: 56322; reserved shadow database: 56320. Avoid port conflicts and do not run database suites concurrently against this project. Bind/firewall local services appropriately for the development machine; do not expose the stack as public hosting.

**`test:db` and `db:reset` delete the disposable local database contents.** Only fictional fixtures belong there. `test:db` resets twice, runs pending migrations after each reset, verifies pgTAP constraints/grants/RLS and confirms anonymous profile requests are denied over the local API. Tests use database role/JWT-claim simulation; they do not prove BFF sessions, SMTP, MFA or production access control. `db:stop` retains this project's local volumes and leaves other projects running. Commands accept no extra arguments or remote target.

The two seeded `example.invalid` Auth identities have no password or confirmed address. They are SQL fixtures, not working login accounts. Application objects live in `app`; its `profiles` table permits own-row reads and server-only writes. New tables/functions require explicit grants under [ADR-014](../architecture/decisions/014-local-database.md). Use `npm exec -- supabase migration new description` to create the next timestamped migration; never change one already applied. `npm run verify` remains the frontend/documentation suite and does not start Docker; run the separate `test:db` check for database changes.

For M0 support, testers and hosting tasks, follow [owner actions](../operations/OWNER-ACTIONS.md). Hosted Supabase, external SMTP and real accounts remain later unconfigured gates.

## Dependency updates

Keep exact added dependency versions and the lockfile. Use agreed npm 11, a new branch and compatibility checks. Audit before release; address findings according to exploitability and scope, never run `npm audit fix --force` without reviewing changes.

## Public page build configuration

`npm run build` is the complete artifact command; bare `vite build` omits prerendering. With `SITE_URL` unset, output is a noindex preview with no canonical and an empty sitemap. At release, pass the verified HTTPS origin through the build environment; the variable is non-secret and has no `VITE_` prefix. The build reads `process.env`, not a browser-visible provider configuration. See [deployment](../operations/DEPLOYMENT.md) and [ADR-008](../architecture/decisions/008-public-pages.md).

Home is `/`, catalogue `/courses`, descriptions `/courses/:id`, and the former brand/component workshop `/workshop` (always noindex). [Discovery inventory](../../content/discovery/catalogue.json) selects only approved description sources. It never publishes lessons; see the [content boundary](../architecture/PUBLIC-CONTENT.md).

## Localization checks

UI copy is in `apps/web/src/i18n/fr.ts`; import `messages` and the shared Intl formatters from `i18n/index.ts`. Stable semantic keys and French per-key fallback are documented in [ADR-009](../architecture/decisions/009-localization.md). French is the only advertised language.

For expanded-copy QA, run `JUVANGA_PSEUDO_LOCALE=1 npm run build`, then `JUVANGA_PSEUDO_LOCALE=1 PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- tests/browser/i18n.spec.ts`. Rebuild with `npm run build` afterward to restore the French preview. Never use the pseudo build for a release.

## Reader checks

Canonical reading routes are `/learn/:course/v/:version/:lesson`; short `/learn/:course/:lesson` aliases resolve the latest published French version. Missing lessons provide recovery and a real 404 in local preview. Production hosting must verify extensionless routes and the reader-specific fallback before release. No real course is published by the reader ticket.

`PLAYWRIGHT_CHANNEL=chrome npm run test:reader` builds the actual app against a temporary synthetic published inventory, runs the complete reader browser scenarios with a reserved test origin, and restores the default artifact in a finally block. Production configuration has no content-directory environment override. Keep this explicit test command separate from the normal preview suite; no test fixture belongs in a deployed artifact. See [validation](VALIDATION-JUV-108.md).

## Practice checks

`npm run test:reader` also runs the exercise attempt/compare/retry scenarios against the separate synthetic inventory. It verifies keyboard and no-JavaScript use, exact-version routes, no submission/storage, reload reset and declaration-only feedback. The runner restores the normal artifact; no real course is published. Exercise responses must never enter future progress persistence. See [ADR-011](../architecture/decisions/011-practice.md).

## Local resume checks

JUV-110 adds a noindex `/progress` page with optional consent and targeted erasure. Only the last reading location is retained, never exercise text or declarations. The schema, consent and exact-version behavior are documented in [ADR-012](../architecture/decisions/012-local-progress.md). The `test:reader` runner covers real storage refusal/opt-in/reload/erasure, corrupt/incompatible records, unknown content versions, quota/denied storage and cross-tab revocation. Normal `test:e2e` covers `/progress` static/no-JavaScript recovery and an empty real inventory. Future offline/auth work must preserve these boundaries.

## Public offline snapshot

The complete build now emits `/manifest.webmanifest`, `/sw.js` and a standalone `/offline` page; build metrics are printed to the build log and are not published. Only generated public pages and selected static assets are precached. Published illustrations are optional and cached after a request. Progress, workshop, API/account routes and URLs with query strings are excluded. The worker is registered only in production builds. Cache installation and browser eviction can fail; a saved reading position alone does not guarantee offline availability.

A new release waits for an explicit reload (or closure of old tabs). Finish an exercise before accepting; its text is intentionally ephemeral. Consent and reading storage survive worker activation. The privacy notice explains how browser site-data settings clear public copies separately from targeted reading erasure. [ADR-013](../architecture/decisions/013-public-offline.md) defines the boundary and future migration.

`PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- tests/browser/pwa.spec.ts` exercises actual worker installation, offline public/fallback behavior, update activation, storage preservation, refused registration, reduced motion and slow 4G metrics. `npm run test:reader` includes synthetic published lessons and exercises offline. Never run both browser commands concurrently: they share the build output. The full build enforces JS/image budgets and reports gzip JS and initial home image sizes. Remote caching headers and physical-device installation remain release checks.
