import createVideoElement from '~/helpers/createVideoElement';
import createImageBlob from '~/helpers/createImageBlob';

/** @param {MediaStream} stream */
async function captureImage(stream) {
  const video = await createVideoElement(stream);
  const blob = await createImageBlob(video);
  video.remove();
  return blob;
}

export default captureImage;
