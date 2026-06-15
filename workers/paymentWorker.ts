import IORedis from "ioredis";
import { processEvent } from "@/lib/eventProcessor";

// =========================
// REDIS CONNECTION
// =========================
const redis = new IORedis(process.env.REDIS_URL!);

// =========================
// PAYMENT EVENT WORKER
// =========================
redis.subscribe("payment-events", (err) => {
  if (err) {
    console.error("Redis subscribe error:", err);
  }
});

// =========================
// MESSAGE HANDLER
// =========================
redis.on("message", async (_channel, message) => {
  try {
    const event = JSON.parse(message);

    if (!event?.eventId) {
      console.warn("Invalid event received");
      return;
    }

    // =========================
    // PROCESS EVENT (NEW SYSTEM)
    // =========================
    const result = await processEvent(event.eventId, event.payload);

    console.log("Payment event processed:", result);
  } catch (error) {
    console.error("Worker processing failed:", error);
  }
});
