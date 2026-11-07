import { renderToString } from 'react-dom/server';
import { MotionConfig } from 'motion/react';
import { StaticRouter } from 'react-router';
import { App } from './App';
import courses from 'virtual:public-overviews';
import { getPage, publicPaths } from './routing';

export const paths = publicPaths(courses);
export function render(path: string) {
  return {
    page: getPage(path, courses),
    html: renderToString(<MotionConfig reducedMotion="user"><StaticRouter location={path}><App /></StaticRouter></MotionConfig>),
  };
}
