import '/polyfills.js';
import React from 'https://dev.jspm.io/react@16';
import ReactDOM from 'https://dev.jspm.io/react-dom@16';

import '/global.css';
import App from '/App.js';

ReactDOM.render(<App />, document.getElementById('app'));

if ('serviceWorker' in navigator) {
  document.addEventListener('DOMContentLoaded', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
