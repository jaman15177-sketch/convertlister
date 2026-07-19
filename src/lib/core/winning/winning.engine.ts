/**
 * ==========================================================
 * WINNING ENGINE
 * ==========================================================
 *
 * Enterprise Winning Engine
 *
 * Responsibilities:
 * - Public winning execution boundary
 * - Convert score result into winning candidate
 * - Execute single and batch evaluation
 *
 * Rules:
 * - No scoring logic
 * - No rule logic
 * - No ranking
 * - No metrics
 * - No persistence
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";


import type {
  WinningCandidate,
} from "./winning.types";


import {
  WinningScoreEngine,
} from "./winning.score";
import {
  winningConfidence,
} from "./winning.confidence";

import {
  winningExplanation,
} from "./winning.explanation";

/* ==========================================================
 * ENGINE
 * ==========================================================
 */

export class WinningEngine {


  /**
   * Execute single product
   */

  execute(
  product: NormalizedProduct
): WinningCandidate {


  const result =
  WinningScoreEngine.calculate(
    product
  );

const confidence =
  winningConfidence.calculate(
    result.score
  );

const explanation =
  winningExplanation.create(
    result.score,
    result.reasons
  );

return {

  id: product.id,

  product,

  score: result.score,

  confidence: confidence.confidence,

  winner: result.winner,

  passed: result.winner,

  reasons: result.reasons,

  explanation,

  createdAt: new Date(),

};

}
    
      


  /**
   * Execute multiple products
   */

  executeMany(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {


    return products.map(
      (product) =>
        this.execute(
          product
        )
    );

  }



  /**
   * Only winners
   */

  executeWinners(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {


    return this.executeMany(
      products
    )
    .filter(
      (candidate) =>
        candidate.winner
    );

  }


}


/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningEngine =
  new WinningEngine();
