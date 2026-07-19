/**
 * ==========================================================
 * WINNING TYPES
 * ==========================================================
 *
 * Enterprise Winning Detection Types
 *
 * Responsibilities
 * - Core domain contracts
 * - Winning candidate structure
 * - Shared subsystem types
 *
 * Rules
 * - No business logic
 * - No calculation
 * - No persistence
 * ==========================================================
 */
import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

/* ==========================================================
 * WINNING LEVEL
 * ==========================================================
 */


export type WinningLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "WINNER";



/* ==========================================================
 * WINNING EXPLANATION
 * ==========================================================
 */


export interface WinningExplanation {

  readonly summary: string;

  readonly factors:
    readonly string[];

  readonly strengths:
    readonly string[];

  readonly weaknesses:
    readonly string[];

}



/* ==========================================================
 * WINNING CANDIDATE
 * ==========================================================
 */


export interface WinningCandidate {

  readonly id: string;


  /**
   * Original normalized product
   */

  readonly product: NormalizedProduct;



  /**
   * Winning score
   *
   * 0 - 100
   */

  readonly score: number;



  /**
   * Confidence
   *
   * 0 - 1
   */

  readonly confidence: number;



  /**
   * Classification
   */

  readonly level: WinningLevel;



  /**
   * Passed threshold
   */

  readonly passed: boolean;



  /**
   * Rule reasons
   */

  readonly reasons:
    readonly string[];



  /**
   * Human explanation
   */

  readonly explanation:
    WinningExplanation;



  /**
   * Creation time
   */

  readonly createdAt: Date;

}



/* ==========================================================
 * WINNING REQUEST
 * ==========================================================
 */


export interface WinningRequest {

  readonly product: unknown;

}



/* ==========================================================
 * WINNING RESULT
 * ==========================================================
 */


export interface WinningResult {

  readonly candidate:
    WinningCandidate;

}



/* ==========================================================
 * BATCH REQUEST
 * ==========================================================
 */


export interface WinningBatchRequest {

  readonly products:
    readonly unknown[];

}



/* ==========================================================
 * BATCH RESULT
 * ==========================================================
 */


export interface WinningBatchResult {

  readonly candidates:
    readonly WinningCandidate[];

}



/* ==========================================================
 * STATISTICS
 * ==========================================================
 */


export interface WinningStatistics {

  readonly total: number;

  readonly winners: number;

  readonly averageScore: number;

}
