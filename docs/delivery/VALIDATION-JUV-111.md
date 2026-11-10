# JUV-111 — Help, privacy and feedback

Owner: Codex. Branch: `feat/JUV-111-help-privacy-feedback`. Date: 2026-11-07.
Current status: email integrated; blocked on operator wording and actual hosting details. The dated sections below preserve earlier evidence.

`/help`, `/privacy` and `/feedback` are statically rendered and linked in the public footer. French copy lives in the shared catalogue. Help explains the actual unpublished/published course boundary, practice and optional resume. The notice describes the exact local record, no automatic expiry, targeted erasure and its failure fallback; exercise text is ephemeral. Hosting requests are distinguished from local storage. No provider, location or log retention is invented.

The feedback page gives a minimal optional problem description and forbids sensitive documents. It explicitly reports that no channel is configured; there is no fake form, address or delivery confirmation. A real address/URL, reception test, operator and feedback retention policy are required before completion. Hosting operator, processing locations and log retention also need confirmation before release (DEC-10).

Full verify passed (87 tests) and all three Chrome support scenarios passed; see the [session handoff](../sessions/2026-11-07-help-privacy-feedback.md). No support message has been sent or received; no production hosting or independent privacy/legal review has been verified. Author review checks copy against ADR-012 and the actual storage implementation; it is not a legal compliance certification.

## Email support decision — 2026-11-10

The owner selected email support, superseding the external form; the [owner action guide](../operations/OWNER-ACTIONS.md) defines the pending setup. JUV-111 was reassigned to Codex on `feat/JUV-111-email-support` and remains blocked. No address, reception/reply evidence or provider/hosting facts were supplied. This documentation decision does not change the product interface or establish a working contact channel. Current-session checks are recorded in the [handoff](../sessions/2026-11-10-email-support.md).

## Email contact integration — 2026-11-10

The owner subsequently supplied the public Gmail contact, configured in [SupportPage](../../apps/web/src/SupportPage.tsx). The static `/feedback` page now offers a keyboard-accessible native email link and selectable address, including without JavaScript. The link opens a mail client; it does not submit a message or report delivery. `/help` and `/privacy` link to the contact page. The French catalogue explains minimal optional context, excluded sensitive data, Gmail processing, support retention and its separation from local reading erasure. Provider references are recorded in [SOURCES](../SOURCES.md).

The owner confirmed receiving both the message from a personal test mailbox and the reply sent from support on 2026-11-10. This satisfies the operational reception/reply check as owner-reported evidence; Codex sent no message and inspected no private correspondence. Support may be handled directly in the public mailbox; the personal test address is not needed for routing and is absent from source, documentation and built artifacts. The owner confirmed tracking closure dates and manually deleting correspondence and controlled copies 90 days after closure. This establishes no automatic deletion or provider-managed backup/log expiry.

Validation with isolated Node 24.22.2/npm 11.21.2:

- `npm run verify`: passed, 94 tests plus docs/course/contrast, lint, strict TypeScript and static/PWA build.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- tests/browser/support.spec.ts`: all three scenarios passed, at 360/1280 px and without JavaScript. Axe found no tagged WCAG A/AA violations. Contact attributes/focus, visible address, minimal-data copy and local erasure remain checked without activating the email link.
- Pseudo-locale build and the same three browser scenarios: passed; the actual contact identifier remains unchanged. Normal French noindex build restored afterward.
- Author technical, copy, visual and privacy-boundary review completed; no structural change or new dependency. Mobile feedback rendering inspected. Private-address exclusion scan passed.

Logs and limitations are in the [integration handoff](../sessions/2026-11-10-email-contact-integration.md). Actual operator wording, hosting processing locations and request-log settings/retention are still missing, so the ticket is not marked done. No deployment, remote headers, provider account settings, database tests, real-device/non-Chromium/screen-reader checks, independent privacy/legal review or five-person acceptance was performed. Technical review is not legal compliance certification.
