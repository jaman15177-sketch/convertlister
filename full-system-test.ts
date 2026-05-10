import { productQueue } from "./core/queue/queue.client";

async function runTest() {
  console.log("🚀 Sending test product...");

  await productQueue.add("product-job", {
    product: {
      id: "test-1",
      title: "Wireless Earbuds",
      price: 25,
      sales: 1200,
      likes: 5000,
      shares: 800,
      sellerCount: 3,
    },
  });

  console.log("✅ Job sent to queue");
}

runTest();
