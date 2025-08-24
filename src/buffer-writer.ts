export class BufferWriter {
  private buffers: Buffer[] = [];

  public get buffer(): Buffer {
    return Buffer.concat(this.buffers);
  }

  public writeUInt8(value: number): BufferWriter {
    const buffer = Buffer.alloc(1);

    buffer.writeUInt8(value, 0);

    this.buffers.push(buffer);

    return this;
  }

  public writeInt8(value: number): BufferWriter {
    const buffer = Buffer.alloc(1);

    buffer.writeInt8(value, 0);

    this.buffers.push(buffer);

    return this;
  }

  public writeUInt16LE(value: number): BufferWriter {
    const buffer = Buffer.alloc(2);

    buffer.writeUInt16LE(value, 0);

    this.buffers.push(buffer);

    return this;
  }

  public writeInt16LE(value: number): BufferWriter {
    const buffer = Buffer.alloc(2);

    buffer.writeInt16LE(value, 0);

    this.buffers.push(buffer);

    return this;
  }

  public writeUInt32LE(value: number): BufferWriter {
    const buffer = Buffer.alloc(4);

    buffer.writeUInt32LE(value, 0);

    this.buffers.push(buffer);

    return this;
  }

  public writeInt32LE(value: number): BufferWriter {
    const buffer = Buffer.alloc(4);

    buffer.writeInt32LE(value, 0);

    this.buffers.push(buffer);

    return this;
  }

  public writeBoolean(value: boolean): BufferWriter {
    const buffer = Buffer.alloc(1);

    buffer.writeUInt8(value ? 1 : 0, 0);

    this.buffers.push(buffer);

    return this;
  }

  public writeString(value: string): BufferWriter {
    const stringByteLength = Buffer.byteLength(value, 'utf8');
    const buffer = Buffer.alloc(stringByteLength + 2);

    buffer.writeUInt16LE(stringByteLength, 0);
    buffer.write(value, 2, stringByteLength, 'utf8');

    this.buffers.push(buffer);

    return this;
  }

  public writeFloatLE(value: number): BufferWriter {
    const buffer = Buffer.alloc(4);

    buffer.writeFloatLE(value, 0);

    this.buffers.push(buffer);

    return this;
  }
}
