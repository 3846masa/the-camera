import React from 'react';
import styles from './CameraView.css';

import Video from '~/components/common/Video';

/**
 * @typedef Props
 * @property {MediaStream} [srcObject]
 */

/** @extends {React.FC<Props>} */
const CameraView = ({ srcObject }) => (
  <Video
    muted
    autoPlay
    playsInline
    srcObject={srcObject}
    className={styles.base}
  />
);

export default CameraView;
