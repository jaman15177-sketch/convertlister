import { eventBus } from "../core/event-bus/redis.stream.bus";
import { autonomousFactory } from "../core/factory/autonomous.factory";

export async function startWorker() {
  console.log(
    "🚀 AUTONOMOUS WORKER STARTED"
  );

  await eventBus.connect();

  await eventBus.consume(
    "factory-group",
    "worker-1",
    async (event) => {
      if (event.type === "IMPORT") {
        const result =
          await autonomousFactory.execute(
            event.data
          );

        console.log(
          "⚡ PROCESSED:",
          result.productId
        );

        await eventBus.publish({
          tenantId:
            event.tenantId,
          type: "SCORE",
          data: result,
          timestamp: Date.now(),
        });
      }
    }
  );
}

startWorker();
