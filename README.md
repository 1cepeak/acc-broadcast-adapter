# acc-broadcast-adapter

Node.js adapter for Assetto Corsa Competizione Broadcast API.

## Usage

```shell
npm i @1cepeak/acc-broadcast-adapter
```

### Connect example

```ts
import { createBroadcastAdapter } from '@1cepeak/acc-broadcast-adapter';

const adapter = createBroadcastAdapter({
  address: '127.0.0.1',
  port: 9000,
  connectionPassword: 'asd',
  commandPassword: '',
});

adapter.connect()
  .then((connectionId) => console.log(`Connected! Your connectionId is ${connectionId}`))
  .catch((error) => console.error(error));

process.on('beforeExit', () => adapter.destroy());
```

> Don't forget to destroy your connection using `adapter.destroy()` when Node.js process will be killed.

### `createBroadcastAdapter` configuration parameters

| Option               | Required | Default value           | Description                                                    |
|----------------------|----------|-------------------------|----------------------------------------------------------------|
| `address`            | ✅       |                         | Device address where ACC is running.                           |
| `port`               | ✅       |                         | Your ACC Broadcast API port.                                   |
| `connectionPassword` | ✅       |                         | Connection password to ACC Broadcast API. Should not be empty! |
| `commandPassword`    | ✅       |                         | Command password to ACC Broadcast API.                         |
| `updateIntervalMs`   | ⛔️       | 250                     | Info update interval in milliseconds.                          |
| `displayName`        | ⛔       | "acc-broadcast-adapter" | Name of your connection shown in ACC.                          |

### Handling messages

```ts
adapter.on('some-message', (data) => console.log(data));
```

### Sending messages

```ts
adapter.send('some-message', { some: 'data' });
```
