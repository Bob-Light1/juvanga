# Owner actions to unblock M0

Updated: 2026-11-20. This guide distinguishes owner-reported preparation from pending configuration and acceptance. M1 local database preparation in JUV-201 is independent of these gates. No account creation, invitation, message or deployment has been executed by this checklist.

## 1. Operate the verified support mailbox

The owner selected email support on 2026-11-10. The public address is configured in [SupportPage](../../apps/web/src/SupportPage.tsx). Requests can be received, handled and answered directly in that mailbox; no second address, forwarding or delegation is required. A personal mailbox was used only for the reception test and is not published or versioned. On the same date the owner confirmed receipt in both directions: a message to support and a reply from support. This is owner-reported operational evidence, not a message sent or independently inspected by Codex.

The owner also confirmed manual tracking of closure/deletion dates and deletion of correspondence and controlled copies **90 days after closure**. This commitment does not configure automatic deletion or establish Gmail's provider-managed log or backup retention.

The remaining owner actions are:

1. Monitor the public mailbox and maintain the agreed closure/deletion calendar. Include received/sent copies and any copies subsequently created under the operator's control; no forwarding is needed.
2. Verify the actual provider/hosting details needed for the privacy notice, following section 2. The public site/hosting/support operator is confirmed in [DEC-10](../product/DECISIONS.md#dec-10-operator-update--2026-11-20). Keep private messages and personal test addresses outside the repository.

The website displays only the supplied public address, a native email link and a selectable fallback. Clicking does not send mail or prove delivery. The French notice explains purpose/data, the selected retention rule, provider-managed retention and the separation from local reading erasure. The website sends no automatic message and needs no SMTP integration for this link. The contact and reception gates are satisfied; JUV-111 remains incomplete pending the remaining hosting/privacy details; see [validation](../delivery/VALIDATION-JUV-111.md).

## 2. Prepare owner-controlled hosting and the notice

The owner has registered the project domain and supplied evidence of Cloudflare dashboard access; see [the registration record](M0-RELEASE.md#domain-registration-evidence--2026-11-12). Use the owner-controlled account for M0 hosting with the confirmed operator recorded in DEC-10, and arrange authorized access through the normal account controls. The account email and TOTP checks are recorded in the [account evidence](M0-RELEASE.md#cloudflare-account-security-evidence--2026-11-20). Registrant email confirmation remains a separate unverified check. Do not send passwords, API tokens or recovery codes in chat. Account preparation is distinct from publishing the application.

Before acceptance, verify the hosting provider/service configuration, processing locations and available request-log settings/retention, together with the chosen support provider's handling. Record evidence and date instead of copying generic provider defaults. No hosted project is currently verified. Current quotas, provider subdomain availability and the purchased domain's DNS/HTTPS attachment must be checked when the real project is configured; [the release record](M0-RELEASE.md) is authoritative for release evidence.

## 3. Make the course available for real acceptance

The complete French course has editorial approval but no publication decision/timestamp in the public inventory. Identify the exact approved course version and explicitly decide its inclusion in the acceptance artifact. Codex can prepare the resulting artifact and validate it. Do not use the synthetic test course as learner content.

Appoint the facilitator/reviewer and recruit five consenting real testers, including a physical mobile device and the required keyboard/accessibility/network coverage. Choose how long participant records are retained outside the repository. After JUV-111 is complete, run the [acceptance protocol](../reviews/M0-ACCEPTANCE.md), record anonymous observations and review the result. Recruitment and device use require real people; automated tests do not replace them.

## 4. Approve and execute the release after acceptance

Once JUV-113 is done, select the accepted commit, configure the verified HTTPS origin and execute preview smoke, production promotion and the rollback/restoration drill in [M0-RELEASE](M0-RELEASE.md). Supply only nonsensitive evidence such as public URLs and deployment IDs. Building locally does not publish.

## Later M1 gates

JUV-201 needs only the local runtime, Docker and fictional fixtures. A hosted Supabase account, SMTP delivery, a sender domain and acceptance of the managed-auth password deviation are later ticket gates. They are not prerequisites for this local database work and remain unconfigured. No real accounts should be accepted from local SQL test success.

A support mailbox is separate from future M1 transactional SMTP. This channel choice does not configure verification emails, password resets or account registration.
