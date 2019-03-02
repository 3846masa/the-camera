import createVideoElement from '/helpers/createVideoElement.js';
import createImageBlob from '/helpers/createImageBlob.js';
import getGeolocation from '/helpers/getGeolocation.js';
import getOrientation from '/helpers/getOrientation.js';
import EXIF from '/helpers/EXIF.js';

/**
 * @param {MediaStream} stream
 * @param {'user' | 'environment'} facingMode
 */
async function captureImage(stream, facingMode) {
  const video = await createVideoElement(stream);
  const blob = await createImageBlob(video, facingMode);
  const geolocation = await getGeolocation();

  const exif = new EXIF({
    width: video.videoWidth,
    height: video.videoHeight,
    latitude: geolocation.coords.latitude,
    longitude: geolocation.coords.longitude,
    orientation: getOrientation(facingMode),
  });

  video.remove();
  return exif.insertTo(blob);
}

export default captureImage;
