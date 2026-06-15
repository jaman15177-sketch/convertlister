import {
  ProductInput,
  MarketPosition,
  ProductProfile,
} from "../00-interfaces";

export class MarketPositioningEngine {
  analyze(
    product: ProductInput,
    profile: ProductProfile
  ): MarketPosition {
    const segment =
      this.detectSegment(product);

    const positioning =
      this.buildPositioning(
        product,
        profile
      );

    const differentiation =
      this.findDifferentiation(
        profile
      );

    const competitorGap =
      this.calculateGapScore(
        product,
        profile
      );

    return {
      segment,
      positioning,
      differentiation,
      competitorGap,
    };
  }

  // ----------------------------
  // SEGMENT DETECTION
  // ----------------------------
  private detectSegment(
    product: ProductInput
  ): string {
    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (
      text.includes("gaming") ||
      text.includes("pro")
    ) {
      return "HIGH-END";
    }

    if (
      text.includes("cheap") ||
      text.includes("budget")
    ) {
      return "LOW-COST";
    }

    if (
      product.price > 50
    ) {
      return "MID-PREMIUM";
    }

    return "MASS-MARKET";
  }

  // ----------------------------
  // POSITIONING ENGINE
  // ----------------------------
  private buildPositioning(
    product: ProductInput,
    profile: ProductProfile
  ): string {
    const base = product.title;

    const benefit =
      profile.benefits?.[0] ||
      "value";

    const audience =
      profile.audience?.[0] ||
      "users";

    return `${base} for ${audience} that delivers ${benefit}`;
  }

  // ----------------------------
  // DIFFERENTIATION ENGINE
  // ----------------------------
  private findDifferentiation(
    profile: ProductProfile
  ): string[] {
    const base = [
      "unique design",
      "better usability",
      "high efficiency",
    ];

    return [
      ...base,
      ...profile.uniqueSellingPoints,
    ];
  }

  // ----------------------------
  // COMPETITOR GAP SCORE
  // ----------------------------
  private calculateGapScore(
    product: ProductInput,
    profile: ProductProfile
  ): number {
    let score = 50;

    if (
      profile.features.length > 5
    ) {
      score += 10;
    }

    if (
      profile.uniqueSellingPoints
        .length > 3
    ) {
      score += 15;
    }

    if (
      product.price < 30
    ) {
      score += 10;
    }

    if (
      profile.benefits.length > 3
    ) {
      score += 15;
    }

    return Math.min(100, score);
  }
}

export const marketPositioningEngine =
  new MarketPositioningEngine();
