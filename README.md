# Juvanga

Learn. Practise. Progress.

A platform for practical training, guided sessions and demonstrated skills. French at launch, international reach, designed for mobile devices and slow networks.

## Get started in five minutes

1. Read the [current status](docs/STATUS.md), then the [contribution guidelines](CONTRIBUTING.md).
2. `npm run context` displays the restart summary. `npm run next` lists tasks whose dependencies are complete.
3. Choose an ID and read its ticket: `npm run task -- JUV-101`.
4. Install with `npm ci`, then run `npm run dev`. The foundation displays a brand workshop; the learner product still needs to be built.
5. Before delivery: run `npm run verify` and the targeted tests listed in the ticket; update status and handoff.

**Target prerequisites: Node 24 LTS and npm 11.** See [setup](docs/delivery/DEVELOPMENT.md) and the lockfile. Documentation tools have no npm dependencies.

Project documentation, code, identifiers and code comments must be in English; the initial product interface is in French. See [AGENTS](AGENTS.md) and [CONTRIBUTING](CONTRIBUTING.md).

## Sources of truth

| Need | Document |
| --- | --- |
| Resume a session | [STATUS](docs/STATUS.md) and [AGENTS](AGENTS.md) |
| Understand the product | [Brief](docs/product/BRIEF.md) and [scope](docs/product/SCOPE.md) |
| Develop methodically | [Backlog](docs/backlog/README.md), source `docs/backlog/backlog.json` |
| Choose tools and boundaries | [Architecture](docs/architecture/ARCHITECTURE.md) and [ADRs](docs/architecture/decisions/README.md) |
| Data, access and transactions | [Model](docs/architecture/DATA-MODEL.md), [API](docs/architecture/API.md), [security](docs/architecture/SECURITY.md) |
| Identity and animation | [Brand](docs/design/BRAND.md), [UX](docs/design/UX.md), [Motion](docs/design/MOTION.md) |
| Deliver and operate | [Roadmap](docs/delivery/ROADMAP.md), [quality](docs/delivery/QUALITY.md), [deployment](docs/operations/DEPLOYMENT.md) |
| Outstanding human decisions | [Product decisions](docs/product/DECISIONS.md) |
| Requirement origins | [Sources](docs/SOURCES.md) and [traceability](docs/backlog/TRACEABILITY.md) |

## Incremental delivery

- **F0 — foundations:** documentation, backlog, assets, tokens, development environment and CI.
- **M0 — first free public release:** one complete level 0 course, self-assessment exercises, optional local progress and feedback. No account required.
- **M1 — learning with an account:** synchronized progress, submissions, human reviews, editing and presentation.
- **M2 — commercial pilot:** offers, external payments with dual control, entitlements, bookings and invoicing; minimal organizations.
- **P1/P2:** extensions prioritized after observing usage.

The repository does not claim that M0 or M2 have already shipped. The brand workshop is a development tool. `npm ci` and `npm run build` do not create any cloud service.

PDFs in `docs/first_docs/` and proposals in `docs/logo_choice/` remain the original archives. [English source translations](docs/first_docs/en/README.md) cover the PDF text; [English asset notes](docs/logo_choice/README.md) cover the supplied logo package. New decisions are recorded in ADRs and do not rewrite the archives.
