import React from 'react';

import Layout from '~/components/common/Layout';
import Loading from '~/components/common/Loading';
import GifVideoView from '~/components/gif/GifVideoView';
import GifController from '~/components/gif/GifController';
import GifSaveController from '~/components/gif/GifSaveController';

/**
 * @typedef Props
 * @property {(page: string) => any} onChangePage
 * @property {(blob: Blob, ext: string) => any} onSave
 */

/**
 * @typedef State
 * @property {number} recTime
 * @property {MediaStream} stream
 * @property {boolean} loading
 * @property {Blob} [blob]
 */

/** @extends {React.Component<Props, State>} */
class GifPage extends React.Component {
  /** @type {State} */
  state = {
    recTime: 0,
    stream: null,
    loading: false,
    blob: null,
  };

  componentDidMount() {
    this.initialize();
  }

  componentWillUnmount() {
    this.closeStream();
  }

  async initialize() {
    const stream = await navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { ideal: 'environment' } } })
      .catch(() => null);
    if (!stream) {
      alert('Camera is not available.');
      return false;
    }
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

  onRecStart = () => {};

  onRecStop = () => {};

  onSave = () => {
    const { blob } = this.state;
    this.props.onSave(blob, 'gif');
    this.setState({ blob: null });
  };

  onCancel = () => {
    this.setState({ blob: null });
  };

  onChangeToCameraPage = () => {
    this.props.onChangePage('camera');
  };

  render() {
    const { stream, recTime, loading, blob } = this.state;
    const isTaken = !!blob;

    return (
      <Layout>
        <GifVideoView videoSrc={stream} imageSrc={blob} />
        {isTaken === false && (
          <GifController
            time={recTime}
            onRecStart={this.onRecStart}
            onRecStop={this.onRecStop}
            onChangeToCameraPage={this.onChangeToCameraPage}
          />
        )}
        {isTaken && (
          <GifSaveController onSave={this.onSave} onCancel={this.onCancel} />
        )}
        <Loading loading={loading} />
      </Layout>
    );
  }
}

export default GifPage;
