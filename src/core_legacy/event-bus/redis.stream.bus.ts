import { createClient } from "redis";

export type FactoryEvent =
  | "IMPORT"
  | "SCORE"
  | "OPTIMIZE"
  | "PUBLISH"
  | "FEEDBACK";

export interface EventPayload {
  tenantId: string;
  type: FactoryEvent;
  data: any;
  timestamp: number;
}

export class RedisStreamBus {
  private client = createClient();

  private streamKey = "factory:events";

  async connect() {
    await this.client.connect();
  }

  async publish(
    event: EventPayload
  ) {
    await this.client.xAdd(
      this.streamKey,
      "*",
      {
        event: JSON.stringify(event),
      }
    );
  }

  async consume(
    group: string,
    consumer: string,
    handler: (
      event: EventPayload
    ) => Promise<void>
  ) {
    await this.client.xGroupCreate(
      this.streamKey,
      group,
      "0",
      { MKSTREAM: true }
    );

    while (true) {
      const messages =
        await this.client.xReadGroup(
          group,
          consumer,
          {
            key: this.streamKey,
            id: ">",
          },
          { COUNT: 10, BLOCK: 2000 }
        );

      if (!messages) continue;

      for (const stream of messages) {
        for (const msg of stream.messages) {
          const parsed =
            JSON.parse(
              msg.message.event as string
            );

          await handler(parsed);

          await this.client.xAck(
            this.streamKey,
            group,
            msg.id
          );
        }
      }
    }
  }
}

export const eventBus =
  new RedisStreamBus();
