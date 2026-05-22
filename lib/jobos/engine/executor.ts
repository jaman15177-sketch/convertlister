import { runPipeline } from "@/src/pipeline/runPipeline";

type Job = {
  id: string;
  payload?: any;
};

type ExecutionResult = {
  id: string;
  status: "success" | "failed";
  error?: string;
};

export async function executeJobs(jobs: Job[]) {
  const results: ExecutionResult[] = [];

  console.log(`🚀 Executor started | Jobs: ${jobs.length}`);

  for (const job of jobs) {
    try {
      // pipeline is global (no payload dependency)
      await runPipeline();

      results.push({
        id: job.id,
        status: "success",
      });
    } catch (err: any) {
      results.push({
        id: job.id,
        status: "failed",
        error: err?.message || "unknown error",
      });
    }
  }

  console.log("✅ Executor completed");

  return {
    success: true,
    processed: jobs.length,
    results,
  };
}
export const executeBatch = executeJobs;
