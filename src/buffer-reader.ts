export interface Lap {
  milliseconds: number;
  splits: (number | null)[];
  carIndex: number;
  driverIndex: number;
  isInvalid: boolean;
  isValidForBest: boolean;
  type: 'out' | 'regular' | 'in';
}

export class BufferReader {
  private readonly buffer: Buffer;
  private byteOffset: number = 0;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }

  private setBufferSize(offset: number) {
    this.byteOffset += offset;
  }

  public readUInt8(): number {
    const value = this.buffer.readUInt8(this.byteOffset);

    this.setBufferSize(1);

    return value;
  }

  public readInt8(): number {
    const value = this.buffer.readInt8(this.byteOffset);

    this.setBufferSize(1);

    return value;
  }

  public readUInt16LE(): number {
    const value = this.buffer.readUInt16LE(this.byteOffset);

    this.setBufferSize(2);

    return value;
  }

  public readInt16LE(): number {
    const value = this.buffer.readInt16LE(this.byteOffset);

    this.setBufferSize(2);

    return value;
  }

  public readUInt32LE(): number {
    const value = this.buffer.readUInt32LE(this.byteOffset);

    this.setBufferSize(4);

    return value;
  }

  public readInt32LE(): number {
    const value = this.buffer.readInt32LE(this.byteOffset);

    this.setBufferSize(4);

    return value;
  }

  public readBoolean(): boolean {
    return this.readUInt8() > 0;
  }

  public readString(): string {
    const length = this.readUInt16LE();
    const string = this.buffer.toString('utf8', this.byteOffset, this.byteOffset + length);

    this.setBufferSize(length);

    return string;
  }

  public readFloatLE(): number {
    const value = this.buffer.readFloatLE(this.byteOffset);

    this.setBufferSize(4);

    return value;
  }

  public readLap(): Lap {
    const milliseconds = this.readInt32LE();

    const carIndex = this.readUInt16LE();
    const driverIndex = this.readUInt16LE();
    const splitCount = this.readUInt8();
    const splits: (number | null)[] = new Array(splitCount);

    for (let i = 0; i < splitCount; i += 1) {
      splits.push(this.readInt32LE());
    }

    const isInvalid = this.readBoolean();
    const isValidForBest = this.readBoolean();
    const isOutLap = this.readBoolean();
    const isInLap = this.readBoolean();

    let type: Lap['type'];

    switch (true) {
      case isOutLap: {
        type = 'out';

        break;
      }
      case isInLap: {
        type = 'in';

        break;
      }
      default: {
        type = 'regular';
      }
    }

    while (splits.length < 3) {
      splits.push(null);
    }

    return {
      milliseconds,
      carIndex,
      driverIndex,
      isInvalid,
      isValidForBest,
      splits,
      type,
    };
  }
}
