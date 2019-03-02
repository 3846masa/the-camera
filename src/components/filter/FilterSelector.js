import React from 'https://dev.jspm.io/react@16';
import html from '/libraries/htm/index.js';
import {
  faAdjust,
  faTint,
  faPaintBrush,
  faSmile,
  faPalette,
} from '/libraries/@fortawesome/free-solid-svg-icons/index.js';

import ControllerWrapper from '/components/common/ControllerWrapper.js';
import ControllerGrid from '/components/common/ControllerGrid.js';
import ControllerButton from '/components/common/ControllerButton.js';

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

    return html`
      <${ControllerWrapper} data-position="bottom">
        <${ControllerGrid}>
          <${ControllerButton}
            icon=${faAdjust}
            onClick=${() => this.onSelectFilter('grayscale')}
            data-selected=${filterType === 'grayscale'}
            data-grid-area="middle"
          />
          <${ControllerButton}
            icon=${faTint}
            onClick=${() => this.onSelectFilter('colorSplit')}
            data-selected=${filterType === 'colorSplit'}
            data-grid-area="middle-left"
          />
          <${ControllerButton}
            icon=${faPaintBrush}
            onClick=${() => this.onSelectFilter('bilateral')}
            data-selected=${filterType === 'bilateral'}
            data-grid-area="middle-right"
          />
          <${ControllerButton}
            icon=${faSmile}
            onClick=${() => this.onSelectFilter('faceBulge')}
            disabled=${!('FaceDetector' in window)}
            data-selected=${filterType === 'faceBulge'}
            data-grid-area="left"
          />
          <${ControllerButton}
            icon=${faPalette}
            onClick=${() => this.onSelectFilter('stylize')}
            data-selected=${filterType === 'stylize'}
            data-grid-area="right"
          />
        <//>
      <//>
    `;
  }
}

export default FilterSelector;
