import { ProductInput } from "../00-interfaces";

export type IntentCategory =
  | "HIGH_PURCHASE_INTENT"
  | "MID_PURCHASE_INTENT"
  | "RESEARCH_INTENT"
  | "BROWSING_INTENT"
  | "NO_CLEAR_INTENT";

export interface IntentAnalysisResult {
  productId: string;

  category: IntentCategory;

  intentScore: number;

  commercialStrength: number;

  emotionalIntensity: number;

  urgencyScore: number;

  conversionProbability: number;

  buyerReadiness: "READY_TO_BUY" | "NEAR_READY" | "EARLY_STAGE" | "NOT_READY";

  dominantTriggers: string[];

  decisionSignals: string[];

  riskFlags: string[];

  confidence: number;
}

export class IntentAnalysisEngine {
  analyze(product: ProductInput): IntentAnalysisResult {
    const intentScore = this.calculateIntentScore(product);

    const commercialStrength =
      this.calculateCommercialStrength(product);

    const emotionalIntensity =
      this.calculateEmotionalIntensity(product);

    const urgencyScore =
      this.calculateUrgency(product);

    const conversionProbability =
      this.calculateConversionProbability({
        intentScore,
        commercialStrength,
        emotionalIntensity,
        urgencyScore,
      });

    const category =
      this.classifyIntent(intentScore);

    const buyerReadiness =
      this.getBuyerReadiness(conversionProbability);

    const dominantTriggers =
      this.extractTriggers(product);

    const decisionSignals =
      this.generateDecisionSignals(product, intentScore);

    const riskFlags =
      this.detectRisks(product);

    const confidence =
      this.calculateConfidence({
        intentScore,
        conversionProbability,
        triggers: dominantTriggers,
      });

    return {
      productId: product.productId,
      category,
      intentScore,
      commercialStrength,
      emotionalIntensity,
      urgencyScore,
      conversionProbability,
      buyerReadiness,
      dominantTriggers,
      decisionSignals,
      riskFlags,
      confidence,
    };
  }

  // -----------------------------
  // INTENT SCORE ENGINE
  // -----------------------------
  private calculateIntentScore(product: ProductInput): number {
    let score = 35;

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("buy")) score += 25;
    if (text.includes("order")) score += 20;
    if (text.includes("price")) score += 10;
    if (text.includes("discount")) score += 15;
    if (product.price < 30) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // COMMERCIAL STRENGTH
  // -----------------------------
  private calculateCommercialStrength(product: ProductInput): number {
    let score = 40;

    const text = `${product.title}`.toLowerCase();

    if (text.includes("best")) score += 20;
    if (text.includes("top")) score += 15;
    if (text.includes("premium")) score += 20;
    if (text.includes("viral")) score += 25;

    return Math.min(100, score);
  }

  // -----------------------------
  // EMOTIONAL INTENSITY
  // -----------------------------
  private calculateEmotionalIntensity(product: ProductInput): number {
    let score = 30;

    const text = `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("urgent")) score += 25;
    if (text.includes("now")) score += 20;
    if (text.includes("limited")) score += 25;
    if (text.includes("exclusive")) score += 15;

    return Math.min(100, score);
  }

  // -----------------------------
  // URGENCY SCORE
  // -----------------------------
  private calculateUrgency(product: ProductInput): number {
    let score = 25;

    const text = `${product.title}`.toLowerCase();

    if (text.includes("today")) score += 25;
    if (text.includes("fast")) score += 20;
    if (text.includes("instant")) score += 30;

    return Math.min(100, score);
  }

  // -----------------------------
  // CONVERSION PROBABILITY ENGINE
  // -----------------------------
  private calculateConversionProbability(input: {
    intentScore: number;
    commercialStrength: number;
    emotionalIntensity: number;
    urgencyScore: number;
  }): number {
    const score =
      input.intentScore * 0.3 +
      input.commercialStrength * 0.25 +
      input.emotionalIntensity * 0.25 +
      input.urgencyScore * 0.2;

    return Math.round(Math.min(100, score));
  }

  // -----------------------------
  // CATEGORY CLASSIFICATION
  // -----------------------------
  private classifyIntent(score: number): IntentCategory {
    if (score >= 85) return "HIGH_PURCHASE_INTENT";
    if (score >= 65) return "MID_PURCHASE_INTENT";
    if (score >= 45) return "RESEARCH_INTENT";
    if (score >= 25) return "BROWSING_INTENT";
    return "NO_CLEAR_INTENT";
  }

  // -----------------------------
  // BUYER READINESS ENGINE
  // -----------------------------
  private getBuyerReadiness(score: number): IntentAnalysisResult["buyerReadiness"] {
    if (score >= 80) return "READY_TO_BUY";
    if (score >= 60) return "NEAR_READY";
    if (score >= 40) return "EARLY_STAGE";
    return "NOT_READY";
  }

  // -----------------------------
  // TRIGGER EXTRACTION ENGINE
  // -----------------------------
  private extractTriggers(product: ProductInput): string[] {
    const triggers: string[] = [];

    const text = `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("viral")) triggers.push("SOCIAL_PROOF");
    if (text.includes("limited")) triggers.push("SCARCITY");
    if (text.includes("best")) triggers.push("AUTHORITY");
    if (text.includes("cheap")) triggers.push("PRICE_ADVANTAGE");

    return triggers;
  }

  // -----------------------------
  // DECISION SIGNALS ENGINE
  // -----------------------------
  private generateDecisionSignals(product: ProductInput, score: number): string[] {
    const signals: string[] = [];

    if (score > 80) signals.push("STRONG_BUY_SIGNAL");
    if (score > 60) signals.push("POTENTIAL_BUY_SIGNAL");
    if (product.price < 30) signals.push("LOW_PRICE_ENTRY");

    const text = `${product.title}`.toLowerCase();

    if (text.includes("smart")) signals.push("TECH_ADOPTION_SIGNAL");

    return signals;
  }

  // -----------------------------
  // RISK DETECTION ENGINE
  // -----------------------------
  private detectRisks(product: ProductInput): string[] {
    const risks: string[] = [];

    const text = `${product.title}`.toLowerCase();

    if (text.includes("fragile")) risks.push("LOGISTICS_RISK");
    if (product.price > 100) risks.push("HIGH_PRICE_RISK");
    if (text.includes("restricted")) risks.push("COMPLIANCE_RISK");

    return risks;
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(input: {
    intentScore: number;
    conversionProbability: number;
    triggers: string[];
  }): number {
    const base = (input.intentScore + input.conversionProbability) / 2;
    const boost = input.triggers.length * 5;

    return Math.min(100, Math.round(base + boost));
  }
}

export const intentAnalysisEngine =
  new IntentAnalysisEngine();
