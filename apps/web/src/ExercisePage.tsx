import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { Button } from './components/ui';
import { LessonBlocks } from './LessonReader';
import { lessonPath, type ReadingCourse, type ReadingLesson } from './content/reader.ts';
import { selfAssessmentState } from './content/practice.ts';
import type { Exercise } from './content/schema.ts';
import { messages } from './i18n/index.ts';

const copy = messages.practice;

export function ExercisePage({ course, lesson, exercise }: { course: ReadingCourse; lesson: ReadingLesson; exercise: Exercise }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [reset, setReset] = useState(false);
  const response = useRef<HTMLTextAreaElement>(null);
  const solution = useRef<HTMLDetailsElement>(null);
  const feedback = selfAssessmentState(exercise.rubric.criteria, checked);

  function retry() {
    if (response.current) response.current.value = '';
    if (solution.current) solution.current.open = false;
    setChecked(new Set());
    setReset(true);
    response.current?.focus();
  }

  return <article className="exercise-page lesson-body" aria-labelledby="exercise-title">
    <Link className="text-link" to={lessonPath(course, lesson)}>{copy.backToLesson}</Link>
    <header><p className="eyebrow">{copy.eyebrow}</p><h1 id="exercise-title">{lesson.title}</h1><p className="intro">{copy.introduction}</p></header>
    <aside className="lesson-note"><strong>{copy.personalOnly}</strong><p>{copy.noCertification}</p></aside>
    <section aria-labelledby="exercise-instructions"><h2 id="exercise-instructions">{copy.instructions}</h2><p className="lesson-prose">{exercise.prompt}</p>
      <ol>{exercise.instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}</ol>
    </section>
    <div className="field"><label htmlFor="exercise-response">{copy.response}</label><p id="exercise-response-hint" className="field-hint">{copy.responseHint}</p>
      <textarea ref={response} id="exercise-response" className="field-input" rows={9} maxLength={20000} autoComplete="off" aria-describedby="exercise-response-hint" onChange={() => setReset(false)} />
    </div>
    <fieldset className="assessment-criteria"><legend>{copy.criteria}</legend><p>{copy.criteriaHint}</p>
      {exercise.rubric.criteria.map(criterion => <label key={criterion.id} className="criterion-choice">
        <input type="checkbox" checked={checked.has(criterion.id)} onChange={event => {
          const next = new Set(checked);
          if (event.target.checked) next.add(criterion.id); else next.delete(criterion.id);
          setChecked(next); setReset(false);
        }} />
        <span>{criterion.description}{criterion.critical && <strong className="criterion-critical">{copy.critical}</strong>}</span>
      </label>)}
    </fieldset>
    <p role="status" className="assessment-feedback">{copy.feedback[feedback]}</p>
    <details ref={solution} className="worked-solution"><summary>{copy.compare}</summary><div>
      <h2>{copy.solutionTitle}</h2><p>{copy.solutionHint}</p><LessonBlocks blocks={exercise.workedSolution} />
    </div></details>
    <noscript><p>{copy.noScript}</p></noscript>
    <Button variant="secondary" onClick={retry}>{copy.retry}</Button>
    <p role="status">{reset ? copy.reset : ''}</p>
    <Link className="text-link" to={lessonPath(course, lesson)}>{copy.backToLesson}</Link>
  </article>;
}
