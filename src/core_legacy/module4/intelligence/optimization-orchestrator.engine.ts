import { productIntelligenceEngine } from "./product-intelligence.engine";
import { selfImprovingLoopEngine } from "./self-improving-loop.engine";

export interface OptimizationInput {
  productId: string;

  trigger:
    | "NEW_PRODUCT"
    | "RETRY"
    | "SCHEDULED_RUN"
    | "FEEDBACK_LOOP"
    | "AB_TEST_RESULT";

  payload?: any;
}

export interface OptimizationAction {
  type:
    | "PUBLISH"
    | "OPTIMIZE"
    | "REJECT"
    | "RETRAIN"
    | "RUN_AB_TEST"
    | "BOOST_PLATFORM"
    | "ADJUST_WEIGHTS";

  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

  target?: string;

  reason: string;

  expectedImpact: number;
}

export interface OptimizationResult {
  productId: string;

  globalDecision:
    | "PUBLISH"
    | "OPTIMIZE"
    | "REJECT"
    | "HOLD";

  globalScore: number;

  actions: OptimizationAction[];

  systemConfidence: number;

  learningUpdated: boolean;

  insights: string[];
}

export class OptimizationOrchestratorEngine {
  // -----------------------------
  // MAIN ORCHESTRATION ENTRY
  // -----------------------------
  public async execute(
    input: OptimizationInput
  ): Promise<OptimizationResult> {
    const intelligence =
      productIntelligenceEngine.analyze({
        productId: input.productId,
        ...(input.payload || {}),
      });

    const globalScore = intelligence.globalScore;

    const actions =
      this.generateActions(intelligence, input.trigger);

    const globalDecision =
      this.getGlobalDecision(globalScore, actions);

    const systemConfidence =
      this.calculateSystemConfidence(intelligence);

    const learningUpdated =
      this.updateLearning(intelligence, input);

    const insights =
      this.generateInsights(intelligence, actions);

    return {
      productId: input.productId,
      globalDecision,
      globalScore,
      actions,
      systemConfidence,
      learningUpdated,
      insights,
    };
  }

  // -----------------------------
  // ACTION GENERATION ENGINE
  // -----------------------------
  private generateActions(
    intelligence: any,
    trigger: OptimizationInput["trigger"]
  ): OptimizationAction[] {
    const actions: OptimizationAction[] = [];

    const score = intelligence.globalScore;

    // HIGH VALUE PRODUCT
    if (score >= 80) {
      actions.push({
        type: "PUBLISH",
        priority: "CRITICAL",
        reason: "High global score detected",
        expectedImpact: 0.9,
      });

      actions.push({
        type: "BOOST_PLATFORM",
        priority: "HIGH",
        target: "TIKTOK_SHOP",
        reason: "High viral potential product",
        expectedImpact: 0.8,
      });
    }

    // MEDIUM PRODUCT
    if (score >= 60 && score < 80) {
      actions.push({
        type: "OPTIMIZE",
        priority: "HIGH",
        reason: "Needs optimization before publish",
        expectedImpact: 0.6,
      });

      actions.push({
        type: "RUN_AB_TEST",
        priority: "MEDIUM",
        reason: "Validate performance improvements",
        expectedImpact: 0.5,
      });
    }

    // LOW PRODUCT
    if (score < 60) {
      actions.push({
        type: "REJECT",
        priority: "HIGH",
        reason: "Low viability detected",
        expectedImpact: 0.2,
      });

      actions.push({
        type: "RETRAIN",
        priority: "MEDIUM",
        reason: "Improve future prediction accuracy",
        expectedImpact: 0.4,
      });
    }

    // FEEDBACK LOOP TRIGGER
    if (trigger === "FEEDBACK_LOOP") {
      actions.push({
        type: "ADJUST_WEIGHTS",
        priority: "CRITICAL",
        reason: "System feedback optimization required",
        expectedImpact: 0.7,
      });
    }

    return actions;
  }

  // -----------------------------
  // GLOBAL DECISION ENGINE
  // -----------------------------
  private getGlobalDecision(
    score: number,
    actions: OptimizationAction[]
  ):
    | "PUBLISH"
    | "OPTIMIZE"
    | "REJECT"
    | "HOLD" {
    const hasCriticalAction = actions.some(
      (a) => a.priority === "CRITICAL"
    );

    if (hasCriticalAction && score >= 80) {
      return "PUBLISH";
    }

    if (score >= 80) return "PUBLISH";

    if (score >= 60) return "OPTIMIZE";

    if (score < 60) return "REJECT";

    return "HOLD";
  }

  // -----------------------------
  // SYSTEM CONFIDENCE ENGINE
  // -----------------------------
  private calculateSystemConfidence(
    intelligence: any
  ): number {
    let confidence = 60;

    if (intelligence.quality?.overallScore > 80)
      confidence += 10;

    if (intelligence.revenue?.confidence > 80)
      confidence += 10;

    if (intelligence.keywords?.seoScore > 70)
      confidence += 10;

    if (intelligence.competitorGap?.competitorGap > 50)
      confidence += 10;

    return Math.min(100, confidence);
  }

  // -----------------------------
  // LEARNING INTEGRATION ENGINE
  // -----------------------------
  private updateLearning(
    intelligence: any,
    input: OptimizationInput
  ): boolean {
    try {
      selfImprovingLoopEngine.learn({
        productId: input.productId,
        predictionScore: intelligence.globalScore,
        actualOutcome: "UNKNOWN",
        revenue:
          intelligence.revenue
            ?.predictedRevenuePerMonth || 0,
        platform: "ORCHESTRATOR",
        timestamp: Date.now(),
      });

      return true;
    } catch (e) {
      console.error("LEARNING_UPDATE_FAILED", e);
      return false;
    }
  }

  // -----------------------------
  // INSIGHT ENGINE
  // -----------------------------
  private generateInsights(
    intelligence: any,
    actions: OptimizationAction[]
  ): string[] {
    const insights: string[] = [];

    insights.push(
      `Global score: ${intelligence.globalScore}`
    );

    const topAction = actions[0];

    if (topAction) {
      insights.push(
        `Primary action: ${topAction.type}`
      );
    }

    if (intelligence.revenue?.predictedRevenuePerMonth > 5000) {
      insights.push(
        "High revenue opportunity detected"
      );
    }

    if (intelligence.psychology?.buyProbability > 70) {
      insights.push(
        "Strong psychological purchase triggers"
      );
    }

    return insights;
  }
}

export const optimizationOrchestratorEngine =
  new OptimizationOrchestratorEngine();
