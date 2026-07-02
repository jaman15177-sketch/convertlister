import type { AdapterProduct } from "@/adapters/core/adapter.contract";

export class ProfitabilityEngine {
  score(product: AdapterProduct): number {
    const price = product.price;

    if (price > 500) return 95;
    if (price > 200) return 80;
    if (price > 100) return 65;
    if (price > 50) return 50;
    if (price > 20) return 35;

    return 20;
  }
}
