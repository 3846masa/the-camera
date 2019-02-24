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

  if (!('transferControlToOffscreen' in canvas) || filterType === 'stylize') {
    const filterFn = filters[filterType];
    if (!filterFn) {
      canvas.getContext('2d').drawImage(bitmap, 0, 0);
    } else {
      await filters[filterType](canvas, bitmap);
    }

    const result = await createImageBitmap(canvas);
    return result;
  }

  const worker = new Worker('~/workers/filters.js', { type: 'module' });
  const waitRenderingPromise = new Promise((resolve) => {
    worker.addEventListener('message', resolve, { once: true });
  });

  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage(
    {
      filterType,
      canvas: offscreen,
      bitmap,
    },
    [offscreen, bitmap],
  );

  const { data } = await waitRenderingPromise;
  worker.terminate();
  return data.result;
}

export default applyFilter;
