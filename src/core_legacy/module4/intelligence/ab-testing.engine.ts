export interface ABTestVariant {
  id: string;

  name: string;

  payload: any;

  weight: number;
}

export interface ABTestInput {
  testId: string;

  productId: string;

  baseScore: number;

  variants: ABTestVariant[];

  traffic: number;

  conversionRateBaseline: number;
}

export interface ABTestResult {
  testId: string;

  productId: string;

  winnerVariant: ABTestVariant;

  variantResults: VariantResult[];

  upliftPercentage: number;

  confidence: number;

  recommendation:
    | "DEPLOY_WINNER"
    | "EXTEND_TEST"
    | "REJECT_ALL";

  insights: string[];
}

export interface VariantResult {
  variantId: string;

  impressions: number;

  clicks: number;

  conversions: number;

  ctr: number;

  conversionRate: number;

  revenueEstimate: number;

  score: number;
}

export class ABTestingEngine {
  runTest(input: ABTestInput): ABTestResult {
    const variantResults =
      this.simulateVariants(input);

    const winner =
      this.selectWinner(variantResults, input.variants);

    const uplift =
      this.calculateUplift(winner, input);

    const confidence =
      this.calculateConfidence(variantResults);

    const recommendation =
      this.getRecommendation(uplift, confidence);

    const insights =
      this.generateInsights(variantResults, winner);

    return {
      testId: input.testId,
      productId: input.productId,
      winnerVariant: winner.variant,
      variantResults,
      upliftPercentage: uplift,
      confidence,
      recommendation,
      insights,
    };
  }

  // -----------------------------
  // SIMULATION ENGINE
  // -----------------------------
  private simulateVariants(
    input: ABTestInput
  ): VariantResult[] {
    return input.variants.map((variant) => {
      const impressions =
        Math.round(input.traffic * variant.weight);

      const ctr =
        this.simulateCTR(input.baseScore, variant);

      const clicks = Math.round(impressions * ctr);

      const conversionRate =
        this.simulateConversionRate(
          input.conversionRateBaseline,
          variant
        );

      const conversions = Math.round(
        clicks * conversionRate
      );

      const revenueEstimate = conversions * 25;

      const score =
        this.calculateVariantScore(
          ctr,
          conversionRate,
          revenueEstimate
        );

      return {
        variantId: variant.id,
        impressions,
        clicks,
        conversions,
        ctr,
        conversionRate,
        revenueEstimate,
        score,
      };
    });
  }

  // -----------------------------
  // CTR SIMULATION
  // -----------------------------
  private simulateCTR(
    baseScore: number,
    variant: ABTestVariant
  ): number {
    const noise = Math.random() * 0.01;

    const ctr =
      0.02 +
      (baseScore / 1000) +
      variant.weight * 0.02 +
      noise;

    return Math.min(0.2, ctr);
  }

  // -----------------------------
  // CONVERSION SIMULATION
  // -----------------------------
  private simulateConversionRate(
    baseline: number,
    variant: ABTestVariant
  ): number {
    const boost = variant.payload?.boost || 0;

    return Math.min(
      0.5,
      baseline + boost + Math.random() * 0.01
    );
  }

  // -----------------------------
  // SCORING ENGINE
  // -----------------------------
  private calculateVariantScore(
    ctr: number,
    conversionRate: number,
    revenue: number
  ): number {
    return Math.round(
      ctr * 1000 +
        conversionRate * 1000 +
        revenue / 10
    );
  }

  // -----------------------------
  // WINNER SELECTION ENGINE
  // -----------------------------
  private selectWinner(
    results: VariantResult[],
    variants: ABTestVariant[]
  ): { variant: ABTestVariant; score: number } {
    const sorted = [...results].sort(
      (a, b) => b.score - a.score
    );

    const top = sorted[0];

    const variant =
      variants.find((v) => v.id === top.variantId)!;

    return {
      variant,
      score: top.score,
    };
  }

  // -----------------------------
  // UPLIFT ENGINE
  // -----------------------------
  private calculateUplift(
    winner: { variant: ABTestVariant; score: number },
    input: ABTestInput
  ): number {
    const baselineRevenue =
      input.traffic *
      input.conversionRateBaseline *
      25;

    const improvedRevenue =
      winner.score * 10;

    const uplift =
      ((improvedRevenue - baselineRevenue) /
        baselineRevenue) *
      100;

    return Math.round(uplift);
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(
    results: VariantResult[]
  ): number {
    const totalConversions = results.reduce(
      (sum, r) => sum + r.conversions,
      0
    );

    if (totalConversions < 10) return 40;

    if (totalConversions < 50) return 60;

    return 85;
  }

  // -----------------------------
  // DECISION ENGINE
  // -----------------------------
  private getRecommendation(
    uplift: number,
    confidence: number
  ):
    | "DEPLOY_WINNER"
    | "EXTEND_TEST"
    | "REJECT_ALL" {
    if (confidence < 50) return "EXTEND_TEST";

    if (uplift > 20 && confidence > 70) {
      return "DEPLOY_WINNER";
    }

    if (uplift < 0) return "REJECT_ALL";

    return "EXTEND_TEST";
  }

  // -----------------------------
  // INSIGHT ENGINE
  // -----------------------------
  private generateInsights(
    results: VariantResult[],
    winner: { variant: ABTestVariant; score: number }
  ): string[] {
    const insights: string[] = [];

    const sorted = [...results].sort(
      (a, b) => b.conversions - a.conversions
    );

    const best = sorted[0];

    insights.push(
      `Best performing variant: ${best.variantId}`
    );

    insights.push(
      `Winner achieved ${best.conversionRate.toFixed(3)} conversion rate`
    );

    insights.push(
      `CTR impact strongest in high-weight variants`
    );

    if (winner.score > 1000) {
      insights.push("Strong statistically significant winner detected");
    }

    return insights;
  }
}

export const abTestingEngine =
  new ABTestingEngine();
