import type { Lap } from '@/buffer-reader';
import { IncomingMessage } from '@/messages/incoming-message';

export type SessionType =
  | 'practice'
  | 'qualifying'
  | 'superpole'
  | 'race'
  | 'hotlap'
  | 'hotstint'
  | 'hotlap-superpole'
  | 'replay';

export type Phase =
  | 'none'
  | 'starting'
  | 'pre-formation'
  | 'formation-lap'
  | 'pre-session'
  | 'session'
  | 'session-over'
  | 'post-session'
  | 'results';

export interface Replay {
  sessionTime: number;
  remainingTime: number;
}

export interface RealtimeUpdateData {
  eventId: number;
  sessionId: number;
  sessionType: SessionType;
  phase: Phase;
  sessionTime: number;
  sessionEndTime: number;
  focusedCarIndex: number;
  activeCameraSet: string;
  activeCamera: string;
  currentHudPage: string;
  isReplayPlaying: boolean;
  replay: Replay | null;
  timeOfDay: number;
  ambientTemperature: number;
  trackTemperature: number;
  clouds: number;
  rainLevel: number;
  wetness: number;
  bestSessionLap: Lap;
}

export class RealtimeUpdateMessage extends IncomingMessage<RealtimeUpdateData> {
  private getSessionType(rawValue: number): SessionType {
    const map: Record<number, SessionType> = {
      0: 'practice',
      4: 'qualifying',
      9: 'superpole',
      10: 'race',
      11: 'hotlap',
      12: 'hotstint',
      13: 'hotlap-superpole',
      14: 'replay',
    };

    return map[rawValue];
  }

  private getPhase(rawValue: number): Phase {
    const map: Record<number, Phase> = {
      0: 'none',
      1: 'starting',
      2: 'pre-formation',
      3: 'formation-lap',
      4: 'pre-session',
      5: 'session',
      6: 'session-over',
      7: 'post-session',
      8: 'results',
    };

    return map[rawValue];
  }

  public parse(): RealtimeUpdateData {
    const eventId = this.reader.readUInt16LE();
    const sessionId = this.reader.readUInt16LE();
    const sessionType = this.getSessionType(this.reader.readUInt8());
    const phase = this.getPhase(this.reader.readUInt8());
    const sessionTime = this.reader.readFloatLE();
    const sessionEndTime = this.reader.readFloatLE();

    const focusedCarIndex = this.reader.readInt32LE();
    const activeCameraSet = this.reader.readString();
    const activeCamera = this.reader.readString();
    const currentHudPage = this.reader.readString();

    const isReplayPlaying = this.reader.readBoolean();
    const replay: Replay | null = isReplayPlaying
      ? {
          sessionTime: this.reader.readFloatLE(),
          remainingTime: this.reader.readFloatLE(),
        }
      : null;

    const timeOfDay = this.reader.readUInt16LE();

    const ambientTemperature = this.reader.readUInt8();
    const trackTemperature = this.reader.readUInt8();
    const clouds = this.reader.readUInt8() / 10;
    const rainLevel = this.reader.readUInt8() / 10;
    const wetness = this.reader.readUInt8() / 10;

    const bestSessionLap = this.reader.readLap();

    return {
      eventId,
      sessionId,
      sessionType,
      phase,
      sessionTime,
      sessionEndTime,
      focusedCarIndex,
      activeCameraSet,
      activeCamera,
      currentHudPage,
      isReplayPlaying,
      replay,
      timeOfDay,
      ambientTemperature,
      trackTemperature,
      clouds,
      rainLevel,
      wetness,
      bestSessionLap,
    };
  }
}
