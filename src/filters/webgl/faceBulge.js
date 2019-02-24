import glUtil from 'gl-util';

import vert from './default.vert';
import frag from './faceBulge.frag';

/**
 * @param {HTMLCanvasElement} canvas
 * @param {ImageBitmap} bitmap
 */
async function faceBulge(canvas, bitmap) {
  const faceDetector = new FaceDetector({ fastMode: true });
  const faceList = await faceDetector.detect(bitmap);
  if (faceList.length === 0) {
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    return;
  }

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
  glUtil.uniform(gl, 'u_resolution', [canvas.width, canvas.height]);

  for (const face of faceList) {
    const box = face.boundingBox;
    const [faceX, faceY] = [
      (box.left + box.right) / 2,
      (box.top + box.bottom) / 2,
    ];

    glUtil.texture(gl, 'u_texture', bitmap);
    glUtil.uniform(gl, 'u_faceCoord', [faceX, faceY]);
    glUtil.uniform(gl, 'u_faceSize', [box.width, box.height]);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    bitmap = await createImageBitmap(canvas);
  }
}

export default faceBulge;
