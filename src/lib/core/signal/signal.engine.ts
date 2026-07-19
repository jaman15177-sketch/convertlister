/**
 * ==========================================================
 * SIGNAL ENGINE
 * ==========================================================
 *
 * Enterprise Signal Orchestrator
 *
 * Responsibilities:
 * - Execute signal evaluation pipeline
 * - Connect signal modules
 * - Produce final signal result
 *
 * Rules:
 * - No direct scoring logic
 * - No AI optimization
 * - No persistence
 * ==========================================================
 */


import type {
  WinningCandidate,
} from "../winning/winning.types";


import type {
  SignalResult,
} from "./signal.types";


import {
  SignalInputMapper,
} from "./signal.input";


import {
  signalMetrics,
} from "./signal.metrics";


import {
  signalScorer,
} from "./signal.scorer";


import {
  signalRisk,
} from "./signal.risk";


import {
  signalDecision,
} from "./signal.decision";


import {
  signalAIReady,
} from "./signal.ai-ready";



/* ==========================================================
 * ENGINE
 * ==========================================================
 */

export class SignalEngine {



  evaluate(
    candidate:
      WinningCandidate
  ): SignalResult {



    const input =
      SignalInputMapper.fromWinningCandidate(
        candidate
      );



    /*
     * Current metrics layer.
     *
     * Future:
     * - Marketplace data
     * - Trend API
     * - Margin engine
     * - SEO engine
     */


    const metrics =
      signalMetrics.create({

        overall:
          input.score,

        winning:
          input.score,

      });



    const score =
      signalScorer.calculate(
        metrics
      );



    const risk =
      signalRisk.evaluate(
        input
      );



    const decision =
      signalDecision.evaluate(

        score.score,

        risk

      );



    const aiReady =
      signalAIReady.evaluate(

        decision.status

      );



    return {


      productId:
        input.productId,


      signal:
        decision.status,


      optimizeAllowed:
        aiReady.allowed,


      metrics: {

        ...metrics,

        risk:
          risk.level,

        aiReady:
          aiReady.status,

        overall:
          score.score,

      },


      reason:
        decision.reason,


      createdAt:
        new Date(),


    };


  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const signalEngine =
  new SignalEngine();
