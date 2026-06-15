import { ProductInput } from "../00-interfaces";

export interface TrendSignal {
  productId: string;
  trendScore: number;

  momentum: "DECLINING" | "STABLE" | "GROWING" | "VIRAL";

  velocity: number;
  acceleration: number;

  seasonality: number;

  searchInterest: number;

  socialBuzz: number;

  confidence: number;

  signals: string[];
}

export class TrendIntelligenceEngine {
  analyze(product: ProductInput): TrendSignal {
    const searchInterest =
      this.calculateSearchInterest(product);

    const socialBuzz =
      this.calculateSocialBuzz(product);

    const velocity =
      this.calculateVelocity(product);

    const acceleration =
      this.calculateAcceleration(product);

    const seasonality =
      this.calculateSeasonality(product);

    const trendScore =
      this.calculateTrendScore({
        searchInterest,
        socialBuzz,
        velocity,
        acceleration,
        seasonality,
      });

    const momentum =
      this.detectMomentum(trendScore);

    const signals =
      this.generateSignals(product, {
        searchInterest,
        socialBuzz,
        velocity,
        acceleration,
        seasonality,
      });

    const confidence =
      this.calculateConfidence(signals);

    return {
      productId: product.productId,
      trendScore,
      momentum,
      velocity,
      acceleration,
      seasonality,
      searchInterest,
      socialBuzz,
      confidence,
      signals,
    };
  }

  // -----------------------------
  // SEARCH INTEREST ENGINE
  // -----------------------------
  private calculateSearchInterest(
    product: ProductInput
  ): number {
    let score = 40;

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("new")) score += 20;
    if (text.includes("2026")) score += 15;
    if (text.includes("viral")) score += 25;
    if (text.includes("trending")) score += 20;

    return Math.min(100, score);
  }

  // -----------------------------
  // SOCIAL BUZZ ENGINE
  // -----------------------------
  private calculateSocialBuzz(
    product: ProductInput
  ): number {
    let buzz = 30;

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("tiktok")) buzz += 30;
    if (text.includes("instagram")) buzz += 20;
    if (text.includes("viral")) buzz += 25;
    if (text.includes("trend")) buzz += 15;

    return Math.min(100, buzz);
  }

  // -----------------------------
  // VELOCITY ENGINE (GROWTH SPEED)
  // -----------------------------
  private calculateVelocity(
    product: ProductInput
  ): number {
    let velocity = 35;

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("fast")) velocity += 20;
    if (text.includes("hot")) velocity += 25;
    if (text.includes("new")) velocity += 15;

    return Math.min(100, velocity);
  }

  // -----------------------------
  // ACCELERATION ENGINE
  // -----------------------------
  private calculateAcceleration(
    product: ProductInput
  ): number {
    let acceleration = 30;

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("growing")) acceleration += 30;
    if (text.includes("exploding")) acceleration += 35;
    if (text.includes("viral")) acceleration += 25;

    return Math.min(100, acceleration);
  }

  // -----------------------------
  // SEASONALITY ENGINE
  // -----------------------------
  private calculateSeasonality(
    product: ProductInput
  ): number {
    let seasonality = 50;

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("summer")) seasonality += 20;
    if (text.includes("winter")) seasonality += 20;
    if (text.includes("gift")) seasonality += 15;

    return Math.min(100, seasonality);
  }

  // -----------------------------
  // FINAL TREND SCORE ENGINE
  // -----------------------------
  private calculateTrendScore(input: {
    searchInterest: number;
    socialBuzz: number;
    velocity: number;
    acceleration: number;
    seasonality: number;
  }): number {
    const score =
      input.searchInterest * 0.25 +
      input.socialBuzz * 0.2 +
      input.velocity * 0.2 +
      input.acceleration * 0.2 +
      input.seasonality * 0.15;

    return Math.round(Math.min(100, score));
  }

  // -----------------------------
  // MOMENTUM DETECTION
  // -----------------------------
  private detectMomentum(
    score: number
  ): TrendSignal["momentum"] {
    if (score >= 85) return "VIRAL";
    if (score >= 65) return "GROWING";
    if (score >= 40) return "STABLE";
    return "DECLINING";
  }

  // -----------------------------
  // SIGNAL GENERATOR
  // -----------------------------
  private generateSignals(
    product: ProductInput,
    metrics: any
  ): string[] {
    const signals: string[] = [];

    if (metrics.searchInterest > 70)
      signals.push("HIGH_SEARCH_DEMAND");

    if (metrics.socialBuzz > 70)
      signals.push("SOCIAL_VIRAL_ACTIVITY");

    if (metrics.velocity > 70)
      signals.push("FAST_GROWTH");

    if (metrics.acceleration > 70)
      signals.push("EXPONENTIAL_MOMENTUM");

    if (product.price < 20)
      signals.push("LOW_PRICE_ATTRACTIVE");

    return signals;
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(
    signals: string[]
  ): number {
    const base = signals.length * 15;
    return Math.min(100, base + 40);
  }
}

export const trendIntelligenceEngine =
  new TrendIntelligenceEngine();
