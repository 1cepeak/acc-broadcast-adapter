import { OutgoingMessage } from '@/messages/outgoing-message';

export interface RequestEntryListData {
  connectionId: number;
}

export class RequestEntryListMessage extends OutgoingMessage<RequestEntryListData> {
  public getBuffer(): Buffer {
    return this.writer.writeUInt8(10).writeInt32LE(this.input.connectionId).buffer;
  }
}
