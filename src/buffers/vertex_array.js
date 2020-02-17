import VertexBuffer from './vertex_buffer.js';

class VertexArray {
  /**
   *
   * @param {WebGL2RenderingContext} gl
   * @param {Object} buffers
   */
  constructor(gl, buffers) {
    this.attribLocations = [];
    this.bufferIDs = [];
    this.id = gl.createVertexArray();

    for (let i = 0; i < buffers.length; i += 1) {
      const {
        attribLocation, data, size,
      } = buffers[i];
      this.bufferIDs.push(new VertexBuffer(data).id);
      gl.vertexAttribPointer(attribLocation, size, gl.FLOAT, false, 0, 0);
      this.attribLocations.push(attribLocation);
    }
  }
}

export { VertexArray as default };
