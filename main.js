import VertexShader from './vertex_shader.js';
import FragmentShader from './fragment_shader.js';

function main() {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('glContext');

  document.querySelector('body').appendChild(canvas);

  /** @type {WebGL2RenderingContext} */
  const gl = canvas.getContext('webgl2');


  if (!gl) {
    console.error('Unable to get WebGL2 Context');
    return -1;
  }
  const vs = new VertexShader(gl, `\
#version 300 es

in vec4 a_position;

void main() {
  gl_Position = a_position;
}
  `);

  const fs = new FragmentShader(gl, `\
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
