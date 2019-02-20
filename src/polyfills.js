import { RelativeOrientationSensor } from 'motion-sensors-polyfill';

window.RelativeOrientationSensor =
  window.RelativeOrientationSensor || RelativeOrientationSensor;

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
