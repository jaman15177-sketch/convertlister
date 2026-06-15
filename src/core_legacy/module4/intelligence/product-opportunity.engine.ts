import { ProductInput } from "../00-interfaces";

export interface OpportunitySignal {
  productId: string;

  opportunityScore: number;

  verdict:
    | "HIGH_OPPORTUNITY"
    | "MODERATE_OPPORTUNITY"
    | "LOW_OPPORTUNITY"
    | "NO_OPPORTUNITY";

  demandStrength: number;
  competitionPressure: number;
  profitPotential: number;
  scalability: number;
  riskLevel: number;

  entryBarrier: number;

  signals: string[];

  confidence: number;
}

export class ProductOpportunityEngine {
  analyze(product: ProductInput): OpportunitySignal {
    const demandStrength =
      this.calculateDemandStrength(product);

    const competitionPressure =
      this.calculateCompetitionPressure(product);

    const profitPotential =
      this.calculateProfitPotential(product);

    const scalability =
      this.calculateScalability(product);

    const riskLevel =
      this.calculateRiskLevel(product);

    const entryBarrier =
      this.calculateEntryBarrier(
        competitionPressure,
        riskLevel
      );

    const opportunityScore =
      this.calculateOpportunityScore({
        demandStrength,
        competitionPressure,
        profitPotential,
        scalability,
        riskLevel,
      });

    const verdict =
      this.getVerdict(opportunityScore);

    const signals =
      this.generateSignals(product, {
        demandStrength,
        competitionPressure,
        profitPotential,
        scalability,
        riskLevel,
      });

    const confidence =
      this.calculateConfidence(signals);

    return {
      productId: product.productId,
      opportunityScore,
      verdict,
      demandStrength,
      competitionPressure,
      profitPotential,
      scalability,
      riskLevel,
      entryBarrier,
      signals,
      confidence,
    };
  }

  // -----------------------------
  // DEMAND ENGINE
  // -----------------------------
  private calculateDemandStrength(
    product: ProductInput
  ): number {
    let score = 40;

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("viral")) score += 25;
    if (text.includes("trending")) score += 20;
    if (text.includes("best")) score += 15;
    if (product.price < 30) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // COMPETITION ENGINE
  // -----------------------------
  private calculateCompetitionPressure(
    product: ProductInput
  ): number {
    let score = 35;

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("popular")) score += 20;
    if (text.includes("amazon")) score += 15;
    if (text.includes("generic")) score += 20;

    if (product.price < 20) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // PROFIT ENGINE
  // -----------------------------
  private calculateProfitPotential(
    product: ProductInput
  ): number {
    let score = 50;

    const margin = product.price || 0;

    if (margin > 50) score += 30;
    else if (margin > 30) score += 20;
    else if (margin > 15) score += 10;
    else score -= 10;

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("premium")) score += 15;
    if (text.includes("luxury")) score += 20;

    return Math.max(0, Math.min(100, score));
  }

  // -----------------------------
  // SCALABILITY ENGINE
  // -----------------------------
  private calculateScalability(
    product: ProductInput
  ): number {
    let score = 45;

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("digital")) score += 30;
    if (text.includes("smart")) score += 20;
    if (text.includes("automation")) score += 25;
    if (text.includes("physical")) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // RISK ENGINE
  // -----------------------------
  private calculateRiskLevel(
    product: ProductInput
  ): number {
    let risk = 30;

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("fragile")) risk += 20;
    if (text.includes("restricted")) risk += 30;
    if (text.includes("expensive")) risk += 15;

    return Math.min(100, risk);
  }

  // -----------------------------
  // ENTRY BARRIER ENGINE
  // -----------------------------
  private calculateEntryBarrier(
    competitionPressure: number,
    riskLevel: number
  ): number {
    return Math.min(
      100,
      (competitionPressure + riskLevel) / 2
    );
  }

  // -----------------------------
  // FINAL OPPORTUNITY SCORE
  // -----------------------------
  private calculateOpportunityScore(input: {
    demandStrength: number;
    competitionPressure: number;
    profitPotential: number;
    scalability: number;
    riskLevel: number;
  }): number {
    const score =
      input.demandStrength * 0.3 +
      input.profitPotential * 0.25 +
      input.scalability * 0.2 +
      (100 - input.competitionPressure) * 0.15 +
      (100 - input.riskLevel) * 0.1;

    return Math.round(Math.min(100, score));
  }

  // -----------------------------
  // VERDICT ENGINE
  // -----------------------------
  private getVerdict(
    score: number
  ):
    | "HIGH_OPPORTUNITY"
    | "MODERATE_OPPORTUNITY"
    | "LOW_OPPORTUNITY"
    | "NO_OPPORTUNITY" {
    if (score >= 80)
      return "HIGH_OPPORTUNITY";

    if (score >= 60)
      return "MODERATE_OPPORTUNITY";

    if (score >= 40)
      return "LOW_OPPORTUNITY";

    return "NO_OPPORTUNITY";
  }

  // -----------------------------
  // SIGNAL ENGINE
  // -----------------------------
  private generateSignals(
    product: ProductInput,
    metrics: any
  ): string[] {
    const signals: string[] = [];

    if (metrics.demandStrength > 70)
      signals.push("HIGH_DEMAND");

    if (metrics.profitPotential > 70)
      signals.push("HIGH_PROFIT_MARGIN");

    if (metrics.scalability > 70)
      signals.push("SCALABLE_MODEL");

    if (metrics.competitionPressure < 40)
      signals.push("LOW_COMPETITION");

    if (metrics.riskLevel < 40)
      signals.push("LOW_RISK");

    return signals;
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(
    signals: string[]
  ): number {
    const base = signals.length * 18;
    return Math.min(100, base + 35);
  }
}

export const productOpportunityEngine =
  new ProductOpportunityEngine();
