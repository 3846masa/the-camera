import createVideoElement from '~/helpers/createVideoElement';
import createImageBlob from '~/helpers/createImageBlob';
import EXIF from '~/helpers/EXIF';

/**
 * @param {MediaStream} stream
 * @param {'user' | 'environment'} facingMode
 */
async function captureImage(stream, facingMode) {
  const video = await createVideoElement(stream);
  const blob = await createImageBlob(video, facingMode);

  const exif = new EXIF({
    width: video.videoWidth,
    height: video.videoHeight,
  });

  video.remove();
  return exif.insertTo(blob);
}

export default captureImage;
