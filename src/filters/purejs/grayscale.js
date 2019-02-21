/**
 * @param {HTMLCanvasElement} canvas
 * @param {ImageBitmap} bitmap
 */
function grayscale(canvas, bitmap) {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const buffer = imageData.data;

  for (let idx = 0; idx < buffer.length; idx += 4) {
    const [red, green, blue, alpha] = Array.from(buffer.slice(idx, idx + 4));
    const gray = Math.floor(0.299 * red + 0.587 * green + 0.114 * blue);
    buffer.set([gray, gray, gray, alpha], idx);
  }

  ctx.putImageData(imageData, 0, 0);
}

export default grayscale;
