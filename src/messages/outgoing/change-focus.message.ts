import { OutgoingMessage } from '@/messages/outgoing-message.ts';

export interface ChangeFocusData {
  connectionId: number;
  carIndex: number;
  cameraSet: string;
  camera: string;
}

export class ChangeFocusMessage extends OutgoingMessage<ChangeFocusData> {
  public getBuffer(): Buffer {
    return this.writer
      .writeUInt8(50)
      .writeInt32LE(this.input.connectionId)
      .writeBoolean(true)
      .writeUInt16LE(this.input.carIndex)
      .writeBoolean(true)
      .writeString(this.input.cameraSet)
      .writeString(this.input.camera).buffer;
  }
}
