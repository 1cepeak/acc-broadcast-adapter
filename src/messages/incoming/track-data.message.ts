import { IncomingMessage } from '../incoming-message.js';

export type CameraSets = Record<string, string[]>;

export interface TrackData {
  connectionId: number;
  trackName: string;
  trackId: number;
  trackLength: number;
  cameraSets: CameraSets;
  hudPages: string[];
}

export class TrackDataMessage extends IncomingMessage<TrackData> {
  public parse(): TrackData {
    const connectionId = this.reader.readInt32LE();
    const trackName = this.reader.readString();
    const trackId = this.reader.readInt32LE();
    const trackLength = this.reader.readInt32LE();
    const cameraSets: CameraSets = {};
    const cameraSetCount = this.reader.readUInt8();

    for (let cameraSetIndex = 0; cameraSetIndex < cameraSetCount; cameraSetIndex += 1) {
      const cameraSetName = this.reader.readString();

      cameraSets[cameraSetName] = [];

      const cameraCount = this.reader.readUInt8();

      for (let cameraIndex = 0; cameraIndex < cameraCount; cameraIndex += 1) {
        const cameraName = this.reader.readString();

        cameraSets[cameraSetName].push(cameraName);
      }
    }

    const hudPages: string[] = [];
    const hudPagesCount = this.reader.readUInt8();

    for (let i = 0; i < hudPagesCount; i += 1) {
      hudPages.push(this.reader.readString());
    }

    return {
      connectionId,
      trackName,
      trackId,
      trackLength,
      cameraSets,
      hudPages,
    };
  }
}
