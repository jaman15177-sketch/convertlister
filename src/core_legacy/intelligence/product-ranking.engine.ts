export interface ProductRankingInput {
  productId: string;

  title: string;

  marketFitScore: number;

  trendScore: number;

  winningProbability: number;

  profitabilityScore: number;

  competitionScore: number;
}

export interface RankedProduct {
  productId: string;

  title: string;

  finalScore: number;

  rank: number;

  verdict:
    | "WINNER"
    | "PROMISING"
    | "AVERAGE"
    | "REJECT";

  breakdown: {
    marketFit: number;
    trend: number;
    winningProbability: number;
    profitability: number;
    competition: number;
  };
}

export class ProductRankingEngine {
  rank(
    products: ProductRankingInput[]
  ): RankedProduct[] {
    const ranked =
      products.map((product) => {
        const finalScore =
          this.calculateScore(
            product
          );

        return {
          productId:
            product.productId,

          title: product.title,

          finalScore,

          rank: 0,

          verdict:
            this.getVerdict(
              finalScore
            ),

          breakdown: {
            marketFit:
              product.marketFitScore,

            trend:
              product.trendScore,

            winningProbability:
              product.winningProbability,

            profitability:
              product.profitabilityScore,

            competition:
              product.competitionScore,
          },
        };
      });

    ranked.sort(
      (a, b) =>
        b.finalScore -
        a.finalScore
    );

    ranked.forEach(
      (product, index) => {
        product.rank = index + 1;
      }
    );

    return ranked;
  }

  private calculateScore(
    p: ProductRankingInput
  ): number {
    const competitionBonus =
      100 -
      Math.max(
        0,
        Math.min(
          100,
          p.competitionScore
        )
      );

    const score =
      p.marketFitScore * 0.25 +
      p.trendScore * 0.25 +
      p.winningProbability *
        0.25 +
      p.profitabilityScore *
        0.15 +
      competitionBonus *
        0.10;

    return Math.round(score);
  }

  private getVerdict(
    score: number
  ):
    | "WINNER"
    | "PROMISING"
    | "AVERAGE"
    | "REJECT" {
    if (score >= 85) {
      return "WINNER";
    }

    if (score >= 70) {
      return "PROMISING";
    }

    if (score >= 50) {
      return "AVERAGE";
    }

    return "REJECT";
  }
}

export const productRankingEngine =
  new ProductRankingEngine();
