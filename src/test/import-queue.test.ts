import { importQueue } from "../lib/queue/bull.queue";
import "../lib/queue/worker";
import { productStore } from "../core/platform/store";
import { dlq } from "../lib/queue/dlq";

async function runTest() {
  console.log("🚀 IMPORT QUEUE E2E TEST START");

  // ------------------------------------
  // 1. CREATE 30 PRODUCTS (BATCH)
  // ------------------------------------
  const products = Array.from(
    { length: 30 },
    (_, i) => ({
      id: `p_${i}`,
      title: `Product ${i}`,
      price: 100 + i,
      source: "shopify",
      sourceProductId: `sp_${i}`,
      version: 1,
      currency: "USD",
      images: [],
      status: "imported",
      intelligence: {
        category: "test",
        marketFitScore: 80,
        trendScore: 70,
        winningProbability: 75,
      },
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  );

  // ------------------------------------
  // 2. PUSH TO QUEUE
  // ------------------------------------
  await importQueue.addBulk(
    products.map((p) => ({
      name: "IMPORT_PRODUCT",
      data: p,
    }))
  );

  console.log("✔ 30 PRODUCTS QUEUED");

  // ------------------------------------
  // 3. WAIT FOR PROCESSING
  // ------------------------------------
  await new Promise((r) =>
    setTimeout(r, 8000)
  );

  // ------------------------------------
  // 4. VERIFY STORE
  // ------------------------------------
  const stored =
    productStore.getAll();

  console.log(
    "📦 STORED PRODUCTS:",
    stored.length
  );

  // ------------------------------------
  // 5. VERIFY DLQ
  // ------------------------------------
  const failed =
    dlq.getAll();

  console.log(
    "⚠ FAILED JOBS (DLQ):",
    failed.length
  );

  // ------------------------------------
  // 6. RESULT VALIDATION
  // ------------------------------------
  if (stored.length > 0) {
    console.log("✔ STORE WORKING");
  } else {
    console.log("❌ STORE FAILED");
  }

  if (failed.length === 0) {
    console.log("✔ NO FAILURES");
  } else {
    console.log("⚠ SOME FAILED JOBS");
  }

  console.log("🏁 TEST COMPLETE");
}

runTest().catch((err) => {
  console.error("❌ TEST FAILED", err);
});
