export interface CompetitionInput {
  competitorCount: number;
  averageRating?: number;
  averageReviewCount?: number;
  topSellerDominance?: number;
  adDensity?: number;
}

export interface CompetitionResult {
  competitionScore: number;

  competitionLevel:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "EXTREME";

  opportunityScore: number;

  breakdown: {
    competitorCountScore: number;
    reviewScore: number;
    ratingScore: number;
    dominanceScore: number;
    adDensityScore: number;
  };
}

export class CompetitionDetector {
  detect(
    input: CompetitionInput
  ): CompetitionResult {
    const competitorCountScore =
      this.calculateCompetitorScore(
        input.competitorCount
      );

    const reviewScore =
      this.calculateReviewScore(
        input.averageReviewCount ?? 0
      );

    const ratingScore =
      this.calculateRatingScore(
        input.averageRating ?? 0
      );

    const dominanceScore =
      this.calculateDominanceScore(
        input.topSellerDominance ?? 0
      );

    const adDensityScore =
      this.calculateAdDensityScore(
        input.adDensity ?? 0
      );

    const competitionScore =
      Math.round(
        competitorCountScore * 0.30 +
          reviewScore * 0.25 +
          ratingScore * 0.15 +
          dominanceScore * 0.20 +
          adDensityScore * 0.10
      );

    let competitionLevel:
      | "LOW"
      | "MEDIUM"
      | "HIGH"
      | "EXTREME";

    if (competitionScore >= 85) {
      competitionLevel = "EXTREME";
    } else if (
      competitionScore >= 65
    ) {
      competitionLevel = "HIGH";
    } else if (
      competitionScore >= 40
    ) {
      competitionLevel = "MEDIUM";
    } else {
      competitionLevel = "LOW";
    }

    const opportunityScore =
      Math.max(
        0,
        100 - competitionScore
      );

    return {
      competitionScore,
      competitionLevel,
      opportunityScore,

      breakdown: {
        competitorCountScore,
        reviewScore,
        ratingScore,
        dominanceScore,
        adDensityScore,
      },
    };
  }

  private calculateCompetitorScore(
    count: number
  ) {
    if (count <= 10) return 15;
    if (count <= 50) return 35;
    if (count <= 100) return 60;
    if (count <= 300) return 80;
    return 100;
  }

  private calculateReviewScore(
    reviews: number
  ) {
    if (reviews <= 100) return 15;
    if (reviews <= 500) return 35;
    if (reviews <= 2000) return 60;
    if (reviews <= 10000) return 85;
    return 100;
  }

  private calculateRatingScore(
    rating: number
  ) {
    if (rating <= 3) return 20;
    if (rating <= 4) return 50;
    if (rating <= 4.5) return 75;
    return 100;
  }

  private calculateDominanceScore(
    dominance: number
  ) {
    return Math.max(
      0,
      Math.min(100, dominance)
    );
  }

  private calculateAdDensityScore(
    density: number
  ) {
    return Math.max(
      0,
      Math.min(100, density)
    );
  }
}

export const competitionDetector =
  new CompetitionDetector();
