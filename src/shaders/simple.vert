#version 300 es

layout(location = 1) in vec4 a_position;

uniform vec3 u_translation;

void main() {
  gl_Position = a_position + vec4(u_translation, 0);
}