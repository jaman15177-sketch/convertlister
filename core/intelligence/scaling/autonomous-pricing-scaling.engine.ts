export type PricingScalingInput = {

  // business performance
  revenue: number;
  netMargin: number;
  marketAdjustedMargin: number;

  // demand signals
  trendScore: number;
  demandElasticity: number;

  // competition
  competitorStrength: number;
  pricePressureIndex: number;

  // saturation
  saturationScore: number;

  // execution signals
  executionPower: number;
  confidenceScore: number;

  // operational constraints
  currentPrice: number;
  minMarginThreshold: number;
  maxPriceIncreaseLimit: number;

  // ads
  currentAdSpend: number;
  maxAdSpend: number;
};

export type ScalingAction =
  | "AGGRESSIVE_SCALE"
  | "SCALE_UP"
  | "MAINTAIN"
  | "PRICE_INCREASE"
  | "PRICE_DECREASE"
  | "REDUCE_SPEND"
  | "STOP"
  | "EXIT_MARKET";

export type PricingScalingResult = {

  action: ScalingAction;

  newPrice: number;

  adBudgetChangePercent: number;

  scalingMultiplier: number;

  riskLevel: "LOW" | "MEDIUM" | "HIGH";

  reasoning: string[];

  safetyFlags: string[];

  metadata: {
    evaluatedAt: string;
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

export function autonomousPricingScaling(
  input: PricingScalingInput
): PricingScalingResult {

  const {
    revenue,
    netMargin,
    marketAdjustedMargin,
    trendScore,
    demandElasticity,
    competitorStrength,
    pricePressureIndex,
    saturationScore,
    executionPower,
    confidenceScore,
    currentPrice,
    minMarginThreshold,
    maxPriceIncreaseLimit,
    currentAdSpend,
    maxAdSpend,
  } = input;

  // ----------------------------------------
  // MARKET HEALTH SCORE
  // ----------------------------------------

  let marketHealth =
    (trendScore * 0.3) +
    ((100 - saturationScore) * 0.3) +
    ((100 - competitorStrength) * 0.2) +
    (netMargin * 0.2);

  marketHealth = clamp(marketHealth, 0, 100);

  // ----------------------------------------
  // PRICE PRESSURE SIGNAL
  // ----------------------------------------

  const pressure =
    pricePressureIndex +
    saturationScore * 0.3 +
    competitorStrength * 0.3;

  // ----------------------------------------
  // ACTION ENGINE
  // ----------------------------------------

  let action: ScalingAction;

  if (
    marketHealth > 80 &&
    executionPower > 80 &&
    confidenceScore > 80
  ) {
    action = "AGGRESSIVE_SCALE";
  }

  else if (
    marketHealth > 65
  ) {
    action = "SCALE_UP";
  }

  else if (
    netMargin < minMarginThreshold
  ) {
    action = "PRICE_INCREASE";
  }

  else if (
    pressure > 70 &&
    marketAdjustedMargin < 20
  ) {
    action = "REDUCE_SPEND";
  }

  else if (
    marketAdjustedMargin < 5
  ) {
    action = "STOP";
  }

  else if (
    saturationScore > 80 &&
    competitorStrength > 70
  ) {
    action = "EXIT_MARKET";
  }

  else {
    action = "MAINTAIN";
  }

  // ----------------------------------------
  // PRICE ENGINE
  // ----------------------------------------

  let newPrice = currentPrice;

  if (action === "PRICE_INCREASE") {
    newPrice += currentPrice * 0.15;
  }

  if (action === "AGGRESSIVE_SCALE") {
    newPrice -= currentPrice * 0.05; // slight scale discount
  }

  if (action === "EXIT_MARKET") {
    newPrice = currentPrice * 0.9;
  }

  newPrice = clamp(
    newPrice,
    currentPrice * 0.5,
    currentPrice * (1 + maxPriceIncreaseLimit / 100)
  );

  // ----------------------------------------
  // AD BUDGET CONTROL
  // ----------------------------------------

  let adBudgetChangePercent = 0;

  if (action === "AGGRESSIVE_SCALE") {
    adBudgetChangePercent = 80;
  }

  else if (action === "SCALE_UP") {
    adBudgetChangePercent = 40;
  }

  else if (action === "REDUCE_SPEND") {
    adBudgetChangePercent = -50;
  }

  else if (action === "STOP") {
    adBudgetChangePercent = -90;
  }

  else if (action === "EXIT_MARKET") {
    adBudgetChangePercent = -100;
  }

  // cap budget safety
  const allowedIncrease =
    maxAdSpend - currentAdSpend;

  if (adBudgetChangePercent > allowedIncrease) {
    adBudgetChangePercent = allowedIncrease;
  }

  // ----------------------------------------
  // SCALING MULTIPLIER
  // ----------------------------------------

  let scalingMultiplier = 1;

  if (action === "AGGRESSIVE_SCALE") scalingMultiplier = 3;
  else if (action === "SCALE_UP") scalingMultiplier = 2;
  else if (action === "MAINTAIN") scalingMultiplier = 1;
  else if (action === "REDUCE_SPEND") scalingMultiplier = 0.6;
  else if (action === "STOP") scalingMultiplier = 0.2;
  else if (action === "EXIT_MARKET") scalingMultiplier = 0;

  // ----------------------------------------
  // RISK LEVEL
  // ----------------------------------------

  let riskLevel: "LOW" | "MEDIUM" | "HIGH";

  if (
    confidenceScore > 80 &&
    marketHealth > 70
  ) {
    riskLevel = "LOW";
  }

  else if (
    marketHealth > 40
  ) {
    riskLevel = "MEDIUM";
  }

  else {
    riskLevel = "HIGH";
  }

  // ----------------------------------------
  // SAFETY FLAGS
  // ----------------------------------------

  const safetyFlags: string[] = [];

  if (saturationScore > 75) {
    safetyFlags.push("HIGH SATURATION RISK");
  }

  if (competitorStrength > 80) {
    safetyFlags.push("DOMINANT COMPETITION");
  }

  if (netMargin < minMarginThreshold) {
    safetyFlags.push("BELOW PROFIT THRESHOLD");
  }

  if (confidenceScore < 50) {
    safetyFlags.push("LOW CONFIDENCE SIGNAL");
  }

  if (pressure > 80) {
    safetyFlags.push("EXTREME MARKET PRESSURE");
  }

  // ----------------------------------------
  // REASONING ENGINE
  // ----------------------------------------

  const reasoning: string[] = [];

  reasoning.push(`Market health: ${marketHealth.toFixed(2)}`);
  reasoning.push(`Execution power: ${executionPower}`);
  reasoning.push(`Net margin: ${netMargin}`);
  reasoning.push(`Market adjusted margin: ${marketAdjustedMargin}`);
  reasoning.push(`Pressure score: ${pressure.toFixed(2)}`);

  reasoning.push(`Selected action: ${action}`);

  // ----------------------------------------
  // RETURN
  // ----------------------------------------

  return {
    action,
    newPrice: Number(newPrice.toFixed(2)),
    adBudgetChangePercent: Number(adBudgetChangePercent.toFixed(2)),
    scalingMultiplier,
    riskLevel,
    reasoning,
    safetyFlags,
    metadata: {
      evaluatedAt: new Date().toISOString(),
      engineVersion: "v1-production",
    },
  };
}
