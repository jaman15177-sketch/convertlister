/**
 * ==========================================================
 * WINNING SERVICE
 * ==========================================================
 *
 * Enterprise Winning Service
 *
 * Responsibilities
 * - Application service layer
 * - Winning Engine wrapper
 * - Single entry point
 * - Batch processing
 *
 * Rules
 * - No repository
 * - No database
 * - No API
 * - No queue
 * - No scoring logic
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

import type {
  WinningCandidate,
} from "./winning.types";

import {
  winningEngine,
} from "./winning.engine";

/* ==========================================================
 * SERVICE
 * ==========================================================
 */

export class WinningService {

  /**
   * ========================================================
   * ANALYZE ONE
   * ========================================================
   */

  analyze(
    product: NormalizedProduct
  ): WinningCandidate {

    return winningEngine.execute(
      product
    );

  }

  /**
   * ========================================================
   * ANALYZE MANY
   * ========================================================
   */

  analyzeMany(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {

    return winningEngine.executeMany(
      products
    );

  }

  /**
   * ========================================================
   * WINNERS ONLY
   * ========================================================
   */

  winners(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {

    return winningEngine.executeWinners(
      products
    );

  }

}

/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningService =
  new WinningService();
