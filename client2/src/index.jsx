// imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';

//possible service worker activation code
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// serviceWorkerRegistration.register();
// if (process.env.NODE_ENV === 'development') {
//   serviceWorkerRegistration.unregister();
// } else {
//   serviceWorkerRegistration.register();
// }

// creating the root
const container = document.getElementById('root');
const root = createRoot(container);

// rendering out the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
