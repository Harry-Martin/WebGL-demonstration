
import ShaderProgram from './shaders/shader_program.js';
import VertexArray from './buffers/vertex_array.js';
import IndexBuffer from './buffers/index_buffer.js';
import Renderer from './renderer/renderer.js';

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

  const translation = [0, -0.5, 0];
  const uniforms = {
    uniform3f: {
      u_translation: translation,
    },
  };

  const sp = new ShaderProgram(gl,
    await sourceFromFile('simple.vert'),
    await sourceFromFile('simple.frag'),
    uniforms);

  const positions = [
    0.0, 0.5, 0.0,
    0.5, 0.0, 0.0,
    -0.5, 0.0, 0.0,
    0.0, -0.5, 0.0,
  ];

  const indices = [
    0, 1, 2,
    2, 1, 3,
  ];
  const vao = new VertexArray(gl, [{
    attribLocation: 1,
    data: positions,
    size: 3, /** how many floats per vertex? */
  }]);

  const ibo = new IndexBuffer(gl, indices);

  Renderer.use(gl, sp);

  let xvel = 0.01;
  let yvel = 0.01;
  function loop() {
    translation[0] += xvel;
    translation[1] += yvel;
    if (translation[0] > 0.5 || translation[0] < -0.5) xvel *= -1;
    if (translation[1] > 0.5 || translation[1] < -0.5) yvel *= -1;

    Renderer.draw(gl, vao, ibo, sp, uniforms);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}


window.onload = main();
