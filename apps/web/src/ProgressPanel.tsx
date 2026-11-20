import { useRef } from 'react';
import { ActionLink, Button } from './components/ui';
import { findReadingLesson, lessonPath, type ReadingCourse } from './content/reader.ts';
import { formatDateTime, messages } from './i18n/index.ts';
import { progressStore, useProgress } from './progress/use-progress.ts';

const copy = messages.progress;

export function ProgressControls() {
  const state = useProgress();
  const panel = useRef<HTMLElement>(null);
  function act(action: () => unknown) {
    action();
    requestAnimationFrame(() => panel.current?.focus({ preventScroll: true }));
  }
  return <section ref={panel} tabIndex={-1} className="progress-controls" aria-labelledby="progress-controls-title">
    <h2 id="progress-controls-title">{copy.controlsTitle}</h2><p>{copy.privacy}</p>
    {state.status === 'loading' ? <p>{copy.noScript}</p> : state.status === 'disabled' ? <>
      <p role="status">{state.notice === 'cleared' ? copy.cleared : state.declined ? copy.declined : copy.disabled}</p>
      <div className="progress-actions"><Button onClick={() => act(progressStore.enable)}>{copy.enable}</Button>
        {!state.declined && <Button variant="secondary" onClick={() => act(progressStore.decline)}>{copy.decline}</Button>}</div>
    </> : <>
      <p role="status">{state.notice === 'erase-failed' ? copy.eraseFailed : state.notice === 'save-failed' ? copy.saveFailed : copy.states[state.status]}</p>
      <div className="progress-actions"><Button variant="secondary" onClick={() => act(progressStore.clear)}>{copy.clear}</Button>
        {state.status !== 'enabled' && <Button variant="secondary" onClick={() => act(progressStore.refresh)}>{copy.retry}</Button>}</div>
    </>}
  </section>;
}

export function ProgressPage({ courses }: { courses: ReadingCourse[] }) {
  const state = useProgress();
  const saved = state.record?.reading;
  const found = saved && findReadingLesson(lessonPath({ id: saved.courseId, version: saved.courseVersion }, { id: saved.lessonId }), courses);
  return <div className="page-intro progress-page"><h1>{copy.title}</h1><p className="intro">{copy.description}</p>
    <ProgressControls />
    {state.status === 'enabled' && <section aria-labelledby="saved-reading-title"><h2 id="saved-reading-title">{copy.savedTitle}</h2>
      {!saved ? <p>{copy.empty}</p> : found ? <>
        <p>{found.course.title}</p><h3>{found.lesson.title}</h3><p>{copy.savedAt} <time dateTime={saved.updatedAt}>{formatDateTime(saved.updatedAt)}</time></p>
        <ActionLink internal href={lessonPath(found.course, found.lesson)}>{copy.resume}</ActionLink>
      </> : <p role="status">{copy.missingVersion}</p>}
    </section>}
    <p><ActionLink internal href="/courses" variant="secondary">{messages.pages.backToCatalogue}</ActionLink></p>
  </div>;
}
