/**
 * ==========================================================
 * WINNING PIPELINE
 * ==========================================================
 *
 * Enterprise Winning Pipeline
 *
 * Responsibilities:
 * - Orchestrate winning evaluation flow
 * - Connect winning modules
 * - Produce final winning result
 *
 * Flow:
 *
 * Product
 *   ↓
 * Rules
 *   ↓
 * Score
 *   ↓
 * Ranking
 *   ↓
 * Metrics
 *   ↓
 * Threshold
 *   ↓
 * Filter
 *   ↓
 * Segment
 *
 * Output:
 * Winning Candidate
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";


import type {
  WinningCandidate,
} from "./winning.types";


import {
    WinningScoreEngine
} from "./winning.score";


import {
  winningFilter,
} from "./winning.filter";


import {
  winningSegment,
} from "./winning.segment";


import {
  winningRanking,
} from "./winning.ranking";

import {
  winningEngine,
} from "./winning.engine";

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
  winningEngine.executeMany(
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
