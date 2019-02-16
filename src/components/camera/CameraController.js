import React from 'react';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './CameraController.css';

import ControllerButton from '~/components/common/ControllerButton';
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
      <ControllerButton
        icon={<div className={styles.shutterIcon} />}
        onClick={onClickShutter}
        className={styles.shutterButton}
      />
      <ControllerButton
        icon={faSyncAlt}
        disabled={disabledToggleFacingMode}
        onClick={onToggleFacingMode}
        className={styles.facingModeButton}
      />
    </div>
  );
};

export default CameraController;
