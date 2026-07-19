/**
 * ==========================================================
 * WINNING PIPELINE
 * ==========================================================
 *
 * Enterprise Winning Detection Pipeline
 *
 * Responsibilities:
 * - Orchestrate winning detection flow
 * - Connect detection modules
 * - Produce final pipeline output
 *
 * Flow:
 *
 * Product
 *   ↓
 * Detector
 *   ↓
 * Threshold
 *   ↓
 * Filter
 *   ↓
 * Segment
 *   ↓
 * Ranking
 *
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No API
 * - No AI optimization
 * ==========================================================
 */


import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";


import type {
  WinningCandidate,
} from "./winning.types";


import {
  winningDetector,
} from "./winning.detector";


import {
  winningFilter,
} from "./winning.filter";


import {
  winningSegment,
} from "./winning.segment";


import {
  winningRanking,
} from "./winning.ranking";



/* ==========================================================
 * PIPELINE RESULT
 * ==========================================================
 */

export interface WinningPipelineResult {

  readonly detected:
    readonly WinningCandidate[];

  readonly accepted:
    readonly WinningCandidate[];

  readonly segments:
    ReturnType<
      typeof winningSegment.group
    >;

  readonly ranking:
    ReturnType<
      typeof winningRanking.rank
    >;

}



/* ==========================================================
 * PIPELINE ENGINE
 * ==========================================================
 */

export class WinningPipelineEngine {



  /**
   * Execute pipeline
   */

  static execute(
    products:
      readonly NormalizedProduct[]
  ): WinningPipelineResult {


    /**
     * Step 1
     * Detection
     */

    const detected =
      winningDetector.detectMany(
        products
      );



    /**
     * Step 2
     * Filtering
     */

    const filtered =
      winningFilter.filter(
        detected
      );



    /**
     * Step 3
     * Segmentation
     */

    const segments =
      winningSegment.group(
        filtered.accepted
      );



    /**
     * Step 4
     * Ranking
     */

    const ranking =
      winningRanking.rank(
        filtered.accepted
      );



    return {

      detected,

      accepted:
        filtered.accepted,

      segments,

      ranking,

    };

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningPipeline =
  WinningPipelineEngine;
