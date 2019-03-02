import React from 'https://dev.jspm.io/react@16';
import {
  faSyncAlt,
  faVideo,
} from '/libraries/@fortawesome/free-solid-svg-icons/index.js';
import styles from './CameraController.css';

import ControllerWrapper from '/components/common/ControllerWrapper.js';
import ControllerGrid from '/components/common/ControllerGrid.js';
import ControllerButton from '/components/common/ControllerButton.js';
import ZoomSlider from '/components/camera/ZoomSlider.js';

/**
 * @typedef Props
 * @property {number} [zoom]
 * @property {*} [zoomRange]
 * @property {() => any} onClickShutter
 * @property {() => any} onToggleFacingMode
 * @property {() => any} onChangeToGifPage
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
    onChangeToGifPage,
    onToggleFacingMode,
    disabledToggleFacingMode,
  } = props;

  return (
    <ControllerWrapper data-position="bottom">
      <ControllerGrid>
        {zoomRange && (
          <ZoomSlider
            value={zoom}
            range={zoomRange}
            onChange={onChangeZoom}
            className={styles.zoomSlider}
          />
        )}
      </ControllerGrid>
      <ControllerGrid>
        <ControllerButton
          icon={<div className={styles.shutterIcon} />}
          onClick={onClickShutter}
          data-grid-area="middle"
        />
        <ControllerButton
          icon={faSyncAlt}
          disabled={disabledToggleFacingMode}
          onClick={onToggleFacingMode}
          data-grid-area="middle-left"
        />
        <ControllerButton
          icon={faVideo}
          onClick={onChangeToGifPage}
          data-grid-area="middle-right"
        />
      </ControllerGrid>
    </ControllerWrapper>
  );
};

export default CameraController;
