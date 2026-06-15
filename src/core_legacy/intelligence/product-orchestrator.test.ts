import { marketFitDetector } from "./market-fit.detector";
import { trendDetector } from "./trend.detector";
import { competitionDetector } from "./competition.detector";
import { profitabilityEngine } from "./profitability.engine";
import { winningProbabilityEngine } from "./winning-probability.engine";
import { productRankingEngine } from "./product-ranking.engine";

function runOrchestrator() {
  console.log("🚀 PRODUCT INTELLIGENCE ORCHESTRATOR TEST START");

  // -----------------------------
  // INPUT PRODUCT
  // -----------------------------
  const product = {
    productId: "p_1001",
    title: "Wireless Smart Portable LED Pet Water Fountain",
    category: "pet",
    price: 29.99,
    imagesCount: 6,
    descriptionLength: 1200,

    // trend signals
    tiktokMentions: 8500,
    googleTrendScore: 92,
    amazonRankChange: 800,
    shopifyOrders24h: 320,
    socialEngagement: 6500,
  };

  // -----------------------------
  // 1. MARKET FIT
  // -----------------------------
  const marketFit = marketFitDetector.detect(product);

  // -----------------------------
  // 2. TREND
  // -----------------------------
  const trend = trendDetector.detect(product);

  // -----------------------------
  // 3. COMPETITION
  // -----------------------------
  const competition = competitionDetector.detect({
    competitorCount: 120,
    averageRating: 4.6,
    averageReviewCount: 2500,
    topSellerDominance: 70,
    adDensity: 65,
  });

  // -----------------------------
  // 4. PROFITABILITY
  // -----------------------------
  const profit = profitabilityEngine.calculate({
    sellingPrice: 29.99,
    productCost: 10,
    shippingCost: 3,
    adCost: 5,
    packagingCost: 1,
  });

  // -----------------------------
  // 5. WINNING PROBABILITY
  // -----------------------------
  const win = winningProbabilityEngine.calculate({
    marketFitScore: marketFit.score,
    trendScore: trend.trendScore,
    profitScore: profit.profitScore,
    competitionScore: competition.competitionScore,
    supplierScore: 85,
  });

  // -----------------------------
  // 6. PRODUCT RANKING (SINGLE ITEM TEST)
  // -----------------------------
  const ranked = productRankingEngine.rank([
    {
      productId: product.productId,
      title: product.title,

      marketFitScore: marketFit.score,
      trendScore: trend.trendScore,
      winningProbability: win.winningProbability,
      profitabilityScore: profit.profitScore,
      competitionScore: competition.competitionScore,
    },
  ]);

  // -----------------------------
  // FINAL OUTPUT
  // -----------------------------
  const result = {
    marketFit,
    trend,
    competition,
    profit,
    winning: win,
    ranking: ranked,
  };

  console.log(
    JSON.stringify(result, null, 2)
  );

  console.log("🏁 ORCHESTRATOR TEST COMPLETE");
}

runOrchestrator();
