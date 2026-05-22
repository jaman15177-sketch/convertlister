export function healthCheck() {
  return {
    status: "ok",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: Date.now(),
  };
}
