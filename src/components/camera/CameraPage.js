import React from 'react';
import saveAs from 'file-saver';

import Layout from '~/components/common/Layout';
import CameraView from '~/components/camera/CameraView';
import CameraController from '~/components/camera/CameraController';
import captureImage from '~/helpers/captureImage';
import getConstraints from '~/helpers/getConstraints';
import getZoomRange from '~/helpers/getZoomRange';

/**
 * @typedef State
 * @property {number} zoom
 * @property {*} zoomRange
 * @property {MediaStream} stream
 * @property {Record<string, MediaTrackConstraints | null>} constraints
 * @property {'user' | 'environment'} facingMode
 */

/** @extends {React.Component<{}, State>} */
class CameraPage extends React.Component {
  /** @type {State} */
  state = {
    zoom: 1,
    zoomRange: null,
    stream: null,
    constraints: {},
    facingMode: null,
  };

  get canToggleFacingMode() {
    const { constraints } = this.state;
    return constraints.user && constraints.environment;
  }

  componentDidMount() {
    this.initialize();
  }

  /** @param {State} prevState */
  componentDidUpdate(_prevProps, prevState) {
    if (this.state.facingMode !== prevState.facingMode) {
      this.updateStream();
    }
  }

  async initialize() {
    const constraints = {
      user: await getConstraints('user'),
      environment: await getConstraints('environment'),
    };
    const facingMode = constraints.environment ? 'environment' : 'user';
    this.setState({ constraints, facingMode });
  }

  async updateStream() {
    const { constraints, facingMode } = this.state;

    if (!constraints[facingMode]) {
      alert('Camera is not available.');
      return false;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: constraints[facingMode],
    });
    const zoomRange = await getZoomRange(stream);
    this.setState({ stream, zoomRange, zoom: 1 });
  }

  closeStream() {
    const { stream } = this.state;
    if (!stream) {
      return false;
    }

    for (const track of stream.getTracks()) {
      track.stop();
    }
  }

  onClickShutter = async () => {
    const { stream, facingMode } = this.state;
    const blob = await captureImage(stream, facingMode);
    saveAs(blob, `${Date.now()}.jpg`);
  };

  onToggleFacingMode = () => {
    if (this.canToggleFacingMode) {
      this.closeStream();
      this.setState(({ facingMode: current }) => ({
        stream: null,
        facingMode: current === 'user' ? 'environment' : 'user',
      }));
    }
  };

  /** @param {React.ChangeEvent<HTMLInputElement>} ev */
  onChangeZoom = async (ev) => {
    const zoom = ev.target.value;
    this.setState({ zoom });

    const { stream } = this.state;
    const [track] = stream.getVideoTracks();
    await track.applyConstraints({
      advanced: [{ zoom }],
    });
  };

  render() {
    const { stream, facingMode, zoom, zoomRange } = this.state;

    return (
      <Layout>
        <CameraView srcObject={stream} facingMode={facingMode} />
        <CameraController
          zoom={zoom}
          zoomRange={zoomRange}
          onChangeZoom={this.onChangeZoom}
          onClickShutter={this.onClickShutter}
          onToggleFacingMode={this.onToggleFacingMode}
          disabledToggleFacingMode={!this.canToggleFacingMode}
        />
      </Layout>
    );
  }
}

export default CameraPage;
