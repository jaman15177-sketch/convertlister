export type TrendSignals = {

  // Historical demand

  previousOrders: number;
  currentOrders: number;

  previousReviews: number;
  currentReviews: number;

  // External signals

  socialMentions: number;

  engagementRate: number;

  // Lifecycle

  productAgeDays: number;

  // Stability

  volatilityIndex: number;

  // Reliability

  sourceConfidence: number;
};

export type TrendClassification =
  | "MEGA_VIRAL"
  | "EXPLODING"
  | "TRENDING"
  | "STABLE"
  | "DECLINING";

export type TrendVelocityResult = {
  velocityScore: number;

  confidenceScore: number;

  classification: TrendClassification;

  breakdown: {
    orderMomentum: number;
    reviewMomentum: number;
    socialMomentum: number;
    engagementMomentum: number;
    freshnessBoost: number;
    volatilityPenalty: number;
    reliabilityBoost: number;
  };

  metadata: {
    evaluatedAt: string;
    engineVersion: string;
  };
};

// ---------------------------------------------------
// HELPERS
// ---------------------------------------------------

function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.max(min, Math.min(max, value));
}

function growthRate(
  previous: number,
  current: number
): number {

  if (previous <= 0) {
    return 100;
  }

  return (
    ((current - previous) / previous) * 100
  );
}

function normalize(
  value: number,
  max: number
): number {

  return clamp(
    (value / max) * 100,
    0,
    100
  );
}

// Exponential momentum smoothing

function exponentialMomentum(
  value: number
): number {

  return (
    100 *
    (1 - Math.exp(-value / 100))
  );
}

// ---------------------------------------------------
// MAIN ENGINE
// ---------------------------------------------------

export function calculateTrendVelocity(
  signals: TrendSignals
): TrendVelocityResult {

  // ------------------------------------------
  // ORDER MOMENTUM
  // ------------------------------------------

  const rawOrderGrowth =
    growthRate(
      signals.previousOrders,
      signals.currentOrders
    );

  const orderMomentum =
    exponentialMomentum(rawOrderGrowth);

  // ------------------------------------------
  // REVIEW MOMENTUM
  // ------------------------------------------

  const rawReviewGrowth =
    growthRate(
      signals.previousReviews,
      signals.currentReviews
    );

  const reviewMomentum =
    exponentialMomentum(rawReviewGrowth);

  // ------------------------------------------
  // SOCIAL MOMENTUM
  // ------------------------------------------

  const socialMomentum =
    normalize(
      signals.socialMentions,
      25000
    );

  // ------------------------------------------
  // ENGAGEMENT
  // ------------------------------------------

  const engagementMomentum =
    normalize(
      signals.engagementRate,
      25
    );

  // ------------------------------------------
  // FRESHNESS BOOST
  // ------------------------------------------

  let freshnessBoost = 0;

  if (signals.productAgeDays <= 7) {
    freshnessBoost = 100;
  }
  else if (signals.productAgeDays <= 30) {
    freshnessBoost = 75;
  }
  else if (signals.productAgeDays <= 90) {
    freshnessBoost = 45;
  }
  else {
    freshnessBoost = 15;
  }

  // ------------------------------------------
  // VOLATILITY PENALTY
  // unstable spikes are dangerous
  // ------------------------------------------

  const volatilityPenalty =
    normalize(
      signals.volatilityIndex,
      100
    );

  // ------------------------------------------
  // SOURCE RELIABILITY
  // ------------------------------------------

  const reliabilityBoost =
    normalize(
      signals.sourceConfidence,
      100
    );

  // ------------------------------------------
  // FINAL WEIGHTED SCORE
  // ------------------------------------------

  let velocityScore =
    (orderMomentum * 0.30) +
    (reviewMomentum * 0.20) +
    (socialMomentum * 0.15) +
    (engagementMomentum * 0.15) +
    (freshnessBoost * 0.10) +
    (reliabilityBoost * 0.10);

  // ------------------------------------------
  // APPLY VOLATILITY DAMPENING
  // ------------------------------------------

  velocityScore =
    velocityScore -
    (volatilityPenalty * 0.20);

  velocityScore =
    clamp(
      velocityScore,
      0,
      100
    );

  // ------------------------------------------
  // CONFIDENCE SCORE
  // ------------------------------------------

  let confidenceScore = 50;

  if (signals.currentOrders > 3000) {
    confidenceScore += 15;
  }

  if (signals.currentReviews > 500) {
    confidenceScore += 10;
  }

  if (signals.sourceConfidence >= 80) {
    confidenceScore += 15;
  }

  if (signals.volatilityIndex <= 30) {
    confidenceScore += 10;
  }

  confidenceScore =
    clamp(
      confidenceScore,
      0,
      100
    );

  // ------------------------------------------
  // CLASSIFICATION
  // ------------------------------------------

  let classification:
    TrendClassification;

  if (velocityScore >= 90) {
    classification = "MEGA_VIRAL";
  }
  else if (velocityScore >= 75) {
    classification = "EXPLODING";
  }
  else if (velocityScore >= 55) {
    classification = "TRENDING";
  }
  else if (velocityScore >= 35) {
    classification = "STABLE";
  }
  else {
    classification = "DECLINING";
  }

  // ------------------------------------------
  // RETURN
  // ------------------------------------------

  return {

    velocityScore:
      Number(
        velocityScore.toFixed(2)
      ),

    confidenceScore,

    classification,

    breakdown: {

      orderMomentum:
        Number(
          orderMomentum.toFixed(2)
        ),

      reviewMomentum:
        Number(
          reviewMomentum.toFixed(2)
        ),

      socialMomentum:
        Number(
          socialMomentum.toFixed(2)
        ),

      engagementMomentum:
        Number(
          engagementMomentum.toFixed(2)
        ),

      freshnessBoost,

      volatilityPenalty:
        Number(
          volatilityPenalty.toFixed(2)
        ),

      reliabilityBoost:
        Number(
          reliabilityBoost.toFixed(2)
        ),
    },

    metadata: {
      evaluatedAt:
        new Date().toISOString(),

      engineVersion:
        "v2-production",
    },
  };
}
