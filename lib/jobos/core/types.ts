export type JobType =
  | "trend_scan"
  | "product_score"
  | "auto_import"
  | "pipeline_run";

export type JobPriority = "high" | "medium" | "low";

export interface Job {
  id: string;
  type: JobType;
  priority: JobPriority;
  payload?: any;
  retryCount: number;
  createdAt: number;
}
