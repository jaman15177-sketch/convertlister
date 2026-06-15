import {
  selfOptimizingFactory,
} from "./self-optimizing.factory";

async function runTest() {
  console.log(
    "🚀 SELF-OPTIMIZING FACTORY TEST START"
  );

  const inputs = Array.from(
    { length: 5 },
    (_, i) => ({
      productId: `p_${i}`,
      title:
        "Wireless Smart Product " + i,
      category: "pet",
      price: 20 + i,

      imagesCount: 5,
      descriptionLength: 800,

      tiktokMentions: 5000 + i * 100,
      googleTrendScore: 70 + i,
      amazonRankChange: 600 + i * 10,
      shopifyOrders24h: 200 + i * 5,
      socialEngagement: 4000 + i * 20,
    })
  );

  for (const input of inputs) {
    const result =
      await selfOptimizingFactory.run(
        input
      );

    console.log(
      "----------------------"
    );

    console.log(
      JSON.stringify(
        result.result,
        null,
        2
      )
    );

    console.log(
      "SYSTEM STATE:",
      JSON.stringify(
        result.systemState,
        null,
        2
      )
    );
  }

  console.log(
    "🏁 TEST COMPLETE"
  );
}

runTest().catch((err) => {
  console.error(
    "❌ TEST FAILED",
    err
  );
});
