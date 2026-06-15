import { crossMarketMergeEngine } from "./cross-market-merge.engine";

console.log("🚀 CROSS MARKET MERGE TEST");

const amazonId = crossMarketMergeEngine.merge({
  source: "amazon",
  id: "amz_1",
  title: "Wireless LED Lamp",
  price: 25,
});

const shopifyId = crossMarketMergeEngine.merge({
  source: "shopify",
  id: "shop_1",
  title: "Wireless LED Lamp",
  price: 27,
});

const aliexpressId = crossMarketMergeEngine.merge({
  source: "aliexpress",
  id: "alx_1",
  title: "Wireless LED Lamp",
  price: 22,
});

console.log({
  amazonId,
  shopifyId,
  aliexpressId,
});

console.log(
  JSON.stringify(
    crossMarketMergeEngine.getAll(),
    null,
    2
  )
);
