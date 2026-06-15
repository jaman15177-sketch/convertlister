import client from "prom-client";

const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const pipelineCounter = new client.Counter({
  name: "pipeline_events_total",
  help: "Total pipeline events",
  labelNames: ["step", "status"],
});

export const latencyHistogram = new client.Histogram({
  name: "pipeline_latency_ms",
  help: "Pipeline latency",
  buckets: [10, 50, 100, 500, 1000, 5000],
});

register.registerMetric(pipelineCounter);
register.registerMetric(latencyHistogram);

export { register };
