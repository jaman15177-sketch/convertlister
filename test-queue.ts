import { productQueue } from "./core/queue/queue.client";

async function test() {
  await productQueue.add("product-job", {
    product: {
      title: "Test Product",
      price: 10,
    },
  });

  console.log("Job added");
}

test();
