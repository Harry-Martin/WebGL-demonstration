class VertexBuffer {
  /**
   *
   * @param {WebGL2RenderingContext} gl
   * @param {Array} data
   */
  constructor(gl, data) {
    this.id = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.id);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  }
}

export { VertexBuffer as default };
