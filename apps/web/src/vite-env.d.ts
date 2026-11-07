/// <reference types="vite/client" />

declare const __SITE_ORIGIN__: string;
declare module 'virtual:public-overviews' {
  const courses: import('./content/overview.ts').CourseOverview[];
  export default courses;
}
