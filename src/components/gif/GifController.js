import React from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import ControllerWrapper from '~/components/common/ControllerWrapper';
import ControllerGrid from '~/components/common/ControllerGrid';
import ControllerButton from '~/components/common/ControllerButton';
import GifShutterIcon from '~/components/gif/GifShutterIcon';

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
