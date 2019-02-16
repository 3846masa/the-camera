import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './CameraController.css';

import ZoomSlider from '~/components/camera/ZoomSlider';

/**
 * @typedef Props
 * @property {number} [zoom]
 * @property {*} [zoomRange]
 * @property {() => any} onClickShutter
 * @property {() => any} onToggleFacingMode
 * @property {(ev: any) => any} onChangeZoom
 * @property {boolean} [disabledToggleFacingMode]
 */

/** @type {React.FC<Props>} */
const CameraController = (props) => {
  const {
    zoom = 1,
    zoomRange,
    onClickShutter,
    onChangeZoom,
    onToggleFacingMode,
    disabledToggleFacingMode,
  } = props;

  return (
    <div className={styles.base}>
      {zoomRange && (
        <ZoomSlider
          value={zoom}
          range={zoomRange}
          onChange={onChangeZoom}
          className={styles.zoomSlider}
        />
      )}
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
