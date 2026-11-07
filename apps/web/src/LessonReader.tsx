import { useState } from 'react';
import { Link } from 'react-router';
import { ActionLink, Button } from './components/ui';
import { coursePath } from './content/overview.ts';
import { lessonLinkPath, lessonPath, readingLessons, type ReadingCourse, type ReadingLesson } from './content/reader.ts';
import type { ContentBlock } from './content/schema.ts';
import { exercisePath } from './content/practice.ts';
import { messages } from './i18n/index.ts';

const copy = messages.reader;

function LessonImage({ block }: { block: Extract<ContentBlock, { type: 'image' }> }) {
  const [state, setState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  return <figure className="lesson-image" id={`block-${block.id}`}>
    {state !== 'loaded' && <p>{block.alt}</p>}
    <Button variant="secondary" busy={state === 'loading'} aria-controls={`media-${block.id}`} aria-expanded={state === 'loading' || state === 'loaded'}
      onClick={() => setState(state === 'loaded' ? 'idle' : 'loading')}>
      {state === 'loading' ? copy.imageLoading : state === 'error' ? copy.imageRetry : state === 'loaded' ? copy.imageHide : copy.imageShow}
    </Button>
    <div id={`media-${block.id}`} aria-busy={state === 'loading'}>
      {(state === 'loading' || state === 'loaded') && <img src={block.src} alt={block.alt} width={block.width} height={block.height} decoding="async" referrerPolicy="no-referrer"
        onLoad={() => setState('loaded')} onError={() => setState('error')} />}
    </div>
    <p role="status">{state === 'loading' ? copy.imageLoading : state === 'error' ? copy.imageError : state === 'loaded' ? copy.imageLoaded : copy.imageOptional}</p>
    <noscript><p>{copy.imageNoScript}</p></noscript>
    {block.caption && <figcaption>{block.caption}</figcaption>}
  </figure>;
}

function unreachable(block: never): never {
  throw new Error(`Unsupported block: ${JSON.stringify(block)}`);
}

export function LessonBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return <>{blocks.map(block => {
    switch (block.type) {
      case 'paragraph': return <p key={block.id} id={`block-${block.id}`} className="lesson-prose">{block.text}</p>;
      case 'heading': return block.level === 2 ? <h2 key={block.id} id={`block-${block.id}`}>{block.text}</h2> : <h3 key={block.id} id={`block-${block.id}`}>{block.text}</h3>;
      case 'list': {
        const List = block.ordered ? 'ol' : 'ul';
        return <List key={block.id} id={`block-${block.id}`}>{block.items.map((item, index) => <li key={index}>{item}</li>)}</List>;
      }
      case 'note': return <aside key={block.id} id={`block-${block.id}`} className={`lesson-note lesson-note-${block.tone}`}><strong>{block.tone === 'warning' ? copy.warning : copy.information}</strong><p className="lesson-prose">{block.text}</p></aside>;
      case 'link': return <p key={block.id} id={`block-${block.id}`}><a className="text-link" href={block.url}>{block.text}</a></p>;
      case 'lesson-link': return <p key={block.id} id={`block-${block.id}`}><Link className="text-link" to={lessonLinkPath(block)}>{block.text}</Link></p>;
      case 'image': return <LessonImage key={block.id} block={block} />;
      default: return unreachable(block);
    }
  })}</>;
}

export function LessonReader({ course, lesson }: { course: ReadingCourse; lesson: ReadingLesson }) {
  const lessons = readingLessons(course);
  const index = lessons.findIndex(candidate => candidate.id === lesson.id);
  const previous = lessons[index - 1], next = lessons[index + 1];
  return <div className="reader-layout">
    <aside className="reader-outline"><nav aria-label={copy.outline}>
      <Link className="text-link" to={coursePath(course)}>{copy.backToCourse}</Link>
      <p className="reader-course-title">{course.title}</p>
      {course.modules.map(module => <div key={module.id}><p><strong>{module.title}</strong></p><ol>{module.lessons.map(item => <li key={item.id}>
        <Link className="text-link" to={lessonPath(course, item)} aria-current={item.id === lesson.id ? 'page' : undefined}>{item.title}</Link>
      </li>)}</ol></div>)}
    </nav></aside>
    <article className="lesson-body" aria-labelledby="lesson-title">
      <header><p className="eyebrow">{copy.eyebrow}</p><h1 id="lesson-title">{lesson.title}</h1></header>
      <section aria-labelledby="lesson-objectives"><h2 id="lesson-objectives">{copy.objectives}</h2><ul>{lesson.objectives.map(item => <li key={item}>{item}</li>)}</ul></section>
      <LessonBlocks blocks={lesson.blocks} />
      <section aria-labelledby="lesson-example"><h2 id="lesson-example">{copy.example}</h2><LessonBlocks blocks={lesson.example} /></section>
      <aside className="lesson-note"><ActionLink internal href={exercisePath(course, lesson)}>{copy.practice}</ActionLink><p>{copy.readingNotice}</p></aside>
      <nav className="lesson-pagination" aria-label={copy.pagination}>
        {previous && <ActionLink internal href={lessonPath(course, previous)} variant="secondary" rel="prev">{copy.previous}<span>{previous.title}</span></ActionLink>}
        {next ? <ActionLink internal href={lessonPath(course, next)} rel="next">{copy.next}<span>{next.title}</span></ActionLink> : <ActionLink internal href={coursePath(course)}>{copy.finish}</ActionLink>}
      </nav>
    </article>
  </div>;
}

export function MissingLesson() {
  return <div className="page-intro"><p className="eyebrow">{messages.pages.notFoundCode}</p><h1>{copy.missingTitle}</h1><p className="intro">{copy.missingHelp}</p>
    <ActionLink internal href="/courses">{messages.pages.backToCatalogue}</ActionLink></div>;
}
