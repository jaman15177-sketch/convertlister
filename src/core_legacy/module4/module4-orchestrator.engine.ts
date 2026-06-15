import { productIntelligenceEngine } from "./intelligence/product-intelligence.engine";
import { optimizationOrchestratorEngine } from "./intelligence/optimization-orchestrator.engine";
import { selfImprovingLoopEngine } from "./intelligence/self-improving-loop.engine";

export interface Module4Input {
  productId: string;

  mode:
    | "ANALYZE"
    | "OPTIMIZE"
    | "PREDICT"
    | "FULL_PIPELINE"
    | "AUTO_PUBLISH";

  payload?: any;
}

export interface Module4Result {
  productId: string;

  mode: string;

  intelligence?: any;

  optimization?: any;

  learning?: any;

  finalDecision:
    | "PUBLISH"
    | "OPTIMIZE"
    | "REJECT"
    | "HOLD";

  systemScore: number;

  confidence: number;

  executionFlow: string[];

  timestamp: number;
}

export class Module4OrchestratorEngine {
  // -----------------------------
  // MAIN ENTRY POINT
  // -----------------------------
  public async execute(
    input: Module4Input
  ): Promise<Module4Result> {
    const flow: string[] = [];

    flow.push(`MODE: ${input.mode}`);

    let intelligence: any = null;
    let optimization: any = null;
    let learning: any = null;

    // -----------------------------
    // STEP 1: INTELLIGENCE LAYER
    // -----------------------------
    if (
      input.mode === "ANALYZE" ||
      input.mode === "FULL_PIPELINE" ||
      input.mode === "AUTO_PUBLISH"
    ) {
      intelligence =
        productIntelligenceEngine.analyze({
          productId: input.productId,
          ...(input.payload || {}),
        });

      flow.push("INTELLIGENCE_ANALYSIS_COMPLETED");
    }

    // -----------------------------
    // STEP 2: OPTIMIZATION LAYER
    // -----------------------------
    if (
      input.mode === "OPTIMIZE" ||
      input.mode === "FULL_PIPELINE" ||
      input.mode === "AUTO_PUBLISH"
    ) {
      optimization =
        await optimizationOrchestratorEngine.execute({
          productId: input.productId,
          trigger: "NEW_PRODUCT",
          payload: input.payload,
        });

      flow.push("OPTIMIZATION_COMPLETED");
    }

    // -----------------------------
    // STEP 3: LEARNING FEEDBACK LOOP
    // -----------------------------
    if (
      input.mode === "FULL_PIPELINE" ||
      input.mode === "AUTO_PUBLISH"
    ) {
      learning = selfImprovingLoopEngine.learn({
        productId: input.productId,
        predictionScore:
          intelligence?.globalScore || 0,
        actualOutcome: "UNKNOWN",
        revenue:
          intelligence?.revenue
            ?.predictedRevenuePerMonth || 0,
        platform: "MODULE4_ORCHESTRATOR",
        timestamp: Date.now(),
      });

      flow.push("SELF_LEARNING_UPDATED");
    }

    // -----------------------------
    // STEP 4: SYSTEM SCORE
    // -----------------------------
    const systemScore =
      this.calculateSystemScore({
        intelligence,
        optimization,
      });

    // -----------------------------
    // STEP 5: FINAL DECISION ENGINE
    // -----------------------------
    const finalDecision =
      this.getFinalDecision(
        systemScore,
        optimization
      );

    // -----------------------------
    // STEP 6: CONFIDENCE ENGINE
    // -----------------------------
    const confidence =
      this.calculateConfidence({
        intelligence,
        optimization,
      });

    flow.push("DECISION_ENGINE_COMPLETED");

    return {
      productId: input.productId,
      mode: input.mode,
      intelligence,
      optimization,
      learning,
      finalDecision,
      systemScore,
      confidence,
      executionFlow: flow,
      timestamp: Date.now(),
    };
  }

  // -----------------------------
  // GLOBAL SCORE ENGINE
  // -----------------------------
  private calculateSystemScore(data: any): number {
    const intelligenceScore =
      data.intelligence?.globalScore || 0;

    const optimizationScore =
      data.optimization?.globalScore || 0;

    const score =
      intelligenceScore * 0.6 +
      optimizationScore * 0.4;

    return Math.round(score);
  }

  // -----------------------------
  // FINAL DECISION ENGINE
  // -----------------------------
  private getFinalDecision(
    score: number,
    optimization: any
  ): "PUBLISH" | "OPTIMIZE" | "REJECT" | "HOLD" {
    if (score >= 80) return "PUBLISH";

    if (score >= 60) return "OPTIMIZE";

    if (score < 60 && optimization?.globalDecision === "REJECT") {
      return "REJECT";
    }

    return "HOLD";
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(data: any): number {
    let confidence = 60;

    if (data.intelligence) confidence += 15;

    if (data.optimization) confidence += 15;

    if (
      data.intelligence?.revenue
        ?.confidence > 70
    ) {
      confidence += 10;
    }

    return Math.min(100, confidence);
  }

  // -----------------------------
  // QUICK ACCESS METHODS
  // -----------------------------
  public async analyze(productId: string, payload: any) {
    return this.execute({
      productId,
      mode: "ANALYZE",
      payload,
    });
  }

  public async fullPipeline(productId: string, payload: any) {
    return this.execute({
      productId,
      mode: "FULL_PIPELINE",
      payload,
    });
  }

  public async autoPublish(productId: string, payload: any) {
    return this.execute({
      productId,
      mode: "AUTO_PUBLISH",
      payload,
    });
  }
}

export const module4OrchestratorEngine =
  new Module4OrchestratorEngine();
