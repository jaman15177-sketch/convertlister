/**
 * ==========================================================
 * WINNING DETECTOR
 * ==========================================================
 *
 * Enterprise Winning Detector
 *
 * Responsibilities
 * - Detection orchestration
 * - Coordinate scoring
 * - Build final candidate
 *
 * Rules
 * - No scoring logic
 * - No rule execution
 * - No repository
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
  WinningMapper,
} from "./winning.mapper";

import {
  WinningScoreEngine,
} from "./winning.score";


/* ==========================================================
 * DETECTOR
 * ==========================================================
 */

export class WinningDetector {


  /**
   * ========================================================
   * DETECT ONE PRODUCT
   * ========================================================
   */

  detect(
    product: NormalizedProduct
  ): WinningCandidate {


    const candidate =
      WinningMapper.toCandidate(
        product
      );


    const result =
      WinningScoreEngine.calculate(
        product
      );


    return {

      ...candidate,

      score:
        result.score,

      confidence:
        result.confidence,

      passed:
        result.passed,

      reasons:
        [
          ...result.reasons,
        ],

      explanation:
        result.explanation,

    };

  }



  /**
   * ========================================================
   * DETECT MANY PRODUCTS
   * ========================================================
   */

  detectMany(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {


    return products.map(
      product =>
        this.detect(
          product
        )
    );

  }


}


/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningDetector =
  new WinningDetector();
