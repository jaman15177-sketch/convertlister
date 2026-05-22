type LogLevel = "info" | "warn" | "error" | "debug";

interface LogContext {
  jobId?: string;
  type?: string;
  priority?: string;
  durationMs?: number;
  [key: string]: any;
}

interface LogEvent {
  level: LogLevel;
  event: string;
  message: string;
  context?: LogContext;
  timestamp: number;
}

function formatLog(log: LogEvent) {
  return {
    ...log,
    timestampISO: new Date(log.timestamp).toISOString(),
  };
}

/**
 * Core logger (structured + production safe)
 */
export function logger(
  level: LogLevel,
  event: string,
  message: string,
  context: LogContext = {}
) {
  const log: LogEvent = {
    level,
    event,
    message,
    context,
    timestamp: Date.now(),
  };

  const output = formatLog(log);

  switch (level) {
    case "error":
      console.error(JSON.stringify(output));
      break;
    case "warn":
      console.warn(JSON.stringify(output));
      break;
    case "debug":
      console.debug(JSON.stringify(output));
      break;
    default:
      console.log(JSON.stringify(output));
  }

  return output;
}

/**
 * Job-specific logger helpers (engine-level abstraction)
 */
export const jobLogger = {
  start(jobId: string, context: LogContext = {}) {
    return logger("info", "JOB_START", "Job execution started", {
      jobId,
      ...context,
    });
  },

  success(jobId: string, context: LogContext = {}) {
    return logger("info", "JOB_SUCCESS", "Job completed successfully", {
      jobId,
      ...context,
    });
  },

  fail(jobId: string, error: any, context: LogContext = {}) {
    return logger("error", "JOB_FAILED", error?.message || "Job failed", {
      jobId,
      error: error?.stack || error,
      ...context,
    });
  },

  retry(jobId: string, attempt: number, context: LogContext = {}) {
    return logger("warn", "JOB_RETRY", `Retry attempt ${attempt}`, {
      jobId,
      attempt,
      ...context,
    });
  },

  queue(event: string, context: LogContext = {}) {
    return logger("info", "QUEUE_EVENT", event, context);
  },
};
