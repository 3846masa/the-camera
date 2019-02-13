/**
 * @param {CanvasImageSource} source
 * @param {string} [mimetype]
 * @returns {Promise<Blob>}
 */
async function createImageBlob(source, mimetype = 'image/jpeg') {
  const canvas = document.createElement('canvas');

  if (source instanceof HTMLVideoElement) {
    Object.assign(canvas, {
      width: source.videoWidth,
      height: source.videoHeight,
    });
  } else if (source instanceof HTMLImageElement) {
    Object.assign(canvas, {
      width: source.naturalWidth,
      height: source.naturalHeight,
    });
  } else {
    Object.assign(canvas, {
      width: source.width,
      height: source.height,
    });
  }

  const ctx = canvas.getContext('2d');
  ctx.drawImage(source, 0, 0);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mimetype));
  return blob;
}

export default createImageBlob;
