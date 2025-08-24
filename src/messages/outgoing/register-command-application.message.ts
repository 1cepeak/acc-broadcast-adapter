import { OutgoingMessage } from '../outgoing-message.js';

export interface RegisterCommandApplicationData {
  displayName: string;
  connectionPassword: string;
  commandPassword: string;
  updateInterval: number;
}

export class RegisterCommandApplicationMessage extends OutgoingMessage<RegisterCommandApplicationData> {
  public getBuffer(): Buffer {
    this.writer
      .writeUInt8(1)
      .writeUInt8(4)
      .writeString(this.input.displayName)
      .writeString(this.input.connectionPassword)
      .writeInt32LE(this.input.updateInterval)
      .writeString(this.input.commandPassword);

    return this.writer.buffer;
  }
}
