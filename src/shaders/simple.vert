#version 300 es

layout(location = 1) in vec3 a_position;
layout(location = 2) in vec4 a_colour;

uniform mat4 u_view;
uniform mat4 u_perspective;
uniform mat4 u_model;

out vec4 colour;

void main() {
  gl_Position = u_perspective * u_view * u_model * vec4(a_position, 1.0);
  colour = a_colour;
}