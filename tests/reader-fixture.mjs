import fs from 'node:fs';

// Synthetic publication metadata is test data, never a real course release.
export function readerFixtures() {
  const base = JSON.parse(fs.readFileSync(new URL('./fixtures/content/valid-course.json', import.meta.url), 'utf8'));
  base.schemaVersion = 2;
  base.locale = 'fr';
  base.version = 2;
  base.title = 'Parcours synthétique de lecture';
  base.summary = 'Un parcours fictif réservé aux tests du lecteur.';
  const template = base.modules[0].lessons[0];
  base.modules = [
    { id: 'fixture-module', title: 'Comprendre et essayer', lessons: [] },
    { id: 'fixture-module-review', title: 'Améliorer', lessons: [] },
  ];
  for (const [index, title] of ['Lire les notes', 'Préparer une action', 'Vérifier le résultat'].entries()) {
    const suffix = `-${index + 1}`;
    const lesson = JSON.parse(JSON.stringify(template), (key, value) => key === 'id' ? value + suffix : value);
    lesson.title = title;
    lesson.example[0].text = 'Le facilitateur vérifie l’invitation.';
    lesson.exercise.prompt = 'Retrouvez la tâche et la personne responsable dans la note fictive.';
    lesson.exercise.instructions = ['Appuyez-vous seulement sur la note.', 'Laissez les informations inconnues explicites.'];
    lesson.exercise.rubric.criteria = [
      { id: `fixture-criterion${suffix}`, description: 'La tâche et la personne correspondent à la note.', critical: true },
      { id: `fixture-secondary-criterion${suffix}`, description: 'Les informations manquantes ne sont pas inventées.', critical: false },
    ];
    lesson.exercise.workedSolution[0].text = 'Tâche : vérifier l’invitation. Responsable : le facilitateur.';
    lesson.objectives = ['Retrouver une action dans un exemple fictif.'];
    lesson.blocks = [
      { type: 'paragraph', id: `reader-paragraph${suffix}`, text: 'Une note fictive à lire.\nLes informations manquantes restent explicites.' },
      { type: 'heading', id: `reader-heading${suffix}`, level: 2, text: 'Observer une action' },
      { type: 'heading', id: `reader-subheading${suffix}`, level: 3, text: 'Les détails utiles' },
      { type: 'list', id: `reader-list${suffix}`, ordered: false, items: ['Repérer la tâche.', 'Repérer la personne responsable.'] },
      { type: 'list', id: `reader-steps${suffix}`, ordered: true, items: ['Lire.', 'Vérifier.'] },
      { type: 'note', id: `reader-information${suffix}`, tone: 'information', text: 'Le scénario est fictif.' },
      { type: 'note', id: `reader-warning${suffix}`, tone: 'warning', text: 'Ne pas inventer un responsable.' },
      { type: 'link', id: `reader-external${suffix}`, text: 'Consulter la référence fictive', url: 'https://example.com/reference' },
      { type: 'lesson-link', id: `reader-internal${suffix}`, text: 'Revoir la première leçon de cette version', courseId: base.id, courseVersion: 2, lessonId: 'fixture-lesson-1' },
    ];
    if (index === 0) lesson.blocks.push(
      { type: 'image', id: 'reader-illustration', src: '/media/reader-fixture.png', alt: 'Schéma fictif : une note mène à une action.', width: 640, height: 360, caption: 'Illustration synthétique de test.' },
      // ADR-015: a lightweight automatic image and the two icon callouts.
      { type: 'image', id: 'reader-auto-illustration', src: '/media/reader-auto.png', alt: 'Schéma fictif affiché automatiquement.', width: 1, height: 1, display: 'auto' },
      { type: 'note', id: 'reader-tip', tone: 'tip', text: 'Gardez une copie de la note.' },
      { type: 'note', id: 'reader-try', tone: 'try', text: 'Retrouvez la tâche dans votre propre note fictive.' },
    );
    base.modules[index === 2 ? 1 : 0].lessons.push(lesson);
  }
  const older = structuredClone(base);
  older.schemaVersion = 1;
  older.version = 1;
  older.title += ' — version conservée';
  for (const module of older.modules) for (const lesson of module.lessons) {
    lesson.blocks = lesson.blocks.filter(block => block.type !== 'image' && !(block.type === 'note' && ['tip', 'try'].includes(block.tone)));
    for (const block of lesson.blocks) if (block.type === 'lesson-link') block.courseVersion = 1;
  }
  return [older, base];
}
