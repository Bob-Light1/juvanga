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

## Order of authority

Current user instruction → explicit project decisions → source requirements not superseded → documented assumptions. Resolve and trace significant contradictions; ADRs do not cancel financial requirements for technical convenience.
