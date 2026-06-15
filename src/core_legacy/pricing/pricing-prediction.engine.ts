// pricing-prediction.engine.ts
// PRODUCTION FINAL — AI Pricing Intelligence & Prediction Engine

/**
 * =========================================
 * TYPES
 * =========================================
 */

type ProductInput = {
  id: string;
  title: string;
  category: string;

  cost: number;
  competitorPrice: number[];

  demandScore: number;      // 0–100
  trendScore: number;       // 0–100
  saturationScore: number;  // 0–100
  engagementScore: number;  // 0–100

  seasonalityFactor: number; // 0–100
  brandStrength: number;     // 0–100
};

type PricingDecision =
  | "INCREASE_PRICE"
  | "DECREASE_PRICE"
  | "KEEP_PRICE"
  | "TEST_PRICE_RANGE";

type PricingResult = {
  productId: string;

  recommendedPrice: number;
  minPrice: number;
  maxPrice: number;

  profitMargin: number;
  demandElasticity: number;

  score: number;
  confidence: number;

  decision: PricingDecision;

  reasoning: string[];

  predictedOutcome: {
    expectedRevenueLift: number;
    conversionImpact: number;
    riskLevel: number;
  };
};

/**
 * =========================================
 * UTIL ENGINE
 * =========================================
 */

class MathUtil {
  static clamp(v: number, min = 0, max = 100) {
    return Math.max(min, Math.min(max, v));
  }

  static avg(arr: number[]) {
    if (!arr.length) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }
}

/**
 * =========================================
 * MARKET PRICE ENGINE
 * =========================================
 */

class MarketPriceEngine {
  calculate(product: ProductInput) {
    const avgCompetitor = MathUtil.avg(product.competitorPrice);

    return {
      marketPrice: avgCompetitor,
      minMarketPrice: avgCompetitor * 0.85,
      maxMarketPrice: avgCompetitor * 1.15,
    };
  }
}

/**
 * =========================================
 * DEMAND ELASTICITY ENGINE
 * =========================================
 */

class DemandElasticityEngine {
  calculate(product: ProductInput): number {
    const elasticity =
      (product.demandScore * 0.4 +
        product.trendScore * 0.3 +
        product.engagementScore * 0.3) /
      1;

    return MathUtil.clamp(elasticity);
  }
}

/**
 * =========================================
 * PRICE OPTIMIZATION ENGINE
 * =========================================
 */

class PriceOptimizationEngine {
  calculate(
    product: ProductInput,
    market: { marketPrice: number }
  ) {
    const base = market.marketPrice;

    const demandBoost = product.demandScore / 100;
    const trendBoost = product.trendScore / 100;
    const brandBoost = product.brandStrength / 100;

    const adjusted =
      base *
      (1 +
        demandBoost * 0.2 +
        trendBoost * 0.15 +
        brandBoost * 0.1 -
        product.saturationScore / 100 * 0.2);

    return adjusted;
  }
}

/**
 * =========================================
 * PROFIT ENGINE
 * =========================================
 */

class ProfitEngine {
  calculate(price: number, cost: number) {
    const margin = ((price - cost) / price) * 100;
    return Math.max(0, margin);
  }
}

/**
 * =========================================
 * SCORE ENGINE
 * =========================================
 */

class ScoreEngine {
  calculate(product: ProductInput, margin: number): number {
    const demand = product.demandScore * 0.3;
    const trend = product.trendScore * 0.25;
    const marginScore = margin * 0.25;
    const saturation = (100 - product.saturationScore) * 0.2;

    return MathUtil.clamp(demand + trend + marginScore + saturation);
  }
}

/**
 * =========================================
 * CONFIDENCE ENGINE
 * =========================================
 */

class ConfidenceEngine {
  calculate(score: number, product: ProductInput): number {
    let confidence = score * 0.6;

    if (product.demandScore > 70) confidence += 10;
    if (product.trendScore > 70) confidence += 10;
    if (product.brandStrength > 60) confidence += 10;

    return MathUtil.clamp(confidence);
  }
}

/**
 * =========================================
 * DECISION ENGINE
 * =========================================
 */

class DecisionEngine {
  decide(score: number, margin: number): PricingDecision {
    if (score > 80 && margin > 40) return "INCREASE_PRICE";
    if (score < 40 || margin < 15) return "DECREASE_PRICE";
    if (score >= 60) return "KEEP_PRICE";
    return "TEST_PRICE_RANGE";
  }
}

/**
 * =========================================
 * REASONING ENGINE
 * =========================================
 */

class ReasoningEngine {
  explain(product: ProductInput, margin: number): string[] {
    const r: string[] = [];

    if (product.demandScore > 75) r.push("High market demand detected");
    if (product.trendScore > 70) r.push("Strong upward trend signal");
    if (product.saturationScore < 40) r.push("Low market saturation");
    if (margin > 40) r.push("Strong profit margin opportunity");
    if (product.brandStrength > 60) r.push("Brand strength supports premium pricing");
    if (product.saturationScore > 70) r.push("High saturation risk may reduce pricing power");

    return r;
  }
}

/**
 * =========================================
 * PREDICTION ENGINE
 * =========================================
 */

class PredictionEngine {
  predict(price: number, margin: number) {
    return {
      expectedRevenueLift: margin * 0.8,
      conversionImpact: 100 - Math.abs(50 - margin),
      riskLevel: Math.max(0, 100 - margin),
    };
  }
}

/**
 * =========================================
 * MASTER PRICING ENGINE
 * =========================================
 */

export class PricingPredictionEngine {
  private market = new MarketPriceEngine();
  private elasticity = new DemandElasticityEngine();
  private optimizer = new PriceOptimizationEngine();
  private profit = new ProfitEngine();
  private score = new ScoreEngine();
  private confidence = new ConfidenceEngine();
  private decision = new DecisionEngine();
  private reasoning = new ReasoningEngine();
  private prediction = new PredictionEngine();

  analyze(product: ProductInput): PricingResult {
    const market = this.market.calculate(product);

    const recommendedPrice = this.optimizer.calculate(product, market);

    const profitMargin = this.profit.calculate(recommendedPrice, product.cost);

    const demandElasticity = this.elasticity.calculate(product);

    const score = this.score.calculate(product, profitMargin);

    const confidence = this.confidence.calculate(score, product);

    const decision = this.decision.decide(score, profitMargin);

    const reasoning = this.reasoning.explain(product, profitMargin);

    const predictedOutcome = this.prediction.predict(recommendedPrice, profitMargin);

    return {
      productId: product.id,

      recommendedPrice: Number(recommendedPrice.toFixed(2)),
      minPrice: Number(market.minMarketPrice.toFixed(2)),
      maxPrice: Number(market.maxMarketPrice.toFixed(2)),

      profitMargin: Number(profitMargin.toFixed(2)),
      demandElasticity: Number(demandElasticity.toFixed(2)),

      score: Number(score.toFixed(2)),
      confidence: Number(confidence.toFixed(2)),

      decision,
      reasoning,

      predictedOutcome,
    };
  }
}

/**
 * =========================================
 * EXAMPLE RUN
 * =========================================
 */

const engine = new PricingPredictionEngine();

const result = engine.analyze({
  id: "prod_001",
  title: "Wireless Earbuds",
  category: "Electronics",

  cost: 25,
  competitorPrice: [80, 85, 90],

  demandScore: 88,
  trendScore: 82,
  saturationScore: 35,
  engagementScore: 79,

  seasonalityFactor: 60,
  brandStrength: 70,
});

console.log(JSON.stringify(result, null, 2));
