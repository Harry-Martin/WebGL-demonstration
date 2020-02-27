import VertexShader from './vertex_shader.js';
import FragmentShader from './fragment_shader.js';

class ShaderProgram {
  /**
   * @param {WebGL2RenderingContext} gl - OpenGL context
   * @param {String} vsPath - Path to vertex shader source code
   * @param {String} fsPath - Path to fragment shader source code
   */
  constructor(gl, vsSource, fsSource, uniforms) {
    this.id = gl.createProgram();
    this.linkShaderProgram(gl, vsSource, fsSource);
  }

  /**
   * Creates a shader program in the OpenGL context
   * @param {WebGL2RenderingContext} gl - OpenGL context
   * @param {String} vsPath - Path to vertex shader source code
   * @param {String} fsPath - Path to fragment shader source code
   */
  linkShaderProgram(gl, vsSource, fsSource) {
    /** fetch shader source */

    /** compile shaders */
    const vs = new VertexShader(gl, vsSource);
    const fs = new FragmentShader(gl, fsSource);

    /** link shaders */
    gl.attachShader(this.id, vs.id);
    gl.attachShader(this.id, fs.id);
    gl.linkProgram(this.id);

    const success = gl.getProgramParameter(this.id, gl.LINK_STATUS);
    if (!success) {
      throw new Error(gl.getProgramInfoLog(this.id));
    }
  }

  /**
   * 
   * @param {WebGL2RenderingContext} gl 
   * @param {Array} uniforms contains arrays of uniforms of each type
   */

}
/** @export ShaderProgram */
export { ShaderProgram as default };
