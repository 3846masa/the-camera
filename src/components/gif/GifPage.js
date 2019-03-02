import React from 'https://dev.jspm.io/react@16';
import html from '/libraries/htm/index.js';

import Layout from '/components/common/Layout.js';
import Loading from '/components/common/Loading.js';
import GifVideoView from '/components/gif/GifVideoView.js';
import GifController from '/components/gif/GifController.js';
import GifSaveController from '/components/gif/GifSaveController.js';
import GifRecoder from '/helpers/GifRecorder.js';

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

  recorder = new GifRecoder();

  componentDidMount() {
    this.initialize();
  }

  componentWillUnmount() {
    this.recorder.terminate();
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

    this.recorder.setStream(stream);
    this.recorder.addEventListener('tick', this.onTick);
    this.recorder.addEventListener('generating', this.onGenerating);
    this.recorder.addEventListener('generate', this.onGenerate);
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

  onTick = ({ detail: recTime }) => {
    this.setState({ recTime });
  };

  onGenerating = () => {
    this.setState({ loading: true });
  };

  onGenerate = ({ detail: blob }) => {
    this.setState({
      blob,
      recTime: 0,
      loading: false,
    });
  };

  onRecStart = () => {
    this.setState({ recTime: 0 }, () => {
      this.recorder.startRecord();
    });
  };

  onRecStop = () => {
    this.recorder.stopRecord();
  };

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

    return html`
      <${Layout}>
        <${GifVideoView} videoSrc=${stream} imageSrc=${blob} />
        ${isTaken === false &&
          html`
            <${GifController}
              time=${recTime}
              onRecStart=${this.onRecStart}
              onRecStop=${this.onRecStop}
              onChangeToCameraPage=${this.onChangeToCameraPage}
            />
          `}
        ${isTaken &&
          html`
            <${GifSaveController}
              onSave=${this.onSave}
              onCancel=${this.onCancel}
            />
          `}
        <${Loading} loading=${loading} />
      <//>
    `;
  }
}

export default GifPage;
