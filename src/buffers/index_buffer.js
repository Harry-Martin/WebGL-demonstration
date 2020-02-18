class IndexBuffer {
  /**
   *
   * @param {WebGL2RenderingContext} gl
   * @param {Array} data
   */
  constructor(gl, data) {
    this.id = gl.createBuffer();
    this.length = data.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.id);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
  }
}

export { IndexBuffer as default };
