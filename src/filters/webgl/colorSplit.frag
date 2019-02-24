precision mediump float;

uniform sampler2D u_texture;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

void main() {
  vec2 pixel = vec2(1.0, 1.0) / u_resolution;
  float red = texture2D(u_texture, v_texCoord + vec2(-10.0, 15.0) * pixel).r;
  float green = texture2D(u_texture, v_texCoord).g;
  float blue = texture2D(u_texture, v_texCoord + vec2(10.0, -15.0) * pixel).b;
  gl_FragColor = vec4(red, green, blue, 1.0);
}
