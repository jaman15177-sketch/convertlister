import type { OptimizedProduct } from "./optimization.types";

export class RankingEngine {
  rank(products: OptimizedProduct[]): OptimizedProduct[] {
    return [...products]
      .sort((a, b) => b.finalScore - a.finalScore)
      .map((p, i) => ({
        ...p,
        rankingScore: 100 - i * 2,
      }));
  }
}
