import { OutgoingMessage } from '@/messages/outgoing-message.ts';

export interface ChangeHudPageData {
  connectionId: number;
  hudPage: string;
}

export class ChangeHudPageMessage extends OutgoingMessage<ChangeHudPageData> {
  public getBuffer(): Buffer {
    return this.writer
      .writeUInt8(49)
      .writeInt32LE(this.input.connectionId)
      .writeString(this.input.hudPage).buffer;
  }
}
