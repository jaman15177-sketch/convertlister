export type ProductSignals = {
  orders: number;
  rating: number;
  reviews: number;
  marginPercent: number;
  trendVelocity: number;
  saturationLevel: number;
};

export type ScoreWeights = {
  demand: number;
  quality: number;
  profitability: number;
  trend: number;
  competition: number;
};

export type ProductDecision =
  | "WINNER"
  | "TEST"
  | "REJECT";

export type ProductScoreResult = {
  totalScore: number;
  confidence: number;
  decision: ProductDecision;

  breakdown: {
    demand: number;
    quality: number;
    profitability: number;
    trend: number;
    competition: number;
  };

  metadata: {
    evaluatedAt: string;
    engineVersion: string;
  };
};

// ----------------------------------------------------
// DEFAULT WEIGHTS
// ----------------------------------------------------

const DEFAULT_WEIGHTS: ScoreWeights = {
  demand: 0.30,
  quality: 0.20,
  profitability: 0.25,
  trend: 0.20,
  competition: 0.05,
};

// ----------------------------------------------------
// NORMALIZATION HELPERS
// ----------------------------------------------------

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function normalize(
  value: number,
  min: number,
  max: number
): number {
  const normalized =
    ((value - min) / (max - min)) * 100;

  return clamp(normalized, 0, 100);
}

// ----------------------------------------------------
// MAIN ENGINE
// ----------------------------------------------------

export function scoreProduct(
  signals: ProductSignals,
  weights: ScoreWeights = DEFAULT_WEIGHTS
): ProductScoreResult {

  // ----------------------------------------
  // SIGNAL NORMALIZATION
  // ----------------------------------------

  const demandScore =
    normalize(signals.orders, 0, 10000);

  const qualityScore =
    normalize(signals.rating, 0, 5);

  const profitabilityScore =
    normalize(signals.marginPercent, 0, 80);

  const trendScore =
    normalize(signals.trendVelocity, 0, 100);

  // Lower saturation is better
  const competitionScore =
    100 - normalize(signals.saturationLevel, 0, 100);

  // ----------------------------------------
  // WEIGHTED SCORE
  // ----------------------------------------

  const weightedDemand =
    demandScore * weights.demand;

  const weightedQuality =
    qualityScore * weights.quality;

  const weightedProfitability =
    profitabilityScore * weights.profitability;

  const weightedTrend =
    trendScore * weights.trend;

  const weightedCompetition =
    competitionScore * weights.competition;

  // ----------------------------------------
  // FINAL SCORE
  // ----------------------------------------

  const totalScore =
    weightedDemand +
    weightedQuality +
    weightedProfitability +
    weightedTrend +
    weightedCompetition;

  // ----------------------------------------
  // CONFIDENCE SCORE
  // ----------------------------------------

  let confidence = 50;

  if (signals.orders > 3000) confidence += 15;
  if (signals.reviews > 500) confidence += 10;
  if (signals.rating >= 4.5) confidence += 10;
  if (signals.trendVelocity >= 70) confidence += 10;

  confidence = clamp(confidence, 0, 100);

  // ----------------------------------------
  // DECISION ENGINE
  // ----------------------------------------

  let decision: ProductDecision;

  if (totalScore >= 75 && confidence >= 70) {
    decision = "WINNER";
  } else if (totalScore >= 50) {
    decision = "TEST";
  } else {
    decision = "REJECT";
  }

  // ----------------------------------------
  // RETURN
  // ----------------------------------------

  return {
    totalScore: Number(totalScore.toFixed(2)),
    confidence,

    decision,

    breakdown: {
      demand: Number(weightedDemand.toFixed(2)),
      quality: Number(weightedQuality.toFixed(2)),
      profitability: Number(
        weightedProfitability.toFixed(2)
      ),
      trend: Number(weightedTrend.toFixed(2)),
      competition: Number(
        weightedCompetition.toFixed(2)
      ),
    },

    metadata: {
      evaluatedAt: new Date().toISOString(),
      engineVersion: "v2-production",
    },
  };
}
