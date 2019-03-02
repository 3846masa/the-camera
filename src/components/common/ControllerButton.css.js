import { css } from '/libraries/emotion/index.js';
export default {
  base: css`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: transparent;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    &:active,
    &:disabled {
      color: gray;
    }

    &[data-selected='true'] {
      color: gold;
    }
  `,
  icon: css`
    width: 30% !important;
    height: auto;
  `,
};
