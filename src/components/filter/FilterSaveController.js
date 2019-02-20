import React from 'react';
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';

import ControllerWrapper from '~/components/common/ControllerWrapper';
import ControllerGrid from '~/components/common/ControllerGrid';
import ControllerButton from '~/components/common/ControllerButton';

/**
 * @typedef Props
 * @property {() => any} onCancel
 * @property {() => any} onSave
 */

/** @type {React.FC<Props>} */
const FilterSaveController = ({ onCancel, onSave }) => (
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

export default FilterSaveController;
