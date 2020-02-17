import Shader from './shader.js';

class FragmentShader extends Shader {
  /**
   *
   * @param {WebGL2RenderingContext} gl - OpenGL context
   * @param {String} src - Shader source code
   */
  constructor(gl, src) {
    super(gl, src, gl.FRAGMENT_SHADER);
  }
}
/** @export FragmentShader */
export { FragmentShader as default };
