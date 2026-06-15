export interface WinningProbabilityInput {
  marketFitScore: number;
  trendScore: number;
  profitScore?: number;
  competitionScore?: number;
  supplierScore?: number;
}

export interface WinningProbabilityResult {
  winningProbability: number;

  verdict:
    | "STRONG_BUY"
    | "BUY"
    | "WATCHLIST"
    | "AVOID";

  confidence: number;

  breakdown: {
    marketFit: number;
    trend: number;
    profitability: number;
    competition: number;
    supplier: number;
  };
}

export class WinningProbabilityEngine {
  calculate(
    input: WinningProbabilityInput
  ): WinningProbabilityResult {
    const marketFit =
      this.clamp(input.marketFitScore);

    const trend =
      this.clamp(input.trendScore);

    const profitability =
      this.clamp(
        input.profitScore ?? 50
      );

    const competition =
      this.clamp(
        input.competitionScore ?? 50
      );

    const supplier =
      this.clamp(
        input.supplierScore ?? 50
      );

    const weightedScore =
      marketFit * 0.30 +
      trend * 0.25 +
      profitability * 0.20 +
      competition * 0.15 +
      supplier * 0.10;

    const winningProbability =
      Math.round(
        Math.max(
          0,
          Math.min(
            100,
            weightedScore
          )
        )
      );

    let verdict:
      | "STRONG_BUY"
      | "BUY"
      | "WATCHLIST"
      | "AVOID";

    if (
      winningProbability >= 85
    ) {
      verdict = "STRONG_BUY";
    } else if (
      winningProbability >= 70
    ) {
      verdict = "BUY";
    } else if (
      winningProbability >= 50
    ) {
      verdict = "WATCHLIST";
    } else {
      verdict = "AVOID";
    }

    const confidence =
      Math.round(
        (
          [
            input.marketFitScore,
            input.trendScore,
            input.profitScore,
            input.competitionScore,
            input.supplierScore,
          ].filter(
            v =>
              v !== undefined &&
              v !== null
          ).length / 5
        ) *
          100
      ) / 100;

    return {
      winningProbability,
      verdict,
      confidence,

      breakdown: {
        marketFit,
        trend,
        profitability,
        competition,
        supplier,
      },
    };
  }

  private clamp(
    value: number
  ): number {
    return Math.max(
      0,
      Math.min(100, value)
    );
  }
}

export const winningProbabilityEngine =
  new WinningProbabilityEngine();
