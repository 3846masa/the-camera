import { css } from '/libraries/emotion/index.js';
export default {
  base: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center center;

    &[data-facing-mode='user'] {
      transform: scaleX(-1);
    }
  `,
};
