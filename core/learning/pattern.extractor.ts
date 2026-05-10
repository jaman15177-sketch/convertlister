import { ListingFeedback } from "./feedback.types";

export class PatternExtractor {
  extract(data: ListingFeedback[]) {
    const highCTR = data.filter(d => d.ctr > 5);

    const patterns = {
      avgTitleLength:
        highCTR.reduce((a, b) => a + b.title.length, 0) /
        (highCTR.length || 1),

      avgBullets:
        highCTR.reduce((a, b) => a + b.bullets.length, 0) /
        (highCTR.length || 1),

      topMarketplace: this.topMarketplace(highCTR),
    };

    return patterns;
  }

  private topMarketplace(data: ListingFeedback[]) {
    const map: Record<string, number> = {};

    data.forEach(d => {
      map[d.marketplace] = (map[d.marketplace] || 0) + 1;
    });

    return Object.entries(map).sort((a, b) => b[1] - a[1])[0];
  }
}
