/**
 * ==========================================================
 * SIGNAL METRICS
 * ==========================================================
 *
 * Enterprise Signal Metrics Model
 *
 * Responsibilities:
 * - Define product signal measurements
 * - Hold AI readiness indicators
 * - Provide dashboard-ready structure
 *
 * Rules:
 * - No scoring logic
 * - No decision logic
 * - No AI optimization
 * ==========================================================
 */


import type {
  SignalMetrics,
} from "./signal.types";



/* ==========================================================
 * METRICS FACTORY
 * ==========================================================
 */

export class SignalMetricsFactory {



  static create(
    values?: Partial<SignalMetrics>
  ): SignalMetrics {


    return {


      overall:
        values?.overall ?? 0,


      trend:
        values?.trend ?? 0,


      margin:
        values?.margin ?? 0,


      winning:
        values?.winning ?? 0,


      seo:
        values?.seo ?? 0,


      price:
        values?.price ?? 0,


      risk:
        values?.risk ?? "HIGH",


      growth:
        values?.growth ?? 0,


      aiReady:
        values?.aiReady ?? "NO",


    };


  }


}



/* ==========================================================
 * EXPORT
 * ==========================================================
 */

export const signalMetrics =
  SignalMetricsFactory;
