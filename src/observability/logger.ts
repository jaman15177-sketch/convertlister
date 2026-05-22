import { metrics } from "./metrics";

export const logger = {
  info(msg: string) {
    console.log("[INFO]", msg);
    metrics.inc("logs_info_total");
  },

  error(msg: string) {
    console.error("[ERROR]", msg);
    metrics.inc("logs_error_total");
  },

  warn(msg: string) {
    console.warn("[WARN]", msg);
    metrics.inc("logs_warn_total");
  },
};
