#version 300 es

layout(location = 1) in vec4 a_position;

void main() {
  gl_Position = a_position;
}