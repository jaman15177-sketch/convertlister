export type JobStatus =
  | "queued"
  | "processing"
  | "success"
  | "failed"
  | "retrying"
  | "dead";

export interface Job {
  id: string;
  type: string;
  payload: any;

  status: JobStatus;

  attempts: number;
  maxAttempts: number;

  createdAt: number;
  updatedAt: number;
}
