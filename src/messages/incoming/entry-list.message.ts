import { IncomingMessage } from '@/messages/incoming-message';

export interface EntryListData {
  connectionId: number;
  carEntryCount: number;
  carEntryIndexes: number[];
}

export class EntryListMessage extends IncomingMessage<EntryListData> {
  public parse(): EntryListData {
    const connectionId = this.reader.readInt32LE();
    const carEntryCount = this.reader.readUInt16LE();
    const carEntryIndexes: number[] = [];

    for (let i = 0; i < carEntryCount; i += 1) {
      carEntryIndexes.push(this.reader.readUInt16LE());
    }

    return {
      connectionId,
      carEntryCount,
      carEntryIndexes,
    };
  }
}
