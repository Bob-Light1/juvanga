# Sources and provenance

Reference session: 6 November 2026, Africa/Douala. External sources were consulted on that date; availability, pricing and limits must be rechecked at deployment. JUV-007 translates existing material without refreshing provider research.

## Supplied documents

- `first_docs/WEWIGO_Dossier_Conception_V1_3.pdf`: functional/technical basis, 5 November 2026; the historical Wewigo name no longer defines the application brand. [English translation](first_docs/en/functional-technical-design-v1.3.md).
- `first_docs/Dossier_Choix_Marque.pdf`: rationale and proposed name origins. [English translation](first_docs/en/brand-selection.md).
- `first_docs/JUVANGA.pdf`, `first_docs/FURAKILI.pdf`, `first_docs/Identités visuelles Furakili et Juvanga.pdf`: visual proposals. [English source index](first_docs/en/README.md).
- `logo_choice/LISEZ-MOI.txt` and JUVANGA assets: supplied logos/icons; visually compared before selecting B. [English asset notes](logo_choice/README.md).
- User instructions from the foundation conversation: Juvanga name, team and discontinuous sessions, token efficiency, quick free first release, brand/logo/animations and detailed backlog.
- User instruction on 2026-11-06 (JUV-007, DEC-14): translate project documentation into English and explicitly require English code comments. Original PDF and logo archives are preserved; linked English text companions provide their documentation.

## Official documentation consulted

