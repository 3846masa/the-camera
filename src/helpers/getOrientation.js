const rotationMatrix = new Float32Array(16);
const orientationSensor = new RelativeOrientationSensor({
  referenceFrame: 'screen',
});

orientationSensor.addEventListener(
  'reading',
  () => orientationSensor.populateMatrix(rotationMatrix),
  { passive: true },
);
orientationSensor.start();

const ORIENTATION = {
  environment: { normal: 1, right: 6, left: 8 },
  user: { normal: 2, right: 5, left: 7 },
};

/** @param {'user' | 'environment'} facingMode */
function getOrientation(facingMode) {
  const deg = Math.asin(rotationMatrix[8]) * (180 / Math.PI);
  const rotateDirection = deg > 20 ? 'left' : deg < -20 ? 'right' : 'normal';
  const orientation = ORIENTATION[facingMode][rotateDirection];
  return orientation;
}

export default getOrientation;
