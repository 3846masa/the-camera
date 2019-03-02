import { injectGlobal } from '/libraries/emotion/index.js';

injectGlobal`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html, body {
  color: white;
  background-color: black;
}
`;
