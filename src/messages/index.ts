import { type EntryListData, EntryListMessage } from './incoming/entry-list.message.js';
import { type EntryListCarData, EntryListCarMessage } from './incoming/entry-list-car.message.js';
import {
  type RealtimeCarUpdateData,
  RealTimeCarUpdateMessage,
} from './incoming/realtime-car-update.message.js';
import {
  type RealtimeUpdateData,
  RealtimeUpdateMessage,
} from './incoming/realtime-update.message.js';
import {
  type RegistrationResultData,
  RegistrationResultMessage,
} from './incoming/registration-result.message.js';
import { type TrackData, TrackDataMessage } from './incoming/track-data.message.js';
import {
  type RegisterCommandApplicationData,
  RegisterCommandApplicationMessage,
} from './outgoing/register-command-application.message.js';
import {
  type RequestEntryListData,
  RequestEntryListMessage,
} from './outgoing/request-entry-list.message.js';

export type IncomingMessages =
  | 'registration-result'
  | 'realtime-update'
  | 'realtime-car-update'
  | 'entry-list'
  | 'entry-list-car'
  | 'track-data';

export function getIncomingMessageType(rawValue: number): IncomingMessages {
  const map: Record<number, IncomingMessages> = {
    1: 'registration-result',
    2: 'realtime-update',
    3: 'realtime-car-update',
    4: 'entry-list',
    6: 'entry-list-car',
    5: 'track-data',
  };

  return map[rawValue];
}

export interface IncomingMessagesMap {
  'registration-result': RegistrationResultData;
  'realtime-update': RealtimeUpdateData;
  'realtime-car-update': RealtimeCarUpdateData;
  'entry-list': EntryListData;
  'entry-list-car': EntryListCarData;
  'track-data': TrackData;
}

export const incomingMessagesHandlers = {
  'registration-result': (buffer: Buffer) => new RegistrationResultMessage(buffer).parse(),
  'realtime-update': (buffer: Buffer) => new RealtimeUpdateMessage(buffer).parse(),
  'realtime-car-update': (buffer: Buffer) => new RealTimeCarUpdateMessage(buffer).parse(),
  'entry-list': (buffer: Buffer) => new EntryListMessage(buffer).parse(),
  'entry-list-car': (buffer: Buffer) => new EntryListCarMessage(buffer).parse(),
  'track-data': (buffer: Buffer) => new TrackDataMessage(buffer).parse(),
};

export type OutgoingMessages = 'register-commands-application' | 'request-entry-list';

export interface OutgoingMessagesMap {
  'register-commands-application': RegisterCommandApplicationData;
  'request-entry-list': RequestEntryListData;
}

export const outgoingMessagesSenders = {
  'register-commands-application': (data: RegisterCommandApplicationData) =>
    new RegisterCommandApplicationMessage(data).getBuffer(),
  'request-entry-list': (data: RequestEntryListData) =>
    new RequestEntryListMessage(data).getBuffer(),
};
