import { css } from '/libraries/emotion/index.js';
export default {
  shutterIcon: css`
    width: 100%;
    background-color: black;
    border: white solid 3px;
    border-radius: 50%;
    opacity: 0.75;

    &:active {
      background-color: gray;
    }

    &::before {
      display: block;
      padding-top: 100%;
      content: '';
    }
  `,

  zoomSlider: css`
    grid-column: middle-left / middle-right;
  `,
};
