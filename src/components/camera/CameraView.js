import React from 'react';
import styles from './CameraView.css';

const SAMPLE_IMAGE_SRC = 'https://picsum.photos/1080/1920/?image=15';

const CameraView = () => <img src={SAMPLE_IMAGE_SRC} className={styles.base} />;

export default CameraView;
