import React from 'react';
import styles from './GifVideoView.css';

import Video from '~/components/common/Video';

/**
 * @typedef Props
 * @property {MediaStream} [videoSrc]
 * @property {string} [imageSrc]
 */

/** @extends {React.Component<Props>} */
const GifVideoView = ({ videoSrc, imageSrc }) => {
  const imageUrl = imageSrc ? URL.createObjectURL(imageSrc) : null;

  return (
    <div className={styles.base}>
      <div className={styles.videoWrapper}>
        {videoSrc && (
          <Video
            muted
            autoPlay
            playsInline
            srcObject={videoSrc}
            className={styles.video}
          />
        )}
        {imageSrc && (
          <img
            src={imageUrl}
            onLoad={() => URL.revokeObjectURL(imageUrl)}
            className={styles.video}
          />
        )}
      </div>
    </div>
  );
};

export default GifVideoView;
