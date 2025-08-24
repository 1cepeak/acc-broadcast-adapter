# acc-broadcast-adapter

```ts
import {createBroadcastAdapter} from '@1cepeak/acc-broadcast-adapter';
import * as process from "node:process";

const adapter = createBroadcastAdapter({
  address: '127.0.0.1',
  port: 9000,
  
});

adapter.connect()
  .then((connectionId) => console.log(`Connected! Your connectionID - ${connectionId}`))
  .catch((error) => console.error(error));

function realtimeCarUpdateHandler(data) {
  console.clear();
  console.table(data);
}

adapter.on('realtime-car-update', realtimeCarUpdateHandler);

setInterval(() => adapter.off('realtime-car-update', realtimeCarUpdateHandler), 30_000);

process.on('beforeExit', () => {
  adapter.destroy();
});
```
