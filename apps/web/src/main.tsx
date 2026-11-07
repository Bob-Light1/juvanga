import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import { App } from './App';
import '../../../packages/design/tokens.css';
import './fonts.css';
import './styles.css';

const root = document.getElementById('root')!;
const application = <StrictMode><MotionConfig reducedMotion="user"><BrowserRouter><App /></BrowserRouter></MotionConfig></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, application);
else createRoot(root).render(application);
