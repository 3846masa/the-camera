precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
uniform vec2 u_faceCoord;
uniform vec2 u_faceSize;
varying vec2 v_texCoord;

void main() {
  vec2 pixel = vec2(1.0, 1.0) / u_resolution;
  vec2 faceCoord = u_faceCoord * pixel;
  vec2 faceSize = u_faceSize * pixel;

  vec2 radius = faceSize / 2.0;
  vec2 dist = (v_texCoord - faceCoord);
  float percentage = length(dist / radius);

  if (percentage < 1.0) {
    float transform = smoothstep(0.0, 1.0, percentage);
    vec2 transformedCoord = (v_texCoord - faceCoord) * transform + faceCoord;
    gl_FragColor = texture2D(u_texture, transformedCoord);
  } else {
    gl_FragColor = texture2D(u_texture, v_texCoord);
  }
}
