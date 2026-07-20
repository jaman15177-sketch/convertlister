/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE INPUT
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Input contract for the Quality Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define engine input
 * • Receive optimization result
 * • Carry evaluation metadata
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
  OptimizationResult,
} from "@/lib/core/optimization/optimization.types";

/* ============================================================
 * QUALITY INPUT
 * ============================================================
 */

export interface QualityInput {

  readonly optimization:
    OptimizationResult;

  readonly marketplace:
    string;

  readonly language:
    string;

  readonly requestedAt:
    Date;

}
