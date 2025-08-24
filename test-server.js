import { format } from 'date-fns';
import dotenv from 'dotenv';
import { pick } from 'lodash';

import { createBroadcastAdapter } from './dist/index.js';

const { parsed: env } = dotenv.config();
const adapter = createBroadcastAdapter({
  address: env.ADDRESS,
  port: env.PORT,
  connectionPassword: env.CONNECTION_PASSWORD,
  commandPassword: env.COMMAND_PASSWORD,
  updateIntervalMs: 250,
});

const cars = new Map();
// const track = {};

adapter
  .connect()
  .then((connectionId) => {
    adapter.send('request-entry-list', { connectionId });
  })
  .catch((err) => console.log(err));

adapter.on('realtime-car-update', (data) => {
  function formatTime(ms) {
    return format(ms, 'mm:ss.SSS');
  }

  const currentLapTime = formatTime(new Date(data.currentLap.milliseconds));
  const lastLapTime = formatTime(new Date(data.lastLap.milliseconds));
  const bestSessionLapTime = formatTime(new Date(data.bestSessionLap.milliseconds));

  function mapSectors(rawSectors) {
    const [firstSector, secondSector, thirdSector] = rawSectors;

    return [
      formatTime(firstSector),
      formatTime(firstSector + secondSector),
      formatTime(firstSector + secondSector + thirdSector),
    ];
  }

  cars.set(data.carIndex, {
    ...cars.get(data.carIndex),
    ...pick(data, ['kmh', 'position']),
    delta: Number(data.delta / 1000).toFixed(1),
    // currentLap: currentLapTime,
    lastLap: lastLapTime,
    bestLap: bestSessionLapTime,
    lastLapSectors: mapSectors(data.lastLap.splits),
    bestLapSectors: mapSectors(data.bestSessionLap.splits),
  });
});

adapter.on('entry-list-car', (data) => {
  const drivers = data.driversInfo.map((driver) => `${driver.firstName} ${driver.lastName}`);

  cars.set(data.carIndex, {
    ...cars.get(data.carIndex),
    driver: drivers[0] || '',
  });
});

// adapter.on('track-data', (data) => {
//   console.log(JSON.stringify(data));
// });

setInterval(() => {
  console.clear();
  console.table([...cars.values()].sort((a, b) => a.position - b.position));
}, 250);

process.on('beforeExit', () => {
  adapter.destroy();
});
