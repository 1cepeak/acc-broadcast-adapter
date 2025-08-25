import { OutgoingMessage } from '@/messages/outgoing-message.ts';

export interface RequestTrackData {
  connectionId: number;
}

export class RequestTrackDataMessage extends OutgoingMessage<RequestTrackData> {
  public getBuffer(): Buffer {
    return this.writer.writeUInt8(11).writeInt32LE(this.input.connectionId).buffer;
  }
}
