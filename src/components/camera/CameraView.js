import React from 'https://dev.jspm.io/react@16';
import styles from './CameraView.css';

import Video from '/components/common/Video.js';

/**
 * @typedef Props
 * @property {MediaStream} [srcObject]
 * @property {'user' | 'environment'} facingMode
 */

/** @extends {React.FC<Props>} */
const CameraView = ({ srcObject, facingMode }) => (
  <Video
    muted
    autoPlay
    playsInline
    srcObject={srcObject}
    className={styles.base}
    data-facing-mode={facingMode}
  />
);

export default CameraView;
