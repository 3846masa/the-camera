import React from 'react';
import saveAs from 'file-saver';

import Layout from '~/components/common/Layout';
import CameraView from '~/components/camera/CameraView';
import CameraController from '~/components/camera/CameraController';
import captureImage from '~/helpers/captureImage';
import getConstraints from '~/helpers/getConstraints';

/**
 * @typedef State
 * @property {MediaStream} stream
 * @property {Record<string, MediaTrackConstraints | null>} constraints
 * @property {'user' | 'environment'} facingMode
 */

/** @extends {React.Component<{}, State>} */
class CameraPage extends React.Component {
  /** @type {State} */
  state = {
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
    this.setState({ stream });
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

  render() {
    const { stream, facingMode } = this.state;

    return (
      <Layout>
        <CameraView srcObject={stream} facingMode={facingMode} />
        <CameraController
          onClickShutter={this.onClickShutter}
          onToggleFacingMode={this.onToggleFacingMode}
          disabledToggleFacingMode={!this.canToggleFacingMode}
        />
      </Layout>
    );
  }
}

export default CameraPage;
