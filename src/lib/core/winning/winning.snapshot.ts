/**
 * ==========================================================
 * WINNING SNAPSHOT
 * ==========================================================
 *
 * Enterprise Winning Snapshot Model
 *
 * Responsibilities
 * - Create immutable winning snapshot
 * - Preserve detection result state
 * - Support future Freeze Engine
 * - Support version tracking
 *
 * Rules
 * - No database
 * - No repository
 * - No persistence
 * - No business decision
 * ==========================================================
 */


import type {
  WinningCandidate,
} from "./winning.types";



/* ==========================================================
 * SNAPSHOT TYPES
 * ==========================================================
 */


export interface WinningSnapshot {

  readonly id: string;

  readonly productId: string;

  readonly score: number;

  readonly confidence: number;

  readonly passed: boolean;

  readonly reasons:
    readonly string[];

  readonly explanation:
    WinningCandidate["explanation"];

  readonly version: string;

  readonly createdAt: Date;

}



/* ==========================================================
 * SNAPSHOT ENGINE
 * ==========================================================
 */


export class WinningSnapshotEngine {


  private static readonly VERSION =
    "1.0.0";



  /**
   * Create snapshot
   */

  static create(
    candidate: WinningCandidate
  ): WinningSnapshot {


    return {

      id:
        crypto.randomUUID(),

      productId:
        candidate.product.id,

      score:
        candidate.score,

      confidence:
        candidate.confidence,

      passed:
        candidate.passed,

      reasons:
        [
          ...candidate.reasons,
        ],

      explanation:
        candidate.explanation,

      version:
        this.VERSION,

      createdAt:
        new Date(),

    };

  }



  /**
   * Clone snapshot
   */

  static clone(
    snapshot: WinningSnapshot
  ): WinningSnapshot {


    return {

      ...snapshot,

      reasons:
        [
          ...snapshot.reasons,
        ],

      createdAt:
        new Date(
          snapshot.createdAt
        ),

    };

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */


export const winningSnapshot =
  WinningSnapshotEngine;
