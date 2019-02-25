import createVideoElement from '~/helpers/createVideoElement';

class BarcodeReader extends EventTarget {
  /** @type {HTMLVideoElement | null} */
  video = null;
  canvas = document.createElement('canvas');
  detector = new BarcodeDetector({ types: ['qr_code'] });
  timeoutId = null;

  get imageData() {
    if (!this.video) {
      return new ImageData(1, 1);
    }
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  start() {
    this.timeoutId = setTimeout(() => this.detect(), 1000);
  }

  pause() {
    this.timeoutId = clearTimeout(this.timeoutId);
  }

  async setStream(stream) {
    if (this.video) {
      this.video.remove();
    }
    this.video = await createVideoElement(stream);
    Object.assign(this.canvas, {
      width: this.video.videoWidth / 4,
      height: this.video.videoHeight / 4,
    });
  }

  async detect() {
    const [result] = await this.detector.detect(this.imageData).catch(() => []);
    if (result) {
      const event = new CustomEvent('detect', { detail: result });
      this.dispatchEvent(event);
    }
    if (this.timeoutId) {
      this.start();
    }
  }

  terminate() {
    this.pause();
    this.video.remove();
  }
}

export default BarcodeReader;
