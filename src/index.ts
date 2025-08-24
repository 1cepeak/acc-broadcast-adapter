import { BroadcastAdapter, type Config } from './adapter.js';

export function createBroadcastAdapter(config: Config): BroadcastAdapter {
  return new BroadcastAdapter(config);
}
