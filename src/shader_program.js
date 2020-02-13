import VertexShader from './vertex_shader.js';
import FragmentShader from './fragment_shader.js';

class ShaderProgram {
  /**
   * @param {WebGL2RenderingContext} gl - OpenGL context
   * @param {String} vsSource - Vertex shader source code
   * @param {String} fsSource - Fragment shader source code
   */
  constructor(gl, vsSource, fsSource) {
    this.id = ShaderProgram.createShaderProgram(gl, vsSource, fsSource);
  }

  /**
   * Creates a shader program in the OpenGL context
   * @param {WebGL2RenderingContext} gl - OpenGL context
   * @param {String} fsSource - Fragment shader source code
   * @param {String} vsSource - Vertex shader source code
   */
  static createShaderProgram(gl, vsSource, fsSource) {
    const id = gl.createProgram();

    const fs = new FragmentShader(gl, fsSource);
    const vs = new VertexShader(gl, vsSource);

    gl.attachShader(id, fs.id);
    gl.attachShader(id, vs.id);
    gl.linkProgram(id);

    const success = gl.getProgramParameter(id, gl.LINK_STATUS);
    if (!success) {
      console.log(gl.getProgramInfoLog(id));
    }
    return id;
  }
}
/** @export ShaderProgram */
export { ShaderProgram as default };
