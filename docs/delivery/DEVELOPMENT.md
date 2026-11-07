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

`nvm` is optional and must be installed separately if missing. `npm run dev` displays the local URL, usually http://127.0.0.1:5173. The current app is an F0 brand workshop, not yet a learner area.

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
