import { importQueue } from "@/lib/queue/bull.queue";import "@/lib/queue/worker";

async function test() {
  console.log("🚀 TEST START");

  const products = Array.from(
    { length: 30 },
    (_, i) => ({
      id: `p_${i}`,
      title: `Product ${i}`,
      price: 100 + i,
    })
  );

  await importQueue.addBulk(
    products.map((p) => ({
      name: "IMPORT_PRODUCT",
      data: p,
    }))
  );

  console.log(
    "✔ 30 PRODUCTS QUEUED"
  );
}

test();
