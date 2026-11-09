# Owner actions to unblock M0

Updated: 2026-11-09. These are pending owner actions, not completed configuration or acceptance. M1 local database preparation in JUV-201 is independent of these gates. No account creation, invitation, message or deployment has been executed by this checklist.

## 1. Choose and create the support channel

The owner selected an **external contact form** and **deletion 90 days after closure** on 2026-11-09. These replace the earlier undecided-channel state and the proposed mailbox. No provider, real URL, receiving operator, notification address or deletion mechanism has yet been configured. Google Forms is a suggested setup path, not an account/provider decision already made by the owner.

The owner needs to:

1. Create a blank form using an account they control. Suggested title: Juvanga support. Include one required problem-description field and an optional reply-email field; ask for the relevant page and expected/observed behavior without personal documents. No required name, telephone, attachment, payment evidence or password.
2. Disable automatic email collection and the one-response/sign-in restriction. Give responders access to anyone with the link; keep editor access restricted. Disable response-summary sharing so other respondents cannot see messages. Verify the actual responder link in a signed-out/private browser, including mobile use.
3. Enable new-response email notifications in the Responses menu. Confirm the receiving operator and approve their public contact wording. Supply only the public responder URL, not the editor link, password or account recovery details.
4. Keep a private closure date/deletion-due record for each case and implement the chosen 90-day deletion routine. Delete the response and related correspondence/copies under the operator's control when due. Linked spreadsheets are separate copies and require separate deletion; avoid linking/exporting unless needed. The chosen duration does not establish the provider's own log or backup retention.
5. Authorize a specific nonsensitive reception test, or submit it personally and report actual form receipt and notification. Example: “Juvanga support reception test — no personal data.” A clickable form alone does not establish receipt.

Google's official [sharing guide](https://support.google.com/docs/answer/2839588?hl=en) describes publishing/respondent access and the risk of shared response summaries. Its [response-management guide](https://support.google.com/docs/answer/139706?hl=en-GB) describes email notifications, email collection and response deletion. Verify these settings on the real form; account policies can restrict public access.

Codex can then integrate the exact contact link, update the French notice, run local checks and record reception evidence. Completion still needs actual provider/host-log details; see [JUV-111 validation](../delivery/VALIDATION-JUV-111.md).

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
