import createVideoElement from '~/helpers/createVideoElement';

/**
 * @param {MediaStream} stream
 */
async function getZoomRange(stream) {
  const supported = navigator.mediaDevices.getSupportedConstraints();
  if (!supported.zoom) {
    return null;
  }

  const [track] = stream.getVideoTracks();
  if (!('getCapabilities' in track)) {
    // For Firefox
    return { min: 1, max: 2, step: 0.1 };
  }

  // Playing once for getting track info
  const videoEl = await createVideoElement(stream);
  videoEl.remove();

  const capabilities = track.getCapabilities();
  return capabilities.zoom;
}

export default getZoomRange;
