/**
 * ==========================================================
 * WINNING REPORT
 * ==========================================================
 *
 * Enterprise Winning Detection Report
 *
 * Responsibilities:
 * - Generate detection summary
 * - Convert pipeline result into report format
 * - Provide admin readable output
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No AI optimization
 * - No business mutation
 * ==========================================================
 */


import type {
  WinningCandidate,
} from "./winning.types";


import type {
  WinningPipelineResult,
} from "./winning.pipeline";

import type {
  RankedWinningResult,
} from "./winning.ranking";

/* ==========================================================
 * REPORT TYPES
 * ==========================================================
 */

export interface WinningReport {

  readonly totalProducts: number;

  readonly detectedWinners: number;

  readonly acceptedWinners: number;

  readonly rejectedCandidates: number;

  readonly topCandidates:
  readonly RankedWinningResult[];

  readonly generatedAt: Date;

}



/* ==========================================================
 * REPORT ENGINE
 * ==========================================================
 */

export class WinningReportEngine {



  /**
   * Create report
   */

  static generate(
    pipeline:
      WinningPipelineResult
  ): WinningReport {


    return {


      totalProducts:
        pipeline.detected.length,


      detectedWinners:
        pipeline.detected.filter(
          candidate =>
            candidate.passed
        ).length,


      acceptedWinners:
        pipeline.accepted.length,


      rejectedCandidates:
        pipeline.detected.length -
        pipeline.accepted.length,


      topCandidates:
        pipeline.ranking
          .slice(
            0,
            10
          ),


      generatedAt:
        new Date(),

    };

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningReport =
  WinningReportEngine;
