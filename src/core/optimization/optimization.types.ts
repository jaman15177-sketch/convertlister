import type { AdapterProduct } from "@/adapters/core/adapter.contract";

export interface ProductSignals {
  isHighQuality: boolean;
  isHighProfit: boolean;
  isHighCompetition: boolean;
  isTrending: boolean;
}

export interface OptimizedProduct extends AdapterProduct {
  qualityScore: number;
  rankingScore: number;
  profitabilityScore: number;
  competitionScore: number;

  finalScore: number;

  signals: ProductSignals;

  rejectionReasons: string[];
}
