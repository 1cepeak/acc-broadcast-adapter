import { type EntryListData, EntryListMessage } from '@/messages/incoming/entry-list.message';
import {
  type EntryListCarData,
  EntryListCarMessage,
} from '@/messages/incoming/entry-list-car.message';
import {
  type RealtimeCarUpdateData,
  RealTimeCarUpdateMessage,
} from '@/messages/incoming/realtime-car-update.message';
import {
  type RealtimeUpdateData,
  RealtimeUpdateMessage,
} from '@/messages/incoming/realtime-update.message';
import {
  type RegistrationResultData,
  RegistrationResultMessage,
} from '@/messages/incoming/registration-result.message';
import { type TrackData, TrackDataMessage } from '@/messages/incoming/track-data.message';
import {
  type RegisterCommandApplicationData,
  RegisterCommandApplicationMessage,
} from '@/messages/outgoing/register-command-application.message';
import {
  type RequestEntryListData,
  RequestEntryListMessage,
} from '@/messages/outgoing/request-entry-list.message';
import {
  type UnregisterCommandApplicationData,
  UnregisterCommandApplicationMessage,
} from '@/messages/outgoing/unregister-command-application.message.ts';
import {
  type RequestTrackData,
  RequestTrackDataMessage,
} from '@/messages/outgoing/request-track-data.message.ts';

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

export type OutgoingMessages =
  | 'register-commands-application'
  | 'unregister-command-application'
  | 'request-entry-list'
  | 'request-track-data';

export interface OutgoingMessagesMap {
  'register-commands-application': RegisterCommandApplicationData;
  'unregister-command-application': UnregisterCommandApplicationData;
  'request-entry-list': RequestEntryListData;
  'request-track-data': RequestTrackData;
}

export const outgoingMessagesSenders = {
  'register-commands-application': (data: RegisterCommandApplicationData) =>
    new RegisterCommandApplicationMessage(data).getBuffer(),
  'unregister-command-application': (data: UnregisterCommandApplicationData) =>
    new UnregisterCommandApplicationMessage(data).getBuffer(),
  'request-entry-list': (data: RequestEntryListData) =>
    new RequestEntryListMessage(data).getBuffer(),
  'request-track-data': (data: RequestTrackData) => new RequestTrackDataMessage(data).getBuffer(),
};
