import { LearningStore } from "./learning.store";
import { PatternExtractor } from "./pattern.extractor";

export class LearningLoop {
  private store = new LearningStore();
  private extractor = new PatternExtractor();

  ingest(feedback: any) {
    this.store.save(feedback);
  }

  learn() {
    const data = this.store.all();

    const patterns = this.extractor.extract(data);

    return {
      insights: patterns,
      recommendation: this.generateRules(patterns),
    };
  }

  private generateRules(patterns: any) {
    return {
      titleLengthHint: patterns.avgTitleLength,
      bulletCountHint: patterns.avgBullets,
      bestMarketplace: patterns.topMarketplace,
    };
  }
}
