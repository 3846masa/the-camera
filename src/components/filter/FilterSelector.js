import React from 'react';
import {
  faAdjust,
  faTint,
  faPaintBrush,
  faSmile,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';

import ControllerWrapper from '~/components/common/ControllerWrapper';
import ControllerGrid from '~/components/common/ControllerGrid';
import ControllerButton from '~/components/common/ControllerButton';

/**
 * @typedef Props
 * @property {(filterType: string) => any} onSelect
 * @property {string} [filterType]
 */

/** @extends {React.Component<Props>} */
class FilterSelector extends React.Component {
  onSelectFilter = (filterType) => {
    const { onSelect, filterType: current } = this.props;

    if (current === filterType) {
      onSelect(null);
    } else {
      onSelect(filterType);
    }
  };

  render() {
    const { filterType } = this.props;

    return (
      <ControllerWrapper data-position="bottom">
        <ControllerGrid>
          <ControllerButton
            icon={faAdjust}
            onClick={() => this.onSelectFilter('grayscale')}
            data-selected={filterType === 'grayscale'}
            data-grid-area="middle"
          />
          <ControllerButton
            icon={faTint}
            onClick={() => this.onSelectFilter('colorSplit')}
            data-selected={filterType === 'colorSplit'}
            data-grid-area="middle-left"
          />
          <ControllerButton
            icon={faPaintBrush}
            onClick={() => this.onSelectFilter('bilateral')}
            data-selected={filterType === 'bilateral'}
            data-grid-area="middle-right"
          />
          <ControllerButton
            icon={faSmile}
            onClick={() => this.onSelectFilter('faceBulge')}
            disabled={!('FaceDetector' in window)}
            data-selected={filterType === 'faceBulge'}
            data-grid-area="left"
          />
          <ControllerButton
            icon={faPalette}
            onClick={() => this.onSelectFilter('stylize')}
            data-selected={filterType === 'stylize'}
            data-grid-area="right"
          />
        </ControllerGrid>
      </ControllerWrapper>
    );
  }
}

export default FilterSelector;
