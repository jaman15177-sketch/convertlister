export type EventType = "log.created" | "alert.created" | "alert.updated";

export interface Event {
  id: string;
  type: EventType;
  job_id: string;
  level: string;
  message: string;
  timestamp: string;
}
