import type { AdapterProduct } from "@/adapters/core/adapter.contract";

/**
 * CENTRAL INTELLIGENCE LAYER
 * - scoring
 * - ranking
 * - profitability
 * - competition
 */

export interface OptimizationContext {
  keyword?: string;
  category?: string;
  budget?: number;
  strictMode?: boolean;
}

export class ProductOptimizationEngine {
  /**
   * MAIN PIPELINE ENTRY
   */
  async optimize(
    products: AdapterProduct[],
    ctx: OptimizationContext = {}
  ): Promise<(AdapterProduct & { optimization?: any })[]> {
    if (!products?.length) return [];

    return products.map((p) => {
      const score = this.score(p);
      const profitability = this.profitability(p, ctx);
      const competition = this.competition(p);

      const rank = this.rank(score, profitability, competition);

      return {
        ...p,
        optimization: {
          score,
          profitability,
          competition,
          rank,
        },
      };
    });
  }

  /**
   * SCORING ENGINE
   */
  private score(p: AdapterProduct): number {
    let score = 50;

    if (p.title) score += 10;

if (p.price > 0) score += 10;

if (p.images?.length) score += 10;

const rating =
  typeof p.metadata?.rating === "number"
    ? p.metadata.rating
    : 0;

score += rating * 5;

return Math.min(score, 100);    return Math.min(score, 100);
  }

  /**
   * PROFITABILITY ENGINE (simplified model)
   */
  private profitability(
    p: AdapterProduct,
    ctx: OptimizationContext
  ): number {
    let score = 50;

    if (p.price > 100) score += 10;
    if (p.price < 20) score -= 10;
    if (ctx.budget && p.price > ctx.budget) score -= 30;

    return Math.max(0, Math.min(score, 100));
  }

  /**
   * COMPETITION ENGINE
   */
  private competition(p: AdapterProduct): number {
    let score = 50;

    const reviews =
  typeof p.metadata?.reviews === "number"
    ? p.metadata.reviews
    : 0;
    if (reviews > 10000) score += 30;
    else if (reviews < 100) score -= 20;

    return Math.max(0, Math.min(score, 100));
  }

  /**
   * RANKING ENGINE
   */
  private rank(score: number, profit: number, competition: number): number {
    return Math.round(score * 0.5 + profit * 0.3 + (100 - competition) * 0.2);
  }
}
