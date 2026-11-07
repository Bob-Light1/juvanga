# ADR-001 — deliver a free course before commerce

Date: 2026-11-06. Status: adopted. Product validation owner to appoint.

Context: the user wants a usable release quickly, testable in production for free. The dossier's P0 includes finance, scheduling, accounts and invoicing; that scope remains substantial.

Decision: public static M0 with a real free course, then M1 accounts/learning, then M2 commercial P0 pilot. No simulated payment sold as an integration. M0 can be hosted without a database or SMTP; it tests educational value.

Alternatives: delivering all P0 at once delays initial feedback; a clickable prototype does not demonstrate learning. M0 provides practice and self-assessment without claiming certification.

Consequence: optional local M0 progress, without synchronization. Stable IDs/versions support M1. The historical 192–344 person-day estimate covers broad scope and does not become a reduced promise through this sequencing.

V1.3 deviation: adds an earlier milestone, removes no pilot rules. Validation: M0 criteria in SCOPE and JUV-113. Fallback: retain the free public site if M1 is delayed.
