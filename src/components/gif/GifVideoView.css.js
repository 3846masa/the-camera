import { css } from '/libraries/emotion/index.js';
export default {
  base: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,

  videoWrapper: css`
    position: relative;
    width: 100%;
    overflow: hidden;

    &::before {
      display: block;
      padding-top: 100%;
      content: '';
    }
  `,

  video: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  `,
};
