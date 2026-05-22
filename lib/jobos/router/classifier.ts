import { JobType, JobPriority } from "../core/types";

export function classifyJob(input: any): {
  type: JobType;
  priority: JobPriority;
} {
  // RULE ENGINE (replace later with AI model if needed)

  if (input?.source === "trend") {
    return { type: "trend_scan", priority: "high" };
  }

  if (input?.source === "import") {
    return { type: "auto_import", priority: "medium" };
  }

  return { type: "pipeline_run", priority: "low" };
}
