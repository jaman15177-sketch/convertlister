import {
  autonomousFactory,
} from "./autonomous.factory";

async function test() {
  const result =
    await autonomousFactory.execute(
      {
        productId: "p_999",
        title:
          "Wireless Smart Pet Water Fountain",
        category: "pet",
        price: 29.99,

        imagesCount: 6,
        descriptionLength: 1200,

        tiktokMentions: 9000,
        googleTrendScore: 88,
        amazonRankChange: 700,
        shopifyOrders24h: 300,
        socialEngagement: 5000,
      }
    );

  console.log(
    JSON.stringify(
      result,
      null,
      2
    )
  );
}

test();
