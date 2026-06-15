import {
  productRankingEngine,
} from "./product-ranking.engine";

const results =
  productRankingEngine.rank([
    {
      productId: "p1",
      title:
        "Wireless Pet Fountain",

      marketFitScore: 92,
      trendScore: 90,
      winningProbability: 88,
      profitabilityScore: 82,
      competitionScore: 35,
    },

    {
      productId: "p2",
      title:
        "Fitness Resistance Band",

      marketFitScore: 80,
      trendScore: 72,
      winningProbability: 75,
      profitabilityScore: 90,
      competitionScore: 60,
    },

    {
      productId: "p3",
      title:
        "Generic Storage Box",

      marketFitScore: 30,
      trendScore: 20,
      winningProbability: 25,
      profitabilityScore: 35,
      competitionScore: 90,
    },
  ]);

console.log(
  JSON.stringify(
    results,
    null,
    2
  )
);
