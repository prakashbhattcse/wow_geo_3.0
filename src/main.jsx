import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

const root = document.getElementById('root');
const app = <StrictMode><BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></BrowserRouter></StrictMode>;
// Pages are pre-rendered to HTML at build time. Hydrate when the HTML matches this URL,
// otherwise (dev server, or a host that served a fallback page) render from scratch.
const clean = p => (p.length > 1 ? p.replace(/\/+$/, '') : p);
if (root.hasChildNodes() && clean(root.dataset.path || '') === clean(location.pathname)) hydrateRoot(root, app);
else { root.innerHTML = ''; createRoot(root).render(app); }
