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

    gl.bindVertexArray(this.id);

    for (let i = 0; i < buffers.length; i += 1) {
      const buffer = new VertexBuffer(gl, buffers[i].data);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.id);
      this.bufferIDs.push(buffer.id);
      gl.vertexAttribPointer(buffers[i].attribLocation, buffers[i].size, gl.FLOAT, false, 0, 0);
      this.attribLocations.push(buffers[i].attribLocation);
    }
  } 
}

export { VertexArray as default };
