import { css } from '/libraries/emotion/index.js';
export default {
  base: css`
    display: grid;
    grid-template-columns: 1rem 1fr 1rem;
    grid-column-gap: 10px;
    align-items: center;
  `,

  slider: css`
    margin: 15px 0;
    outline: none;
    -webkit-appearance: none;

    &::-webkit-slider-runnable-track {
      height: 3px;
      padding-top: 1.5px;
      cursor: pointer;
      background-color: white;
      border-radius: 50%;
    }
    &::-moz-range-track {
      height: 3px;
      padding-top: 1.5px;
      cursor: pointer;
      background-color: white;
      border-radius: 3px;
    }
    &::-ms-track {
      height: 3px;
      padding-top: 1.5px;
      cursor: pointer;
      background-color: white;
      border-radius: 3px;
    }

    &::-webkit-slider-thumb {
      width: 20px;
      height: 20px;
      margin-top: -10px;
      cursor: pointer;
      background-color: white;
      border: 2px solid black;
      border-radius: 50%;
      -webkit-appearance: none;
    }
    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      margin-top: -10px;
      cursor: pointer;
      background-color: white;
      border: 2px solid black;
      border-radius: 50%;
      -webkit-appearance: none;
    }
    &::-ms-thumb {
      width: 20px;
      height: 20px;
      margin-top: -10px;
      cursor: pointer;
      background-color: white;
      border: 2px solid black;
      border-radius: 50%;
      -webkit-appearance: none;
    }
  `,
};
