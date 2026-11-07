# Journeys and screen inventory

## Shared rules

Every screen describes initial, loading, empty, success, error, access-denied and unavailable-network states. Critical information exists in the account, not only in a notification. Visible focus, keyboard navigation, landmarks, field-associated errors, screen-reader-accessible text. Responsive from 360 px to large screens, 200% zoom, WCAG 2.2 AA target. A logo or animation does not replace a label.

## M0

| Target route | Goal | Primary action | Specific states |
| --- | --- | --- | --- |
| `/` | Understand the promise | Discover the free course | Honest description, no fictional offer |
| `/courses` | Choose a course | Open a course | No filter results, loading |
| `/courses/:slug` | Learn objectives/prerequisites | Start | Archived, not found |
| `/learn/:slug/:lesson` | Read and practise | Do the exercise | Missing lesson, unavailable content |
| `/learn/:slug/:lesson/exercise` | Apply and self-assess | Compare with worked solution | No certification of mastery |
| `/progress` | Resume locally | Continue | No consent, unavailable storage, erase all |
| `/help`, `/privacy`, `/accessibility` | Understand and ask for help | Access support | Actually configured channel |

Optional local storage on a personal device: lesson ID/version and reading progress only in M0. Do not retain deliverables or personal data in a shared browser. Show how to erase data and explain that changing devices does not transfer it.

## M1

Login, registration, email verification, forgotten/reset password, profile, learner area, submission list, detail/review and support. Editor: draft → review → publication; trainer: assignments → authorized submissions → review. Dedicated full-screen presentation: same course version, keyboard navigation, no private data. Prepare English technically; do not display it as available before translation.

## M2

Offer details → frozen order → payment instructions → evidence upload → verification tracking → course access → availability → booking → confirmation. Show indicative availability before payment and the process when no slot exists. Distinct messages: evidence received, payment under verification, funds received and confirmed, session confirmed.

Back office: financial queue, entry, separate MFA approval, resolution, invoice/credit note, schedule, absences/replacements, organizations/invitations, alerts. A B2B coordinator has no default access to raw financial documents or named grades.

## Observable differentiation

Keep the same “understand → try → demonstrate → improve” thread in every course. Show what the learner can do, with review evidence when available. Relevant illustrations and local professional examples; no heavy decoration before content. Test with five people of varied digital ability before M0, then iterate on observed blockers.
