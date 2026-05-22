// redis-bus.ts
import Redis from "ioredis";

export type ClusterEvent = {
  tenantId: string;
  type: string;
  payload: any;
  timestamp: number;
};

export class RedisEventBus {
  private pub = new Redis();
  private sub = new Redis();

  subscribe(channel: string, handler: (event: ClusterEvent) => void) {
    this.sub.subscribe(channel);

    this.sub.on("message", (_channel, message) => {
      const event = JSON.parse(message);
      handler(event);
    });
  }

  publish(channel: string, event: ClusterEvent) {
    this.pub.publish(channel, JSON.stringify(event));
  }
}
