import ShaderProgram from './shader_program.js';

async function main() {
  const canvas = document.getElementById('glContext');

  /** @type {WebGL2RenderingContext} */
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    throw new Error('Unable to get WebGL2 Context');
  }

  const sp = new ShaderProgram(gl, 'simple.vs', 'simple.fs');
}

window.onload = main();
