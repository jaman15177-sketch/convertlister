// autonomous-decision.engine.ts
// PRODUCTION FINAL - SINGLE FILE

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  cost: number;
  trendScore: number;
  saturationScore: number;
  competitorScore: number;
  engagementScore: number;
  demandScore: number;
};

type DecisionResult = {
  productId: string;
  score: number;
  confidence: number;
  decision: "WINNER" | "REJECT" | "TEST";
  reasoning: string[];
};

export class AutonomousDecisionEngine {
  private weights = {
    trend: 0.25,
    demand: 0.20,
    margin: 0.20,
    engagement: 0.15,
    competition: 0.10,
    saturation: 0.10,
  };

  analyze(product: Product): DecisionResult {
    const margin =
      ((product.price - product.cost) /
        product.price) *
      100;

    const marginScore =
      this.normalize(margin);

    const competitionScore =
      100 - product.competitorScore;

    const saturationScore =
      100 - product.saturationScore;

    const finalScore =
      product.trendScore *
        this.weights.trend +
      product.demandScore *
        this.weights.demand +
      marginScore *
        this.weights.margin +
      product.engagementScore *
        this.weights.engagement +
      competitionScore *
        this.weights.competition +
      saturationScore *
        this.weights.saturation;

    const confidence =
      this.calculateConfidence(
        product,
        finalScore
      );

    const reasoning =
      this.generateReasoning(
        product,
        margin,
        finalScore
      );

    return {
      productId: product.id,
      score: Number(
        finalScore.toFixed(2)
      ),
      confidence,
      decision:
        this.makeDecision(
          finalScore,
          confidence
        ),
      reasoning,
    };
  }

  private normalize(
    value: number
  ): number {
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
  }

  private calculateConfidence(
    product: Product,
    score: number
  ): number {
    let confidence = 50;

    if (product.trendScore > 70)
      confidence += 10;

    if (product.demandScore > 70)
      confidence += 10;

    if (
      product.competitorScore < 40
    )
      confidence += 10;

    if (
      product.saturationScore < 40
    )
      confidence += 10;

    if (score > 80)
      confidence += 10;

    return Math.min(
      100,
      confidence
    );
  }

  private makeDecision(
    score: number,
    confidence: number
  ): "WINNER" | "REJECT" | "TEST" {
    if (
      score >= 80 &&
      confidence >= 80
    ) {
      return "WINNER";
    }

    if (score >= 60) {
      return "TEST";
    }

    return "REJECT";
  }

  private generateReasoning(
    product: Product,
    margin: number,
    score: number
  ): string[] {
    const reasons: string[] = [];

    if (product.trendScore > 75) {
      reasons.push(
        "Strong trend momentum detected"
      );
    }

    if (product.demandScore > 70) {
      reasons.push(
        "High market demand identified"
      );
    }

    if (
      product.competitorScore < 40
    ) {
      reasons.push(
        "Low competitive pressure"
      );
    }

    if (
      product.saturationScore < 40
    ) {
      reasons.push(
        "Market not saturated"
      );
    }

    if (margin > 40) {
      reasons.push(
        "Excellent profit margin"
      );
    }

    if (score < 60) {
      reasons.push(
        "Weak overall product viability"
      );
    }

    return reasons;
  }
}

/**
 * ============================
 * EXAMPLE
 * ============================
 */

const engine =
  new AutonomousDecisionEngine();

const result = engine.analyze({
  id: "prod_001",
  title: "Wireless Earbuds",
  category: "Electronics",
  price: 80,
  cost: 25,
  trendScore: 92,
  saturationScore: 30,
  competitorScore: 35,
  engagementScore: 88,
  demandScore: 90,
});

console.log(result);
