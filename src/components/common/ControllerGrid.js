import React from 'react';
import cc from 'classcat';

import styles from './ControllerGrid.css';

/** @type {React.FC<*>} */
const ControllerGrid = (props) => (
  <div {...props} className={cc([styles.base, props.className])} />
);

export default ControllerGrid;
