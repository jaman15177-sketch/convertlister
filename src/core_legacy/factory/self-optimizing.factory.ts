export interface LearningRecord {
  productId: string;
  decision: string;
  finalRankScore: number;
  outcome: "SUCCESS" | "FAIL";
}

export interface OptimizationState {
  totalRuns: number;
  avgScore: number;
  successRate: number;

  weightAdjustments: {
    marketFit: number;
    trend: number;
    profitability: number;
    competition: number;
    winning: number;
  };
}

export class SelfOptimizingFactory {
  private memory: LearningRecord[] = [];

  // FIXED: stable bounded weights
  private weights = {
    marketFit: 0.25,
    trend: 0.25,
    profitability: 0.2,
    competition: 0.15,
    winning: 0.15,
  };

  async run(input: any) {
    const result = await this.execute(input);

    this.memory.push({
      productId: result.result.productId,
      decision: result.result.decision,
      finalRankScore: result.result.finalRankScore,
      outcome:
        result.result.decision === "PUBLISH"
          ? "SUCCESS"
          : "FAIL",
    });

    this.optimize();

    return result;
  }

  private async execute(input: any) {
    // delegate to orchestrator (already built)
    const { autonomousFactory } = await import(
      "./autonomous.factory"
    );

    const result =
      await autonomousFactory.execute(input);

    return {
      result,
      systemState: this.getState(),
    };
  }

  private optimize() {
    const total = this.memory.length;

    const success = this.memory.filter(
      (m) => m.outcome === "SUCCESS"
    ).length;

    const successRate =
      total > 0 ? success / total : 0;

    const avgScore =
      total > 0
        ? this.memory.reduce(
            (a, b) => a + b.finalRankScore,
            0
          ) / total
        : 0;

    // SAFE bounded adjustments (no drift)
    if (successRate < 0.4) {
      this.adjust("trend", +0.03);
      this.adjust("marketFit", +0.03);
      this.adjust("competition", -0.02);
    }

    if (avgScore > 80) {
      this.adjust("winning", +0.02);
    }

    this.normalizeSafe();
  }

  private adjust(key: keyof typeof this.weights, delta: number) {
    this.weights[key] += delta;

    // HARD BOUNDING (CRITICAL FIX)
    this.weights[key] = Math.max(
      0.05,
      Math.min(0.6, this.weights[key])
    );
  }

  private normalizeSafe() {
    const sum = Object.values(this.weights).reduce(
      (a, b) => a + b,
      0
    );

    Object.keys(this.weights).forEach((k) => {
      (this.weights as any)[k] /= sum;
    });
  }

  private getState(): OptimizationState {
    const totalRuns = this.memory.length;

    const success = this.memory.filter(
      (m) => m.outcome === "SUCCESS"
    ).length;

    const successRate =
      totalRuns > 0 ? success / totalRuns : 0;

    const avgScore =
      totalRuns > 0
        ? this.memory.reduce(
            (a, b) => a + b.finalRankScore,
            0
          ) / totalRuns
        : 0;

    return {
      totalRuns,
      avgScore,
      successRate,
      weightAdjustments: this.weights,
    };
  }
}

export const selfOptimizingFactory =
  new SelfOptimizingFactory();
