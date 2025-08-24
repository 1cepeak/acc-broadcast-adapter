import type { Lap } from '../../buffer-reader.js';
import { IncomingMessage } from '../incoming-message.js';

type CarLocation = 'unknown' | 'track' | 'pit-lane' | 'pit-entry' | 'pit-exit';

export interface RealtimeCarUpdateData {
  carIndex: number;
  driverIndex: number;
  driverCount: number;
  gear: number;
  worldPosX: number;
  worldPosY: number;
  yaw: number;
  carLocation: CarLocation;
  kmh: number;
  position: number;
  trackPosition: number;
  splinePosition: number;
  delta: number;
  bestSessionLap: Lap;
  lastLap: Lap;
  currentLap: Lap;
  laps: number;
  cupPosition: number;
}

export class RealTimeCarUpdateMessage extends IncomingMessage<RealtimeCarUpdateData> {
  private getCarLocation(rawValue: number): CarLocation {
    const map: Record<number, CarLocation> = {
      0: 'unknown',
      1: 'track',
      2: 'pit-lane',
      3: 'pit-entry',
      4: 'pit-exit',
    };

    return map[rawValue];
  }

  public parse(): RealtimeCarUpdateData {
    const carIndex = this.reader.readUInt16LE();
    const driverIndex = this.reader.readUInt16LE();
    const driverCount = this.reader.readUInt8();
    const gear = this.reader.readUInt8();
    const worldPosX = this.reader.readFloatLE();
    const worldPosY = this.reader.readFloatLE();
    const yaw = this.reader.readFloatLE();
    const carLocation = this.getCarLocation(this.reader.readUInt8());
    const kmh = this.reader.readUInt16LE();
    const position = this.reader.readUInt16LE();
    const cupPosition = this.reader.readUInt16LE();
    const trackPosition = this.reader.readUInt16LE();
    const splinePosition = this.reader.readFloatLE();
    const laps = this.reader.readUInt16LE();
    const delta = this.reader.readInt32LE();
    const bestSessionLap = this.reader.readLap();
    const lastLap = this.reader.readLap();
    const currentLap = this.reader.readLap();

    return {
      carIndex,
      driverIndex,
      driverCount,
      gear,
      worldPosX,
      worldPosY,
      yaw,
      carLocation,
      kmh,
      position,
      cupPosition,
      trackPosition,
      splinePosition,
      laps,
      delta,
      bestSessionLap,
      lastLap,
      currentLap,
    };
  }
}
