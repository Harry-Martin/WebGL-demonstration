import ShaderProgram from './shaders/shader_program.js';
import VertexArray from './buffers/vertex_array.js';
import IndexBuffer from './buffers/index_buffer.js';
import Renderer from './renderer/renderer.js';

async function sourceFromFile(filename) {
  const file = await fetch(`./src/shaders/${filename}`);
  const source = await file.text();
  return source;
}

function main() {
  const canvas = document.getElementById('glContext');

  /** @type {WebGL2RenderingContext} */
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    throw new Error('Unable to get WebGL2 Context');
  }

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const sp = new ShaderProgram(gl,
    this.sourceFromFile('simple.vert'),
    this.sourceFromFile('simple.frag'));

  const positions = [
    0.0, 0.5, 0.0,
    0.5, 0.0, 0.0,
    -0.5, 0.0, 0.0,
    0.0, -0.5, 0.0,

    0.0 + 0.2, 0.5, 0.0,
    0.5 + 0.2, 0.0, 0.0,
    -0.5 + 0.2, 0.0, 0.0,
    0.0 + 0.2, -0.5, 0.0,
  ];

  const indices = [
    0, 1, 2,
    2, 1, 3,
    4, 5, 6,
    6, 5, 7,
  ];
  const vao = new VertexArray(gl, [{
    attribLocation: 1,
    data: positions,
    size: 3, /** how many floats per vertex? */
  }]);

  const ibo = new IndexBuffer(gl, indices);
  
  Renderer.use(gl, sp);
  Renderer.draw(gl, vao, ibo);

  /* ======== SETUP TIME ==========
    create shader program
      -create vertex shader
        -compile shader
      -create fragment shader
        -compile shader
      -link program
    create vao
    bind vao
    create vbos
      -> for each vbo
        bind vbo
        bufferData
        setup attribPointer

 /* ========= RENDER TIME ==========
  - clear
  - bind vao (select collection of buffers needed to draw)
  - enable all attribs for the vao (enable each of the buffers)
  - bind ibo (describe how to read data about 1 vertex)
  - use program
  - draw elements
  */
}

window.onload = main();
