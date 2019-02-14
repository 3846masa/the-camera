import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './CameraController.css';

/**
 * @typedef Props
 * @property {() => any} onClickShutter
 * @property {() => any} onToggleFacingMode
 * @property {boolean} [disabledToggleFacingMode]
 */

/** @type {React.FC<Props>} */
const CameraController = (props) => {
  const {
    onClickShutter,
    onToggleFacingMode,
    disabledToggleFacingMode,
  } = props;

  return (
    <div className={styles.base}>
      <button className={styles.shutterButton} onClick={onClickShutter} />
      <button
        className={styles.facingModeButton}
        disabled={disabledToggleFacingMode}
        onClick={onToggleFacingMode}
      >
        <FontAwesomeIcon className={styles.buttonIcon} icon={faSyncAlt} />
      </button>
    </div>
  );
};

export default CameraController;
