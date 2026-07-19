/**
 * ==========================================================
 * SIGNAL TYPES
 * ==========================================================
 *
 * Shared Signal Domain Types
 *
 * Responsibilities:
 * - Signal status definition
 * - Signal metrics definition
 * - AI optimization permission definition
 *
 * Rules:
 * - No business logic
 * - No calculation
 * - No decision
 * ==========================================================
 */


/* ==========================================================
 * SIGNAL STATUS
 * ==========================================================
 */

export type SignalStatus =
  | "GREEN"
  | "YELLOW"
  | "RED";



/* ==========================================================
 * AI OPTIMIZATION STATUS
 * ==========================================================
 */

export type AIReadyStatus =
  | "YES"
  | "NO";



/* ==========================================================
 * SIGNAL METRICS
 * ==========================================================
 */

export interface SignalMetrics {

  readonly overall: number;

  readonly trend: number;

  readonly margin: number;

  readonly winning: number;

  readonly seo: number;

  readonly price: number;

  readonly risk:
    | "LOW"
    | "MEDIUM"
    | "HIGH";

  readonly growth: number;

  readonly aiReady:
    AIReadyStatus;

}



/* ==========================================================
 * SIGNAL RESULT
 * ==========================================================
 */

export interface SignalResult {

  readonly productId: string;


  readonly signal:
    SignalStatus;


  readonly optimizeAllowed:
    boolean;


  readonly metrics:
    SignalMetrics;


  readonly reason:
    string;


  readonly createdAt:
    Date;

}
