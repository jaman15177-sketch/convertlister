export type FusionInput = {

  // core engines
  trendScore: number;
  saturationScore: number;
  competitorStrength: number;
  marginScore: number;
  executionScore: number;

  // signal quality layer
  signalNoise: number;
  anomalyScore: number;

  // market dynamics
  volatility: number;
  demandStrength: number;

  // reliability layer
  sourceConfidence: number;
  dataFreshness: number;
};

export type FusionDecision =
  | "AUTO_SCALE"
  | "SCALE"
  | "TEST"
  | "HOLD"
  | "PIVOT"
  | "REJECT";

export type FusionOutput = {

  fusionScore: number;

  confidence: number;

  stabilityScore: number;

  riskScore: number;

  decision: FusionDecision;

  conflictSignals: string[];

  breakdown: {
    momentum: number;
    marketPressure: number;
    profitability: number;
    reliability: number;
    instability: number;
  };

  reasoning: string[];

  metadata: {
    evaluatedAt: string;
    engineVersion: string;
  };
};

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function norm(v: number): number {
  return clamp(v, 0, 100);
}

// ----------------------------------------------------
// MAIN ORCHESTRATOR
// ----------------------------------------------------

export function fuseIntelligence(
  input: FusionInput
): FusionOutput {

  const {
    trendScore,
    saturationScore,
    competitorStrength,
    marginScore,
    executionScore,
    signalNoise,
    anomalyScore,
    volatility,
    demandStrength,
    sourceConfidence,
    dataFreshness
  } = input;

  // --------------------------------------------------
  // MOMENTUM ENGINE (growth pressure)
  // --------------------------------------------------

  const momentum =
    (trendScore * 0.5) +
    (demandStrength * 0.3) +
    (executionScore * 0.2);

  // --------------------------------------------------
  // MARKET PRESSURE ENGINE (negative force)
  // --------------------------------------------------

  const marketPressure =
    (saturationScore * 0.4) +
    (competitorStrength * 0.4) +
    (volatility * 0.2);

  // --------------------------------------------------
  // PROFITABILITY ENGINE
  // --------------------------------------------------

  const profitability =
    marginScore - (signalNoise * 0.2);

  // --------------------------------------------------
  // RELIABILITY ENGINE
  // --------------------------------------------------

  const reliability =
    (sourceConfidence * 0.6) +
    (dataFreshness * 0.4);

  // --------------------------------------------------
  // INSTABILITY ENGINE
  // --------------------------------------------------

  const instability =
    (anomalyScore * 0.6) +
    (signalNoise * 0.4);

  // --------------------------------------------------
  // FUSION SCORE (multi-force equilibrium model)
  // --------------------------------------------------

  let fusionScore =
    (momentum * 0.30) +
    ((100 - marketPressure) * 0.25) +
    (profitability * 0.25) +
    (reliability * 0.15) -
    (instability * 0.15);

  fusionScore = norm(fusionScore);

  // --------------------------------------------------
  // CONFIDENCE (dynamic calibration)
  // --------------------------------------------------

  let confidence =
    (sourceConfidence * 0.4) +
    (dataFreshness * 0.3) +
    (executionScore * 0.3);

  // confidence penalty from instability
  confidence -= anomalyScore * 0.2;
  confidence -= signalNoise * 0.2;

  confidence = norm(confidence);

  // --------------------------------------------------
  // STABILITY SCORE
  // --------------------------------------------------

  let stabilityScore =
    100 -
    (anomalyScore * 0.5) -
    (volatility * 0.3) -
    (signalNoise * 0.2);

  stabilityScore = norm(stabilityScore);

  // --------------------------------------------------
  // RISK SCORE
  // --------------------------------------------------

  const riskScore =
    (marketPressure * 0.4) +
    (instability * 0.3) +
    (100 - marginScore) * 0.3;

  // --------------------------------------------------
  // CONFLICT DETECTION
  // --------------------------------------------------

  const conflictSignals: string[] = [];

  if (trendScore > 80 && saturationScore > 75) {
    conflictSignals.push("Trend strong but market saturated");
  }

  if (marginScore < 30 && executionScore > 70) {
    conflictSignals.push("Execution strong but low profitability");
  }

  if (competitorStrength > 80 && demandStrength > 80) {
    conflictSignals.push("High demand but dominated by competitors");
  }

  if (signalNoise > 60) {
    conflictSignals.push("High signal noise reduces reliability");
  }

  // --------------------------------------------------
  // DECISION ENGINE
  // --------------------------------------------------

  let decision: FusionDecision;

  if (fusionScore >= 85 && confidence >= 80 && stabilityScore >= 70) {
    decision = "AUTO_SCALE";
  } else if (fusionScore >= 70) {
    decision = "SCALE";
  } else if (fusionScore >= 55) {
    decision = "TEST";
  } else if (fusionScore >= 40) {
    decision = "HOLD";
  } else if (fusionScore >= 25) {
    decision = "PIVOT";
  } else {
    decision = "REJECT";
  }

  // --------------------------------------------------
  // REASONING ENGINE
  // --------------------------------------------------

  const reasoning: string[] = [];

  reasoning.push(`Fusion score: ${fusionScore.toFixed(2)}`);
  reasoning.push(`Confidence: ${confidence.toFixed(2)}`);
  reasoning.push(`Stability: ${stabilityScore.toFixed(2)}`);
  reasoning.push(`Risk: ${riskScore.toFixed(2)}`);

  reasoning.push(`Momentum: ${momentum.toFixed(2)}`);
  reasoning.push(`Market pressure: ${marketPressure.toFixed(2)}`);
  reasoning.push(`Profitability: ${profitability.toFixed(2)}`);

  if (decision === "AUTO_SCALE") {
    reasoning.push("Strong multi-engine alignment → scale automatically");
  }

  if (decision === "REJECT") {
    reasoning.push("Low signal quality + high risk → reject execution");
  }

  // --------------------------------------------------
  // FINAL OUTPUT
  // --------------------------------------------------

  return {
    fusionScore: Number(fusionScore.toFixed(2)),
    confidence: Number(confidence.toFixed(2)),
    stabilityScore: Number(stabilityScore.toFixed(2)),
    riskScore: Number(riskScore.toFixed(2)),

    decision,

    conflictSignals,

    breakdown: {
      momentum: Number(momentum.toFixed(2)),
      marketPressure: Number(marketPressure.toFixed(2)),
      profitability: Number(profitability.toFixed(2)),
      reliability: Number(reliability.toFixed(2)),
      instability: Number(instability.toFixed(2)),
    },

    reasoning,

    metadata: {
      evaluatedAt: new Date().toISOString(),
      engineVersion: "v6-production-final",
    },
  };
}
