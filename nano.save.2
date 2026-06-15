import { supabaseAdmin } from "@/lib/server/supabase-admin";

export class SelfOptimizingWeightEngine {
  private weights = {
    marketFit: 0.3,
    trend: 0.25,
    profit: 0.2,
    competition: 0.15,
    winning: 0.1,
  };

  async optimize() {
    const { data } = await supabaseAdmin
      .from("historical_learning")
      .select("*");

    if (!data || data.length === 0) return this.weights;

    const successRate =
      data.filter((d) => d.outcome === "SUCCESS").length /
      data.length;

    if (successRate < 0.4) {
      this.weights.trend += 0.02;
      this.weights.marketFit += 0.02;
      this.weights.competition -= 0.01;
    }

    if (successRate > 0.7) {
      this.weights.winning += 0.02;
    }

    return this.normalize();
  }

  private normalize() {
    const sum = Object.values(this.weights).reduce(
      (a, b) => a + b,
      0
    );

    for (const key in this.weights) {
      this.weights[key as keyof typeof this.weights] /=
        sum;
    }

    return this.weights;
  }
}

export const selfOptimizingWeightEngine =
  new SelfOptimizingWeightEngine();
