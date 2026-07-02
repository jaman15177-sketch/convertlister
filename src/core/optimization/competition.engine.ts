import type { AdapterProduct } from "@/adapters/core/adapter.contract";

export class CompetitionEngine {
  score(product: AdapterProduct): number {
    const reviews = Number(product.metadata?.reviews || 0);

    if (reviews > 5000) return 95;
    if (reviews > 2000) return 80;
    if (reviews > 1000) return 65;
    if (reviews > 500) return 50;
    if (reviews > 100) return 35;

    return 20;
  }
}
