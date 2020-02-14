import VertexShader from './vertex_shader.js';
import FragmentShader from './fragment_shader.js';

class ShaderProgram {
  /**
   * @param {WebGL2RenderingContext} gl - OpenGL context
   * @param {String} vsPath - Path to vertex shader source code
   * @param {String} fsPath - Path to fragment shader source code
   */
  constructor(gl, vsPath, fsPath) {
    this.id = ShaderProgram.createShaderProgram(gl, vsPath, fsPath);
  }

  /**
   * Creates a shader program in the OpenGL context
   * @param {WebGL2RenderingContext} gl - OpenGL context
   * @param {String} vsPath - Path to vertex shader source code
   * @param {String} fsPath - Path to fragment shader source code
   */
  static async createShaderProgram(gl, vsPath, fsPath) {
    const id = gl.createProgram();

    /** fetch shader source from files in src/shaders/ */
    const vsFile = await fetch(`src/shaders/${vsPath}`);
    const fsFile = await fetch(`src/shaders/${fsPath}`);
    const vsSource = await vsFile.text();
    const fsSource = await fsFile.text();

    const fs = new FragmentShader(gl, fsSource);
    const vs = new VertexShader(gl, vsSource);

    gl.attachShader(id, fs.id);
    gl.attachShader(id, vs.id);
    gl.linkProgram(id);

    const success = gl.getProgramParameter(id, gl.LINK_STATUS);
    if (!success) {
      throw new Error(gl.getProgramInfoLog(id));
    }
    return id;
  }
}
/** @export ShaderProgram */
export { ShaderProgram as default };
