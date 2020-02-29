#version 300 es

layout(location = 1) in vec3 a_position;
layout(location = 2) in vec4 a_colour;

uniform mat4 u_ortho;
uniform mat4 u_perspective;
uniform mat4 u_model;

out vec4 colour;

void main() {
  gl_Position = u_model * u_ortho * vec4(a_position, 1.0);
  colour = a_colour;
}