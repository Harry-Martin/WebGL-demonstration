import ShaderProgram from './shader_program.js';

function main() {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('glContext');

  /** @type {WebGL2RenderingContext} */
  const gl = canvas.getContext('webgl2');


  if (!gl) {
    console.error('Unable to get WebGL2 Context');
    return -1;
  }

  const sp = new ShaderProgram(gl,
    `\
#version 300 es

in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`,
    `\
#version 300 es

precision mediump float;

out vec4 outColor;

void main(){
  outColor = vec4(1, 0, 0, 1);
}
`);

  return 0;
}

window.onload = main();
