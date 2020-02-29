/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLProgram} shaderProgram
 */
function use(gl, sp) {
  gl.useProgram(sp.id);
}

/**
 * @param {WebGL2RenderingContext} gl
 * @param {VertexArray} vao
 * @param {IndexBuffer} ibo
 * @param {ShaderProgram} sp
 * @param {Object} uniformData
 */
function draw(gl, vao, ibo, sp, uniforms) {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindVertexArray(vao.id);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo.id);
  // enable all attrib locations
  vao.attribLocations.forEach((attribLocation) => {
    gl.enableVertexAttribArray(attribLocation);
  });

  Object.entries(uniforms).forEach(([type, uniform]) => {
    Object.entries(uniform).forEach(([name, data]) => {
      const location = sp.uniformLocations[name];

      switch (type) {
        case 'uniform3f':
          gl.uniform3fv(location, new Float32Array(data));
          break;

        default:
          break;
      }
    });
  });
  gl.drawElements(gl.TRIANGLES, ibo.length, gl.UNSIGNED_SHORT, 0);
}

export default { use, draw };
