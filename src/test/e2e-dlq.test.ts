import { importQueue } from "@/lib/queue/bull.queue";import "@/lib/queue/worker";
import { productStore } from "../core/platform/store";
import { dlq } from "@/lib/queue/dlq";
async function runTest() {
  console.log("🚀 FINAL E2E + DLQ TEST START");

  // ------------------------------------
  // 1. CREATE TEST PRODUCTS (30)
  // ------------------------------------
  const products = Array.from(
    { length: 30 },
    (_, i) => ({
      id: `p_${i}`,
      title: `Product ${i}`,
      price: 100 + i,
      source: "shopify",
      sourceProductId: `sp_${i}`,
    })
  );

  // ------------------------------------
  // 2. SEND TO QUEUE (BATCH)
  // ------------------------------------
  await importQueue.addBulk(
    products.map((p) => ({
      name: "IMPORT_PRODUCT",
      data: p,
    }))
  );

  console.log("✔ QUEUED: 30 PRODUCTS");

  // ------------------------------------
  // 3. WAIT FOR PROCESSING
  // ------------------------------------
  await new Promise((r) =>
    setTimeout(r, 8000)
  );

  // ------------------------------------
  // 4. VERIFY UNIVERSAL STORE
  // ------------------------------------
  const stored =
    productStore.getAll();

  console.log(
    "📦 STORED:",
    stored.length
  );

  // ------------------------------------
  // 5. VERIFY DLQ
  // ------------------------------------
  const failed =
    dlq.getAll();

  console.log(
    "⚠ DLQ FAILED:",
    failed.length
  );

  // ------------------------------------
  // 6. VALIDATION LOGIC
  // ------------------------------------
  if (stored.length > 0) {
    console.log("✔ STORE WORKING");
  } else {
    console.log("❌ STORE FAILED");
  }

  if (failed.length > 0) {
    console.log(
      "⚠ SOME FAILED JOBS IN DLQ"
    );
  } else {
    console.log("✔ NO FAILURES");
  }

  console.log("🏁 FINAL TEST COMPLETE");
}

runTest().catch((err) => {
  console.error("❌ TEST FAILED", err);
});
