import { ProductInput } from "../00-interfaces";

export type IntentType =
  | "HIGH_BUY_INTENT"
  | "MEDIUM_BUY_INTENT"
  | "BROWSE_INTENT"
  | "RESEARCH_INTENT"
  | "LOW_INTENT";

export interface IntentSignal {
  productId: string;

  intentType: IntentType;

  intentScore: number;

  urgencyLevel: "LOW" | "MEDIUM" | "HIGH" | "IMMEDIATE";

  buyerStage:
    | "AWARENESS"
    | "CONSIDERATION"
    | "DECISION"
    | "PURCHASE";

  emotionalDrivers: string[];

  psychologicalTriggers: string[];

  trustLevel: number;

  frictionLevel: number;

  signals: string[];

  confidence: number;
}

export class IntentAIEngine {
  analyze(product: ProductInput): IntentSignal {
    const emotionalDrivers =
      this.detectEmotions(product);

    const psychologicalTriggers =
      this.detectTriggers(product);

    const intentScore =
      this.calculateIntentScore(
        product,
        emotionalDrivers,
        psychologicalTriggers
      );

    const intentType =
      this.getIntentType(intentScore);

    const urgencyLevel =
      this.getUrgencyLevel(product);

    const buyerStage =
      this.getBuyerStage(intentScore);

    const trustLevel =
      this.calculateTrustLevel(product);

    const frictionLevel =
      this.calculateFriction(product);

    const signals =
      this.generateSignals(product);

    const confidence =
      this.calculateConfidence(signals);

    return {
      productId: product.productId,
      intentType,
      intentScore,
      urgencyLevel,
      buyerStage,
      emotionalDrivers,
      psychologicalTriggers,
      trustLevel,
      frictionLevel,
      signals,
      confidence,
    };
  }

  // -----------------------------
  // EMOTION ENGINE
  // -----------------------------
  private detectEmotions(product: ProductInput): string[] {
    const emotions: string[] = [];

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("easy"))
      emotions.push("CONVENIENCE");

    if (text.includes("fast"))
      emotions.push("SPEED_DESIRE");

    if (text.includes("cheap"))
      emotions.push("VALUE_SEEKING");

    if (text.includes("premium"))
      emotions.push("STATUS_SEEKING");

    if (text.includes("smart"))
      emotions.push("CONTROL_DESIRE");

    return emotions;
  }

  // -----------------------------
  // PSYCHOLOGICAL TRIGGERS
  // -----------------------------
  private detectTriggers(product: ProductInput): string[] {
    const triggers: string[] = [];

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("limited"))
      triggers.push("SCARCITY");

    if (text.includes("viral"))
      triggers.push("SOCIAL_PROOF");

    if (text.includes("best"))
      triggers.push("AUTHORITY_BIAS");

    if (text.includes("new"))
      triggers.push("NOVELTY_EFFECT");

    if (text.includes("discount"))
      triggers.push("PRICE_ANCHORING");

    return triggers;
  }

  // -----------------------------
  // INTENT SCORE ENGINE
  // -----------------------------
  private calculateIntentScore(
    product: ProductInput,
    emotions: string[],
    triggers: string[]
  ): number {
    let score = 40;

    score += emotions.length * 8;
    score += triggers.length * 10;

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("buy")) score += 20;
    if (text.includes("order")) score += 15;
    if (text.includes("deal")) score += 10;

    if (product.price < 30) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // INTENT CLASSIFICATION
  // -----------------------------
  private getIntentType(score: number): IntentType {
    if (score >= 85) return "HIGH_BUY_INTENT";
    if (score >= 70) return "MEDIUM_BUY_INTENT";
    if (score >= 50) return "RESEARCH_INTENT";
    if (score >= 30) return "BROWSE_INTENT";
    return "LOW_INTENT";
  }

  // -----------------------------
  // URGENCY ENGINE
  // -----------------------------
  private getUrgencyLevel(product: ProductInput): IntentSignal["urgencyLevel"] {
    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("now")) return "IMMEDIATE";
    if (text.includes("today")) return "HIGH";
    if (text.includes("fast")) return "MEDIUM";

    return "LOW";
  }

  // -----------------------------
  // BUYER STAGE ENGINE
  // -----------------------------
  private getBuyerStage(score: number): IntentSignal["buyerStage"] {
    if (score >= 80) return "PURCHASE";
    if (score >= 60) return "DECISION";
    if (score >= 40) return "CONSIDERATION";
    return "AWARENESS";
  }

  // -----------------------------
  // TRUST ENGINE
  // -----------------------------
  private calculateTrustLevel(product: ProductInput): number {
    let trust = 50;

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("verified")) trust += 20;
    if (text.includes("amazon")) trust += 15;
    if (text.includes("official")) trust += 20;

    return Math.min(100, trust);
  }

  // -----------------------------
  // FRICTION ENGINE
  // -----------------------------
  private calculateFriction(product: ProductInput): number {
    let friction = 40;

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("complex")) friction += 20;
    if (text.includes("install")) friction += 15;
    if (product.price > 100) friction += 15;

    return Math.min(100, friction);
  }

  // -----------------------------
  // SIGNAL ENGINE
  // -----------------------------
  private generateSignals(product: ProductInput): string[] {
    const signals: string[] = [];

    if (product.price < 30)
      signals.push("LOW_PRICE_ENTRY_BARRIER");

    if (product.title.toLowerCase().includes("viral"))
      signals.push("VIRAL_INTEREST");

    if (product.title.toLowerCase().includes("smart"))
      signals.push("TECH_ADOPTION_INTENT");

    return signals;
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(signals: string[]): number {
    return Math.min(100, signals.length * 20 + 30);
  }
}

export const intentAIEngine =
  new IntentAIEngine();
