export async function recoverStaleJobs() {
  console.log("♻️ CRASH RECOVERY STARTED")

  // (future: recover stuck/processing jobs from DB/queue)
  await new Promise((r) => setTimeout(r, 1000))

  console.log("🏁 RECOVERY COMPLETE")
}
