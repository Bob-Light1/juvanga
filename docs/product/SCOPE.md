# Scope and exit criteria

The V1.3 PDF describes the complete P0 pilot. To meet the request for a quick, free first release, ADR-001 introduces **public M0** before that pilot. This sequencing removes none of the commercial pilot requirements.

| Milestone | Usable deliverable | Included | Visible limitations |
| --- | --- | --- | --- |
| F0 | Development environment | Docs, backlog, brand, visual workshop, CI | No learning course delivered |
| M0 | Free public course | Home/catalogue, one level 0 course, guided exercises and self-assessment, optional local resume, feedback, mobile and static deployment | No account, payment, booking or competency certificate |
| M1 | Learner area with accounts | Email auth, server progress, submissions/reviews, editing/publishing, presentation, support | Free pilot by invitation until public email is configured |
| M2 | Commercial P0 pilot | Offers, orders, verified external receipts, entitlements, Mode A scheduling, invoices/credit notes, minimal organizations/cohorts, notifications, operations | Mode B, PSP, forums and AI import disabled |
| P1 | Extensions | Moderated forums, English, AI import, alternative auth, refined exports/reporting | Launch according to observed needs |
| P2 | Scale and new workflows | Conditional Mode B, PSP/installments, media/private cache, advanced capacity | Studies and tests required before activation |

## M0 succeeds when

A mobile visitor can discover the free offer, complete at least three reviewed lessons, do a concrete exercise and understand the result. They can resume reading after reload only if they chose to save progress. Without consent, no exercise content persists. Local deletion works. Competence is never presented as certified.

The course includes objectives, prerequisites, an example, an exercise, a self-assessment grid and a worked solution. Keyboard navigation, contrast and slow networks are tested. Verify a public HTTPS URL, deep links, 404 page, error fallback and rollback. Presentation/catalogue pages have indexable HTML (prerendered at build time), delivered in JUV-106.

## M1 succeeds when

Two accounts never see each other's private data; deleted/revoked accounts lose access; exercises and rubrics are versioned; a trainer can review only assigned learners; support and restoration are tested. Without external SMTP, public registration stays closed; do not disable email verification to bypass this limitation.

## M2 succeeds when

All applicable P0 requirements and DEC-01 to DEC-08 decisions are addressed; real dual financial approval; no double booking of the last seat; paid access independent of sessions; invoicing follows approved rules; B2B isolation; free and paid C1 courses reviewed; written support, backup, restoration and go/no-go.

## Priority

A feature does not enter M0 because it might be useful someday. New idea: create a P1/P2 ticket with a user outcome, estimated cost and usage signal. Scope changes update ADRs, backlog and roadmap together.
