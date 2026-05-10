import { Product } from "../product.model";
import { IntelligenceLayer } from "./intelligence.layer";

export class ScoringService {
  private intelligence = new IntelligenceLayer();

  run(product: Product) {
    const base = this.baseScore(product);
    const intel = this.intelligence.run(product);

    const final =
      base * 0.6 +
      intel.trendScore * 0.2 +
      intel.marketMomentum * 0.1 +
      intel.engagementVelocity * 0.1;

    return Math.min(Math.round(final), 100);
  }

  private baseScore(product: Product) {
    const sales = product.sales ?? 0;
    const views = product.views ?? 0;
    const likes = product.likes ?? 0;

    return Math.min((sales * 0.5 + views * 0.3 + likes * 0.2) / 100, 100);
  }
}
