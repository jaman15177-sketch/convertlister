/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE QUEUE
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Queue contract for asynchronous Quality Engine execution.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Queue quality evaluation jobs
 * • Execute Quality Engine
 * • Return Quality Result
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute approval logic
 * ✗ Execute AI optimization
 * ✗ Persist database
 * ✗ Publish marketplace
 * ============================================================
 */

import type {
  QualityInput,
} from "./quality.input";

import type {
  QualityResult,
} from "./quality.types";

import {
  QualityEngine,
} from "./quality.engine";

/* ============================================================
 * QUALITY QUEUE
 * ============================================================
 */

export class QualityQueue {

  constructor(

    private readonly engine:
      QualityEngine,

  ) {}

  async dispatch(
    input:
      QualityInput,
  ): Promise<QualityResult> {

    return this.engine.evaluate(
      input,
    );

  }

}

/* ============================================================
 * EXPORT
 * ============================================================
 */

export const qualityQueue =
  QualityQueue;
