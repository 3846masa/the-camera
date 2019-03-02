import '/polyfills.js';
import React from 'https://dev.jspm.io/react@16';
import html from '/libraries/htm/index.js';
import ReactDOM from 'https://dev.jspm.io/react-dom@16';

import '/global.css.js';
import App from '/App.js';

ReactDOM.render(
  html`
    <${App} />
  `,
  document.getElementById('app'),
);

if ('serviceWorker' in navigator) {
  document.addEventListener('DOMContentLoaded', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
