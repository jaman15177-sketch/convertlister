type LogLevel = "info" | "warn" | "error";

export function log(level: LogLevel, message: string, meta?: any) {
  const logEntry = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
  };

  // stdout (ELK / Datadog compatible)
  console.log(JSON.stringify(logEntry));
}
