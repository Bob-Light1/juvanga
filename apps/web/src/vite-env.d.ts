/// <reference types="vite/client" />

declare const __PSEUDO_LOCALIZATION__: boolean;
declare const __SITE_ORIGIN__: string;
declare module 'virtual:public-overviews' {
  const courses: import('./content/overview.ts').CourseOverview[];
  export default courses;
}

declare module 'virtual:public-reader' {
  const courses: import('./content/reader.ts').ReadingCourse[];
  export default courses;
}

declare module 'virtual:public-practice' {
  const courses: import('./content/practice.ts').PracticeCourse[];
  export default courses;
}
