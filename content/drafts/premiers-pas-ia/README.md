# Draft — `premiers-pas-ia` (N0 course)

Ticket: JUV-117. Plan: [N0-COURSE.md](../../../docs/product/N0-COURSE.md), approved by the project owner on 2026-11-27. No lesson text exists yet, and nothing here is published.

## Diagrams

Sources are HTML fragments with inline SVG in `diagrams/`, styled by `diagrams/diagrams.css` and the design tokens. They were drawn by Claude for Juvanga on 2026-11-27 and are original, with no vendor logo or interface copy. The interface map is a generic assistant, not a reproduction of ChatGPT or Claude.

Render command (Node 24, Chrome):

```sh
PLAYWRIGHT_CHANNEL=chrome node scripts/render-diagrams.mjs content/drafts/premiers-pas-ia/diagrams content/drafts/premiers-pas-ia/media
```

The script exports 640 px wide WebP files at under 38 KiB each, to fit the [ADR-015](../../../docs/architecture/decisions/015-light-illustrations.md) automatic-display limit. Exported files stay in `media/` until publication. They are copied to `apps/web/public/media/` only when the course is published, so draft material is never deployed.

| File | Size (px) | Lesson | Draft description (`alt`) |
| --- | --- | --- | --- |
| `n0-interface-map.webp` | 640×809 | 2 | Schéma d’un assistant IA sur téléphone, avec sept repères numérotés : 1 menu et historique, 2 choix du modèle, 3 nouvelle conversation, 4 zone des réponses, 5 joindre un fichier, 6 champ de saisie, 7 envoyer. |
| `n0-task-map.webp` | 640×961 | 1 | Trois catégories de tâches : utiles, utiles si vous vérifiez, à éviter, avec leurs exemples. |
| `n0-request-card.webp` | 640×806 | 3 | Les quatre éléments d’une demande claire, contexte, demande, format et limites, chacun avec un exemple. |
| `n0-verification-loop.webp` | 640×718 | 4 | Boucle de vérification : demander, lire, vérifier noms, dates et chiffres ; en cas d’erreur, corriger par une relance puis relire ; sinon relire, adapter et utiliser. |
| `n0-never-paste.webp` | 640×721 | 5 | Ce qu’il ne faut jamais coller dans un assistant, et ce qu’il faut mettre à la place. |
| `n0-final-checklist.webp` | 640×555 | Final | Cinq vérifications à cocher avant d’utiliser le résultat. |

The lesson text repeats every piece of information in these images, so no meaning depends on the image alone. The final `alt` text belongs in the course JSON and is reviewed with the lessons.

## Owner screenshots

There are 8 owner screenshots to supply; the list is in [N0-COURSE.md](../../../docs/product/N0-COURSE.md#visuals). They will be heavier than 40 KiB and will therefore use `display: "request"`.
