import { ProductInput } from "../00-interfaces";

export interface QualityScoreResult {
  productId: string;

  overallScore: number;

  grade:
    | "S"
    | "A"
    | "B"
    | "C"
    | "D";

  marketQuality: number;

  contentQuality: number;

  dataQuality: number;

  profitabilityQuality: number;

  scalabilityScore: number;

  riskPenalty: number;

  isApproved: boolean;

  decision:
    | "PUBLISH"
    | "REVIEW"
    | "REJECT";

  issues: string[];

  strengths: string[];

  confidence: number;
}

export class QualityScoringEngine {
  score(product: ProductInput): QualityScoreResult {
    const marketQuality =
      this.marketQuality(product);

    const contentQuality =
      this.contentQuality(product);

    const dataQuality =
      this.dataQuality(product);

    const profitabilityQuality =
      this.profitabilityQuality(product);

    const scalabilityScore =
      this.scalabilityScore(product);

    const riskPenalty =
      this.riskPenalty(product);

    const overallScore =
      this.calculateFinalScore({
        marketQuality,
        contentQuality,
        dataQuality,
        profitabilityQuality,
        scalabilityScore,
        riskPenalty,
      });

    const grade =
      this.getGrade(overallScore);

    const decision =
      this.getDecision(overallScore);

    const issues =
      this.detectIssues(product, riskPenalty);

    const strengths =
      this.detectStrengths(product);

    const confidence =
      this.calculateConfidence(product);

    return {
      productId: product.productId,
      overallScore,
      grade,
      marketQuality,
      contentQuality,
      dataQuality,
      profitabilityQuality,
      scalabilityScore,
      riskPenalty,
      isApproved: overallScore >= 70,
      decision,
      issues,
      strengths,
      confidence,
    };
  }

  // -----------------------------
  // MARKET QUALITY ENGINE
  // -----------------------------
  private marketQuality(product: ProductInput): number {
    let score = 50;

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("trending")) score += 20;
    if (text.includes("viral")) score += 20;
    if (product.price < 50) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // CONTENT QUALITY ENGINE
  // -----------------------------
  private contentQuality(product: ProductInput): number {
    let score = 40;

    if (product.title.length > 10) score += 10;
    if (product.description) score += 20;
    if ((product.features || []).length > 3) score += 20;

    return Math.min(100, score);
  }

  // -----------------------------
  // DATA QUALITY ENGINE
  // -----------------------------
  private dataQuality(product: ProductInput): number {
    let score = 60;

    if (product.productId) score += 10;
    if (product.title) score += 10;
    if (product.price > 0) score += 10;
    if (product.source) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // PROFITABILITY ENGINE
  // -----------------------------
  private profitabilityQuality(product: ProductInput): number {
    let score = 50;

    if (product.price < 30) score += 20;
    if (product.price > 100) score += 10;

    const marginEstimate = product.price * 0.3;

    if (marginEstimate > 10) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // SCALABILITY ENGINE
  // -----------------------------
  private scalabilityScore(product: ProductInput): number {
    let score = 55;

    const text = product.title.toLowerCase();

    if (text.includes("portable")) score += 15;
    if (text.includes("smart")) score += 15;
    if (text.includes("wireless")) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // RISK PENALTY ENGINE
  // -----------------------------
  private riskPenalty(product: ProductInput): number {
    let risk = 20;

    const text = product.title.toLowerCase();

    if (text.includes("cheap")) risk += 15;
    if (product.price < 10) risk += 20;
    if (text.includes("unknown")) risk += 20;

    return Math.min(100, risk);
  }

  // -----------------------------
  // FINAL SCORE ENGINE
  // -----------------------------
  private calculateFinalScore(input: {
    marketQuality: number;
    contentQuality: number;
    dataQuality: number;
    profitabilityQuality: number;
    scalabilityScore: number;
    riskPenalty: number;
  }): number {
    const score =
      input.marketQuality * 0.25 +
      input.contentQuality * 0.2 +
      input.dataQuality * 0.15 +
      input.profitabilityQuality * 0.2 +
      input.scalabilityScore * 0.15 +
      (100 - input.riskPenalty) * 0.1;

    return Math.round(Math.min(100, score));
  }

  // -----------------------------
  // GRADE ENGINE
  // -----------------------------
  private getGrade(score: number): QualityScoreResult["grade"] {
    if (score >= 85) return "S";
    if (score >= 75) return "A";
    if (score >= 60) return "B";
    if (score >= 45) return "C";
    return "D";
  }

  // -----------------------------
  // DECISION ENGINE
  // -----------------------------
  private getDecision(score: number): QualityScoreResult["decision"] {
    if (score >= 80) return "PUBLISH";
    if (score >= 60) return "REVIEW";
    return "REJECT";
  }

  // -----------------------------
  // ISSUE DETECTION ENGINE
  // -----------------------------
  private detectIssues(product: ProductInput, risk: number): string[] {
    const issues: string[] = [];

    if (risk > 60) issues.push("HIGH_RISK_PRODUCT");
    if (product.price < 10) issues.push("LOW_PRICE_RISK");
    if (!product.description) issues.push("MISSING_DESCRIPTION");

    const features = product.features || [];

    if (features.length < 2) issues.push("LOW_FEATURE_DEPTH");

    return issues;
  }

  // -----------------------------
  // STRENGTH DETECTION ENGINE
  // -----------------------------
  private detectStrengths(product: ProductInput): string[] {
    const strengths: string[] = [];

    const text = product.title.toLowerCase();

    if (text.includes("portable")) strengths.push("PORTABILITY");
    if (text.includes("smart")) strengths.push("SMART_FEATURE");
    if (text.includes("wireless")) strengths.push("WIRELESS_TECH");

    if ((product.features || []).length > 5)
      strengths.push("HIGH_FEATURE_DENSITY");

    return strengths;
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(product: ProductInput): number {
    let confidence = 65;

    if (product.title.length > 10) confidence += 10;
    if (product.price > 0) confidence += 10;
    if (product.description) confidence += 10;

    return Math.min(100, confidence);
  }
}

export const qualityScoringEngine =
  new QualityScoringEngine();
