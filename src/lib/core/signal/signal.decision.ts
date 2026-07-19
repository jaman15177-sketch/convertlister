/**
 * ==========================================================
 * SIGNAL DECISION
 * ==========================================================
 *
 * Enterprise Signal Decision Layer
 *
 * Responsibilities:
 * - Convert score and risk into signal status
 * - Produce final decision result
 *
 * Rules:
 * - No AI optimization
 * - No product mutation
 * - No persistence
 * ==========================================================
 */


import type {
  SignalStatus,
} from "./signal.types";


import {
  signalConfig,
} from "./signal.config";


import type {
  SignalRiskResult,
} from "./signal.risk";



/* ==========================================================
 * DECISION RESULT
 * ==========================================================
 */

export interface SignalDecisionResult {

  readonly status:
    SignalStatus;


  readonly reason:
    string;

}



/* ==========================================================
 * DECISION ENGINE
 * ==========================================================
 */

export class SignalDecisionEngine {



  static evaluate(

    score: number,

    risk:
      SignalRiskResult

  ): SignalDecisionResult {



    if (
      risk.level === "HIGH"
    ) {

      return {

        status:
          "RED",

        reason:
          risk.reason,

      };

    }



    if (
      score >=
      signalConfig.threshold.green
    ) {

      return {

        status:
          "GREEN",

        reason:
          "Product meets optimization criteria",

      };

    }



    if (
      score >=
      signalConfig.threshold.yellow
    ) {

      return {

        status:
          "YELLOW",

        reason:
          "Product requires review",

      };

    }



    return {

      status:
        "RED",

      reason:
        "Product does not meet signal threshold",

    };


  }


}



/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const signalDecision =
  SignalDecisionEngine;
