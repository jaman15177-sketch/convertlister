export type ObservabilityEvent = {
  id: string;
  timestamp: number;
  source: string;

  job_id?: string;
  level: "info" | "warn" | "error";

  message: string;

  metadata?: Record<string, any>;
};

export type DecisionResult = {
  shouldAlert: boolean;
  severity: number;
  reason?: string;
};
