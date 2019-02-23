/** @param {ImageBitmap} bitmap */
async function resizePowerOfTwo(bitmap) {
  const canvas = document.createElement('canvas');
  Object.assign(canvas, {
    width: Math.pow(2, Math.ceil(Math.log2(bitmap.width))),
    height: Math.pow(2, Math.ceil(Math.log2(bitmap.height))),
  });
  canvas.getContext('2d').drawImage(bitmap, 0, 0);

  const resized = await createImageBitmap(canvas);
  return resized;
}

export default resizePowerOfTwo;
