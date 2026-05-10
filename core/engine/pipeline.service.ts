import { normalizeProduct } from "./normalize.service";

import { ScoringService } from "../scoring/scoring.service";

import { OptimizeService } from "../ai/optimize.service";

export class PipelineService {
  private scoring = new ScoringService();

  private optimize = new OptimizeService();

  async run(rawProduct: any) {
    // STEP 1 — Normalize
    const product = normalizeProduct(rawProduct);

    // STEP 2 — Score
    const score = this.scoring.calculate(product);

    // STEP 3 — Optimize
    const optimized = this.optimize.run(product);

    // STEP 4 — Decision
    let decision = "reject";

    if (score >= 75) {
      decision = "auto-import";
    } else if (score >= 50) {
      decision = "review";
    }

    // STEP 5 — Final Output
    return {
      product,
      score,
      decision,
      optimized,
    };
  }
}
