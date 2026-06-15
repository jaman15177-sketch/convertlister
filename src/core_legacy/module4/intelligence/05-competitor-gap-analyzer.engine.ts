import {
  ProductInput,
  ProductProfile,
} from "../00-interfaces";

export interface CompetitorGapResult {
  competitionLevel: "LOW" | "MEDIUM" | "HIGH";

  marketSaturation: number;

  gapScore: number;

  missingFeatures: string[];

  opportunities: string[];

  threatLevel: number;
}

export class CompetitorGapAnalyzerEngine {
  analyze(
    product: ProductInput,
    profile: ProductProfile
  ): CompetitorGapResult {
    const competitionLevel =
      this.detectCompetition(product);

    const marketSaturation =
      this.calculateSaturation(product);

    const missingFeatures =
      this.findMissingFeatures(profile);

    const opportunities =
      this.findOpportunities(profile);

    const gapScore =
      this.calculateGapScore(
        profile,
        marketSaturation
      );

    const threatLevel =
      this.calculateThreatLevel(
        marketSaturation,
        competitionLevel
      );

    return {
      competitionLevel,
      marketSaturation,
      gapScore,
      missingFeatures,
      opportunities,
      threatLevel,
    };
  }

  // ----------------------------
  // COMPETITION DETECTION
  // ----------------------------
  private detectCompetition(
    product: ProductInput
  ): "LOW" | "MEDIUM" | "HIGH" {
    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    let score = 0;

    if (
      text.includes("popular")
    )
      score += 30;

    if (
      text.includes("best")
    )
      score += 25;

    if (
      product.price < 20
    )
      score += 20;

    if (
      text.includes("amazon")
    )
      score += 15;

    if (score >= 60)
      return "HIGH";

    if (score >= 35)
      return "MEDIUM";

    return "LOW";
  }

  // ----------------------------
  // MARKET SATURATION
  // ----------------------------
  private calculateSaturation(
    product: ProductInput
  ): number {
    let saturation = 40;

    if (
      product.price < 30
    )
      saturation += 20;

    if (
      product.category === "home"
    )
      saturation += 10;

    if (
      product.title.length > 25
    )
      saturation += 10;

    return Math.min(
      100,
      saturation
    );
  }

  // ----------------------------
  // MISSING FEATURES DETECTION
  // ----------------------------
  private findMissingFeatures(
    profile: ProductProfile
  ): string[] {
    const expected = [
      "fast charging",
      "durability",
      "warranty",
      "smart control",
    ];

    return expected.filter(
      (f) =>
        !profile.features.includes(
          f
        )
    );
  }

  // ----------------------------
  // OPPORTUNITIES ENGINE
  // ----------------------------
  private findOpportunities(
    profile: ProductProfile
  ): string[] {
    const opportunities: string[] = [];

    if (
      profile.features.length <
      4
    ) {
      opportunities.push(
        "Add more features for differentiation"
      );
    }

    if (
      profile.benefits.length <
      3
    ) {
      opportunities.push(
        "Expand benefit positioning"
      );
    }

    if (
      profile.uniqueSellingPoints
        .length < 2
    ) {
      opportunities.push(
        "Strengthen USP strategy"
      );
    }

    opportunities.push(
      "Target underserved micro-niches"
    );

    return opportunities;
  }

  // ----------------------------
  // GAP SCORE ENGINE
  // ----------------------------
  private calculateGapScore(
    profile: ProductProfile,
    saturation: number
  ): number {
    let score = 50;

    if (
      profile.uniqueSellingPoints
        .length > 3
    )
      score += 20;

    if (
      profile.features.length > 5
    )
      score += 15;

    if (
      saturation < 50
    )
      score += 15;

    return Math.min(100, score);
  }

  // ----------------------------
  // THREAT LEVEL ENGINE
  // ----------------------------
  private calculateThreatLevel(
    saturation: number,
    competition: string
  ): number {
    let threat = saturation;

    if (
      competition === "HIGH"
    )
      threat += 20;

    if (
      competition === "LOW"
    )
      threat -= 10;

    return Math.max(
      0,
      Math.min(100, threat)
    );
  }
}

export const competitorGapAnalyzerEngine =
  new CompetitorGapAnalyzerEngine();
