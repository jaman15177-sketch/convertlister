export type ExecutionInput = {

  // fusion output
  fusionScore: number;
  confidenceScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";

  // business context
  profitabilityScore: number;
  marketAdjustedMargin: number;

  saturationScore: number;
  competitorStrength: number;

  trendScore: number;

  anomalyScore: number;

  volatilityScore: number;

  // business constraints
  maxAdBudget: number;
  currentAdSpend: number;
};

export type ExecutionAction =
  | "SCALE_AGGRESSIVE"
  | "SCALE_MODERATE"
  | "LAUNCH"
  | "HOLD"
  | "PIVOT"
  | "PAUSE"
  | "KILL";

export type ExecutionPlan = {

  action: ExecutionAction;

  confidence: number;

  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

  decisions: {

    budgetAdjustment: number; // %

    priceAdjustment: number; // %

    scalingMultiplier: number;

    riskControlLevel: number; // 0–100
  };

  guards: string[];

  reasoning: string[];

  metadata: {
    executedAt: string;
    engineVersion: string;
  };
};

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function clamp(
  v: number,
  min: number,
  max: number
): number {
  return Math.max(min, Math.min(max, v));
}

// ----------------------------------------------------
// MAIN ENGINE
// ----------------------------------------------------

export function executeIntelligence(
  input: ExecutionInput
): ExecutionPlan {

  const {
    fusionScore,
    confidenceScore,
    riskLevel,
    profitabilityScore,
    marketAdjustedMargin,
    saturationScore,
    competitorStrength,
    trendScore,
    anomalyScore,
    volatilityScore,
    maxAdBudget,
    currentAdSpend
  } = input;

  // ----------------------------------------
  // BASE EXECUTION SIGNAL
  // ----------------------------------------

  let executionPower =
    (fusionScore * 0.4) +
    (trendScore * 0.2) +
    (profitabilityScore * 0.2) +
    ((100 - saturationScore) * 0.1) +
    ((100 - competitorStrength) * 0.1);

  // ----------------------------------------
  // RISK PENALTIES
  // ----------------------------------------

  executionPower -= anomalyScore * 0.2;
  executionPower -= volatilityScore * 0.15;

  executionPower = clamp(executionPower, 0, 100);

  // ----------------------------------------
  // PRIORITY CLASSIFICATION
  // ----------------------------------------

  let priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

  if (executionPower >= 85 && confidenceScore >= 80) {
    priority = "CRITICAL";
  } else if (executionPower >= 70) {
    priority = "HIGH";
  } else if (executionPower >= 50) {
    priority = "MEDIUM";
  } else {
    priority = "LOW";
  }

  // ----------------------------------------
  // ACTION DECISION ENGINE
  // ----------------------------------------

  let action: ExecutionAction;

  if (executionPower >= 85 && riskLevel === "LOW") {
    action = "SCALE_AGGRESSIVE";
  } else if (executionPower >= 70) {
    action = "SCALE_MODERATE";
  } else if (executionPower >= 55) {
    action = "LAUNCH";
  } else if (executionPower >= 40) {
    action = "HOLD";
  } else if (executionPower >= 25) {
    action = "PIVOT";
  } else if (executionPower >= 10) {
    action = "PAUSE";
  } else {
    action = "KILL";
  }

  // ----------------------------------------
  // BUDGET CONTROL
  // ----------------------------------------

  let budgetAdjustment = 0;

  if (action === "SCALE_AGGRESSIVE") budgetAdjustment = 80;
  else if (action === "SCALE_MODERATE") budgetAdjustment = 40;
  else if (action === "LAUNCH") budgetAdjustment = 20;
  else if (action === "HOLD") budgetAdjustment = 0;
  else if (action === "PIVOT") budgetAdjustment = -20;
  else if (action === "PAUSE") budgetAdjustment = -60;
  else if (action === "KILL") budgetAdjustment = -100;

  // cap budget safety
  const allowedBudget =
    maxAdBudget - currentAdSpend;

  if (budgetAdjustment > allowedBudget) {
    budgetAdjustment = allowedBudget;
  }

  // ----------------------------------------
  // PRICE STRATEGY
  // ----------------------------------------

  let priceAdjustment = 0;

  if (marketAdjustedMargin < 10) {
    priceAdjustment = 25; // increase price
  } else if (marketAdjustedMargin > 40) {
    priceAdjustment = -10; // slight discount for scale
  }

  // ----------------------------------------
  // SCALING MULTIPLIER
  // ----------------------------------------

  let scalingMultiplier = 1;

  if (action === "SCALE_AGGRESSIVE") scalingMultiplier = 3;
  else if (action === "SCALE_MODERATE") scalingMultiplier = 2;
  else if (action === "LAUNCH") scalingMultiplier = 1.2;
  else if (action === "PIVOT") scalingMultiplier = 0.7;
  else if (action === "PAUSE") scalingMultiplier = 0.3;
  else scalingMultiplier = 0;

  // ----------------------------------------
  // RISK CONTROL LEVEL
  // ----------------------------------------

  let riskControlLevel =
    100 - executionPower;

  riskControlLevel = clamp(riskControlLevel, 0, 100);

  // ----------------------------------------
  // SAFETY GUARDS
  // ----------------------------------------

  const guards: string[] = [];

  if (anomalyScore > 40) {
    guards.push("BLOCK: anomaly detected");
  }

  if (volatilityScore > 60) {
    guards.push("LIMIT: high volatility market");
  }

  if (competitorStrength > 80) {
    guards.push("WARNING: dominant competitors");
  }

  if (saturationScore > 70) {
    guards.push("WARNING: saturated market");
  }

  if (confidenceScore < 50) {
    guards.push("BLOCK: low confidence decision");
  }

  // ----------------------------------------
  // REASONING ENGINE
  // ----------------------------------------

  const reasoning: string[] = [];

  reasoning.push(`Execution power: ${executionPower.toFixed(2)}`);
  reasoning.push(`Fusion score: ${fusionScore}`);
  reasoning.push(`Trend strength: ${trendScore}`);
  reasoning.push(`Market margin: ${marketAdjustedMargin}`);
  reasoning.push(`Risk level: ${riskLevel}`);

  if (action === "SCALE_AGGRESSIVE") {
    reasoning.push("Strong market + low risk detected → aggressive scaling");
  } else if (action === "KILL") {
    reasoning.push("Weak signals + high risk → terminate product");
  }

  // ----------------------------------------
  // FINAL OUTPUT
  // ----------------------------------------

  return {
    action,
    confidence: confidenceScore,
    priority,

    decisions: {
      budgetAdjustment,
      priceAdjustment,
      scalingMultiplier,
      riskControlLevel,
    },

    guards,

    reasoning,

    metadata: {
      executedAt: new Date().toISOString(),
      engineVersion: "v1-production",
    },
  };
}
