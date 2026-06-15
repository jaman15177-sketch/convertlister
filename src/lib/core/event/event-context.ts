export type EventLevel = "info" | "warn" | "error";

export interface EventContext {
  event_id: string;
  trace_id: string;
  correlation_id: string;

  user_id?: string;
  org_id?: string;

  job_id: string;

  event_type: string;
  level: EventLevel;

  message: string;

  timestamp: string;

  metadata?: Record<string, any>;
}
