precision mediump float;

#define SIGMA 25.0
#define BSIGMA 0.4
#define KERNEL_SIZE 20.0
const float PI = 3.141593;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

float normpdf(float x, float sigma) {
  return (
    (inversesqrt(2.0 * PI) / sigma) *
    exp(-0.5 * dot(x, x) / pow(sigma, 2.0))
  );
}

float normpdf2d(vec2 vec, float sigma) {
  return normpdf(vec.x, sigma) * normpdf(vec.y, sigma);
}

float normpdf3d(vec3 vec, float sigma) {
  return normpdf(vec.x, sigma) * normpdf(vec.y, sigma) * normpdf(vec.z, sigma);
}

void main() {
  vec2 pixel = vec2(1.0, 1.0) / u_resolution;
  vec3 color = texture2D(u_texture, v_texCoord).rgb;

  vec3 numer = vec3(0.0);
  vec3 denom = vec3(0.0);

  for (float m = -KERNEL_SIZE / 2.0; m <= KERNEL_SIZE / 2.0; m++) {
    for (float n = -KERNEL_SIZE / 2.0; n <= KERNEL_SIZE / 2.0; n++) {
      vec2 shift = vec2(m, n);
      vec3 tmpColor = texture2D(u_texture, v_texCoord + shift * pixel).rgb;
      vec3 diffColor = tmpColor - color;

      float factor = normpdf3d(diffColor, BSIGMA) * normpdf2d(shift, SIGMA);
      numer += factor * tmpColor;
      denom += factor;
    }
  }
  
  gl_FragColor = vec4(numer / denom, 1.0);
}
