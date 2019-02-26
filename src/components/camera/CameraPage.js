import React from 'react';
import saveAs from 'file-saver';

import Layout from '~/components/common/Layout';
import CameraView from '~/components/camera/CameraView';
import CameraController from '~/components/camera/CameraController';
import BarcodeResultPopup from '~/components/camera/BarcodeResultPopup';
import captureImage from '~/helpers/captureImage';
import getConstraints from '~/helpers/getConstraints';
import getZoomRange from '~/helpers/getZoomRange';
import getGeolocation from '~/helpers/getGeolocation';
import BarcodeReader from '~/helpers/BarcodeReader';
import SHUTTER_EFFECT_PATH from '~/assets/shutter-effect.mp3';

/**
 * @typedef State
 * @property {number} zoom
 * @property {*} zoomRange
 * @property {MediaStream} stream
 * @property {Record<string, MediaTrackConstraints | null>} constraints
 * @property {'user' | 'environment'} facingMode
 * @property {string} barcodeResult
 */

/**
 * @typedef Props
 * @property {(blob: Blob) => void} onTakePhoto
 * @property {(page: string) => any} onChangePage
 */

/** @extends {React.Component<Props, State>} */
class CameraPage extends React.Component {
  /** @type {State} */
  state = {
    zoom: 1,
    zoomRange: null,
    stream: null,
    constraints: {},
    facingMode: null,
    barcodeResult: '',
  };

  shutterEffectRef = React.createRef();
  barcodeReader = new BarcodeReader();

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

  componentWillUnmount() {
    this.closeStream();
    this.barcodeReader.terminate();
  }

  async initialize() {
    // Get geolocation for preventing alert
    await getGeolocation();

    const constraints = {
      user: await getConstraints('user'),
      environment: await getConstraints('environment'),
    };
    const facingMode = constraints.environment ? 'environment' : 'user';
    this.setState({ constraints, facingMode });

    this.barcodeReader.addEventListener('detect', this.onDetectBarcode);
    this.barcodeReader.start();
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

    this.barcodeReader.setStream(stream);
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

  onDetectBarcode = ({ detail }) => {
    this.barcodeReader.pause();
    this.setState({ barcodeResult: detail.rawValue });
  };

  onClosePopup = () => {
    this.setState({ barcodeResult: null }, () => {
      this.barcodeReader.start();
    });
  };

  onClickShutter = async () => {
    this.shutterEffectRef.current.currentTime = 0;
    this.shutterEffectRef.current.play();

    const { stream, facingMode } = this.state;
    const blob = await captureImage(stream, facingMode);
    this.props.onTakePhoto(blob);
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

  onChangeToGifPage = () => {
    this.props.onChangePage('gif');
  };

  render() {
    const { stream, facingMode, zoom, zoomRange, barcodeResult } = this.state;

    return (
      <Layout>
        <CameraView srcObject={stream} facingMode={facingMode} />
        <CameraController
          zoom={zoom}
          zoomRange={zoomRange}
          onChangeZoom={this.onChangeZoom}
          onClickShutter={this.onClickShutter}
          onChangeToGifPage={this.onChangeToGifPage}
          onToggleFacingMode={this.onToggleFacingMode}
          disabledToggleFacingMode={!this.canToggleFacingMode}
        />
        <audio
          preload="auto"
          src={SHUTTER_EFFECT_PATH}
          ref={this.shutterEffectRef}
        />
        <BarcodeResultPopup text={barcodeResult} onClose={this.onClosePopup} />
      </Layout>
    );
  }
}

export default CameraPage;
