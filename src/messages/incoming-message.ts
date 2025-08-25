import { BufferReader } from '@/buffer-reader';

export abstract class IncomingMessage<ParsingResult extends object> {
  protected readonly buffer: Buffer;
  protected readonly reader: BufferReader;
  protected readonly messageType: number;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
    this.reader = new BufferReader(this.buffer);
    this.messageType = this.reader.readUInt8();
  }

  public abstract parse(): ParsingResult;
}
