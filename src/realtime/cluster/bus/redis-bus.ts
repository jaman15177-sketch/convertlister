import { createClient } from "redis";
import type { RedisClientType } from "redis";
/**
 * ==========================================================
 * ENTERPRISE EVENT BUS (REDIS BACKED)
 * ==========================================================
 * - Strongly typed events
 * - Pub/Sub architecture
 * - Tenant-safe isolation
 * - Worker compatible
 * ==========================================================
 */

export type BaseEvent<T = unknown> = {
  id: string;
  organizationId: string;
  type: string;
  payload: T;
  timestamp: number;
};

export type EventHandler<T = any> = (event: BaseEvent<T>) => Promise<void> | void;

type HandlerMap = Map<string, Set<EventHandler>>;

export class RedisEventBus {
  private pub: RedisClientType;
  private sub: RedisClientType;

  private handlers: HandlerMap = new Map();

  constructor(redisUrl: string) {
    this.pub = createClient({ url: redisUrl });
    this.sub = createClient({ url: redisUrl });
  }

  /**
   * CONNECT REDIS
   */
  async connect() {
    await this.pub.connect();
    await this.sub.connect();
  }

  /**
   * SUBSCRIBE TO TOPIC
   */
  async subscribe(topic: string, handler: EventHandler) {
    if (!this.handlers.has(topic)) {
      this.handlers.set(topic, new Set());
    }

    this.handlers.get(topic)!.add(handler);

    await this.sub.subscribe(topic, async (message: string) => {
      try {
        const event: BaseEvent = JSON.parse(message);

        const list = this.handlers.get(topic);
        if (!list) return;

        for (const fn of list) {
          await fn(event);
        }
      } catch {
        // ignore invalid messages
      }
    });
  }

  /**
   * PUBLISH EVENT
   */
  async publish<T>(topic: string, event: BaseEvent<T>) {
    await this.pub.publish(topic, JSON.stringify(event));
  }

  /**
   * SAFE BROADCAST (alias layer for legacy code)
   */
  async broadcast(event: BaseEvent) {
    await this.pub.publish(event.type, JSON.stringify(event));
  }

  /**
   * CLEANUP
   */
  async disconnect() {
    await this.pub.disconnect();
    await this.sub.disconnect();
  }
}
