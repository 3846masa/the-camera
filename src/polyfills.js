import { RelativeOrientationSensor } from 'motion-sensors-polyfill';
import EventTarget from '@ungap/event-target';
import jsQR from 'jsqr';

window.RelativeOrientationSensor =
  window.RelativeOrientationSensor || RelativeOrientationSensor;

window.EventTarget = EventTarget;

class BarcodeDetectorPolyfill {
  async detect(imageData) {
    const result = jsQR(imageData.data, imageData.width, imageData.height);
    if (!result) {
      return [];
    }

    const loc = result.location;
    const detected = {
      rawValue: result.data,
      format: 'qr_code',
      boundingBox: {
        x: loc.topLeftCorner.x,
        y: loc.topLeftCorner.y,
        top: loc.topLeftCorner.x,
        left: loc.topLeftCorner.y,
        right: loc.bottomRightCorner.y,
        bottom: loc.bottomRightCorner.x,
        width: loc.bottomRightCorner.x - loc.topLeftCorner.x,
        height: loc.bottomRightCorner.y - loc.topLeftCorner.y,
      },
      cornerPoints: [
        loc.topLeftCorner,
        loc.topRightCorner,
        loc.bottomRightCorner,
        loc.bottomLeftCorner,
      ],
    };

    return [detected];
  }
}

self.BarcodeDetector = self.BarcodeDetector || BarcodeDetectorPolyfill;

if (!('createImageBitmap' in self)) {
  /** @param {Blob | HTMLCanvasElement} source */
  self.createImageBitmap = async (source) => {
    /** @type {Blob} */
    const blob = await new Promise((resolve) => {
      if (source instanceof HTMLCanvasElement) {
        source.toBlob(resolve, 'image/png');
      } else {
        resolve(source);
      }
    });

    const image = new Image();
    const waitLoadingPromise = new Promise((resolve, reject) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', reject, { once: true });
    });

    const url = URL.createObjectURL(blob);
    image.src = url;
    await waitLoadingPromise;
    URL.revokeObjectURL(url);

    return Object.assign(image, {
      width: image.naturalWidth,
      height: image.naturalHeight,
    });
  };
}
