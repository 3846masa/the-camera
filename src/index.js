import '/polyfills.js';
import React from 'react';
import ReactDOM from 'react-dom';

import '/global.css';
import App from '/App.js';

ReactDOM.render(<App />, document.getElementById('app'));

if ('serviceWorker' in navigator) {
  document.addEventListener('DOMContentLoaded', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
