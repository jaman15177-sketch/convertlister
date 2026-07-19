/**
 * ==========================================================
 * SIGNAL SCORER
 * ==========================================================
 *
 * Enterprise Signal Scoring Engine
 *
 * Responsibilities:
 * - Calculate signal score
 * - Aggregate product metrics
 * - Produce normalized score
 *
 * Rules:
 * - No decision logic
 * - No AI optimization
 * - No persistence
 * ==========================================================
 */


import type {
  SignalMetrics,
} from "./signal.types";


import {
  signalConfig,
} from "./signal.config";



/* ==========================================================
 * SCORE RESULT
 * ==========================================================
 */

export interface SignalScoreResult {

  readonly score:
    number;

}



/* ==========================================================
 * SCORER
 * ==========================================================
 */

export class SignalScorer {



  static calculate(
    metrics:
      SignalMetrics
  ): SignalScoreResult {


    const score =

      metrics.trend *
        signalConfig.weight.trend +

      metrics.margin *
        signalConfig.weight.margin +

      metrics.winning *
        signalConfig.weight.winning +

      metrics.seo *
        signalConfig.weight.seo +

      metrics.price *
        signalConfig.weight.price +

      metrics.growth *
        signalConfig.weight.growth;



    return {


      score:
        Math.round(
          score
        ),


    };


  }


}



/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const signalScorer =
  SignalScorer;
