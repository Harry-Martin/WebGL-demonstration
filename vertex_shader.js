import Shader from './shader.js';

class VertexShader extends Shader {
  /**
   *
   * @param {WebGL2RenderingContext} gl OpenGL context
   * @param {String} src Shader source
   */
  constructor(gl, src) {
    super(gl, src, gl.VERTEX_SHADER);
  }
}

export { VertexShader as default };
