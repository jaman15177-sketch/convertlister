import type { AdapterProduct } from "@/adapters/core/adapter.contract";

export class ScoringEngine {
  score(product: AdapterProduct): number {
    let score = 0;

    if (product.title?.length > 10) score += 20;
    if (product.price > 0) score += 20;
    if (product.images) score += 20;    const meta = product.metadata || {};

    const rating = Number(meta.rating || 0);
    const reviews = Number(meta.reviews || 0);

    if (rating >= 4.5) score += 20;
    else if (rating >= 4.0) score += 15;
    else if (rating >= 3.5) score += 10;

    if (reviews > 1000) score += 20;
    else if (reviews > 500) score += 15;
    else if (reviews > 100) score += 10;

    return Math.min(score, 100);
  }
}
