/* eslint-disable indent */
/* eslint-disable no-multi-spaces */

import ShaderProgram from './shaders/shader_program.js';
import VertexArray from './buffers/vertex_array.js';
import IndexBuffer from './buffers/index_buffer.js';
import Renderer from './renderer/renderer.js';
import { glMatrix, mat4 } from './libraries/gl-matrix/index.js';


async function sourceFromFile(filename) {
  const file = await fetch(`./src/shaders/${filename}`);
  const source = await file.text();
  return source;
}

async function main() {
  const canvas = document.getElementById('glContext');

  /** @type {WebGL2RenderingContext} */
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    throw new Error('Unable to get WebGL2 Context');
  }

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const ortho = mat4.create();
  mat4.ortho(ortho, -1, 1, -1, 1, -1, 1);

  const model = mat4.create();
  mat4.identity(model);
  mat4.translate(model, model, [0.0, 0.0, 0]);
  mat4.rotateX(model, model, glMatrix.toRadian(0));


  const uniforms = {
    uniformMatrix4fv: {
      u_ortho: ortho,
      u_model: model,
    },
  };

  const sp = new ShaderProgram(gl,
    await sourceFromFile('simple.vert'),
    await sourceFromFile('simple.frag'),
    uniforms);

  const positions = [
    // front
    -0.5,  0.5,  0.5,  // top left      0
    -0.5, -0.5,  0.5,  // bottom left   1
     0.5,  0.5,  0.5,  // top right     2
     0.5, -0.5,  0.5, // bottom right   3

     // back
     -0.5,  0.5,  -0.5,  // top left    4
     -0.5, -0.5,  -0.5,  // bottom left 5
      0.5,  0.5,  -0.5,  // top right   6
      0.5, -0.5,  -0.5, // bottom right 7
  ];

  const colours = [

    1, 0, 0, 1,
    0, 1, 0, 1,
    0, 0, 1, 1,
    1, 1, 0, 1,

    0, 1, 1, 1,
    1, 0, 1, 1,
    1, 1, 1, 1,
    0, 0, 0, 1,
    ];

  const indices = [
    // front face
    2, 0, 1,
    1, 3, 2,
    // back face
    5, 4, 6,
    6, 7, 5,
    // left face
    0, 4, 5,
    5, 1, 0,
    // right face
    6, 2, 3,
    3, 7, 6,
    // top face
    6, 4, 0,
    0, 2, 6,
    // bottom face
    3, 1, 5,
    5, 7, 3,
  ];

  const vao = new VertexArray(gl, [{
    attribLocation: 1,
    data: positions,
    size: 3, /** how many floats per vertex? */
  },
  {
    attribLocation: 2,
    data: colours,
    size: 3,
  }]);

  const ibo = new IndexBuffer(gl, indices);

  Renderer.use(gl, sp);
  gl.enable(gl.DEPTH_TEST);

  function loop() {
    Renderer.draw(gl, vao, ibo, sp, uniforms);
    mat4.rotate(model, model, glMatrix.toRadian(2), [1, 0.5, 0.2]);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}


window.onload = main();
