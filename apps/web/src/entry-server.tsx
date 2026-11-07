import { renderToString } from 'react-dom/server';
import { MotionConfig } from 'motion/react';
import { StaticRouter } from 'react-router';
import { App } from './App';
import readers from 'virtual:public-reader';
import courses from 'virtual:public-overviews';
import { exercisePaths } from './content/practice.ts';
import { getPage, publicPaths, readerAliases } from './routing';

export const paths = publicPaths(courses, readers);
export const extraPaths = [...readerAliases(readers), ...exercisePaths(readers)];
export function render(path: string) {
  return {
    page: getPage(path, courses, readers),
    html: renderToString(<MotionConfig reducedMotion="user"><StaticRouter location={path}><App /></StaticRouter></MotionConfig>),
  };
}
