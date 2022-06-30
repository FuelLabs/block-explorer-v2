import React from 'react';
import { createRoot } from 'react-dom/client';

import './resources/fonts';
import './fonts.css';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const rootContainer = document.getElementById('root')!;
const root = createRoot(rootContainer);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
