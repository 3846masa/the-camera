import createVideoElement from '~/helpers/createVideoElement';

const RESOLUTION_LIST = [
  { width: 7680, height: 4320 }, // 8K
  { width: 3840, height: 2160 }, // 4K
  { width: 2560, height: 1440 }, // WQHD
  { width: 1920, height: 1080 }, // Full-HD
  { width: 1280, height: 720 }, // HD
];

/**
 * @param {'user' | 'environment'} facingMode
 * @returns {Promise<MediaTrackConstraints | null>}
 */
async function getConstraints(facingMode) {
  for (const resolution of RESOLUTION_LIST) {
    if (await isResolutionAvailable(resolution, facingMode)) {
      return {
        width: { exact: resolution.width },
        height: { exact: resolution.height },
        facingMode: { exact: facingMode },
      };
    }
  }

  return null;
}

/** @param {MediaTrackConstraints} resolution */
async function isResolutionAvailable(resolution, facingMode) {
  const stream = await navigator.mediaDevices
    .getUserMedia({
      video: {
        width: { exact: resolution.width },
        height: { exact: resolution.height },
        facingMode: { exact: facingMode },
      },
    })
    .catch(() => null);

  if (!stream) {
    return false;
  }

  const videoEl = await createVideoElement(stream);
  const currentResolution = {
    long: Math.max(videoEl.videoWidth, videoEl.videoHeight),
    narrow: Math.min(videoEl.videoWidth, videoEl.videoHeight),
  };

  videoEl.remove();
  // Stop all tracks
  for (const track of stream.getTracks()) {
    track.stop();
  }

  return (
    currentResolution.long === resolution.width &&
    currentResolution.narrow === resolution.height
  );
}

export default getConstraints;
