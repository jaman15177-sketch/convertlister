import { ProductInput } from "../00-interfaces";

export interface MarketSaturationResult {
  saturationScore: number;

  level: "LOW" | "MEDIUM" | "HIGH" | "OVERSATURATED";

  competitorDensity: number;

  pricePressure: number;

  trendPressure: number;

  entryDifficulty: number;

  opportunityWindow: number;
}

export class MarketSaturationEngine {
  analyze(
    product: ProductInput
  ): MarketSaturationResult {
    const competitorDensity =
      this.calculateCompetitorDensity(product);

    const pricePressure =
      this.calculatePricePressure(product);

    const trendPressure =
      this.calculateTrendPressure(product);

    const entryDifficulty =
      this.calculateEntryDifficulty(
        competitorDensity,
        pricePressure
      );

    const saturationScore =
      this.calculateSaturationScore(
        competitorDensity,
        pricePressure,
        trendPressure
      );

    const level =
      this.determineLevel(saturationScore);

    const opportunityWindow =
      this.calculateOpportunityWindow(
        saturationScore
      );

    return {
      saturationScore,
      level,
      competitorDensity,
      pricePressure,
      trendPressure,
      entryDifficulty,
      opportunityWindow,
    };
  }

  // ----------------------------
  // COMPETITOR DENSITY ENGINE
  // ----------------------------
  private calculateCompetitorDensity(
    product: ProductInput
  ): number {
    let density = 40;

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (
      text.includes("popular")
    )
      density += 20;

    if (
      text.includes("best")
    )
      density += 25;

    if (
      product.price < 20
    )
      density += 15;

    if (
      text.includes("amazon")
    )
      density += 10;

    return Math.min(100, density);
  }

  // ----------------------------
  // PRICE PRESSURE ENGINE
  // ----------------------------
  private calculatePricePressure(
    product: ProductInput
  ): number {
    let pressure = 30;

    if (
      product.price < 10
    )
      pressure += 30;

    if (
      product.price < 25
    )
      pressure += 20;

    if (
      product.price > 50
    )
      pressure -= 10;

    return Math.max(
      0,
      Math.min(100, pressure)
    );
  }

  // ----------------------------
  // TREND PRESSURE ENGINE
  // ----------------------------
  private calculateTrendPressure(
    product: ProductInput
  ): number {
    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    let pressure = 40;

    if (
      text.includes("viral")
    )
      pressure += 25;

    if (
      text.includes("new")
    )
      pressure += 20;

    if (
      text.includes("old")
    )
      pressure -= 10;

    return Math.max(
      0,
      Math.min(100, pressure)
    );
  }

  // ----------------------------
  // ENTRY DIFFICULTY ENGINE
  // ----------------------------
  private calculateEntryDifficulty(
    competitorDensity: number,
    pricePressure: number
  ): number {
    return Math.min(
      100,
      competitorDensity * 0.6 +
        pricePressure * 0.4
    );
  }

  // ----------------------------
  // SATURATION SCORE ENGINE (CORE)
  // ----------------------------
  private calculateSaturationScore(
    competitorDensity: number,
    pricePressure: number,
    trendPressure: number
  ): number {
    const score =
      competitorDensity * 0.4 +
      pricePressure * 0.3 +
      trendPressure * 0.3;

    return Math.round(
      Math.min(100, score)
    );
  }

  // ----------------------------
  // MARKET LEVEL CLASSIFICATION
  // ----------------------------
  private determineLevel(
    score: number
  ): "LOW" | "MEDIUM" | "HIGH" | "OVERSATURATED" {
    if (score >= 80)
      return "OVERSATURATED";

    if (score >= 60)
      return "HIGH";

    if (score >= 35)
      return "MEDIUM";

    return "LOW";
  }

  // ----------------------------
  // OPPORTUNITY WINDOW ENGINE
  // ----------------------------
  private calculateOpportunityWindow(
    saturationScore: number
  ): number {
    return Math.max(
      0,
      100 - saturationScore
    );
  }
}

export const marketSaturationEngine =
  new MarketSaturationEngine();
