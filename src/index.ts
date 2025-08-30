import { BroadcastAdapter, type Config } from '@/adapter';

export function createBroadcastAdapter(config: Config): BroadcastAdapter {
  return new BroadcastAdapter(config);
}

// Export types
export type { Config } from '@/adapter';
export type { IncomingMessages, OutgoingMessages } from '@/messages';
export type {
  BroadcastingEventData,
  EventType,
} from '@/messages/incoming/broadcasting-event.message';
export type { EntryListData } from '@/messages/incoming/entry-list.message';
export type {
  CarInfo,
  CupCategory,
  DriverCategory,
  DriverInfo,
  EntryListCarData,
} from '@/messages/incoming/entry-list-car.message';
export type {
  CarLocation,
  RealtimeCarUpdateData,
} from '@/messages/incoming/realtime-car-update.message';
export type {
  Phase,
  RealtimeUpdateData,
  Replay,
  SessionType,
} from '@/messages/incoming/realtime-update.message';
export type { CameraSets, TrackData } from '@/messages/incoming/track-data.message';
export type { RegisterCommandApplicationData } from '@/messages/outgoing/register-command-application.message';
export type { RequestEntryListData } from '@/messages/outgoing/request-entry-list.message';
