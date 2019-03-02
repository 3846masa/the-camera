import { css } from '/libraries/emotion/index.js';
export default {
  base: css`
    position: absolute;
    right: 0;
    width: 100%;
    padding: 25px 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);

    &[data-position='top'] {
      top: 0;
    }
    &[data-position='bottom'] {
      bottom: 0;
    }
  `,
};
