import createVideoElement from '~/helpers/createVideoElement';
import createImageBlob from '~/helpers/createImageBlob';

/**
 * @param {MediaStream} stream
 * @param {'user' | 'environment'} facingMode
 */
async function captureImage(stream, facingMode) {
  const video = await createVideoElement(stream);
  const blob = await createImageBlob(video, facingMode);
  video.remove();
  return blob;
}

export default captureImage;
