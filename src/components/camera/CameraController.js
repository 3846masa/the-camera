import React from 'react';
import styles from './CameraController.css';

/**
 * @typedef Props
 * @property {() => any} onClickShutter
 */

/** @type {React.FC<Props>} */
const CameraController = (props) => {
  const { onClickShutter } = props;
  return (
    <div className={styles.base}>
      <button className={styles.shutterButton} onClick={onClickShutter} />
    </div>
  );
};

export default CameraController;
