import { IncomingMessage } from '../incoming-message.js';

export type CupCategory = 'pro' | 'pro-am' | 'am' | 'silver' | 'national';

export interface CarInfo {
  modelType: number;
  teamName: string;
  raceNumber: number;
  cupCategory: CupCategory;
  currentDriverIndex: number;
  nationality: number;
}

export type DriverCategory = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface DriverInfo {
  firstName: string;
  lastName: string;
  shortName: string;
  category: DriverCategory;
  nationality: number;
}

export interface EntryListCarData {
  carIndex: number;
  carInfo: CarInfo;
  driversOnCarCount: number;
  driversInfo: DriverInfo[];
}

export class EntryListCarMessage extends IncomingMessage<EntryListCarData> {
  private getCupCategory(rawValue: number): CupCategory {
    const map: Record<number, CupCategory> = {
      0: 'pro',
      1: 'pro-am',
      2: 'am',
      3: 'silver',
      4: 'national',
    };

    return map[rawValue];
  }

  private getDriverCategory(rawValue: number): DriverCategory {
    const map: Record<number, DriverCategory> = {
      0: 'bronze',
      1: 'silver',
      2: 'gold',
      3: 'platinum',
    };

    return map[rawValue];
  }

  public parse(): EntryListCarData {
    const carIndex = this.reader.readUInt16LE();
    const carInfo: CarInfo = {
      modelType: this.reader.readUInt8(),
      teamName: this.reader.readString(),
      raceNumber: this.reader.readInt32LE(),
      cupCategory: this.getCupCategory(this.reader.readUInt8()),
      currentDriverIndex: this.reader.readUInt8(),
      nationality: this.reader.readUInt16LE(),
    };

    const driversOnCarCount = this.reader.readUInt8();
    const driversInfo: DriverInfo[] = [];

    for (let i = 0; i < driversOnCarCount; i += 1) {
      driversInfo.push({
        firstName: this.reader.readString(),
        lastName: this.reader.readString(),
        shortName: this.reader.readString(),
        category: this.getDriverCategory(this.reader.readUInt8()),
        nationality: this.reader.readUInt16LE(),
      });
    }

    return {
      carIndex,
      carInfo,
      driversOnCarCount,
      driversInfo,
    };
  }
}
