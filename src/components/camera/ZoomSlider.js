import React from 'https://dev.jspm.io/react@16';
import cc from 'https://unpkg.com/classcat@^3.2.5?module';
import { FontAwesomeIcon } from '/libraries/@fortawesome/react-fontawesome/index.js';
import { faSearchPlus } from '/libraries/@fortawesome/free-solid-svg-icons/index.js';

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
