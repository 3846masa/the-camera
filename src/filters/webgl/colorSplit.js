import glUtil from 'https://dev.jspm.io/gl-util@3';

import vert from './default.vert.js';
import frag from './colorSplit.frag.js';

/**
 * @param {HTMLCanvasElement} canvas
 * @param {ImageBitmap} bitmap
 */
function colorSplit(canvas, bitmap) {
  const gl = canvas.getContext('webgl');

  glUtil.program(gl, vert, frag);
  glUtil.attribute(
    gl,
    'a_texCoord',
    /* prettier-ignore */
    [
      // Triangle A
      0.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
      // Triangle B
      0.0, 0.0,
      1.0, 1.0,
      1.0, 0.0,
    ],
  );
  glUtil.texture(gl, 'u_texture', bitmap);
  glUtil.uniform(gl, 'u_resolution', [canvas.width, canvas.height]);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

export default colorSplit;
