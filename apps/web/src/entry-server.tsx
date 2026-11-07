import { renderToString } from 'react-dom/server';
import { MotionConfig } from 'motion/react';
import { StaticRouter } from 'react-router';
import { App } from './App';
import practice from 'virtual:public-practice';
import readers from 'virtual:public-reader';
import courses from 'virtual:public-overviews';
import { exercisePaths } from './content/practice.ts';
import { getPage, publicPaths, readerAliases } from './routing';

export const mediaPaths = readers.flatMap(course => course.modules.flatMap(module => module.lessons.flatMap(lesson => [...lesson.blocks, ...lesson.example].flatMap(block => block.type === 'image' ? [block.src] : []))));
mediaPaths.push(...practice.flatMap(course => course.lessons.flatMap(lesson => lesson.exercise.workedSolution.flatMap(block => block.type === 'image' ? [block.src] : []))));
export const paths = publicPaths(courses, readers);
export const extraPaths = [...readerAliases(readers), ...exercisePaths(readers), '/progress'];
export function render(path: string) {
  return {
    page: getPage(path, courses, readers),
    html: renderToString(<MotionConfig reducedMotion="user"><StaticRouter location={path}><App /></StaticRouter></MotionConfig>),
  };
}
