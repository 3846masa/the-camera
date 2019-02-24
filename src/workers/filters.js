import * as filters from '~/filters';

self.addEventListener('message', async ({ data }) => {
  const { filterType, bitmap, canvas } = data;

  const filterFn = filters[filterType];
  if (!filterFn) {
    self.postMessage({ result: bitmap }, [bitmap]);
    return;
  } else {
    await filters[filterType](canvas, bitmap);
  }

  if ('requestAnimationFrame' in self) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  const result = await createImageBitmap(canvas);
  self.postMessage({ result }, [result]);
});
