import React from 'react';
import cc from 'classcat';

import styles from './ControllerWrapper.css';

/** @type {React.FC<*>} */
const ControllerWrapper = (props) => (
  <div {...props} className={cc([styles.base, props.className])} />
);

export default ControllerWrapper;
