import client from "prom-client";

/**
 * ==========================================================
 * PROMETHEUS METRICS EXPORTER (ENTERPRISE)
 * ==========================================================
 */

client.collectDefaultMetrics();

export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["route", "method", "status"],
});

export const responseTimeHistogram = new client.Histogram({
  name: "http_response_time_ms",
  help: "Response time in ms",
  buckets: [50, 100, 200, 500, 1000, 2000],
});

export function getMetrics() {
  return client.register.metrics();
}
