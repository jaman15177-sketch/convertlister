import { trendDetector }
from "./trend.detector";

const result =
  trendDetector.detect({
    productId: "p1",

    title:
      "Portable Wireless Blender",

    tiktokMentions: 8500,

    googleTrendScore: 92,

    amazonRankChange: 800,

    shopifyOrders24h: 320,

    socialEngagement: 6500,
  });

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);
