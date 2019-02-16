import React from 'react';
import cc from 'classcat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './ZoomSlider.css';

/**
 * @typedef Props
 * @property {number} value
 * @property {*} range
 * @property {(ev: any) => any} onChange
 * @property {string} [className]
 */

/** @type {React.FC<Props>} */
const ZoomSlider = (props) => {
  if (!props.range) {
    return null;
  }

  return (
    <div className={cc([styles.base, props.className])}>
      <FontAwesomeIcon icon={faSearchPlus} />
      <input
        type="range"
        value={props.value}
        min={props.range.min}
        max={props.range.max}
        step={props.range.step}
        onChange={props.onChange}
        className={styles.slider}
      />
    </div>
  );
};

export default ZoomSlider;
