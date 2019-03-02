import React from 'https://dev.jspm.io/react@16';
import cc from 'https://unpkg.com/classcat@^3.2.5?module';
import { FontAwesomeIcon } from '/libraries/@fortawesome/react-fontawesome/index.js';

import styles from './ControllerButton.css';

/**
 * @typedef Props
 * @property {*} [icon]
 */

/** @type {React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & Props>} */
const ControllerButton = (props) => {
  const { icon, ...rest } = props;

  return (
    <button {...rest} className={cc([styles.base, props.className])}>
      {React.isValidElement(icon) ? (
        icon
      ) : (
        <FontAwesomeIcon className={styles.icon} icon={icon} />
      )}
    </button>
  );
};

export default ControllerButton;
