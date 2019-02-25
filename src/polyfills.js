import { RelativeOrientationSensor } from 'motion-sensors-polyfill';
import EventTarget from '@ungap/event-target';
import * as clipboard from 'clipboard-polyfill';

window.RelativeOrientationSensor =
  window.RelativeOrientationSensor || RelativeOrientationSensor;

window.EventTarget = EventTarget;

if (!('clipboard' in navigator)) {
  navigator.clipboard = clipboard;
}

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
