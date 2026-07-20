/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE MAPPER
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Map internal Quality Engine result to the public output.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Transform internal result
 * • Produce immutable output
 * • Keep external contract stable
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
  QualityOutput,
} from "./quality.output";

import type {
  QualityResult,
} from "./quality.types";

/* ============================================================
 * QUALITY MAPPER
 * ============================================================
 */

export class QualityMapper {

  toOutput(
    result: QualityResult,
  ): QualityOutput {

    return {

      id:
        result.id,

      productId:
        result.productId,

      status:
        result.status,

      report:
        result.report,

      createdAt:
        result.createdAt,

    };

  }

}

/* ============================================================
 * EXPORT
 * ============================================================
 */

export const qualityMapper =
  QualityMapper;
