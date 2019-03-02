import React from 'https://dev.jspm.io/react@16';
import html from '/libraries/htm/index.js';
import styles from './Layout.css.js';

/** @type {React.FC<React.HTMLAttributes<HTMLDivElement>>} */
const Layout = (props) =>
  html`
    <div ...${props} className=${styles.base} />
  `;

export default Layout;
