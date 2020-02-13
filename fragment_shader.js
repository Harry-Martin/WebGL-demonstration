import Shader from './shader.js';


class FragmentShader extends Shader {
  /**
   *
   * @param {WebGL2RenderingContext} gl OpenGL context
   * @param {String} src Shader source
   */
  constructor(gl, src) {
    super(gl, src, gl.FRAGMENT_SHADER);
  }
}

export { FragmentShader as default };
