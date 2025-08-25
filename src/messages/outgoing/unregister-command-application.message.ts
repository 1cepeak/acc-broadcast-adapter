import { OutgoingMessage } from '@/messages/outgoing-message';

export type UnregisterCommandApplicationData = object;

export class UnregisterCommandApplicationMessage extends OutgoingMessage<UnregisterCommandApplicationData> {
  public getBuffer(): Buffer {
    return this.writer.writeUInt8(9).buffer;
  }
}
