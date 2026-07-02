import { productStore } from "../core/platform/store";
// =========================
// UNIVERSAL STORE TEST
// =========================

async function runTest() {
  console.log("🧪 TEST 1: Product Storage START");

  // 1. ADD PRODUCT
  productStore.add({
    id: "p1",
    source: "shopify",
    sourceProductId: "shop_123",
    version: 1,
    title: "Test Product",
    description: "Demo product",
    price: 100,
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
  });

  // 2. GET PRODUCT
  const product = productStore.get("p1");

  if (!product) {
    throw new Error("❌ Product not stored");
  }

  // 3. ASSERT
  console.log("✔ Product Found:", product.title);

  if (product.title !== "Test Product") {
    throw new Error("❌ Data mismatch");
  }

  console.log("✔ TEST PASSED");
  console.log("📦 Product:", product);
}

runTest().catch((err) => {
  console.error("❌ TEST FAILED:", err);
});
