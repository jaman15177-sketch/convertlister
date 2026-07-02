import { queueClient } from "@/lib/queue/queue.client";
async function runTest() {
  console.log("🧪 QUEUE TEST START");

  // 1. ENQUEUE JOB
  const jobId = await queueClient.add(
    "IMPORT_PRODUCT",
    {
      source: "shopify",
      productId: "test_123",
    }
  );

  console.log("✔ Job Added:", jobId);

  // 2. WAIT PROCESSING
  await new Promise((r) =>
    setTimeout(r, 2000)
  );

  // 3. FETCH STATUS
  const job =
    await queueClient.getJob(jobId);

  console.log("📦 Job Status:", job);

  if (!job) {
    throw new Error("JOB_NOT_FOUND");
  }

  console.log("✔ QUEUE TEST PASSED");
}

runTest().catch((e) => {
  console.error("❌ QUEUE TEST FAILED", e);
});
