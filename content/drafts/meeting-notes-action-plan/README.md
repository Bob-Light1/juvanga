# Meeting notes to an action plan — editorial record

Ticket: JUV-103. Prepared on 2026-11-07. Canonical learner content: [French course v1](v1.json). Outcome and scenario: [approved JUV-101 plan](../../../docs/product/FREE-COURSE.md).

## Authorship, sources and rights

- Draft author: Codex, preparing original text at the project owner's request.
- Accountable course owner and designated pedagogical reviewer: the project owner participating in this conversation, self-appointed in [DEC-07](../../../docs/product/DECISIONS.md).
- Sources: the approved JUV-101 fictional notes and worked outcome; lesson explanations, examples, exercises and feedback were drafted for Juvanga. The deadlines retain the approved UTC instants, displayed in Africa/Douala.
- Third-party excerpts, datasets, quotations, photographs, icons, video and audio: none used in these lessons. No external media license is required for this text-only draft. No external reference is presented as endorsing the course.
- Publication license: no public reuse license has been granted by this draft. The owner reviews the content and publication terms before release; plan approval is not approval of the completed lessons.

All meeting participants are fictional roles. No learner data, private course or paid material is included. `access: public` describes the intended free course; `status: review`, `review: null` and `publishedAt: null` keep it unpublished. Do not add this draft to the public catalogue before real review and release checks.

## Review workflow

Run `npm run course:review` under Node 24 to validate the draft and generate the [readable review copy](../../../docs/reviews/meeting-notes-action-plan-v1.md). `npm run check:course`, included in `npm run verify`, validates the draft and detects a stale copy. Edit only the JSON for learner text. This JSON is the French course-content catalogue; application UI labels remain JUV-107's responsibility.

The reviewer should complete all three exercises without co-authoring the course and then compare the results with the solutions. Record corrections, the review outcome and whether the full walkthrough was completed in [JUV-103 evidence](../../../docs/delivery/VALIDATION-JUV-103.md). If the owner becomes a co-author, appoint another walkthrough participant. No human review or measured beginner completion time is claimed yet.

This workflow consumes the unchanged [JUV-102 contract](../../../docs/architecture/PUBLIC-CONTENT.md) and ADR-006's draft/public separation. It adds a generated review document and an authoring check, not a new content schema, renderer or architecture.
