import { IncomingMessage } from '../incoming-message.js';

export interface RegistrationResultData {
  connectionId: number;
  success: boolean;
  isReadonly: boolean;
  errorMessage: string;
}

export class RegistrationResultMessage extends IncomingMessage<RegistrationResultData> {
  public parse(): RegistrationResultData {
    return {
      connectionId: this.reader.readInt32LE(),
      success: this.reader.readUInt8() === 1,
      isReadonly: this.reader.readUInt8() === 0,
      errorMessage: this.reader.readString(),
    };
  }
}
