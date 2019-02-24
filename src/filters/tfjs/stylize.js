import * as mi from '@magenta/image';

import STYLE_IMAGE_PATH from '~/assets/gorge-improvisation.jpg';

const SIZE = 256;

const model = new mi.ArbitraryStyleTransferNetwork();

async function stylize(canvas, bitmap) {
  if (!model.isInitialized()) {
    await model.initialize();
  }
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height, 0, 0, SIZE, SIZE);
  const sourceImageData = ctx.getImageData(0, 0, SIZE, SIZE);

  const styleImage = new Image();
  await new Promise((resolve, reject) => {
    styleImage.addEventListener('load', resolve, { once: true });
    styleImage.addEventListener('error', reject, { once: true });
    styleImage.src = STYLE_IMAGE_PATH;
  });

  const result = await model.stylize(sourceImageData, styleImage);
  ctx.putImageData(result, 0, 0);
  ctx.drawImage(canvas, 0, 0, SIZE, SIZE, 0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = 'overlay';
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
}

export default stylize;
