import { importQueue } from "../lib/queue/bull.queue";
import "../lib/queue/worker";
import { productStore } from "../core/platform/store";
import { dlq } from "../lib/queue/dlq";

async function runE2E() {
  console.log("🚀 E2E PIPELINE TEST START");

  // -----------------------------------
  // 1. CREATE 30 PRODUCTS (BATCH INPUT)
  // -----------------------------------
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

  // -----------------------------------
  // 2. PUSH TO BULLMQ QUEUE
  // -----------------------------------
  await importQueue.addBulk(
    products.map((p) => ({
      name: "IMPORT_PRODUCT",
      data: p,
    }))
  );

  console.log(
    "✔ 30 PRODUCTS QUEUED"
  );

  // -----------------------------------
  // 3. WAIT FOR WORKERS
  // -----------------------------------
  await new Promise((r) =>
    setTimeout(r, 8000)
  );

  // -----------------------------------
  // 4. CHECK UNIVERSAL STORE
  // -----------------------------------
  const stored =
    productStore.getAll();

  console.log(
    "📦 STORED PRODUCTS:",
    stored.length
  );

  // -----------------------------------
  // 5. CHECK DLQ
  // -----------------------------------
  console.log(
    "⚠ DLQ ITEMS:",
    dlq.getAll().length
  );

  // -----------------------------------
  // 6. VALIDATION
  // -----------------------------------
  if (stored.length > 0) {
    console.log("✔ STORE SUCCESS");
  } else {
    console.log("❌ STORE FAILED");
  }

  console.log("🏁 E2E TEST COMPLETE");
}

runE2E().catch((err) => {
  console.error(
    "❌ E2E FAILED",
    err
  );
});
