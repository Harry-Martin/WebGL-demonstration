import ShaderProgram from './shaders/shader_program.js';
import VertexArray from './buffers/vertex_array.js';
import IndexBuffer from './buffers/index_buffer.js';

async function main() {
  const canvas = document.getElementById('glContext');

  /** @type {WebGL2RenderingContext} */
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    throw new Error('Unable to get WebGL2 Context');
  }

  const sp = new ShaderProgram(gl, 'simple');

  const positions = [
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0];

  const vao = new VertexArray(gl, {
    attribLocation: 0,
    data: positions,
    size: 3,
  });

  const ibo = new IndexBuffer(gl, [0, 1, 2]);
}

window.onload = main();
