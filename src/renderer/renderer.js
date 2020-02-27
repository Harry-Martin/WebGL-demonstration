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
function draw(gl, vao, ibo, sp, uniformData) {
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindVertexArray(vao.id);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo.id);
  // enable all attrib locations
  for (let i = 0; i < vao.attribLocations.length; i += 1) {
    gl.enableVertexAttribArray(vao.attribLocations[i]);
  }
  gl.drawElements(gl.TRIANGLES, ibo.length, gl.UNSIGNED_SHORT, 0);
}

export default { use, draw };
