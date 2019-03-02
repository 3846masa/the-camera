import React from 'https://dev.jspm.io/react@16';
import { faCamera } from '/libraries/@fortawesome/free-solid-svg-icons/index.js';

import ControllerWrapper from '/components/common/ControllerWrapper.js';
import ControllerGrid from '/components/common/ControllerGrid.js';
import ControllerButton from '/components/common/ControllerButton.js';
import GifShutterIcon from '/components/gif/GifShutterIcon.js';

/**
 * @typedef Props
 * @property {number} time
 * @property {() => any} onRecStart
 * @property {() => any} onRecStop
 * @property {() => any} onChangeToCameraPage
 */

/** @type {React.FC<Props>} */
const GifController = ({
  time,
  onRecStart,
  onRecStop,
  onChangeToCameraPage,
}) => (
  <ControllerWrapper data-position="bottom">
    <ControllerGrid>
      <ControllerButton
        icon={<GifShutterIcon time={time} />}
        onTouchStart={onRecStart}
        onTouchEnd={onRecStop}
        data-grid-area="middle"
      />
      <ControllerButton
        icon={faCamera}
        onClick={onChangeToCameraPage}
        data-grid-area="middle-right"
      />
    </ControllerGrid>
  </ControllerWrapper>
);

export default GifController;
