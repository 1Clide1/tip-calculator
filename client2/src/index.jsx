// imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.scss';

// creating the root
const container = document.getElementById('root');
const root = createRoot(container);

// rendering out the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
