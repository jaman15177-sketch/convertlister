/**
 * ==========================================================
 * SIGNAL CONFIG
 * ==========================================================
 *
 * Enterprise Signal Configuration
 *
 * Responsibilities:
 * - Runtime signal rules
 * - Feature configuration
 * - Engine behavior control
 *
 * Rules:
 * - No business calculation
 * - No decision execution
 * - No mutation
 * ==========================================================
 */


import {
  SIGNAL_THRESHOLD,
  SIGNAL_WEIGHT,
} from "./signal.constants";



/* ==========================================================
 * SIGNAL ENGINE CONFIG
 * ==========================================================
 */

export interface SignalConfig {


  readonly threshold: {

    readonly green:
      number;

    readonly yellow:
      number;

  };


  readonly weight: {

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

    readonly growth:
      number;

    readonly risk:
      number;

  };


}



/* ==========================================================
 * DEFAULT PRODUCTION CONFIG
 * ==========================================================
 */

export const signalConfig:
  SignalConfig = {


  threshold: {

    green:
      SIGNAL_THRESHOLD.GREEN_MIN,

    yellow:
      SIGNAL_THRESHOLD.YELLOW_MIN,

  },


  weight: {

    trend:
      SIGNAL_WEIGHT.TREND,

    margin:
      SIGNAL_WEIGHT.MARGIN,

    winning:
      SIGNAL_WEIGHT.WINNING,

    seo:
      SIGNAL_WEIGHT.SEO,

    price:
      SIGNAL_WEIGHT.PRICE,

    growth:
      SIGNAL_WEIGHT.GROWTH,

    risk:
      SIGNAL_WEIGHT.RISK,

  },


};
