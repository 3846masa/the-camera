import React from 'https://dev.jspm.io/react@16';
import html from '/libraries/htm/index.js';
import styles from './GifVideoView.css.js';

import Video from '/components/common/Video.js';

/**
 * @typedef Props
 * @property {MediaStream} [videoSrc]
 * @property {string} [imageSrc]
 */

/** @extends {React.Component<Props>} */
const GifVideoView = ({ videoSrc, imageSrc }) => {
  const imageUrl = imageSrc ? URL.createObjectURL(imageSrc) : null;

  return html`
    <div className=${styles.base}>
      <div className=${styles.videoWrapper}>
        ${videoSrc &&
          html`
            <${Video}
              muted
              autoPlay
              playsInline
              srcObject=${videoSrc}
              className=${styles.video}
            />
          `}
        ${imageSrc &&
          html`
            <img
              src=${imageUrl}
              onLoad=${() => URL.revokeObjectURL(imageUrl)}
              className=${styles.video}
            />
          `}
      </div>
    </div>
  `;
};

export default GifVideoView;
