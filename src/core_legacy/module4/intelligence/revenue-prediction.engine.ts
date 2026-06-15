import { ProductInput } from "../00-interfaces";

export interface RevenuePredictionInput {
  productId: string;
  title: string;
  price: number;

  marketFitScore: number;
  trendScore: number;
  winningProbability: number;
  competitionScore: number;
  qualityScore: number;
}

export interface RevenuePredictionResult {
  productId: string;

  predictedRevenuePerDay: number;
  predictedRevenuePerMonth: number;

  conversionRateEstimate: number;

  trafficEstimatePerDay: number;

  profitMarginEstimate: number;

  scalabilityFactor: number;

  riskAdjustedRevenue: number;

  revenueTier:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "EXPLOSIVE";

  confidence: number;

  breakdown: {
    demandFactor: number;
    competitionPenalty: number;
    priceOptimizationFactor: number;
    trendMultiplier: number;
    qualityBoost: number;
  };
}

export class RevenuePredictionEngine {
  predict(
    input: RevenuePredictionInput
  ): RevenuePredictionResult {
    const demandFactor =
      this.calculateDemand(input);

    const competitionPenalty =
      this.calculateCompetitionPenalty(input);

    const priceOptimizationFactor =
      this.calculatePriceFactor(input);

    const trendMultiplier =
      this.calculateTrendMultiplier(input);

    const qualityBoost =
      this.calculateQualityBoost(input);

    const trafficEstimate =
      this.estimateTraffic(input);

    const conversionRate =
      this.estimateConversionRate(input);

    const predictedRevenuePerDay =
      this.calculateDailyRevenue({
        trafficEstimate,
        conversionRate,
        price: input.price,
        demandFactor,
        trendMultiplier,
      });

    const predictedRevenuePerMonth =
      predictedRevenuePerDay * 30;

    const riskAdjustedRevenue =
      this.applyRiskAdjustment(
        predictedRevenuePerMonth,
        competitionPenalty
      );

    const revenueTier =
      this.getRevenueTier(riskAdjustedRevenue);

    const scalabilityFactor =
      this.calculateScalability(input);

    const confidence =
      this.calculateConfidence(input);

    return {
      productId: input.productId,
      predictedRevenuePerDay,
      predictedRevenuePerMonth,
      conversionRateEstimate: conversionRate,
      trafficEstimatePerDay: trafficEstimate,
      profitMarginEstimate:
        this.estimateProfitMargin(input),
      scalabilityFactor,
      riskAdjustedRevenue,
      revenueTier,
      confidence,
      breakdown: {
        demandFactor,
        competitionPenalty,
        priceOptimizationFactor,
        trendMultiplier,
        qualityBoost,
      },
    };
  }

  // -----------------------------
  // DEMAND ENGINE
  // -----------------------------
  private calculateDemand(input: RevenuePredictionInput): number {
    const base =
      input.marketFitScore * 0.4 +
      input.trendScore * 0.4 +
      input.winningProbability * 0.2;

    return Math.min(100, base);
  }

  // -----------------------------
  // COMPETITION PENALTY ENGINE
  // -----------------------------
  private calculateCompetitionPenalty(
    input: RevenuePredictionInput
  ): number {
    return Math.min(100, input.competitionScore);
  }

  // -----------------------------
  // PRICE FACTOR ENGINE
  // -----------------------------
  private calculatePriceFactor(
    input: RevenuePredictionInput
  ): number {
    if (input.price < 20) return 1.4;
    if (input.price < 50) return 1.2;
    if (input.price < 100) return 1.0;
    return 0.8;
  }

  // -----------------------------
  // TREND MULTIPLIER ENGINE
  // -----------------------------
  private calculateTrendMultiplier(
    input: RevenuePredictionInput
  ): number {
    if (input.trendScore > 80) return 1.6;
    if (input.trendScore > 60) return 1.3;
    if (input.trendScore > 40) return 1.1;
    return 0.9;
  }

  // -----------------------------
  // QUALITY BOOST ENGINE
  // -----------------------------
  private calculateQualityBoost(
    input: RevenuePredictionInput
  ): number {
    return input.qualityScore / 100;
  }

  // -----------------------------
  // TRAFFIC ESTIMATION ENGINE
  // -----------------------------
  private estimateTraffic(
    input: RevenuePredictionInput
  ): number {
    const baseTraffic = 100;

    const multiplier =
      input.trendScore * 0.5 +
      input.marketFitScore * 0.5;

    return Math.round(
      baseTraffic + multiplier * 10
    );
  }

  // -----------------------------
  // CONVERSION ENGINE
  // -----------------------------
  private estimateConversionRate(
    input: RevenuePredictionInput
  ): number {
    let rate = 0.02;

    if (input.qualityScore > 80) rate += 0.03;
    if (input.marketFitScore > 70) rate += 0.02;
    if (input.winningProbability > 70) rate += 0.02;

    return parseFloat(rate.toFixed(4));
  }

  // -----------------------------
  // DAILY REVENUE ENGINE
  // -----------------------------
  private calculateDailyRevenue(params: {
    trafficEstimate: number;
    conversionRate: number;
    price: number;
    demandFactor: number;
    trendMultiplier: number;
  }): number {
    const conversions =
      params.trafficEstimate *
      params.conversionRate;

    const revenue =
      conversions *
      params.price *
      (params.demandFactor / 100) *
      params.trendMultiplier;

    return Math.round(revenue);
  }

  // -----------------------------
  // RISK ADJUSTMENT ENGINE
  // -----------------------------
  private applyRiskAdjustment(
    revenue: number,
    competitionPenalty: number
  ): number {
    const riskFactor =
      1 - competitionPenalty / 200;

    return Math.round(revenue * riskFactor);
  }

  // -----------------------------
  // REVENUE TIER ENGINE
  // -----------------------------
  private getRevenueTier(
    revenue: number
  ): RevenuePredictionResult["revenueTier"] {
    if (revenue > 10000) return "EXPLOSIVE";
    if (revenue > 5000) return "HIGH";
    if (revenue > 1000) return "MEDIUM";
    return "LOW";
  }

  // -----------------------------
  // SCALABILITY ENGINE
  // -----------------------------
  private calculateScalability(
    input: RevenuePredictionInput
  ): number {
    let score = 50;

    const text = input.title.toLowerCase();

    if (text.includes("portable")) score += 15;
    if (text.includes("smart")) score += 15;
    if (text.includes("wireless")) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // PROFIT ENGINE
  // -----------------------------
  private estimateProfitMargin(
    input: RevenuePredictionInput
  ): number {
    const base = input.price * 0.4;

    return Math.round(base);
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(
    input: RevenuePredictionInput
  ): number {
    let confidence = 60;

    if (input.marketFitScore > 70) confidence += 10;
    if (input.trendScore > 70) confidence += 10;
    if (input.qualityScore > 70) confidence += 10;

    return Math.min(100, confidence);
  }
}

export const revenuePredictionEngine =
  new RevenuePredictionEngine();
