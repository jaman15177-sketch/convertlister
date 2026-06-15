export interface DecisionInput {
  marketFitScore: number;
  trendScore: number;
  competitionScore: number;
  profitScore: number;
  winningProbability: number;

  signals?: string[];
}

export type Decision =
  | "PUBLISH"
  | "OPTIMIZE"
  | "REJECT";

export interface DecisionResult {
  decision: Decision;
  confidence: number;
  score: number;
  reasons: string[];
}

export class DecisionEngine {
  decide(
    input: DecisionInput
  ): DecisionResult {
    const reasons: string[] = [];

    const {
      marketFitScore,
      trendScore,
      competitionScore,
      profitScore,
      winningProbability,
    } = input;

    // Weighted scoring model (core brain logic)
    const score =
      marketFitScore * 0.3 +
      trendScore * 0.25 +
      profitScore * 0.2 +
      winningProbability * 0.15 +
      (100 - competitionScore) *
        0.1;

    // Decision logic
    let decision: Decision;

    if (score >= 75) {
      decision = "PUBLISH";
      reasons.push(
        "High overall factory score"
      );
    } else if (score >= 55) {
      decision = "OPTIMIZE";
      reasons.push(
        "Needs optimization before publish"
      );
    } else {
      decision = "REJECT";
      reasons.push(
        "Low market viability"
      );
    }

    // Confidence calculation
    const confidence =
      Math.min(
        1,
        score / 100 +
          (winningProbability / 200)
      );

    // Signal enrichment
    if (marketFitScore > 80)
      reasons.push(
        "Strong market fit"
      );

    if (trendScore > 70)
      reasons.push(
        "High trend momentum"
      );

    if (profitScore < 40)
      reasons.push(
        "Low profitability warning"
      );

    if (competitionScore > 70)
      reasons.push(
        "High competition risk"
      );

    return {
      decision,
      confidence,
      score: Math.round(score),
      reasons,
    };
  }
}

export const decisionEngine =
  new DecisionEngine();
