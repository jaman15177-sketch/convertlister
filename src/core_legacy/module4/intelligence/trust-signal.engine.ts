import { ProductInput } from "../00-interfaces";

export interface TrustSignalResult {
  productId: string;

  trustScore: number;

  trustLevel:
    | "VERY_HIGH"
    | "HIGH"
    | "MEDIUM"
    | "LOW"
    | "VERY_LOW";

  credibilityScore: number;

  riskScore: number;

  brandTrust: number;

  reviewStrength: number;

  platformTrust: number;

  paymentSafety: number;

  deliveryReliability: number;

  signals: string[];

  warnings: string[];

  confidence: number;
}

export class TrustSignalEngine {
  analyze(product: ProductInput): TrustSignalResult {
    const credibilityScore =
      this.calculateCredibility(product);

    const riskScore =
      this.calculateRisk(product);

    const brandTrust =
      this.calculateBrandTrust(product);

    const reviewStrength =
      this.calculateReviewStrength(product);

    const platformTrust =
      this.calculatePlatformTrust(product);

    const paymentSafety =
      this.calculatePaymentSafety(product);

    const deliveryReliability =
      this.calculateDeliveryReliability(product);

    const trustScore =
      this.calculateTrustScore({
        credibilityScore,
        riskScore,
        brandTrust,
        reviewStrength,
        platformTrust,
        paymentSafety,
        deliveryReliability,
      });

    const trustLevel =
      this.getTrustLevel(trustScore);

    const signals =
      this.generateSignals(product, trustScore);

    const warnings =
      this.generateWarnings(product, riskScore);

    const confidence =
      this.calculateConfidence(signals);

    return {
      productId: product.productId,
      trustScore,
      trustLevel,
      credibilityScore,
      riskScore,
      brandTrust,
      reviewStrength,
      platformTrust,
      paymentSafety,
      deliveryReliability,
      signals,
      warnings,
      confidence,
    };
  }

  // -----------------------------
  // CREDIBILITY ENGINE
  // -----------------------------
  private calculateCredibility(product: ProductInput): number {
    let score = 50;

    const text = `${product.title}`.toLowerCase();

    if (text.includes("official")) score += 20;
    if (text.includes("verified")) score += 20;
    if (text.includes("authentic")) score += 15;

    return Math.min(100, score);
  }

  // -----------------------------
  // RISK ENGINE
  // -----------------------------
  private calculateRisk(product: ProductInput): number {
    let risk = 30;

    const text = `${product.title}`.toLowerCase();

    if (text.includes("cheap")) risk += 15;
    if (text.includes("unknown")) risk += 20;
    if (product.price < 10) risk += 15;

    return Math.min(100, risk);
  }

  // -----------------------------
  // BRAND TRUST ENGINE
  // -----------------------------
  private calculateBrandTrust(product: ProductInput): number {
    let score = 40;

    const text = `${product.title}`.toLowerCase();

    if (text.includes("amazon")) score += 25;
    if (text.includes("shopify")) score += 15;
    if (text.includes("official")) score += 20;

    return Math.min(100, score);
  }

  // -----------------------------
  // REVIEW STRENGTH ENGINE
  // -----------------------------
  private calculateReviewStrength(product: ProductInput): number {
    let score = 45;

    const text = `${product.title}`.toLowerCase();

    if (text.includes("best")) score += 20;
    if (text.includes("top rated")) score += 25;
    if (text.includes("viral")) score += 15;

    return Math.min(100, score);
  }

  // -----------------------------
  // PLATFORM TRUST ENGINE
  // -----------------------------
  private calculatePlatformTrust(product: ProductInput): number {
    const source = product.source?.toLowerCase() || "";

    if (source.includes("amazon")) return 85;
    if (source.includes("shopify")) return 75;
    if (source.includes("aliexpress")) return 60;
    if (source.includes("tiktok")) return 55;

    return 50;
  }

  // -----------------------------
  // PAYMENT SAFETY ENGINE
  // -----------------------------
  private calculatePaymentSafety(product: ProductInput): number {
    let score = 70;

    const text = `${product.title}`.toLowerCase();

    if (text.includes("secure")) score += 20;
    if (text.includes("cash on delivery")) score += 15;

    return Math.min(100, score);
  }

  // -----------------------------
  // DELIVERY RELIABILITY ENGINE
  // -----------------------------
  private calculateDeliveryReliability(product: ProductInput): number {
    let score = 60;

    const text = `${product.title}`.toLowerCase();

    if (text.includes("fast shipping")) score += 20;
    if (text.includes("prime")) score += 25;

    return Math.min(100, score);
  }

  // -----------------------------
  // FINAL TRUST SCORE ENGINE
  // -----------------------------
  private calculateTrustScore(input: {
    credibilityScore: number;
    riskScore: number;
    brandTrust: number;
    reviewStrength: number;
    platformTrust: number;
    paymentSafety: number;
    deliveryReliability: number;
  }): number {
    const score =
      input.credibilityScore * 0.2 +
      input.brandTrust * 0.15 +
      input.reviewStrength * 0.15 +
      input.platformTrust * 0.2 +
      input.paymentSafety * 0.15 +
      input.deliveryReliability * 0.15 +
      (100 - input.riskScore) * 0.1;

    return Math.round(Math.min(100, score));
  }

  // -----------------------------
  // TRUST LEVEL CLASSIFICATION
  // -----------------------------
  private getTrustLevel(score: number): TrustSignalResult["trustLevel"] {
    if (score >= 85) return "VERY_HIGH";
    if (score >= 70) return "HIGH";
    if (score >= 50) return "MEDIUM";
    if (score >= 30) return "LOW";
    return "VERY_LOW";
  }

  // -----------------------------
  // SIGNAL ENGINE
  // -----------------------------
  private generateSignals(product: ProductInput, score: number): string[] {
    const signals: string[] = [];

    if (score > 80) signals.push("HIGH_TRUST_ASSET");
    if (score > 60) signals.push("SAFE_TO_PROMOTE");

    if ((product.source || "").includes("amazon"))
      signals.push("TRUSTED_PLATFORM");

    if (product.price < 30)
      signals.push("LOW_RISK_ENTRY_PRODUCT");

    return signals;
  }

  // -----------------------------
  // WARNING ENGINE
  // -----------------------------
  private generateWarnings(product: ProductInput, risk: number): string[] {
    const warnings: string[] = [];

    if (risk > 70) warnings.push("HIGH_RISK_PRODUCT");
    if (product.price < 10) warnings.push("VERY_LOW_PRICE_MAY_LOOK_SUSPICIOUS");

    const text = `${product.title}`.toLowerCase();

    if (text.includes("unknown")) warnings.push("UNKNOWN_BRAND_RISK");

    return warnings;
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(signals: string[]): number {
    return Math.min(100, signals.length * 18 + 40);
  }
}

export const trustSignalEngine =
  new TrustSignalEngine();
