import { StrictMode } from 'react'; import { createRoot } from 'react-dom/client'; import { HashRouter } from 'react-router-dom'; import './styles.css'; import { App } from './app/App';
createRoot(document.getElementById('root')!).render(<StrictMode><HashRouter><App /></HashRouter></StrictMode>);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`));
