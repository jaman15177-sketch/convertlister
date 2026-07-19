/**
 * ==========================================================
 * WINNING SNAPSHOT
 * ==========================================================
 *
 * Enterprise Winning Snapshot
 *
 * Responsibilities
 * - Immutable winning result
 * - Audit history
 * - Export-safe snapshot
 * - Engine handoff object
 *
 * Rules
 * - No repository
 * - No database
 * - No API
 * - Immutable only
 * ==========================================================
 */

import type {
  WinningCandidate,
} from "./winning.types";

/* ==========================================================
 * SNAPSHOT
 * ==========================================================
 */

export interface WinningSnapshot {

  readonly id: string;

  readonly score: number;

  readonly confidence: number;

  readonly level: string;

  readonly passed: boolean;

  readonly reasons:
    readonly string[];

  readonly explanation:
    WinningCandidate["explanation"];

  readonly createdAt: Date;

}

/* ==========================================================
 * ENGINE
 * ==========================================================
 */

export class WinningSnapshotEngine {

  private constructor() {}

  /**
   * ========================================================
   * CREATE
   * ========================================================
   */

  static create(
    candidate: WinningCandidate
  ): WinningSnapshot {

    return {

      id:
        candidate.id,

      score:
        candidate.score,

      confidence:
        candidate.confidence,

      level:
        candidate.level,

      passed:
        candidate.passed,

      reasons: [
        ...candidate.reasons,
      ],

      explanation:
        structuredClone(
          candidate.explanation
        ),

      createdAt:
        new Date(
          candidate.createdAt
        ),

    };

  }

  /**
   * ========================================================
   * CREATE MANY
   * ========================================================
   */

  static createMany(
    candidates:
      readonly WinningCandidate[]
  ): readonly WinningSnapshot[] {

    return candidates.map(
      candidate =>
        this.create(
          candidate
        )
    );

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningSnapshot =
  WinningSnapshotEngine;
