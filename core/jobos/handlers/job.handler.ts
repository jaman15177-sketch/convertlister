export async function processJob(job: any) {
  console.log("⚙️ Executing Job:", job.id);

  switch (job.type) {
    case "pipeline":
      await fakePipeline(job);
      break;

    default:
      throw new Error(`Unknown job type: ${job.type}`);
  }
}

async function fakePipeline(job: any) {
  console.log("🚀 Running Pipeline:", job.payload);

  await sleep(1000);

  console.log("✅ Pipeline Finished:", job.id);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
