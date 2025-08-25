import { createSocket, type Socket } from 'node:dgram';

import {
  getIncomingMessageType,
  incomingMessagesHandlers,
  type IncomingMessagesMap,
  type OutgoingMessagesMap,
  outgoingMessagesSenders,
} from '@/messages';
import { type RegistrationResultData } from '@/messages/incoming/registration-result.message';

export interface Config {
  address: string;
  port: number;
  connectionPassword: string;
  commandPassword: string;
  displayName?: string;
  updateIntervalMs?: number;
}

type BroadcastAdapterListeners = Partial<{
  [K in keyof IncomingMessagesMap]: ((data: IncomingMessagesMap[K]) => void)[];
}>;

export class BroadcastAdapter {
  public connectionId: number | null = null;

  private readonly socket: Socket;
  private readonly config: Config;
  private listeners: BroadcastAdapterListeners = {};

  constructor(config: Config) {
    this.socket = createSocket('udp4');
    this.config = { ...config };

    this.socket.bind();
    this.socket.on('message', (buffer: Buffer) => {
      const messageNumber = buffer.readUInt8(0);
      const messageType = getIncomingMessageType(messageNumber);
      const handler = incomingMessagesHandlers[messageType];

      if (typeof handler === 'function') {
        const data = handler(buffer);

        this.listeners[messageType]?.forEach((listener) => {
          // TODO: подумать как пофиксить конфликт типов
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          listener(data);
        });
      }
    });
  }

  public get isConnected(): boolean {
    return this.connectionId !== null;
  }

  public connect(): Promise<number> {
    if (this.isConnected) {
      return Promise.resolve(this.connectionId!);
    }

    return new Promise((resolve, reject) => {
      const callback = (data: RegistrationResultData) => {
        this.connectionId = data.connectionId;

        this.off('registration-result', callback);

        resolve(data.connectionId);
      };

      this.on('registration-result', callback);
      this.send('register-commands-application', {
        displayName: this.config.displayName ?? 'acc-broadcast-adapter',
        connectionPassword: this.config.connectionPassword,
        commandPassword: this.config.commandPassword,
        updateInterval: this.config.updateIntervalMs ?? 250,
      }).catch((err) => {
        console.error(err);
        reject(err);
      });
    });
  }

  public async disconnect(): Promise<void> {
    await this.send('unregister-command-application', {});

    this.connectionId = null;
  }

  public destroy(): void {
    if (this.isConnected) {
      this.disconnect();
    }

    try {
      this.socket.disconnect();
      this.socket.close();
    } catch (e) {
      console.error(e);
    }
  }

  public on<K extends keyof IncomingMessagesMap>(
    message: K,
    callback: (data: IncomingMessagesMap[K]) => void,
  ): void {
    if (!Array.isArray(this.listeners[message])) {
      this.listeners[message] = [];
    }

    this.listeners[message].push(callback);
  }

  public off<K extends keyof IncomingMessagesMap>(
    message: K,
    callback: (data: IncomingMessagesMap[K]) => void,
  ): void {
    if (!Array.isArray(this.listeners[message])) {
      delete this.listeners[message];

      return;
    }

    this.listeners[message] = this.listeners[message]!.filter((item) => item !== callback);
  }

  public send<K extends keyof OutgoingMessagesMap>(
    message: K,
    data: OutgoingMessagesMap[K],
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const outgoingMessage = outgoingMessagesSenders[message];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const buffer = outgoingMessage(data);

      this.socket.send(buffer, this.config.port, this.config.address, (error) =>
        error ? reject(error) : resolve(),
      );
    });
  }
}
