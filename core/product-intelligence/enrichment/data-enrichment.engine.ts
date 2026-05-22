export type RawProductInput = {
  title: string;
  description?: string;

  price: number;
  cost: number;

  searchVolume?: number;
  trendScore?: number;

  competitorCount?: number;

  clickThroughRate?: number;
  conversionRate?: number;

  returnRate?: number;

  adSpend?: number;

  rating?: number;
  reviews?: number;

  refundRate?: number;
};

export type EnrichedProductData = {

  // -------------------------
  // CORE NORMALIZED FEATURES
  // -------------------------

  normalizedPrice: number;
  normalizedCost: number;

  profitMargin: number;

  demandScore: number;
  engagementScore: number;
  conversionScore: number;

  competitionScore: number;
  saturationScore: number;

  riskScore: number;

  qualityScore: number;

  // -------------------------
  // DERIVED INTELLIGENCE FEATURES
  // -------------------------

  marketHeat: number;
  opportunityScore: number;
  instabilityScore: number;

  productVelocity: number;
  demandMomentum: number;

  // -------------------------
  // INFERRED ATTRIBUTES
  // -------------------------

  inferredCategory: string;

  inferredLifecycle:
    | "EARLY"
    | "GROWTH"
    | "MATURE"
    | "SATURATED"
    | "DECLINING";

  inferredQualityTier:
    | "LOW"
    | "MID"
    | "HIGH";

  inferredRiskLevel:
    | "LOW"
    | "MEDIUM"
    | "HIGH";

  // -------------------------
  // SYSTEM METADATA
  // -------------------------

  metadata: {
    engineVersion: string;
    enrichedAt: string;
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

function safe(v?: number): number {
  return typeof v === "number" ? v : 0;
}

// -------------------------
// CATEGORY INFERENCE (FAST RULES)
// -------------------------

function inferCategory(title: string): string {

  const t = title.toLowerCase();

  if (t.includes("phone") || t.includes("laptop")) return "electronics";
  if (t.includes("shirt") || t.includes("shoe")) return "fashion";
  if (t.includes("cream") || t.includes("skin")) return "beauty";
  if (t.includes("course") || t.includes("ebook")) return "digital";
  if (t.includes("software") || t.includes("saas")) return "software";

  return "general";
}

// -------------------------
// LIFECYCLE MODEL (STABLE VERSION)
// -------------------------

function inferLifecycle(
  trend: number,
  saturation: number,
  competition: number
): EnrichedProductData["inferredLifecycle"] {

  if (trend > 80 && saturation < 35) return "EARLY";

  if (trend > 70 && competition < 60) return "GROWTH";

  if (saturation < 75) return "MATURE";

  if (saturation > 80 || competition > 80) return "SATURATED";

  return "DECLINING";
}

// -------------------------
// MAIN ENGINE
// -------------------------

export function dataEnrichmentEngine(
  input: RawProductInput
): EnrichedProductData {

  const price = safe(input.price);
  const cost = safe(input.cost);

  // -------------------------
  // CORE FINANCIALS
  // -------------------------

  const profitMargin =
    price > 0 ? ((price - cost) / price) * 100 : 0;

  const normalizedPrice = norm(price / 2);
  const normalizedCost = norm(cost / 2);

  // -------------------------
  // DEMAND LAYER
  // -------------------------

  const demandScore = norm(
    safe(input.searchVolume) * 0.5 +
    safe(input.trendScore) * 0.5
  );

  const engagementScore = norm(
    safe(input.clickThroughRate) * 100
  );

  const conversionScore = norm(
    safe(input.conversionRate) * 100
  );

  // -------------------------
  // COMPETITION LAYER
  // -------------------------

  const competitionScore = norm(
    safe(input.competitorCount)
  );

  const saturationScore = norm(
    safe(input.competitorCount) * 0.7 +
    safe(input.adSpend) * 0.3
  );

  // -------------------------
  // RISK LAYER
  // -------------------------

  const riskScore = norm(
    safe(input.returnRate) * 0.5 +
    safe(input.refundRate) * 0.3 +
    (100 - conversionScore) * 0.2
  );

  // -------------------------
  // QUALITY LAYER
  // -------------------------

  const qualityScore = norm(
    (safe(input.rating) / 5) * 100 +
    Math.min(safe(input.reviews) / 10, 20)
  );

  // -------------------------
  // DERIVED INTELLIGENCE
  // -------------------------

  const marketHeat = norm(
    demandScore * 0.5 +
    (100 - saturationScore) * 0.5
  );

  const opportunityScore = norm(
    demandScore * 0.6 +
    (100 - competitionScore) * 0.4
  );

  const instabilityScore = norm(
    riskScore * 0.6 +
    saturationScore * 0.4
  );

  const productVelocity = norm(
    demandScore * 0.4 +
    engagementScore * 0.3 +
    conversionScore * 0.3
  );

  const demandMomentum = norm(
    demandScore * 0.7 +
    productVelocity * 0.3
  );

  // -------------------------
  // INFERRED ATTRIBUTES
  // -------------------------

  const inferredCategory = inferCategory(input.title);

  const inferredLifecycle = inferLifecycle(
    safe(input.trendScore),
    saturationScore,
    competitionScore
  );

  let inferredQualityTier: "LOW" | "MID" | "HIGH";

  if (qualityScore > 80 && conversionScore > 70) {
    inferredQualityTier = "HIGH";
  } else if (qualityScore > 50) {
    inferredQualityTier = "MID";
  } else {
    inferredQualityTier = "LOW";
  }

  let inferredRiskLevel: "LOW" | "MEDIUM" | "HIGH";

  if (riskScore > 70) inferredRiskLevel = "HIGH";
  else if (riskScore > 40) inferredRiskLevel = "MEDIUM";
  else inferredRiskLevel = "LOW";

  // -------------------------
  // OUTPUT
  // -------------------------

  return {
    normalizedPrice,
    normalizedCost,

    profitMargin: Number(profitMargin.toFixed(2)),

    demandScore,
    engagementScore,
    conversionScore,

    competitionScore,
    saturationScore,

    riskScore,
    qualityScore,

    marketHeat,
    opportunityScore,
    instabilityScore,

    productVelocity,
    demandMomentum,

    inferredCategory,
    inferredLifecycle,
    inferredQualityTier,
    inferredRiskLevel,

    metadata: {
      engineVersion: "v2-production-final",
      enrichedAt: new Date().toISOString(),
    },
  };
}
