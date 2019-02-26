import React from 'react';
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';

import ControllerWrapper from '~/components/common/ControllerWrapper';
import ControllerGrid from '~/components/common/ControllerGrid';
import ControllerButton from '~/components/common/ControllerButton';

/**
 * @typedef Props
 * @property {() => any} onSave
 * @property {() => any} onCancel
 */

/** @type {React.FC<Props>} */
const GifSaveController = ({ onSave, onCancel }) => (
  <ControllerWrapper data-position="top">
    <ControllerGrid>
      <ControllerButton
        icon={faTimesCircle}
        onClick={onCancel}
        data-grid-area="left"
      />
      <ControllerButton icon={faSave} onClick={onSave} data-grid-area="right" />
    </ControllerGrid>
  </ControllerWrapper>
);

export default GifSaveController;
