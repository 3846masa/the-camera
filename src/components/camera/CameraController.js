import React from 'react';
import { faSyncAlt, faVideo } from '@fortawesome/free-solid-svg-icons';
import styles from './CameraController.css';

import ControllerWrapper from '~/components/common/ControllerWrapper';
import ControllerGrid from '~/components/common/ControllerGrid';
import ControllerButton from '~/components/common/ControllerButton';
import ZoomSlider from '~/components/camera/ZoomSlider';

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
