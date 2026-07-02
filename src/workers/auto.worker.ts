import { RedisEventBus } from "../realtime/cluster/bus/redis-bus";
import type { BaseEvent } from "../realtime/cluster/bus/redis-bus";
import { autonomousFactory } from "../core/factory/autonomous.factory";

/**
 * ==========================================================
 * AUTONOMOUS WORKER
 * ==========================================================
 * - Subscribes to IMPORT events
 * - Executes autonomous factory pipeline
 * - Publishes SCORE events
 * ==========================================================
 */

const redisUrl =
  process.env.REDIS_URL ||
  process.env.UPSTASH_REDIS_REST_URL ||
  "redis://localhost:6379";

const eventBus = new RedisEventBus(redisUrl);

export async function startWorker(): Promise<void> {
  console.log("🚀 AUTONOMOUS WORKER STARTED");

  await eventBus.connect();

  await eventBus.subscribe(
    "IMPORT",
    async (event: BaseEvent<unknown>) => {
      try {
        const result = await autonomousFactory.execute(
          event.payload
        );

        console.log(
          "⚡ PROCESSED:",
          result?.productId ?? "unknown"
        );

        await eventBus.publish("SCORE", {
          id: crypto.randomUUID(),
          organizationId: event.organizationId,
          type: "SCORE",
          payload: result,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error(
          "❌ WORKER PROCESSING FAILED",
          error
        );
      }
    }
  );
}

void startWorker();
