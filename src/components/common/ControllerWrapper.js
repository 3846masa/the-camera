import React from 'https://dev.jspm.io/react@16';
import cc from 'https://unpkg.com/classcat@^3.2.5?module';

import styles from './ControllerWrapper.css';

/** @type {React.FC<*>} */
const ControllerWrapper = (props) => (
  <div {...props} className={cc([styles.base, props.className])} />
);

export default ControllerWrapper;
