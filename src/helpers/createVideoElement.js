/** @param {MediaStream} stream */
async function createVideoElement(stream) {
  const videoElem = document.createElement('video');

  const waitPlayingPromise = new Promise((resolve, reject) => {
    videoElem.addEventListener('playing', resolve, { once: true });
    videoElem.addEventListener('error', reject, { once: true });
  });
  const waitLoadedMetadataPromise = new Promise((resolve, reject) => {
    videoElem.addEventListener('loadedmetadata', resolve, { once: true });
    videoElem.addEventListener('error', reject, { once: true });
  });

  Object.assign(videoElem.style, {
    position: 'fixed',
    width: '1px',
    height: '1px',
    opacity: 0,
  });
  Object.assign(videoElem, {
    muted: true,
    autoplay: true,
    playsInline: true,
    srcObject: stream,
  });
  document.body.appendChild(videoElem);

  await Promise.all([waitPlayingPromise, waitLoadedMetadataPromise]);
  return videoElem;
}

export default createVideoElement;
