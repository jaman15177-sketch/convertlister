/**
 * ==========================================================
 * WINNING STATISTICS
 * ==========================================================
 *
 * Enterprise Winning Statistics Engine
 *
 * Responsibilities:
 * - Calculate winning statistics
 * - Provide analytical summary
 * - Aggregate detection results
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No API
 * - No AI optimization
 * ==========================================================
 */


import type {
  WinningCandidate,
} from "./winning.types";



/* ==========================================================
 * STATISTICS TYPES
 * ==========================================================
 */

export interface WinningStatistics {

  readonly total: number;

  readonly winners: number;

  readonly rejected: number;

  readonly winRate: number;

  readonly averageScore: number;

  readonly averageConfidence: number;

}



/* ==========================================================
 * STATISTICS ENGINE
 * ==========================================================
 */

export class WinningStatisticsEngine {



  /**
   * Calculate statistics
   */

  static calculate(
    candidates:
      readonly WinningCandidate[]
  ): WinningStatistics {


    const total =
      candidates.length;



    const winners =
      candidates.filter(
        candidate =>
          candidate.passed
      ).length;



    const rejected =
      total -
      winners;



    const totalScore =
      candidates.reduce(
        (
          sum,
          candidate
        ) =>
          sum +
          candidate.score,
        0
      );



    const totalConfidence =
      candidates.reduce(
        (
          sum,
          candidate
        ) =>
          sum +
          candidate.confidence,
        0
      );



    return {


      total,


      winners,


      rejected,


      winRate:
        total === 0
          ? 0
          :
            Number(
              (
                winners /
                total
              ).toFixed(2)
            ),



      averageScore:
        total === 0
          ? 0
          :
            Number(
              (
                totalScore /
                total
              ).toFixed(2)
            ),



      averageConfidence:
        total === 0
          ? 0
          :
            Number(
              (
                totalConfidence /
                total
              ).toFixed(2)
            ),


    };

  }



}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningStatistics =
  WinningStatisticsEngine;
