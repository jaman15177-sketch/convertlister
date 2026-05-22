import { executeJobs } from "../engine/executor";

function buildJobs(priority: string) {
  return [
    {
      id: `${priority}-1`,
      payload: { priority },
    },
    {
      id: `${priority}-2`,
      payload: { priority },
    },
  ];
}

export async function runScheduler() {
  console.log("📅 Scheduler started");

  const high = await executeJobs(buildJobs("high"));
  const medium = await executeJobs(buildJobs("medium"));
  const low = await executeJobs(buildJobs("low"));

  return {
    success: true,
    results: {
      high,
      medium,
      low,
    },
  };
}
