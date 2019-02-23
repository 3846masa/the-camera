precision mediump float;

uniform sampler2D u_texture;
varying vec2 v_texCoord;

void main() {
  vec4 color = texture2D(u_texture, v_texCoord);
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = vec4(vec3(gray), 1.0);
}
