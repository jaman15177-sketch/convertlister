export type ProductDecision =
  | "IMPORT"
  | "SCORE"
  | "OPTIMIZE"
  | "PUBLISH"
  | "REJECT";

export interface DecisionContext {
  title: string;
  price?: number;
  source?: string;
  marketFitScore?: number;
  trendScore?: number;
  winningProbability?: number;
}

export class DecisionEngine {
  decide(ctx: DecisionContext): ProductDecision {
    // 🔴 HARD REJECT CONDITIONS
    if (!ctx.title) return "REJECT";

    if (ctx.price !== undefined && ctx.price <= 0) {
      return "REJECT";
    }

    // 🔵 LOW QUALITY SIGNALS
    if ((ctx.marketFitScore ?? 0) < 30) {
      return "REJECT";
    }

    // 🟡 IMPORT STAGE
    if (!ctx.marketFitScore) {
      return "IMPORT";
    }

    // 🟠 SCORING STAGE
    if (ctx.marketFitScore < 60) {
      return "SCORE";
    }

    // 🟢 OPTIMIZATION STAGE
    if (
      (ctx.marketFitScore >= 60 && ctx.marketFitScore < 80) ||
      (ctx.trendScore ?? 0) < 70
    ) {
      return "OPTIMIZE";
    }

    // 🔥 HIGH VALUE — READY TO PUBLISH
    if (
      (ctx.marketFitScore >= 80 &&
        (ctx.winningProbability ?? 0) >= 75)
    ) {
      return "PUBLISH";
    }

    return "SCORE";
  }
}

export const decisionEngine = new DecisionEngine();
