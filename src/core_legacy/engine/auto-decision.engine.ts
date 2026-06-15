export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface DecisionInput {
  score: number;
  marketFit: number;
  trend: number;
  profit: number;
  competition: number;
}

export class AutoDecisionEngine {
  decide(input: DecisionInput) {
    const score =
      input.marketFit * 0.3 +
      input.trend * 0.25 +
      input.profit * 0.2 +
      (100 - input.competition) * 0.15 +
      input.score * 0.1;

    let action: "IGNORE" | "WATCH" | "ALERT" | "EXECUTE";
    let severity: AlertSeverity;

    if (score >= 80) {
      action = "EXECUTE";
      severity = "CRITICAL";
    } else if (score >= 65) {
      action = "ALERT";
      severity = "HIGH";
    } else if (score >= 50) {
      action = "WATCH";
      severity = "MEDIUM";
    } else {
      action = "IGNORE";
      severity = "LOW";
    }

    return {
      action,
      severity,
      score: Math.round(score),
    };
  }
}

export const autoDecisionEngine = new AutoDecisionEngine();
