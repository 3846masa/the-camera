import React from 'react';
import { hot } from 'react-hot-loader/root';

import CameraPage from '~/components/camera/CameraPage';
import FilterPage from '~/components/filter/FilterPage';

/**
 * @typedef State
 * @property {Blob} [blob]
 * @property {'camera'} page
 */

/** @extends {React.Component<{}, State>} */
class App extends React.Component {
  /** @type {State} */
  state = {
    blob: null,
    page: 'camera',
  };

  /** @param {Blob} blob */
  onTakePhoto = (blob) => {
    this.setState({ blob, page: 'filter' });
  };

  onCancelFilter = () => {
    this.setState({ blob: null, page: 'camera' });
  };

  /** @param {Blob} blob */
  onSave = (blob) => {
    saveAs(blob, `${Date.now()}.jpg`);
    this.setState({ blob: null, page: 'camera' });
  };

  render() {
    const { page, blob } = this.state;

    switch (page) {
      case 'camera': {
        return <CameraPage onTakePhoto={this.onTakePhoto} />;
      }
      case 'filter': {
        return (
          <FilterPage
            blob={blob}
            onCancel={this.onCancelFilter}
            onSave={this.onSave}
          />
        );
      }
    }
  }
}

export default hot(App);
