
class Shader {
  /**
   * Represents an OpenGL Shader object
   * @param {WebGL2RenderingContext} gl OpenGL context
   * @param {String} src Shader source code
   * @param {number} type Shader type  (gl.VERTEX_SHADER | gl.FRAGMENT_SHADER)
   */
  constructor(gl, src, type) {
    this.id = gl.createShader(type);
    this.compile(gl, src);
  }

  /**
   * Compiles the Shader
   * @param {WebGL2RenderingContext} gl OpenGL context
   * @param {String} src  Shader source code
   */
  compile(gl, src) {
    gl.shaderSource(this.id, src);
    gl.compileShader(this.id);
    const success = gl.getShaderParameter(this.id, gl.COMPILE_STATUS);
    if (!success) {
      console.error(gl.getShaderInfoLog(this.id));
    }
  }
}
/** @export Shader */
export { Shader as default };
