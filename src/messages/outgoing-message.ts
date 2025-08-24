import { BufferWriter } from '../buffer-writer.js';

export abstract class OutgoingMessage<MessageData extends object> {
  protected writer: BufferWriter = new BufferWriter();
  protected readonly input: MessageData;

  constructor(data: MessageData) {
    this.input = { ...data };
  }

  abstract getBuffer(): Buffer;
}
