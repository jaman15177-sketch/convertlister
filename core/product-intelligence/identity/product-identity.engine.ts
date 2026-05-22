export type ProductIdentityInput = {

  title: string;
  description?: string;

  price: number;
  cost: number;

  categoryHint?: string;

  searchVolume: number;
  trendScore: number;

  competitorCount: number;

  returnRate: number;
};

export type ProductCategory =
  | "ELECTRONICS"
  | "FASHION"
  | "BEAUTY"
  | "HOME_LIVING"
  | "FITNESS"
  | "DIGITAL_PRODUCT"
  | "SOFTWARE"
  | "GENERAL";

export type BusinessModel =
  | "HIGH_TICKET"
  | "LOW_TICKET"
  | "SUBSCRIPTION"
  | "IMPULSE_BUY"
  | "NECESSITY"
  | "TREND_PRODUCT";

export type LifecycleStage =
  | "EMERGING"
  | "GROWING"
  | "PEAK"
  | "SATURATED"
  | "DECLINING";

export type ProductIdentityOutput = {

  category: ProductCategory;

  businessModel: BusinessModel;

  lifecycleStage: LifecycleStage;

  intentType:
    | "PROBLEM_SOLVING"
    | "DESIRE_DRIVEN"
    | "TREND_DRIVEN"
    | "UTILITY_DRIVEN";

  positioning:
    | "PREMIUM"
    | "MASS"
    | "BUDGET"
    | "NICHE";

  confidence: number;

  signals: string[];

  scoreBreakdown: {
    demandSignal: number;
    saturationSignal: number;
    profitabilitySignal: number;
    trendSignal: number;
  };

  metadata: {
    engineVersion: string;
    evaluatedAt: string;
  };
};

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function norm(v: number) {
  return clamp(v, 0, 100);
}

// ----------------------------------------------------
// CATEGORY DETECTION
// ----------------------------------------------------

function detectCategory(
  title: string,
  description?: string,
  hint?: string
): ProductCategory {

  const text = `${title} ${description ?? ""} ${hint ?? ""}`.toLowerCase();

  if (text.includes("shirt") || text.includes("shoe") || text.includes("fashion"))
    return "FASHION";

  if (text.includes("phone") || text.includes("laptop") || text.includes("camera"))
    return "ELECTRONICS";

  if (text.includes("cream") || text.includes("skin") || text.includes("beauty"))
    return "BEAUTY";

  if (text.includes("home") || text.includes("kitchen"))
    return "HOME_LIVING";

  if (text.includes("gym") || text.includes("fitness") || text.includes("protein"))
    return "FITNESS";

  if (text.includes("app") || text.includes("saas"))
    return "SOFTWARE";

  if (text.includes("ebook") || text.includes("pdf") || text.includes("course"))
    return "DIGITAL_PRODUCT";

  return "GENERAL";
}

// ----------------------------------------------------
// LIFECYCLE DETECTION
// ----------------------------------------------------

function detectLifecycle(input: ProductIdentityInput): LifecycleStage {

  const { searchVolume, trendScore, competitorCount } = input;

  if (trendScore > 80 && competitorCount < 20)
    return "EMERGING";

  if (trendScore > 70 && searchVolume > 60)
    return "GROWING";

  if (competitorCount > 60 && searchVolume > 70)
    return "PEAK";

  if (competitorCount > 80)
    return "SATURATED";

  return "DECLINING";
}

// ----------------------------------------------------
// BUSINESS MODEL DETECTION
// ----------------------------------------------------

function detectBusinessModel(
  price: number,
  trendScore: number
): BusinessModel {

  if (price > 100) return "HIGH_TICKET";

  if (price < 20 && trendScore > 70)
    return "IMPULSE_BUY";

  if (trendScore > 80)
    return "TREND_PRODUCT";

  if (price < 50)
    return "LOW_TICKET";

  return "NECESSITY";
}

// ----------------------------------------------------
// INTENT DETECTION
// ----------------------------------------------------

function detectIntent(title: string): ProductIdentityOutput["intentType"] {

  const t = title.toLowerCase();

  if (t.includes("how") || t.includes("problem"))
    return "PROBLEM_SOLVING";

  if (t.includes("best") || t.includes("top"))
    return "DESIRE_DRIVEN";

  if (t.includes("viral") || t.includes("trending"))
    return "TREND_DRIVEN";

  return "UTILITY_DRIVEN";
}

// ----------------------------------------------------
// POSITIONING DETECTION
// ----------------------------------------------------

function detectPositioning(price: number): ProductIdentityOutput["positioning"] {

  if (price > 100) return "PREMIUM";
  if (price > 40) return "MASS";
  if (price > 15) return "BUDGET";
  return "NICHE";
}

// ----------------------------------------------------
// MAIN ENGINE
// ----------------------------------------------------

export function productIdentityEngine(
  input: ProductIdentityInput
): ProductIdentityOutput {

  const category = detectCategory(
    input.title,
    input.description,
    input.categoryHint
  );

  const lifecycleStage = detectLifecycle(input);

  const businessModel = detectBusinessModel(
    input.price,
    input.trendScore
  );

  const intentType = detectIntent(input.title);

  const positioning = detectPositioning(input.price);

  // -------------------------------
  // SIGNAL SCORING
  // -------------------------------

  const demandSignal =
    (input.searchVolume * 0.5) +
    (input.trendScore * 0.5);

  const saturationSignal =
    norm(input.competitorCount);

  const profitabilitySignal =
    norm(((input.price - input.cost) / input.price) * 100);

  const trendSignal = input.trendScore;

  // -------------------------------
  // CONFIDENCE
  // -------------------------------

  let confidence =
    (demandSignal * 0.4) +
    ((100 - saturationSignal) * 0.3) +
    (trendSignal * 0.3);

  confidence = norm(confidence);

  // -------------------------------
  // SIGNALS
  // -------------------------------

  const signals: string[] = [];

  signals.push(`Category detected: ${category}`);
  signals.push(`Lifecycle stage: ${lifecycleStage}`);
  signals.push(`Business model: ${businessModel}`);
  signals.push(`Intent type: ${intentType}`);
  signals.push(`Positioning: ${positioning}`);

  if (lifecycleStage === "SATURATED") {
    signals.push("High competition environment detected");
  }

  if (trendSignal > 80) {
    signals.push("Strong trending product signal");
  }

  if (profitabilitySignal < 20) {
    signals.push("Low profitability structure risk");
  }

  // -------------------------------
  // RETURN
  // -------------------------------

  return {
    category,
    businessModel,
    lifecycleStage,
    intentType,
    positioning,
    confidence: Number(confidence.toFixed(2)),

    signals,

    scoreBreakdown: {
      demandSignal: Number(demandSignal.toFixed(2)),
      saturationSignal: Number(saturationSignal.toFixed(2)),
      profitabilitySignal: Number(profitabilitySignal.toFixed(2)),
      trendSignal: Number(trendSignal.toFixed(2)),
    },

    metadata: {
      engineVersion: "v1-production",
      evaluatedAt: new Date().toISOString(),
    },
  };
}
