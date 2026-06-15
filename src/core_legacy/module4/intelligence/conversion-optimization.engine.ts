import { ProductInput } from "../00-interfaces";

export interface ConversionOptimizationResult {
  productId: string;

  conversionScore: number;

  optimizedTitle: string;

  optimizedDescription: string;

  pricingStrategy:
    | "DISCOUNT_STRATEGY"
    | "PREMIUM_STRATEGY"
    | "VALUE_STRATEGY"
    | "PSYCHOLOGICAL_PRICING";

  ctaSuggestion: string;

  psychologicalHooks: string[];

  frictionReductionFixes: string[];

  urgencyBoosters: string[];

  trustEnhancers: string[];

  expectedConversionLift: number;

  confidence: number;
}

export class ConversionOptimizationEngine {
  optimize(product: ProductInput): ConversionOptimizationResult {
    const conversionScore =
      this.calculateConversionScore(product);

    const optimizedTitle =
      this.optimizeTitle(product);

    const optimizedDescription =
      this.optimizeDescription(product);

    const pricingStrategy =
      this.getPricingStrategy(product);

    const ctaSuggestion =
      this.generateCTA(product);

    const psychologicalHooks =
      this.generatePsychologicalHooks(product);

    const frictionReductionFixes =
      this.reduceFriction(product);

    const urgencyBoosters =
      this.addUrgency(product);

    const trustEnhancers =
      this.addTrust(product);

    const expectedConversionLift =
      this.calculateLift(conversionScore);

    const confidence =
      this.calculateConfidence(product);

    return {
      productId: product.productId,
      conversionScore,
      optimizedTitle,
      optimizedDescription,
      pricingStrategy,
      ctaSuggestion,
      psychologicalHooks,
      frictionReductionFixes,
      urgencyBoosters,
      trustEnhancers,
      expectedConversionLift,
      confidence,
    };
  }

  // -----------------------------
  // CONVERSION SCORE ENGINE
  // -----------------------------
  private calculateConversionScore(product: ProductInput): number {
    let score = 40;

    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    if (text.includes("buy")) score += 20;
    if (text.includes("now")) score += 15;
    if (text.includes("discount")) score += 15;
    if (product.price < 30) score += 10;

    return Math.min(100, score);
  }

  // -----------------------------
  // TITLE OPTIMIZATION ENGINE
  // -----------------------------
  private optimizeTitle(product: ProductInput): string {
    const base = product.title;

    const additions = [
      "2026 Edition",
      "Best Seller",
      "Fast Shipping",
    ];

    if (product.price < 30) {
      return `${base} | Affordable & High Demand 2026`;
    }

    return `${base} | ${additions[0]}`;
  }

  // -----------------------------
  // DESCRIPTION OPTIMIZATION ENGINE
  // -----------------------------
  private optimizeDescription(product: ProductInput): string {
    return `
🚀 High-Performance Product for Modern Users

✔ Designed for maximum convenience  
✔ Optimized for daily use efficiency  
✔ Trusted by thousands of buyers  
✔ Limited-time availability

💡 Why choose this?
- Saves time
- Improves productivity
- Cost-effective long-term value
    `.trim();
  }

  // -----------------------------
  // PRICING STRATEGY ENGINE
  // -----------------------------
  private getPricingStrategy(
    product: ProductInput
  ): ConversionOptimizationResult["pricingStrategy"] {
    const price = product.price;

    if (price < 20) return "VALUE_STRATEGY";
    if (price < 50) return "PSYCHOLOGICAL_PRICING";
    if (price < 100) return "DISCOUNT_STRATEGY";

    return "PREMIUM_STRATEGY";
  }

  // -----------------------------
  // CTA ENGINE
  // -----------------------------
  private generateCTA(product: ProductInput): string {
    const price = product.price;

    if (price < 30) {
      return "🔥 Buy Now Before Stock Runs Out";
    }

    return "👉 Get Yours Today";
  }

  // -----------------------------
  // PSYCHOLOGICAL HOOK ENGINE
  // -----------------------------
  private generatePsychologicalHooks(product: ProductInput): string[] {
    const hooks: string[] = [];

    const text =
      `${product.title}`.toLowerCase();

    if (text.includes("new"))
      hooks.push("Novelty Effect Trigger");

    if (text.includes("viral"))
      hooks.push("Social Proof Trigger");

    if (product.price < 30)
      hooks.push("Loss Aversion Trigger");

    hooks.push("Instant Gratification Trigger");

    return hooks;
  }

  // -----------------------------
  // FRICTION REDUCTION ENGINE
  // -----------------------------
  private reduceFriction(product: ProductInput): string[] {
    const fixes: string[] = [];

    if (product.price > 50)
      fixes.push("Add installment/payment options");

    fixes.push("Simplify checkout flow");
    fixes.push("Reduce decision overload");

    return fixes;
  }

  // -----------------------------
  // URGENCY ENGINE
  // -----------------------------
  private addUrgency(product: ProductInput): string[] {
    const boosters: string[] = [];

    boosters.push("Limited Time Offer");
    boosters.push("Stock Running Out Alert");

    if (product.price < 30) {
      boosters.push("Flash Sale Trigger");
    }

    return boosters;
  }

  // -----------------------------
  // TRUST ENGINE
  // -----------------------------
  private addTrust(product: ProductInput): string[] {
    const trust: string[] = [];

    trust.push("Verified Buyer Reviews");
    trust.push("Secure Payment Badge");

    if (product.price > 20) {
      trust.push("Money Back Guarantee");
    }

    return trust;
  }

  // -----------------------------
  // LIFT ENGINE
  // -----------------------------
  private calculateLift(score: number): number {
    if (score > 80) return 35;
    if (score > 60) return 20;
    if (score > 40) return 10;
    return 5;
  }

  // -----------------------------
  // CONFIDENCE ENGINE
  // -----------------------------
  private calculateConfidence(product: ProductInput): number {
    let confidence = 60;

    if (product.price < 50) confidence += 15;
    if (product.title.length > 10) confidence += 10;

    return Math.min(100, confidence);
  }
}

export const conversionOptimizationEngine =
  new ConversionOptimizationEngine();
