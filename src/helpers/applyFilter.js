import * as filters from '~/filters';
import resizePowerOfTwo from '~/helpers/resizePowerOfTwo';

/**
 * @param {Blob} blob
 * @param {string} filterType
 * @returns {Promise<ImageBitmap>}
 */
async function applyFilter(blob, filterType) {
  const bitmap = await resizePowerOfTwo(await createImageBitmap(blob));

  const canvas = document.createElement('canvas');
  Object.assign(canvas, {
    width: bitmap.width,
    height: bitmap.height,
  });

  const filterFn = filters[filterType];
  if (!filterFn) {
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
  } else {
    await filters[filterType](canvas, bitmap);
  }

  const result = await createImageBitmap(canvas);
  return result;
}

export default applyFilter;
