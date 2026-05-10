import { Product } from "../product.model";

export class IntelligenceLayer {
  run(product: Product) {
    return {
      trendScore: this.trendScore(product),
      marketMomentum: this.marketMomentum(product),
      engagementVelocity: this.engagementVelocity(product),
    };
  }

  // 🔥 Trend = growth signal
  private trendScore(p: Product) {
    const current = p.trendCurrent ?? 0;
    const past = p.trendPast ?? 0;

    if (past === 0) return 0;

    const growth = ((current - past) / past) * 100;

    return Math.max(Math.min(growth, 100), 0);
  }

  // 📈 Market momentum
  private marketMomentum(p: Product) {
    const sales = p.sales ?? 0;
    const orders = p.orders ?? 0;

    return Math.min((sales + orders * 2) / 100, 100);
  }

  // ⚡ Engagement speed
  private engagementVelocity(p: Product) {
    const likes = p.likes ?? 0;
    const shares = p.shares ?? 0;
    const comments = p.comments ?? 0;

    return Math.min((likes + shares * 2 + comments * 1.5) / 300, 100);
  }
}
