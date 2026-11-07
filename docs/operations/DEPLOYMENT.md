# Free deployment and progression to the pilot

Initial state: no provider account, cloud project, domain or secret is configured by this repository. Prepared procedure, not completed deployment. Provider checks dated 2026-11-06; recheck at publication.

## M0: target hosting cost 0

Cloudflare Pages Free with a `pages.dev` subdomain, static build. No domain purchase, database, SMTP or AI API needed. Exact domain depends on availability. Human effort, test device and internet connection are excluded from “free hosting”.

1. Complete JUV-113, select a clean commit and produce a RELEASE record.
2. Create an owner-controlled remote repository and Pages project. For Git integration: project root = repository; build command `npm ci && npm run build`; output `apps/web/dist`; Node 24 and npm 11.21.2 in the build environment. Verify actual versions; otherwise build in CI and upload dist.
3. JUV-106 generates extensionless home/catalogue/course HTML and a top-level `404.html`. Use the complete `npm run build` artifact; do not add a wildcard SPA rewrite to home. Verify direct links, refresh and real 404 status on the chosen host.
4. Only for a ready public release, set `SITE_URL` to the verified HTTPS origin in the build environment. The build generates matching canonical/Open Graph/sitemap/robots/headers and indexable public pages; workshop/404 stay noindex. Leave it unset for previews. Do not hand-edit generated HTML or headers. No actual domain is configured yet. Future private portal uses no-store; no public account cache.
5. Deploy a preview; verify HTTPS, assets, CSP, journey, mobile, deep links, offline/service-worker version and absence of secrets.
6. Publish the validated version; record URL, commit, author, date and owning account. Test rollback to the previous release, then restore the desired release.

Documented Pages limits include 500 builds/month, 20,000 files and 25 MiB per file on the free plan. Avoid large videos in this bundle. [Pages limits](https://developers.cloudflare.com/pages/platform/limits/).

## M1: free backend under quotas

Migrate to Workers Static Assets + Hono API **on the same origin** (JUV-202/223). Supabase hosts PostgreSQL/Auth/Storage. Verify during the spike: sessions, RPC, environment, CPU quotas and error behavior. Workers Free lists 100,000 dynamic requests/day and 10 ms CPU per invocation; static assets follow separate terms. [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

Supabase Free lists a 500 MB database, 1 GB files, 5 GB egress and two active projects; an inactive project may pause after one week. These quotas allow evaluation of a small pilot without guaranteeing continuous availability. [Supabase pricing](https://supabase.com/pricing), [pausing](https://supabase.com/docs/guides/platform/free-project-pausing).

Public Auth email requires external SMTP: the supplied server is limited to testing/authorized recipients. Configure sender, domain and quotas, then test an external recipient; this may cost money depending on existing resources. For strictly zero initial spending, publish M0 without accounts and keep M1 in controlled acceptance testing until configured. [Supabase SMTP](https://supabase.com/docs/guides/auth/auth-smtp).

## M1 environments and secrets

Local: fictional data. Preview/staging: dedicated fictional project. Production: separate project. The two possible Free projects may serve staging/prod, keeping development local; check other projects already using the account.

Planned server names: `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (privileged adapter only), `SESSION_ENCRYPTION_KEY`, `APP_ORIGIN`, `ENVIRONMENT`. Secrets belong in the provider vault or git-ignored local storage; the publishable key is not an authorization mechanism. No secret uses the VITE_ prefix. Add final names only when implementing the adapter.

Deploy a compatible schema first, then code compatible with old/new versions, verify, then remove old columns in a later migration. Frontend rollback does not restore the database. Backup and a restoration drill are required before real data.

## Costs, thresholds and fallback

Measure DB, storage, egress, requests, CPU and email weekly. Internal target alert at 70%, action at 85%. Disable expensive imports/media, limit registration and archive under policy before saturation. No automatic paid upgrade without a budget decision. A reliable commercial pilot may require a paid plan, restoration and support: do not sell an SLA based on free quotas.

Cloud accounts, secrets, remote and domain remain to be supplied/configured by their owners in the deployment ticket. They are not needed to finish local foundations.
