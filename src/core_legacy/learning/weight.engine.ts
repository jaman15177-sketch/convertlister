import { logger } from "@/core/observability/logger";

export class WeightEngine {
  private weights = {
    marketFit: 0.3,
    trend: 0.25,
    profit: 0.2,
    competition: 0.15,
    winning: 0.1,
  };

  adjust(successRate: number) {
    if (successRate < 0.4) {
      this.weights.trend += 0.01;
      this.weights.marketFit += 0.01;
      this.weights.competition -= 0.01;
    }

    if (successRate > 0.7) {
      this.weights.winning += 0.02;
    }

    this.normalize();

    logger.info("Weights updated", this.weights);

    return this.weights;
  }

  private normalize() {
    const sum = Object.values(this.weights).reduce(
      (a, b) => a + b,
      0
    );

    for (const k in this.weights) {
      this.weights[k as keyof typeof this.weights] /= sum;
    }
  }
}

export const weightEngine = new WeightEngine();
