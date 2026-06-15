import { ProductInput } from "../00-interfaces";

import { ProductUnderstandingEngine } from "./01-product-understanding.engine";
import { KeywordIntelligenceEngine } from "./02-keyword-intelligence.engine";
import { CustomerPsychologyEngine } from "./03-customer-psychology.engine";
import { MarketPositioningEngine } from "./04-market-positioning.engine";
import { CompetitorGapAnalyzer } from "./05-competitor-gap-analyzer.engine";
import { QualityScoringEngine } from "./quality-scoring.engine";
import { RevenuePredictionEngine } from "./revenue-prediction.engine";
import { MultiPlatformEngine } from "./multi-platform.engine";
import { SelfImprovingLoopEngine } from "./self-improving-loop.engine";

export interface ProductIntelligenceResult {
  productId: string;

  understanding: any;

  keywords: any;

  psychology: any;

  positioning: any;

  competitorGap: any;

  quality: any;

  revenue: any;

  platform: any[];

  finalDecision:
    | "PUBLISH"
    | "OPTIMIZE"
    | "REJECT";

  globalScore: number;

  confidence: number;

  insights: string[];
}

export class ProductIntelligenceEngine {
  private understanding = new ProductUnderstandingEngine();

  private keywords = new KeywordIntelligenceEngine();

  private psychology = new CustomerPsychologyEngine();

  private positioning = new MarketPositioningEngine();

  private competitor = new CompetitorGapAnalyzer();

  private quality = new QualityScoringEngine();

  private revenue = new RevenuePredictionEngine();

  private platform = new MultiPlatformEngine();

  private learning = new SelfImprovingLoopEngine();

  // -----------------------------
  // MASTER ORCHESTRATOR
  // -----------------------------
  public analyze(
    input: ProductInput
  ): ProductIntelligenceResult {
    const understanding =
      this.understanding.analyze(input);

    const keywords =
      this.keywords.extract(input);

    const psychology =
      this.psychology.analyze(input);

    const positioning =
      this.positioning.analyze(input);

    const competitor =
      this.competitor.analyze(input);

    const quality =
      this.quality.score(input);

    const revenue =
      this.revenue.predict({
        productId: input.productId,
        title: input.title,
        price: input.price,
        marketFitScore: understanding.marketFitScore,
        trendScore: keywords.seoScore,
        winningProbability: psychology.buyProbability,
        competitionScore: competitor.competitionScore,
        qualityScore: quality.overallScore,
      });

    const platform =
      this.platform.optimizeForAll({
        productId: input.productId,
        title: input.title,
        price: input.price,
        marketFitScore: understanding.marketFitScore,
        trendScore: keywords.seoScore,
        qualityScore: quality.overallScore,
        competitionScore: competitor.competitionScore,
        conversionRate: revenue.conversionRateEstimate,
      });

    const globalScore =
      this.calculateGlobalScore({
        understanding,
        keywords,
        psychology,
        positioning,
        competitor,
        quality,
        revenue,
      });

    const finalDecision =
      this.getDecision(globalScore);

    const confidence =
      this.calculateConfidence({
        understanding,
        keywords,
        psychology,
        quality,
      });

    const insights =
      this.generateInsights({
        understanding,
        keywords,
        psychology,
        positioning,
        competitor,
        quality,
        revenue,
      });

    // FEED INTO SELF-LEARNING LOOP
    this.learning.learn({
      productId: input.productId,
      predictionScore: globalScore,
      actualOutcome: "UNKNOWN",
      revenue: revenue.predictedRevenuePerMonth,
      platform: "SYSTEM",
      timestamp: Date.now(),
    });

    return {
      productId: input.productId,
      understanding,
      keywords,
      psychology,
      positioning,
      competitorGap: competitor,
      quality,
      revenue,
      platform,
      finalDecision,
      globalScore,
      confidence,
      insights,
    };
  }

  // -----------------------------
  // GLOBAL SCORE ENGINE
  // -----------------------------
  private calculateGlobalScore(data: any): number {
    const score =
      data.understanding.marketFitScore * 0.2 +
      data.keywords.seoScore * 0.15 +
      data.psychology.buyProbability * 0.2 +
      data.positioning.competitorGap * 0.1 +
      data.quality.overallScore * 0.2 +
      (data.revenue.predictedRevenuePerMonth / 1000) *
        0.15;

    return Math.min(100, Math.round(score));
  }

  // -----------------------------
  // DECISION ENGINE
  // -----------------------------
  private getDecision(score: number):
    | "PUBLISH"
    | "OPTIMIZE"
    | "REJECT" {
    if (score >= 80) return "PUBLISH";
    if (score >= 60) return "OPTIMIZE";
    return "REJECT";
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(data: any): number {
    let confidence = 60;

    if (data.understanding) confidence += 10;
    if (data.keywords) confidence += 10;
    if (data.psychology) confidence += 10;
    if (data.quality) confidence += 10;

    return Math.min(100, confidence);
  }

  // -----------------------------
  // INSIGHT ENGINE
  // -----------------------------
  private generateInsights(data: any): string[] {
    const insights: string[] = [];

    if (data.keywords.seoScore > 70) {
      insights.push("Strong SEO potential detected");
    }

    if (data.psychology.buyProbability > 70) {
      insights.push("High emotional purchase trigger detected");
    }

    if (data.positioning.competitorGap > 60) {
      insights.push("Strong market gap identified");
    }

    if (data.revenue.predictedRevenuePerMonth > 5000) {
      insights.push("High revenue potential product");
    }

    if (data.quality.overallScore > 80) {
      insights.push("High-quality production ready product");
    }

    return insights;
  }
}

export const productIntelligenceEngine =
  new ProductIntelligenceEngine();
