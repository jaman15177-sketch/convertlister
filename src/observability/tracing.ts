import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

/**
 * ==========================================================
 * OPENTELEMETRY TRACING (ENTERPRISE)
 * ==========================================================
 */

export const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
});

export function startTracing() {
  sdk.start();
  console.log("🔭 OpenTelemetry tracing enabled");
}
