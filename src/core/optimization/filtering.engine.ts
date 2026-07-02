import { ProductOptimizationEngine } from "./product-optimization.engine";import type { AdapterProduct } from "@/adapters/core/adapter.contract";

export interface FilteringInput {
  products: AdapterProduct[];
  keyword?: string;
  category?: string;
  budget?: number;
  strictMode?: boolean;
}

export interface FilteringResult {
  filtered: AdapterProduct[];
  totalIn: number;
  totalOut: number;
  dropped: number;
  meta: {
    avgScore: number;
    avgProfitability: number;
    avgCompetition: number;
  };
}

/**
 * SMART FILTERING ENGINE v2 (LEGACY WRAPPER)
 * - No business logic here
 * - Delegates everything to Optimization Engine
 */
export class FilteringEngine {
  constructor(
    private optimizer: ProductOptimizationEngine = new ProductOptimizationEngine()
  ) {}

  async filter(input: FilteringInput): Promise<FilteringResult> {
    const { products, keyword, category, budget, strictMode } = input;

    if (!products?.length) {
      return {
        filtered: [],
        totalIn: 0,
        totalOut: 0,
        dropped: 0,
        meta: {
          avgScore: 0,
          avgProfitability: 0,
          avgCompetition: 0,
        },
      };
    }

    // STEP 1: Run full optimization pipeline
    const optimized = await this.optimizer.optimize(products, {
      keyword,
      category,
      budget,
      strictMode,
    });

    // STEP 2: Apply final threshold filtering (business rules only)
    const final = optimized.filter((p) => {
      const score = p.optimization?.score ?? 0;
      const profit = p.optimization?.profitability ?? 0;
      const competition = p.optimization?.competition ?? 100;

      // Hard business constraints
      if (strictMode) {
        return score >= 70 && profit >= 60 && competition <= 60;
      }

      // Normal mode
      return score >= 50 && profit >= 40;
    });

    // STEP 3: Aggregate metrics
    const avg = (key: string) =>
      optimized.length
        ? optimized.reduce((sum, p) => sum + (p.optimization?.[key] || 0), 0) /
          optimized.length
        : 0;

    return {
      filtered: final,
      totalIn: products.length,
      totalOut: final.length,
      dropped: products.length - final.length,
      meta: {
        avgScore: avg("score"),
        avgProfitability: avg("profitability"),
        avgCompetition: avg("competition"),
      },
    };
  }
}
