export type MarginInputs = {

  // pricing core
  salePrice: number;
  productCost: number;
  shippingCost: number;

  // platform economics
  platformFeePercent: number;
  paymentFeePercent: number;

  // acquisition costs
  estimatedCAC: number;
  adSpendPerSale: number;

  // risk factors
  returnRatePercent: number;
  refundLossPercent: number;

  // market pressure
  competitorPriceIndex: number; // 0–100
  demandElasticity: number; // e.g. 1.2

  // scaling instability
  shippingVolatility: number;

  // saturation pressure
  marketSaturation: number; // 0–100
};

export type MarginResult = {

  grossMargin: number;
  netMargin: number;

  riskAdjustedMargin: number;
  marketAdjustedMargin: number;

  profitabilityScore: number;

  breakEvenCAC: number;

  viability:
    "HIGH"
    | "MEDIUM"
    | "LOW"
    | "UNVIABLE";

  breakdown: {

    revenue: number;
    baseCosts: number;

    platformCosts: number;
    marketingCosts: number;

    riskCosts: number;
    competitiveErosion: number;

    scalingRisk: number;
    saturationPenalty: number;
  };

  metadata: {
    evaluatedAt: string;
    engineVersion: string;
  };
};

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.max(min, Math.min(max, value));
}

function percent(v: number): number {
  return v / 100;
}

// ----------------------------------------------------
// MAIN ENGINE
// ----------------------------------------------------

export function estimateMargin(
  input: MarginInputs
): MarginResult {

  // ----------------------------------------
  // REVENUE
  // ----------------------------------------

  const revenue = input.salePrice;

  // ----------------------------------------
  // BASE COSTS
  // ----------------------------------------

  const baseCosts =
    input.productCost +
    input.shippingCost;

  // ----------------------------------------
  // PLATFORM COSTS
  // ----------------------------------------

  const platformCosts =
    revenue *
    percent(
      input.platformFeePercent +
      input.paymentFeePercent
    );

  // ----------------------------------------
  // MARKETING COSTS
  // ----------------------------------------

  const marketingCosts =
    input.estimatedCAC +
    input.adSpendPerSale;

  // ----------------------------------------
  // RISK COSTS
  // ----------------------------------------

  const riskCosts =
    revenue *
    percent(
      input.returnRatePercent +
      input.refundLossPercent
    );

  // ----------------------------------------
  // COMPETITIVE EROSION
  // (price pressure from competitors)
  // ----------------------------------------

  const competitiveErosion =
    revenue *
    percent(input.competitorPriceIndex) *
    0.20;

  // ----------------------------------------
  // SCALING RISK
  // (CAC + shipping inefficiency grows with volatility)
  // ----------------------------------------

  const scalingRisk =
    input.shippingCost *
    percent(input.shippingVolatility) *
    0.5;

  // ----------------------------------------
  // SATURATION PENALTY
  // (harder to acquire customers in crowded markets)
  // ----------------------------------------

  const saturationPenalty =
    revenue *
    percent(input.marketSaturation) *
    0.15;

  // ----------------------------------------
  // TOTAL COSTS
  // ----------------------------------------

  const totalCosts =
    baseCosts +
    platformCosts +
    marketingCosts +
    riskCosts +
    competitiveErosion +
    scalingRisk +
    saturationPenalty;

  // ----------------------------------------
  // MARGINS
  // ----------------------------------------

  const grossMargin =
    ((revenue - baseCosts) / revenue) * 100;

  const netMargin =
    ((revenue - totalCosts) / revenue) * 100;

  // ----------------------------------------
  // RISK-ADJUSTED MARGIN
  // ----------------------------------------

  const riskAdjustedMargin =
    netMargin -
    input.shippingVolatility * 0.25 -
    input.returnRatePercent * 0.35;

  // ----------------------------------------
  // MARKET-ADJUSTED MARGIN
  // (real-world profitability under competition)
  // ----------------------------------------

  const marketAdjustedMargin =
    riskAdjustedMargin -
    input.marketSaturation * 0.3 -
    input.competitorPriceIndex * 0.2;

  // ----------------------------------------
  // BREAK-EVEN CAC
  // ----------------------------------------

  const breakEvenCAC =
    revenue -
    (baseCosts +
      platformCosts +
      riskCosts +
      competitiveErosion +
      saturationPenalty);

  // ----------------------------------------
  // PROFITABILITY SCORE
  // ----------------------------------------

  let profitabilityScore =
    clamp(netMargin, 0, 100) * 0.5 +
    clamp(riskAdjustedMargin, 0, 100) * 0.3 +
    clamp(marketAdjustedMargin, 0, 100) * 0.2;

  profitabilityScore = clamp(profitabilityScore, 0, 100);

  // ----------------------------------------
  // VIABILITY CLASSIFICATION
  // ----------------------------------------

  let viability:
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | "UNVIABLE";

  if (marketAdjustedMargin >= 35) {
    viability = "HIGH";
  } else if (marketAdjustedMargin >= 20) {
    viability = "MEDIUM";
  } else if (marketAdjustedMargin >= 5) {
    viability = "LOW";
  } else {
    viability = "UNVIABLE";
  }

  // ----------------------------------------
  // RETURN
  // ----------------------------------------

  return {
    grossMargin: Number(grossMargin.toFixed(2)),
    netMargin: Number(netMargin.toFixed(2)),
    riskAdjustedMargin: Number(riskAdjustedMargin.toFixed(2)),
    marketAdjustedMargin: Number(marketAdjustedMargin.toFixed(2)),

    profitabilityScore: Number(
      profitabilityScore.toFixed(2)
    ),

    breakEvenCAC: Number(breakEvenCAC.toFixed(2)),

    viability,

    breakdown: {
      revenue,
      baseCosts: Number(baseCosts.toFixed(2)),
      platformCosts: Number(platformCosts.toFixed(2)),
      marketingCosts: Number(marketingCosts.toFixed(2)),
      riskCosts: Number(riskCosts.toFixed(2)),
      competitiveErosion: Number(competitiveErosion.toFixed(2)),
      scalingRisk: Number(scalingRisk.toFixed(2)),
      saturationPenalty: Number(saturationPenalty.toFixed(2)),
    },

    metadata: {
      evaluatedAt: new Date().toISOString(),
      engineVersion: "v2-production",
    },
  };
}
