# N0 free course — first steps with AI assistants

Ticket: JUV-117. Date: 2026-11-27. Status: **plan approved by the project owner on 2026-11-27**. No lesson has been written yet. The reader change is delivered by [ADR-015](../architecture/decisions/015-light-illustrations.md). Decision context: [DEC-15](DECISIONS.md#dec-15-launch-offer--2026-11-27) and the [launch offer](OFFERS.md). This plan supersedes [FREE-COURSE.md](FREE-COURSE.md) as the M0 course direction.

## Outcome and audience

The learner is an executive, administrator or employee of a public, private or parapublic organization who has never used an AI assistant, or has used one only casually. After the course, the learner can:

- open ChatGPT or Claude;
- recognize the main areas of the interface;
- set the privacy setting;
- write a clear request for an everyday office task;
- check and improve the answer;
- know what must never be pasted into a public assistant.

The result is a short office text that the learner produced with the assistant and then verified.

| Property | Value |
| --- | --- |
| Course ID | `premiers-pas-ia`, version 1, `schemaVersion` 2 (images) |
| Working French title | *Premiers pas avec l’IA : comprendre ChatGPT et Claude* (First steps with AI: understanding ChatGPT and Claude) |
| Price, place and account | Free, online only, no Juvanga account |
| Estimated time | 80–100 minutes. This is a planning hypothesis to measure in JUV-113 |
| Tone | Formal address (*vouvoiement*), as decided by the owner on 2026-11-27. The tone is warm and professional, with short sentences, no jargon, and each technical term explained the first time it appears |

## Prerequisites and the account decision

The project owner decided on 2026-11-27 that exercises **require** real use of an assistant. The learner therefore needs:

- a phone or computer with a browser;
- an email address;
- a free account with **one** assistant of the learner's choice, ChatGPT or Claude.

The interface tour shows both tools. The exercises ask the learner to use one. No paid plan is needed. The account is held by the vendor, not by Juvanga; Juvanga collects nothing.

Availability: Cameroon is on both vendors' supported-country lists, as checked on 2026-11-27 ([sources](../SOURCES.md#n0-course-provider-research--2026-11-27)). The lesson does not promise any vendor feature, limit or price. Vendor terms require adult users or parental consent; the course is aimed at adults.

## Lesson sequence

Each lesson stays short. It follows the same rhythm: objective, explanation in a few steps, illustrated example, exercise in the tool, worked solution, self-check.

| Lesson | Observable objective | Exercise in the tool | Time |
| --- | --- | --- | --- |
| 1. What an AI assistant does, and does not do | Distinguish useful tasks (drafting, rephrasing, summarizing, structuring) from risky ones (facts the assistant cannot know, figures, legal decisions) | Ask the assistant for a fact about a fictional organization it cannot know. Observe whether it admits not knowing or invents an answer. Then classify six office tasks as “useful”, “useful if checked” or “avoid” | 12–15 min |
| 2. Create an account and tour the interface | Find the new conversation, input field, attachment, history, model choice and settings; set the training setting deliberately | Create the account, then turn the training setting off or choose it knowingly. Start a conversation, rename it, then delete it | 15–20 min |
| 3. Write a clear request | Use four elements: context, request, format, limits | Send a vague request (“écris un mail pour reporter la réunion”), then a structured one. Compare the two answers | 15–20 min |
| 4. Check and improve the answer | Check names, dates and figures against the source. Ask for corrections in follow-ups. Never send unread text | Request a short internal note from fictional facts. Find at least two problems, then correct them with follow-ups | 15–20 min |
| 5. Protect information | Recognize data that must never be pasted (personal data, passwords, confidential or classified documents, client files) and anonymize a text | Anonymize a short fictional text, then ask for its summary | 10–15 min |
| Final exercise | Combine lessons 3–5 on one office task | Produce an email or an information note with the assistant from a fictional brief, then verify it with the checklist below | 15 min |

The course ends with a link to the N1 description. There is no sales pressure.

Exercise scenarios are fictional: a fictional office in Douala, roles rather than names, invented dates and figures. No exercise asks the learner to paste real professional content.

## Final self-assessment

| Criterion | Observable evidence |
| --- | --- |
| Clear request | The request states the context, the request, the expected format and the limits |
| No sensitive data | The request contains no real personal or confidential information; names were replaced |
| Verification | Every name, date and figure in the answer was checked against the brief; errors were corrected in a follow-up |
| Human responsibility | The learner reread and adapted the final text before considering it usable |
| Usable result | The email or note can be sent in the scenario without inventing facts |

The course is self-assessed only. It awards no certification or competence score.

## Visuals

The owner chose a mixed approach on 2026-11-27: schematic diagrams drawn by the project, plus a few real screenshots captured by the owner and annotated by Claude.

**Diagrams.** Six diagrams, drawn by Claude in the Juvanga palette as HTML and inline SVG sources and exported to WebP by `scripts/render-diagrams.mjs`. No new dependency: the existing headless Chrome renders them. Delivered on 2026-11-27; see the [draft record](../../content/drafts/premiers-pas-ia/README.md).

| Diagram | Use |
| --- | --- |
| Numbered interface map | Generic; used for both tools |
| “Useful / check / avoid” task map | Lesson 1 |
| Four-element request card | Lesson 3 |
| Verification loop | Lesson 4 |
| “Never paste” chart | Lesson 5 |
| Final checklist | Final exercise |

**Owner screenshots.** 8 captures, all with a new account that has a neutral name and no conversation history. Interface language: French. Crop out the browser chrome and email addresses.

| # | Tool | Screen | Width |
| --- | --- | --- | --- |
| 1 | ChatGPT | Home screen, empty | Computer (~1280 px) |
| 2 | ChatGPT | Home screen, empty | Phone |
| 3 | ChatGPT | Settings → data controls (model-improvement toggle) | Either |
| 4 | ChatGPT | One answer with the follow-up field visible | Either |
| 5 | Claude | Home screen, empty | Computer |
| 6 | Claude | Home screen, empty | Phone |
| 7 | Claude | Settings → privacy (“Help improve Claude”) | Either |
| 8 | Claude | One answer with the follow-up field visible | Either |

Every screenshot is labeled with its capture date. Each one has a text alternative that describes the steps, so the lesson stays usable without images. Exact interface labels are taken from these screenshots, not from memory. Pages state that Juvanga is not affiliated with OpenAI or Anthropic, and they use no vendor logos outside the screenshots.

## Required reader change (ADR before authoring)

The owner chose on 2026-11-27 to show lightweight images automatically. Today, every image waits for an explicit load action ([PUBLIC-CONTENT.md](../architecture/PUBLIC-CONTENT.md#reader-and-illustration-contract-juv-108), ADR-013 budgets). The proposed ADR-015 covers two changes:

- **Automatic display:** images of at most about 40 KB display automatically. Heavier images keep the load action.
- **Optional icons:** callout tones “astuce” (tip) and “essayez” (try it), so lessons can carry icons.

Alternatives: keep the load action for everything, or show everything automatically. Both were rejected by the owner.

## Remaining approvals

1. The owner approves this plan, or asks for changes.
2. The owner supplies the 8 screenshots.
3. Claude writes ADR-015 and the reader change, then the French lessons.
4. Owner review, and a walkthrough by someone who did not write the course.
5. Publication, and withdrawal of `meeting-notes-action-plan` from the public inventory.
