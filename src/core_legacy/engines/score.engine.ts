export class ScoreEngine {
  score(product: any) {
    const marketFit = product.intelligence?.marketFitScore ?? 50;
    const trend = product.intelligence?.trendScore ?? 50;

    const score = Math.round(
      marketFit * 0.6 + trend * 0.4
    );

    return {
      ...product,
      intelligence: {
        ...product.intelligence,
        finalScore: score,
      },
    };
  }
}

export const scoreEngine = new ScoreEngine();
