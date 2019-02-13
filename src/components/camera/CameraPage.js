import React from 'react';
import saveAs from 'file-saver';

import Layout from '~/components/common/Layout';
import CameraView from '~/components/camera/CameraView';
import CameraController from '~/components/camera/CameraController';
import captureImage from '~/helpers/captureImage';

/**
 * @typedef State
 * @property {MediaStream} stream
 */

/** @extends {React.Component<{}, State>} */
class CameraPage extends React.Component {
  /** @type {State} */
  state = {
    stream: null,
  };

  componentDidMount() {
    this.updateStream();
  }

  async updateStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        aspectRatio: { ideal: 16 / 9 },
        facingMode: { ideal: 'environment' },
      },
    });
    this.setState({ stream });
  }

  onClickShutter = async () => {
    const { stream } = this.state;
    const blob = await captureImage(stream);
    saveAs(blob, `${Date.now()}.jpg`);
  };

  render() {
    const { stream } = this.state;
    return (
      <Layout>
        <CameraView srcObject={stream} />
        <CameraController onClickShutter={this.onClickShutter} />
      </Layout>
    );
  }
}

export default CameraPage;
