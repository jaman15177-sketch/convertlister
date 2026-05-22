export type MarketTimingInput = {
  trendScore: number;
  trendAcceleration: number;

  saturationScore: number;
  competitorStrength: number;

  searchVolume: number;
  searchGrowthRate: number;

  demandVolatility: number;
  priceVolatility: number;

  adCompetitionLevel: number;

  conversionRate: number;
};

export type MarketRegime =
  | "ACCELERATING_GROWTH"
  | "EARLY_TREND"
  | "MATURE_GROWTH"
  | "OVERHEATED"
  | "SATURATED"
  | "DECLINING";

export type TimingDecision =
  | "ENTER_AGGRESSIVE"
  | "ENTER_NOW"
  | "WAIT"
  | "TEST_SMALL"
  | "REDUCE_EXPOSURE"
  | "EXIT";

export type MarketTimingOutput = {
  regime: MarketRegime;

  timingScore: number;
  momentumScore: number;
  opportunityScore: number;
  riskScore: number;
  stabilityScore: number;

  confidence: number;

  decision: TimingDecision;

  signals: string[];

  metadata: {
    engineVersion: string;
    evaluatedAt: string;
  };
};

// -------------------------
// HELPERS
// -------------------------

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function norm(v: number) {
  return clamp(v, 0, 100);
}

// -------------------------
// REGIME DETECTION (FAANG STYLE)
// -------------------------

function detectRegime(input: MarketTimingInput): MarketRegime {
  const {
    trendScore,
    trendAcceleration,
    saturationScore,
    competitorStrength,
  } = input;

  if (trendAcceleration > 40 && trendScore > 70 && saturationScore < 40) {
    return "ACCELERATING_GROWTH";
  }

  if (trendScore > 75 && saturationScore < 50) {
    return "EARLY_TREND";
  }

  if (trendScore > 70 && saturationScore < 70) {
    return "MATURE_GROWTH";
  }

  if (saturationScore > 75 && competitorStrength > 70) {
    return "OVERHEATED";
  }

  if (saturationScore > 80) {
    return "SATURATED";
  }

  return "DECLINING";
}

// -------------------------
// MAIN ENGINE
// -------------------------

export function marketTimingEngine(
  input: MarketTimingInput
): MarketTimingOutput {

  const regime = detectRegime(input);

  // -------------------------
  // MOMENTUM ENGINE
  // -------------------------

  const momentumScore = norm(
    (input.trendScore * 0.45) +
    (input.trendAcceleration * 0.35) +
    (input.searchGrowthRate * 0.2)
  );

  // -------------------------
  // OPPORTUNITY ENGINE
  // -------------------------

  const opportunityScore = norm(
    (100 - input.saturationScore) * 0.4 +
    (input.searchGrowthRate * 0.3) +
    (input.conversionRate * 30)
  );

  // -------------------------
  // RISK ENGINE
  // -------------------------

  const riskScore = norm(
    (input.saturationScore * 0.35) +
    (input.competitorStrength * 0.3) +
    (input.adCompetitionLevel * 0.2) +
    (input.priceVolatility * 0.15)
  );

  // -------------------------
  // STABILITY ENGINE
  // -------------------------

  const stabilityScore = norm(
    100 -
    (input.demandVolatility * 0.4 +
     input.priceVolatility * 0.4 +
     Math.abs(input.trendAcceleration) * 0.2)
  );

  // -------------------------
  // TIMING SCORE (CORE)
  // -------------------------

  let timingScore = norm(
    (momentumScore * 0.35) +
    (opportunityScore * 0.35) +
    ((100 - riskScore) * 0.2) +
    (stabilityScore * 0.1)
  );

  // -------------------------
  // REGIME MODIFIERS (IMPORTANT)
  // -------------------------

  if (regime === "ACCELERATING_GROWTH") timingScore += 10;
  if (regime === "EARLY_TREND") timingScore += 6;
  if (regime === "OVERHEATED") timingScore -= 20;
  if (regime === "SATURATED") timingScore -= 30;
  if (regime === "DECLINING") timingScore -= 25;

  timingScore = norm(timingScore);

  // -------------------------
  // CONFIDENCE MODEL
  // -------------------------

  const confidence = norm(
    (stabilityScore * 0.4) +
    (momentumScore * 0.3) +
    (opportunityScore * 0.3)
  );

  // -------------------------
  // DECISION ENGINE
  // -------------------------

  let decision: TimingDecision;

  if (timingScore >= 85 && stabilityScore > 70) {
    decision = "ENTER_AGGRESSIVE";
  } else if (timingScore >= 70) {
    decision = "ENTER_NOW";
  } else if (timingScore >= 55) {
    decision = "WAIT";
  } else if (timingScore >= 40) {
    decision = "TEST_SMALL";
  } else if (timingScore >= 25) {
    decision = "REDUCE_EXPOSURE";
  } else {
    decision = "EXIT";
  }

  // -------------------------
  // SIGNALS (EXPLAINABILITY)
  // -------------------------

  const signals: string[] = [];

  signals.push(`Market regime: ${regime}`);
  signals.push(`Momentum: ${momentumScore.toFixed(2)}`);
  signals.push(`Opportunity: ${opportunityScore.toFixed(2)}`);
  signals.push(`Risk: ${riskScore.toFixed(2)}`);
  signals.push(`Stability: ${stabilityScore.toFixed(2)}`);

  if (regime === "ACCELERATING_GROWTH") {
    signals.push("Strong early expansion phase detected");
  }

  if (regime === "OVERHEATED") {
    signals.push("Market overheating — capital risk rising");
  }

  if (input.trendAcceleration > 50) {
    signals.push("High acceleration trend detected");
  }

  if (input.saturationScore > 80) {
    signals.push("Extreme saturation warning");
  }

  // -------------------------
  // OUTPUT
  // -------------------------

  return {
    regime,

    timingScore,
    momentumScore,
    opportunityScore,
    riskScore,
    stabilityScore,

    confidence,

    decision,

    signals,

    metadata: {
      engineVersion: "v2-production-final",
      evaluatedAt: new Date().toISOString(),
    },
  };
}
