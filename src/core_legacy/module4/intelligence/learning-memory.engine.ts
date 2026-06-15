export interface MemoryEvent {
  id: string;

  productId: string;

  type:
    | "PREDICTION"
    | "DECISION"
    | "OUTCOME"
    | "OPTIMIZATION"
    | "AB_TEST";

  payload: any;

  score?: number;

  success?: boolean;

  revenue?: number;

  timestamp: number;

  source:
    | "INTELLIGENCE"
    | "DECISION_ENGINE"
    | "AB_TESTING"
    | "REVENUE_ENGINE"
    | "SELF_LOOP";
}

export interface MemoryInsight {
  pattern: string;

  impact: "POSITIVE" | "NEGATIVE" | "NEUTRAL";

  confidence: number;

  frequency: number;

  recommendation: string;
}

export interface MemoryState {
  totalEvents: number;

  successEvents: number;

  failureEvents: number;

  avgScore: number;

  avgRevenue: number;

  dominantPatterns: string[];

  systemDrift: number;
}

export class LearningMemoryEngine {
  private memory: MemoryEvent[] = [];

  // -----------------------------
  // STORE EVENT
  // -----------------------------
  public store(event: MemoryEvent): void {
    this.memory.push(event);

    // prevent unbounded memory growth
    if (this.memory.length > 5000) {
      this.memory.shift();
    }
  }

  // -----------------------------
  // BULK STORE
  // -----------------------------
  public storeBatch(events: MemoryEvent[]): void {
    for (const event of events) {
      this.store(event);
    }
  }

  // -----------------------------
  // QUERY MEMORY
  // -----------------------------
  public query(filter: Partial<MemoryEvent>): MemoryEvent[] {
    return this.memory.filter((event) => {
      return Object.entries(filter).every(
        ([key, value]) => (event as any)[key] === value
      );
    });
  }

  // -----------------------------
  // STATE ANALYSIS ENGINE
  // -----------------------------
  public getState(): MemoryState {
    const total = this.memory.length;

    const successEvents = this.memory.filter((e) => e.success).length;

    const failureEvents = this.memory.filter(
      (e) => e.success === false
    ).length;

    const avgScore =
      total > 0
        ? this.memory.reduce((s, e) => s + (e.score || 0), 0) / total
        : 0;

    const avgRevenue =
      total > 0
        ? this.memory.reduce((s, e) => s + (e.revenue || 0), 0) / total
        : 0;

    const dominantPatterns = this.extractPatterns();

    const systemDrift = this.calculateDrift();

    return {
      totalEvents: total,
      successEvents,
      failureEvents,
      avgScore: Math.round(avgScore),
      avgRevenue: Math.round(avgRevenue),
      dominantPatterns,
      systemDrift,
    };
  }

  // -----------------------------
  // PATTERN EXTRACTION ENGINE
  // -----------------------------
  private extractPatterns(): string[] {
    const patternMap = new Map<string, number>();

    for (const event of this.memory) {
      if (event.payload?.pattern) {
        const key = event.payload.pattern;

        patternMap.set(key, (patternMap.get(key) || 0) + 1);
      }
    }

    return [...patternMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([pattern]) => pattern);
  }

  // -----------------------------
  // DRIFT DETECTION ENGINE
  // -----------------------------
  private calculateDrift(): number {
    if (this.memory.length < 10) return 0;

    const recent = this.memory.slice(-10);
    const older = this.memory.slice(-30, -10);

    if (older.length === 0) return 0;

    const recentAvg =
      recent.reduce((s, e) => s + (e.score || 0), 0) / recent.length;

    const olderAvg =
      older.reduce((s, e) => s + (e.score || 0), 0) / older.length;

    const drift = Math.abs(recentAvg - olderAvg) / 100;

    return Math.min(1, drift);
  }

  // -----------------------------
  // INSIGHT GENERATION ENGINE
  // -----------------------------
  public generateInsights(): MemoryInsight[] {
    const insights: MemoryInsight[] = [];

    const state = this.getState();

    if (state.systemDrift > 0.3) {
      insights.push({
        pattern: "SYSTEM_DRIFT",
        impact: "NEGATIVE",
        confidence: 0.8,
        frequency: 1,
        recommendation:
          "Adjust scoring weights and stabilize prediction engine",
      });
    }

    if (state.successEvents > state.failureEvents) {
      insights.push({
        pattern: "HIGH_SUCCESS_RATE",
        impact: "POSITIVE",
        confidence: 0.9,
        frequency: state.successEvents,
        recommendation:
          "System performance is stable — safe to scale operations",
      });
    }

    if (state.avgRevenue < 50) {
      insights.push({
        pattern: "LOW_REVENUE_SIGNAL",
        impact: "NEGATIVE",
        confidence: 0.7,
        frequency: 1,
        recommendation:
          "Improve pricing strategy and conversion optimization",
      });
    }

    return insights;
  }

  // -----------------------------
  // PRODUCT HISTORY ENGINE
  // -----------------------------
  public getProductHistory(productId: string): MemoryEvent[] {
    return this.memory.filter((e) => e.productId === productId);
  }

  // -----------------------------
  // CLEAR MEMORY (SAFE RESET)
  // -----------------------------
  public reset(): void {
    this.memory = [];
  }

  // -----------------------------
  // EXPORT MEMORY (FOR TRAINING)
  // -----------------------------
  public export(): MemoryEvent[] {
    return [...this.memory];
  }
}

export const learningMemoryEngine =
  new LearningMemoryEngine();
