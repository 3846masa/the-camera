import React from 'react';
import cc from 'classcat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
