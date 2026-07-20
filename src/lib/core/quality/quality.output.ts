/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE OUTPUT
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Public output contract for the Quality Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define final engine output
 * • Expose immutable quality result
 * • Keep external API stable
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute validation
 * ✗ Execute scoring
 * ✗ Execute approval logic
 * ✗ Execute AI
 * ============================================================
 */

import type {
  QualityReport,
  QualityStatus,
} from "./quality.types";

/* ============================================================
 * QUALITY OUTPUT
 * ============================================================
 */

export interface QualityOutput {

  readonly id: string;

  readonly productId: string;

  readonly status: QualityStatus;

  readonly report: QualityReport;

  readonly createdAt: Date;

}
