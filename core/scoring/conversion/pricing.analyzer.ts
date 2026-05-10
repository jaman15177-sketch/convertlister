export class PricingAnalyzer {
  analyze(price: number): number {
    let score = 50;

    if (price > 10 && price < 100) {
      score += 30;
    }

    if (price % 10 !== 0) {
      score += 10;
    }

    return Math.min(score, 100);
  }
}
