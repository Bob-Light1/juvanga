# Owner actions to unblock M0

Updated: 2026-11-10. These are pending owner actions, not completed configuration or acceptance. M1 local database preparation in JUV-201 is independent of these gates. No account creation, invitation, message or deployment has been executed by this checklist.

## 1. Create and verify the support mailbox

The owner selected **email support for the initial release** on 2026-11-10, superseding the external form chosen on 2026-11-09. **Deletion 90 days after closure** remains the selected retention rule. No actual mailbox/alias, receiving operator or deletion mechanism has been supplied or verified.

The owner needs to:

1. Create a dedicated mailbox or alias with a provider/account they control. An alias must forward to a monitored mailbox. A custom domain is optional; no domain purchase is required by this decision. Supply only the actual public support address, never a password, API token or recovery code.
2. Identify who handles requests and approve the public operator/contact wording. Confirm that this person can receive and reply to messages using the selected support channel.
3. Perform a nonsensitive test from another mailbox and verify receipt, including the spam folder, then test a reply. Suggested subject: Juvanga support reception test. Alternatively, explicitly authorize a specific reception test. No message has been sent by Codex.
4. Keep a private closure/deletion-due record and arrange deletion 90 days after each request is closed, including received/sent correspondence and copies under the operator's control. This rule does not establish the email provider's own log or backup retention.
5. Provide the public address, responsible operator and actual test result. Do not put private messages or participant details in the repository.

Codex can then display the verified address with an email link and a copyable fallback, update the French notice and run local checks. A link opening a mail application is not evidence of delivery. The M0 website needs no SMTP integration for this contact link. The actual email provider and hosting-log details still need verification before JUV-111 completion; see [JUV-111 validation](../delivery/VALIDATION-JUV-111.md).

## 2. Prepare owner-controlled hosting and the notice

Create or identify the Cloudflare account that will own M0 hosting, appoint an operator and arrange authorized access through the normal account controls. Do not send passwords, API tokens or recovery codes in chat. Account preparation is distinct from publishing the application.

Before acceptance, confirm the actual hosting operator, processing locations and available request-log settings/retention, together with the chosen support provider's handling. Record evidence and date instead of copying generic provider defaults. No hosted project is currently verified. Current quotas and domain/subdomain availability must be checked when the real project is configured; [the release record](M0-RELEASE.md) is authoritative for release evidence.

## 3. Make the course available for real acceptance

The complete French course has editorial approval but no publication decision/timestamp in the public inventory. Identify the exact approved course version and explicitly decide its inclusion in the acceptance artifact. Codex can prepare the resulting artifact and validate it. Do not use the synthetic test course as learner content.

Appoint the facilitator/reviewer and recruit five consenting real testers, including a physical mobile device and the required keyboard/accessibility/network coverage. Choose how long participant records are retained outside the repository. After JUV-111 is complete, run the [acceptance protocol](../reviews/M0-ACCEPTANCE.md), record anonymous observations and review the result. Recruitment and device use require real people; automated tests do not replace them.

## 4. Approve and execute the release after acceptance

Once JUV-113 is done, select the accepted commit, configure the verified HTTPS origin and execute preview smoke, production promotion and the rollback/restoration drill in [M0-RELEASE](M0-RELEASE.md). Supply only nonsensitive evidence such as public URLs and deployment IDs. Building locally does not publish.

## Later M1 gates

JUV-201 needs only the local runtime, Docker and fictional fixtures. A hosted Supabase account, SMTP delivery, a sender domain and acceptance of the managed-auth password deviation are later ticket gates. They are not prerequisites for this local database work and remain unconfigured. No real accounts should be accepted from local SQL test success.

A support mailbox is separate from future M1 transactional SMTP. This channel choice does not configure verification emails, password resets or account registration.
