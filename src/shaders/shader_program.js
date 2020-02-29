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
    this.uniformLocations = this.findUniformLocations(gl, uniforms);
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
   * find and store the location of each uniform
   * @param {WebGL2RenderingContext} gl
   * @param {Array} uniforms contains arrays of uniforms of each type
   */
  findUniformLocations(gl, uniforms) {
    const locations = {};
    Object.entries(uniforms).forEach(([, uniform]) => {
      Object.entries(uniform).forEach(([name]) => {
        locations[name] = gl.getUniformLocation(this.id, name);
      });
    });
    return locations;
  }
}

/** @export ShaderProgram */
export { ShaderProgram as default };
