import { addJob } from "../queue/queue.engine";

export async function startScheduler() {
  setInterval(async () => {
    console.log("📅 Scheduler Triggered");

     await addJob({
  id: `scheduled-${Date.now()}`,
  type: "scheduler",
  payload: {
    source: "scheduler",
    action: "run-pipeline",
  },

  userId: "system",
  maxAttempts: 3,
});}, 10000); // every 10 sec
}
