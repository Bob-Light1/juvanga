import { useEffect, useRef } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router';
import { BrandWorkshop } from './BrandWorkshop';
import { ActionLink, CourseCard } from './components/ui';
import type { CourseOverview } from './content/overview.ts';
import { coursePath } from './content/overview.ts';
import courses from 'virtual:public-overviews';
import { fr } from './i18n/fr';
import { getPage } from './routing';

const copy = fr.pages;

function OverviewCards() {
  if (!courses.length) return <div className="empty-catalogue"><h3>{copy.emptyTitle}</h3><p>{copy.emptyDescription}</p><ActionLink internal href="/">{copy.backHome}</ActionLink></div>;
  return <div className="overview-grid">{courses.map(course => <CourseCard key={course.id} title={course.title} description={course.summary}
    badge={copy.free} meta={course.availability === 'coming-soon' ? `${copy.level} · ${copy.comingSoon}` : copy.level}
    href={coursePath(course)} actionLabel={copy.overview} internal />)}</div>;
}

function Home() {
  return <>
    <section className="hero public-hero" aria-labelledby="home-title">
      <div><p className="eyebrow">{copy.eyebrow}</p><h1 id="home-title">{copy.homeTitle}</h1><p className="intro">{copy.homeDescription}</p><ActionLink internal href="/courses">{copy.discover}</ActionLink></div>
      <div className="symbol-card"><img src="/brand/juvanga-symbol.svg" alt="" width="280" height="280" /><p>{copy.tagline}</p></div>
    </section>
    <section className="section" aria-labelledby="featured-title"><p className="eyebrow">{copy.free}</p><h2 id="featured-title">{copy.featured}</h2><OverviewCards /></section>
    <section className="section" aria-labelledby="approach-title"><h2 id="approach-title">{copy.approachTitle}</h2><ol className="approach-list">{copy.approach.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></section>
  </>;
}

function Catalogue() {
  return <><div className="page-intro"><p className="eyebrow">{copy.free}</p><h1>{copy.catalogueTitle}</h1><p className="intro">{copy.catalogueDescription}</p></div><section className="section" aria-labelledby="catalogue-title"><h2 id="catalogue-title">{copy.catalogueSection}</h2><OverviewCards /></section></>;
}

function CoursePage({ course }: { course: CourseOverview }) {
  return <>
    <div className="page-intro course-intro"><Link className="text-link" to="/courses">{copy.backToCatalogue}</Link><p className="eyebrow">{copy.level}</p><h1>{course.title}</h1><p className="intro">{course.summary}</p><span className="pill">{copy.free}</span><p>{copy.noPaidTool}</p></div>
    <aside className="notice"><strong>{copy.comingSoon}</strong><p>{course.availability === 'coming-soon' ? copy.comingSoonDetail : copy.readerPending}</p></aside>
    <div className="course-details"><section className="section" aria-labelledby="objectives-title"><h2 id="objectives-title">{copy.objectives}</h2><ul>{course.objectives.map(objective => <li key={objective}>{objective}</li>)}</ul></section>
    <section className="section" aria-labelledby="prerequisites-title"><h2 id="prerequisites-title">{copy.prerequisites}</h2>{course.prerequisites.length ? <ul>{course.prerequisites.map(item => <li key={item}>{item}</li>)}</ul> : <p>{copy.noPrerequisites}</p>}</section></div>
    <section className="section" aria-labelledby="programme-title"><h2 id="programme-title">{copy.programme}</h2>{course.modules.map(module => <div key={module.id}><h3>{module.title}</h3><ol className="lesson-outline">{module.lessons.map(lesson => <li key={lesson.id}>{lesson.title}</li>)}</ol></div>)}</section>
  </>;
}

function NotFound() {
  return <div className="page-intro"><p className="eyebrow">{copy.notFoundCode}</p><h1>{copy.notFoundTitle}</h1><p className="intro">{copy.notFoundDescription}</p><ActionLink internal href="/courses">{copy.backToCatalogue}</ActionLink></div>;
}

function RouteEffects() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const page = getPage(location.pathname, courses);
    document.title = page.title;
    const values = { description: page.description, robots: __SITE_ORIGIN__ && page.indexable ? 'index, follow' : 'noindex, nofollow' };
    for (const [name, content] of Object.entries(values)) document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', content);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', page.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', page.description);
    document.querySelector('link[rel="canonical"]')?.remove();
    document.querySelector('meta[property="og:url"]')?.remove();
    if (__SITE_ORIGIN__ && page.indexable) {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical'; canonical.href = __SITE_ORIGIN__ + page.path; document.head.append(canonical);
      const og = document.createElement('meta'); og.setAttribute('property', 'og:url'); og.content = canonical.href; document.head.append(og);
    }
    if (previousPath.current !== location.pathname) {
      document.getElementById('main')?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  return null;
}

function PublicLayout() {
  const page = getPage(useLocation().pathname, courses);
  return <>
    <a className="skip-link" href="#main">{copy.skip}</a>
    <header className="header shell public-header"><Link className="brand-link" to="/" aria-label={copy.homeLink}><img src="/brand/juvanga-lockup.svg" alt="" width="228" height="70" /></Link>
      <nav aria-label={copy.navigation}><NavLink to="/" end>{copy.home}</NavLink><NavLink to="/courses">{copy.catalogue}</NavLink></nav></header>
    <main id="main" className="shell public-main" tabIndex={-1}>
      {page.kind === 'home' ? <Home /> : page.kind === 'catalogue' ? <Catalogue /> : page.course ? <CoursePage course={page.course} /> : <NotFound />}
    </main><footer className="shell footer"><span>{copy.brand}</span><span>{copy.tagline}</span></footer>
  </>;
}

export function App() {
  return <><RouteEffects /><Routes>
    <Route path="/workshop" element={<BrandWorkshop />} />
    <Route path="/" element={<PublicLayout />} />
    <Route path="/courses" element={<PublicLayout />} />
    <Route path="/courses/:slug" element={<PublicLayout />} />
    <Route path="*" element={<PublicLayout />} />
  </Routes></>;
}
