import {
  createMultiMarketOS,
} from "./multi-market-intelligence.os";

async function runTest() {
  console.log(
    "🚀 MULTI-MARKET INTELLIGENCE OS TEST START"
  );

  const os =
    createMultiMarketOS();

  const result =
    await os.runOS();

  console.log(
    "--------------------------"
  );

  console.log(
    "📊 SUMMARY:"
  );

  console.log(
    JSON.stringify(
      {
        totalProducts:
          result.total,

        topRanked:
          result.ranked.slice(
            0,
            3
          ),

        sampleResult:
          result.results[0],
      },
      null,
      2
    )
  );

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