| Source | Decision informed |
| --- | --- |
| [Cloudflare Pages — limits](https://developers.cloudflare.com/pages/platform/limits/) | M0 hosting and build/file limits |
| [Workers — pricing](https://developers.cloudflare.com/workers/platform/pricing/) | M1 API quotas and static/dynamic distinction |
| [Workers — Static Assets](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) | Same-origin API/frontend migration |
| [Supabase — pricing](https://supabase.com/pricing) | Free DB/storage/egress sizing |
| [Supabase — pausing](https://supabase.com/docs/guides/platform/free-project-pausing) | Free availability limitation |
| [Supabase — SMTP](https://supabase.com/docs/guides/auth/auth-smtp) | External email and pilot with accounts |
| [Supabase — password security](https://supabase.com/docs/guides/auth/password-security) | Explicit bcrypt/Argon2id deviation |
| [Hono — Workers](https://hono.dev/docs/getting-started/cloudflare-workers) | Web APIs target |
| [Vite — guide](https://vite.dev/guide/) | Build and runtime compatibility |
| [Motion — installation](https://motion.dev/docs/react-installation) | React animation package |
| [Motion — accessibility](https://motion.dev/docs/react-accessibility) | Reduced motion |
| [Node — releases](https://nodejs.org/en/about/previous-releases) | Supported Node LTS |

Package versions: npm registry via npm view and lockfile. The project does not claim that name/domain availability or tax/legal compliance has been established; these remain assignable tasks in DECISIONS.

## JUV-102 implementation reference

JUV-102 implementation reference, consulted on 2026-11-07: [Zod schema API](https://zod.dev/api) and [basic parsing and inferred types](https://zod.dev/basics). Used for strict objects, discriminated unions, validation paths and shared TypeScript types. Zod 4.6.7 was resolved through npm and pinned in the workspace manifest/lockfile; no provider research was repeated.

## JUV-103 editorial provenance

JUV-103 editorial provenance, 2026-11-07: the [course editorial record](../content/drafts/meeting-notes-action-plan/README.md) records the approved fictional source notes, original drafting, third-party media/excerpt status and the project owner's explicit complete-lesson approval and three-exercise walkthrough report. No new external provider research was needed.

## JUV-104 browser verification reference

Consulted on 2026-11-07: Chromium's [zoom preference implementation](https://github.com/chromium/chromium/blob/main/chrome/browser/ui/zoom/chrome_zoom_level_prefs.cc). Used only to configure a temporary browser profile for actual 200% zoom: default zoom is a dictionary keyed by storage partition, and the default partition key is `x`. Tests additionally assert the measured viewport and device pixel ratio rather than trusting preference setup. No provider research or package change was required.

## JUV-105 font provenance

Retrieved on 2026-11-07: Google Fonts official [Inter metadata](https://github.com/google/fonts/blob/main/ofl/inter/METADATA.pb), [Fraunces metadata](https://github.com/google/fonts/blob/main/ofl/fraunces/METADATA.pb) and browser WOFF2 stylesheet. Only the Latin subsets are bundled; source URLs/hashes and original SIL OFL 1.1 licenses are in `apps/web/public/fonts/`. The application makes no Google Fonts requests. Fallback x-height and vertical metrics were measured from the bundled fonts and local Arial/Georgia using temporary fontkit tooling outside the repository. No project dependency was added.

## JUV-106 routing and static rendering references

Consulted on 2026-11-07: official [React Router declarative installation](https://reactrouter.com/start/declarative/installation), [StaticRouter](https://reactrouter.com/api/declarative-routers/StaticRouter), [Vite server-side rendering](https://vite.dev/guide/ssr) and [Cloudflare Pages static/404 routing](https://developers.cloudflare.com/pages/configuration/serving-pages/). React Router 8.5.1 was resolved through the npm registry, pinned and recorded in the lockfile. No hosting account or domain was configured.

## JUV-201 local database references

Consulted on 2026-11-09: official Supabase [local CLI workflow](https://supabase.com/docs/guides/local-development/cli-workflows), [configuration reference](https://supabase.com/docs/guides/local-development/cli/config), [API security and default privileges](https://supabase.com/docs/guides/api/securing-your-api), [row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security) and [CLI reference](https://supabase.com/docs/reference/cli/introduction). Used to select the local migration/seed lifecycle, dedicated exposed schema, explicit grants, global function default revocation and pgTAP role tests. This refresh concerns the new local database work, not hosted pricing/quotas or M0 publication. Package versions are pinned from the npm registry and lockfile.

## M0 external form setup guidance

Consulted on 2026-11-09 after the owner selected an external form and 90-day retention after closure: Google Forms official [publishing and sharing](https://support.google.com/docs/answer/2839588?hl=en), [response notifications and email collection](https://support.google.com/docs/answer/139706?hl=en-GB), and [separate form/spreadsheet storage and deletion](https://support.google.com/docs/answer/2917686?hl=en). Used for the proposed setup in [owner actions](operations/OWNER-ACTIONS.md). No Google account, form, public link, notification or provider retention setting has been configured or tested.

## JUV-111 email privacy references

Consulted on 2026-11-10 after the owner supplied the Gmail contact: Google's official [privacy policy](https://policies.google.com/privacy?hl=fr) and [data-retention explanation](https://policies.google.com/technologies/retention?hl=fr). Used to identify Gmail as the email provider and distinguish the owner's selected support deletion period from provider-managed logs, backups and deletion processes. No account-specific region, routing, delivery, retention setting or legal compliance is verified by these references.

## JUV-114 CI browser zoom reference

Consulted on 2026-11-20: Playwright's official [browser distributions and new headless mode](https://playwright.dev/docs/browsers#chromium-new-headless-mode). The `chromium` channel selects full Chromium instead of the default headless shell. The initial remote zoom test measured device pixel ratio 1 with the shell despite the profile's 200% preference; the dedicated persistent-context test now selects full Chromium by default and retains its measured 200% assertions. Explicit `PLAYWRIGHT_CHANNEL` overrides remain available. No application behavior, package or hosting architecture changed.

## M0 owner account preparation — 2026-11-20

Consulted Cloudflare's official [email verification](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/) and [two-factor authentication](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/) instructions to guide the newly confirmed hosting/support operator through the account checks already listed in owner actions. Email verification status is displayed in My Profile; authentication methods are in Authentication. Email verification precedes 2FA enrollment. This is setup guidance only: no account, verification status, recovery code or authentication setting was inspected or changed. Hosting processing/log facts are still unverified.

## M0 hosting privacy research scope — 2026-11-20

Consulted the official [Pages data-localization guidance](https://developers.cloudflare.com/data-localization/how-to/pages/), [Pages Functions debugging/logging](https://developers.cloudflare.com/pages/functions/debugging-and-logging/) and [2026-10-02 analytics retention change](https://developers.cloudflare.com/changelog/post/2026-10-02-30-days-analytics-on-every-plan/) for the next JUV-111 hosting check. These distinguish Pages regional controls, Functions logs and analytics datasets; none establishes a specific retention period or region for Juvanga's not-yet-verified static Pages project. Do not apply Functions or domain-analytics defaults to static hosting, or infer account settings from general documentation. Actual project/plan/settings evidence remains pending.

## M0 hosting notice research — 2026-11-21

Consulted the official [Pages data-localization guidance](https://developers.cloudflare.com/data-localization/how-to/pages/), [Logs FAQ](https://developers.cloudflare.com/logs/faq/general-faq/) and search excerpts of the [Privacy Policy](https://www.cloudflare.com/privacypolicy/) and [DPA v6.3](https://cf-assets.www.cloudflare.com/slt3lc6tev37/3LmXORq5FW5EuJ0OT1B871/f466268011407efbc07f4fadbd1af466/Cloudflare_Customer_DPA_v6.3_June_20__2025.pdf). Cloudflare acts as processor for Customer Logs, which can include IP addresses; the DPA covers self-serve agreements; Regional Services do not apply to `*.pages.dev`. No precise retention period for static Pages request logs was found. The full policy and DPA could not be opened from the Camtel connection, so their current text was not read end to end. This is not legal advice.

## Order of authority

Current user instruction → explicit project decisions → source requirements not superseded → documented assumptions. Resolve and trace significant contradictions; ADRs do not cancel financial requirements for technical convenience.
