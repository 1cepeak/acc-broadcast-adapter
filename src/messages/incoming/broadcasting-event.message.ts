import { IncomingMessage } from '@/messages/incoming-message.ts';

export type EventType =
  | 'none'
  | 'green-flag'
  | 'session-over'
  | 'penalty-message'
  | 'accident'
  | 'lap-completed'
  | 'best-session-lap'
  | 'best-personal-lap';

export interface BroadcastingEventData {
  type: EventType;
  message: string;
  time: number;
  carIndex: number;
}

export class BroadcastingEventMessage extends IncomingMessage<BroadcastingEventData> {
  private getType(rawValue: number): EventType {
    const map: Record<number, EventType> = {
      0: 'none',
      1: 'green-flag',
      2: 'session-over',
      3: 'penalty-message',
      4: 'accident',
      5: 'lap-completed',
      6: 'best-session-lap',
      7: 'best-personal-lap',
    };

    return map[rawValue];
  }

  public parse(): BroadcastingEventData {
    return {
      type: this.getType(this.reader.readUInt8()),
      message: this.reader.readString(),
      time: this.reader.readInt32LE(),
      carIndex: this.reader.readInt32LE(),
    };
  }
}
