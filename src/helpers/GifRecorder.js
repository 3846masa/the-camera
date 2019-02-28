import createVideoElement from '~/helpers/createVideoElement';

const CONFIG = Object.freeze({
  SIZE: 256,
  LIMIT: 10 * 1000,
  FPS: 15,
});

class GifRecoder extends EventTarget {
  video = null;
  canvas = document.createElement('canvas');
  startTime = null;
  /** @type {ImageData[]} */
  frameList = [];
  tickRaf = null;

  get imageData() {
    const { canvas, video } = this;
    const srcSize = Math.min(video.videoWidth, video.videoHeight);
    const srcPos = {
      x: (video.videoWidth - srcSize) / 2,
      y: (video.videoHeight - srcSize) / 2,
    };

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      video,
      ...[srcPos.x, srcPos.y, srcSize, srcSize],
      ...[0, 0, canvas.width, canvas.height],
    );
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  async setStream(stream) {
    if (this.video) {
      this.video.remove();
    }
    this.video = await createVideoElement(stream);
    Object.assign(this.canvas, {
      width: CONFIG.SIZE,
      height: CONFIG.SIZE,
    });
  }

  tick() {
    const currentTime = Date.now() - this.startTime;
    const tickEvent = new CustomEvent('tick', {
      detail: currentTime / CONFIG.LIMIT,
    });
    this.dispatchEvent(tickEvent);

    const currentFrame = Math.floor((currentTime / 1000) * CONFIG.FPS);
    if (currentFrame > this.frameList.length) {
      this.frameList.push(this.imageData);
    }

    if (this.frameList.length < (CONFIG.LIMIT / 1000) * CONFIG.FPS) {
      this.tickRaf = requestAnimationFrame(() => this.tick());
    } else {
      this.stopRecord();
    }
  }

  startRecord() {
    if (!this.tickRaf) {
      this.startTime = Date.now();
      this.frameList = [];
      this.tickRaf = requestAnimationFrame(() => this.tick());
    }
  }

  stopRecord() {
    this.tickRaf = cancelAnimationFrame(this.tickRaf);
    this.generateGif();
  }

  async generateGif() {
    const generatingEvent = new CustomEvent('generating');
    this.dispatchEvent(generatingEvent);

    // TODO: Generating GIF
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const blob = await fetch(
      'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=',
    ).then((res) => res.blob());

    this.startTime = null;
    this.frameList = [];

    const generateEvent = new CustomEvent('generate', { detail: blob });
    this.dispatchEvent(generateEvent);
  }

  terminate() {
    this.video.remove();
  }
}

export default GifRecoder;
