import React from 'https://dev.jspm.io/react@16';
import html from '/libraries/htm/index.js';
import cc from 'https://unpkg.com/classcat@^3.2.5?module';

import styles from './ControllerGrid.css';

/** @type {React.FC<*>} */
const ControllerGrid = (props) =>
  html`
    <div ...${props} className=${cc([styles.base, props.className])} />
  `;

export default ControllerGrid;
