/**
 * @param {CanvasImageSource} source
 * @param {'user' | 'environment'} facingMode
 * @param {string} [mimetype]
 * @returns {Promise<Blob>}
 */
async function createImageBlob(source, facingMode, mimetype = 'image/jpeg') {
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

  if (facingMode === 'user') {
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(source, 0, 0);
    ctx.restore();
  } else {
    ctx.drawImage(source, 0, 0);
  }

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mimetype));
  return blob;
}

export default createImageBlob;
