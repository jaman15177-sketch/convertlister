export type Platform =
  | "AMAZON"
  | "SHOPIFY"
  | "ALIEXPRESS"
  | "TIKTOK_SHOP"
  | "EBAY"
  | "ETSY";

export interface PlatformInput {
  productId: string;

  title: string;

  price: number;

  marketFitScore: number;

  trendScore: number;

  qualityScore: number;

  competitionScore: number;

  conversionRate: number;
}

export interface PlatformOutput {
  productId: string;

  platform: Platform;

  adjustedScore: number;

  visibilityScore: number;

  conversionPrediction: number;

  recommendedPrice: number;

  contentStrategy: string[];

  rankingBoost: number;

  publishDecision: "PUBLISH" | "OPTIMIZE" | "REJECT";

  confidence: number;
}

export class MultiPlatformEngine {
  public optimizeForAll(
    input: PlatformInput
  ): PlatformOutput[] {
    const platforms: Platform[] = [
      "AMAZON",
      "SHOPIFY",
      "ALIEXPRESS",
      "TIKTOK_SHOP",
      "EBAY",
      "ETSY",
    ];

    return platforms.map((platform) =>
      this.optimizeForPlatform(input, platform)
    );
  }

  // -----------------------------
  // PLATFORM CORE ENGINE
  // -----------------------------
  private optimizeForPlatform(
    input: PlatformInput,
    platform: Platform
  ): PlatformOutput {
    const multiplier =
      this.getPlatformMultiplier(platform);

    const adjustedScore =
      this.calculateAdjustedScore(
        input,
        multiplier
      );

    const visibilityScore =
      this.calculateVisibility(
        input,
        platform
      );

    const conversionPrediction =
      this.predictConversion(
        input,
        platform,
        multiplier
      );

    const recommendedPrice =
      this.optimizePrice(input.price, platform);

    const contentStrategy =
      this.generateContentStrategy(
        platform,
        input
      );

    const rankingBoost =
      this.calculateRankingBoost(
        adjustedScore,
        platform
      );

    const publishDecision =
      this.getDecision(adjustedScore);

    const confidence =
      this.calculateConfidence(input);

    return {
      productId: input.productId,
      platform,
      adjustedScore,
      visibilityScore,
      conversionPrediction,
      recommendedPrice,
      contentStrategy,
      rankingBoost,
      publishDecision,
      confidence,
    };
  }

  // -----------------------------
  // PLATFORM WEIGHT ENGINE
  // -----------------------------
  private getPlatformMultiplier(
    platform: Platform
  ): number {
    const map: Record<Platform, number> = {
      AMAZON: 1.2,
      SHOPIFY: 1.0,
      ALIEXPRESS: 0.9,
      TIKTOK_SHOP: 1.4,
      EBAY: 0.95,
      ETSY: 1.1,
    };

    return map[platform];
  }

  // -----------------------------
  // SCORE ENGINE
  // -----------------------------
  private calculateAdjustedScore(
    input: PlatformInput,
    multiplier: number
  ): number {
    const base =
      input.marketFitScore * 0.3 +
      input.trendScore * 0.25 +
      input.qualityScore * 0.2 +
      (100 - input.competitionScore) * 0.15 +
      input.conversionRate * 100 * 0.1;

    return Math.min(
      100,
      Math.round(base * multiplier)
    );
  }

  // -----------------------------
  // VISIBILITY ENGINE
  // -----------------------------
  private calculateVisibility(
    input: PlatformInput,
    platform: Platform
  ): number {
    let score = 50;

    if (platform === "AMAZON") score += 20;
    if (platform === "TIKTOK_SHOP") score += 25;
    if (platform === "SHOPIFY") score += 10;

    if (input.trendScore > 70) score += 10;
    if (input.qualityScore > 80) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // CONVERSION ENGINE
  // -----------------------------
  private predictConversion(
    input: PlatformInput,
    platform: Platform,
    multiplier: number
  ): number {
    let base = input.conversionRate;

    if (platform === "TIKTOK_SHOP") base += 0.03;
    if (platform === "AMAZON") base += 0.02;
    if (platform === "SHOPIFY") base += 0.01;

    base *= multiplier;

    return Math.min(1, base);
  }

  // -----------------------------
  // PRICE OPTIMIZATION ENGINE
  // -----------------------------
  private optimizePrice(
    price: number,
    platform: Platform
  ): number {
    let multiplier = 1;

    if (platform === "AMAZON") multiplier = 1.1;
    if (platform === "ALIEXPRESS") multiplier = 0.8;
    if (platform === "TIKTOK_SHOP") multiplier = 1.05;
    if (platform === "ETSY") multiplier = 1.2;

    return Math.round(price * multiplier);
  }

  // -----------------------------
  // CONTENT STRATEGY ENGINE
  // -----------------------------
  private generateContentStrategy(
    platform: Platform,
    input: PlatformInput
  ): string[] {
    const base = [
      "SEO optimized title",
      "high conversion description",
    ];

    if (platform === "TIKTOK_SHOP") {
      base.push(
        "short viral hook",
        "video-first listing",
        "emotion-driven copy"
      );
    }

    if (platform === "AMAZON") {
      base.push(
        "bullet point features",
        "keyword dense description"
      );
    }

    if (input.trendScore > 70) {
      base.push("trend-based positioning");
    }

    return base;
  }

  // -----------------------------
  // RANKING BOOST ENGINE
  // -----------------------------
  private calculateRankingBoost(
    score: number,
    platform: Platform
  ): number {
    let boost = score / 10;

    if (platform === "AMAZON") boost += 2;
    if (platform === "TIKTOK_SHOP") boost += 4;

    return Math.min(20, boost);
  }

  // -----------------------------
  // DECISION ENGINE
  // -----------------------------
  private getDecision(
    score: number
  ): "PUBLISH" | "OPTIMIZE" | "REJECT" {
    if (score > 80) return "PUBLISH";
    if (score > 60) return "OPTIMIZE";
    return "REJECT";
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(
    input: PlatformInput
  ): number {
    let confidence = 60;

    if (input.marketFitScore > 70) confidence += 10;
    if (input.trendScore > 70) confidence += 10;
    if (input.qualityScore > 70) confidence += 10;

    return Math.min(100, confidence);
  }
}

export const multiPlatformEngine =
  new MultiPlatformEngine();
