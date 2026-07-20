/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE SNAPSHOT
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Immutable snapshot of a completed quality evaluation.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Freeze evaluation result
 * • Preserve evaluation history
 * • Create immutable snapshot
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute validation
 * ✗ Execute scoring
 * ✗ Execute approval logic
 * ✗ Execute AI
 * ✗ Persist database
 * ============================================================
 */

import type {
  QualityResult,
} from "./quality.types";

/* ============================================================
 * QUALITY SNAPSHOT
 * ============================================================
 */

export interface QualitySnapshot {

  readonly id: string;

  readonly capturedAt: Date;

  readonly result: Readonly<QualityResult>;

}

/* ============================================================
 * SNAPSHOT BUILDER
 * ============================================================
 */

export class QualitySnapshotBuilder {

  create(
    result: QualityResult,
  ): QualitySnapshot {

    return {

      id:
        result.id,

      capturedAt:
        new Date(),

      result:
        Object.freeze(result),

    };

  }

}

/* ============================================================
 * EXPORT
 * ============================================================
 */

export const qualitySnapshotBuilder =
  QualitySnapshotBuilder;
