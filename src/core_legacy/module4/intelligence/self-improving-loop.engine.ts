import { ProductInput } from "../00-interfaces";

export interface LearningEvent {
  productId: string;

  predictionScore: number;

  actualOutcome: "SUCCESS" | "FAIL" | "UNKNOWN";

  revenue: number;

  platform: string;

  timestamp: number;
}

export interface LearningState {
  totalEvents: number;

  successRate: number;

  avgRevenue: number;

  driftScore: number;

  stabilityIndex: number;

  weightAdjustments: Record<string, number>;
}

export interface SelfImprovingResult {
  state: LearningState;

  updatedWeights: Record<string, number>;

  systemHealth: "STABLE" | "LEARNING" | "DRIFTING" | "UNSTABLE";

  recommendations: string[];
}

export class SelfImprovingLoopEngine {
  private memory: LearningEvent[] = [];

  private weights = {
    marketFit: 0.25,
    trend: 0.2,
    conversion: 0.2,
    quality: 0.15,
    competition: 0.1,
    revenue: 0.1,
  };

  // -----------------------------
  // MAIN LEARNING ENTRY
  // -----------------------------
  public learn(event: LearningEvent): SelfImprovingResult {
    this.memory.push(event);

    const state = this.calculateState();

    this.adjustWeights(state);

    const systemHealth = this.evaluateSystemHealth(state);

    const recommendations = this.generateRecommendations(state);

    return {
      state,
      updatedWeights: this.weights,
      systemHealth,
      recommendations,
    };
  }

  // -----------------------------
  // STATE ENGINE
  // -----------------------------
  private calculateState(): LearningState {
    const total = this.memory.length;

    const success = this.memory.filter(
      (e) => e.actualOutcome === "SUCCESS"
    ).length;

    const successRate = total ? success / total : 0;

    const avgRevenue = total
      ? this.memory.reduce((sum, e) => sum + e.revenue, 0) / total
      : 0;

    const driftScore = this.calculateDrift();

    const stabilityIndex = 1 - driftScore;

    return {
      totalEvents: total,
      successRate,
      avgRevenue,
      driftScore,
      stabilityIndex,
      weightAdjustments: this.weights,
    };
  }

  // -----------------------------
  // DRIFT DETECTION ENGINE
  // -----------------------------
  private calculateDrift(): number {
    if (this.memory.length < 5) return 0;

    const recent = this.memory.slice(-5);
    const older = this.memory.slice(-10, -5);

    if (older.length === 0) return 0;

    const recentAvg =
      recent.reduce((s, e) => s + e.predictionScore, 0) / recent.length;

    const olderAvg =
      older.reduce((s, e) => s + e.predictionScore, 0) / older.length;

    const drift =
      Math.abs(recentAvg - olderAvg) / 100;

    return Math.min(1, drift);
  }

  // -----------------------------
  // WEIGHT ADJUSTMENT ENGINE
  // -----------------------------
  private adjustWeights(state: LearningState): void {
    const { successRate, driftScore } = state;

    // FAILURE CORRECTION
    if (successRate < 0.5) {
      this.weights.marketFit += 0.02;
      this.weights.trend += 0.02;
      this.weights.competition -= 0.02;
    }

    // DRIFT CORRECTION
    if (driftScore > 0.3) {
      this.weights.quality += 0.03;
      this.weights.revenue += 0.02;
    }

    // STABILITY BOOST
    if (state.stabilityIndex > 0.8) {
      this.weights.conversion += 0.01;
    }

    this.normalizeWeights();
  }

  // -----------------------------
  // SAFE NORMALIZATION (CRITICAL)
  // -----------------------------
  private normalizeWeights(): void {
    const sum = Object.values(this.weights).reduce(
      (a, b) => a + b,
      0
    );

    Object.keys(this.weights).forEach((key) => {
      (this.weights as any)[key] /= sum;
    });

    // HARD SAFETY BOUNDS
    Object.keys(this.weights).forEach((key) => {
      (this.weights as any)[key] = Math.max(
        0.05,
        Math.min(0.5, (this.weights as any)[key])
      );
    });
  }

  // -----------------------------
  // SYSTEM HEALTH ENGINE
  // -----------------------------
  private evaluateSystemHealth(
    state: LearningState
  ): SelfImprovingResult["systemHealth"] {
    if (state.driftScore > 0.6) return "UNSTABLE";

    if (state.driftScore > 0.3) return "DRIFTING";

    if (state.successRate < 0.4) return "LEARNING";

    return "STABLE";
  }

  // -----------------------------
  // RECOMMENDATION ENGINE
  // -----------------------------
  private generateRecommendations(
    state: LearningState
  ): string[] {
    const recs: string[] = [];

    if (state.successRate < 0.5) {
      recs.push("Increase marketFit and trend weight sensitivity");
    }

    if (state.driftScore > 0.3) {
      recs.push("Stabilize scoring model with quality reinforcement");
    }

    if (state.avgRevenue < 50) {
      recs.push("Improve revenue prediction calibration");
    }

    if (state.stabilityIndex > 0.8) {
      recs.push("System is stable — safe to scale predictions");
    }

    return recs;
  }

  // -----------------------------
  // EXTERNAL INSIGHT HOOK
  // -----------------------------
  public getWeights(): Record<string, number> {
    return this.weights;
  }

  public getMemory(): LearningEvent[] {
    return this.memory;
  }

  public reset(): void {
    this.memory = [];

    this.weights = {
      marketFit: 0.25,
      trend: 0.2,
      conversion: 0.2,
      quality: 0.15,
      competition: 0.1,
      revenue: 0.1,
    };
  }
}

export const selfImprovingLoopEngine =
  new SelfImprovingLoopEngine();
