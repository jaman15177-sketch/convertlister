/**
 * ==========================================================
 * SIGNAL REPORT
 * ==========================================================
 *
 * Enterprise Signal Reporting Layer
 *
 * Responsibilities:
 * - Create readable signal report
 * - Prepare admin/dashboard output
 *
 * Rules:
 * - No scoring
 * - No decision logic
 * - No AI optimization
 * ==========================================================
 */


import type {
  SignalResult,
} from "./signal.types";



/* ==========================================================
 * REPORT TYPE
 * ==========================================================
 */

export interface SignalReport {


  readonly productId:
    string;


  readonly status:
    string;


  readonly overall:
    number;


  readonly metrics:
    {

      readonly trend:
        number;


      readonly margin:
        number;


      readonly winning:
        number;


      readonly seo:
        number;


      readonly price:
        number;


      readonly risk:
        string;


      readonly growth:
        number;


      readonly aiReady:
        string;

    };


  readonly optimizeAllowed:
    boolean;


  readonly generatedAt:
    Date;

}



/* ==========================================================
 * REPORT ENGINE
 * ==========================================================
 */

export class SignalReportEngine {



  static generate(
    result:
      SignalResult
  ): SignalReport {



    return {


      productId:
        result.productId,


      status:
        result.signal,


      overall:
        result.metrics.overall,


      metrics: {


        trend:
          result.metrics.trend,


        margin:
          result.metrics.margin,


        winning:
          result.metrics.winning,


        seo:
          result.metrics.seo,


        price:
          result.metrics.price,


        risk:
          result.metrics.risk,


        growth:
          result.metrics.growth,


        aiReady:
          result.metrics.aiReady,


      },


      optimizeAllowed:
        result.optimizeAllowed,


      generatedAt:
        new Date(),


    };


  }


}



/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const signalReport =
  SignalReportEngine;
