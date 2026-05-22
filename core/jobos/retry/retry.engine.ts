import { addJob } from "../queue/queue.engine";

export async function retryJob(job: any) {
  console.log(`🔄 Requeue Job: ${job.id}`);

  await addJob(job);
}
