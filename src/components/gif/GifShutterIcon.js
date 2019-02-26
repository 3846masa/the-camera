import React from 'react';
import styles from './GifShutterIcon.css';

/**
 * @typedef Props
 * @property {number} time
 */

/** @type {React.FC<Props>} */
const GifShutterIcon = ({ time }) => {
  const circleProps = { cx: 50, cy: 50, r: 48, strokeWidth: 4 };
  return (
    <svg viewBox="0 0 100 100" className={styles.base}>
      <circle {...circleProps} fill="black" stroke="white" />
      <circle
        {...circleProps}
        fill="none"
        stroke="gold"
        strokeDasharray="314"
        strokeDashoffset={(1 - time) * 314}
      />
    </svg>
  );
};

export default GifShutterIcon;
