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
