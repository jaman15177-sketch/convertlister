/**
 * ==========================================================
 * WINNING ENGINE
 * ==========================================================
 *
 * Enterprise Winning Engine
 *
 * Responsibilities
 * - Public winning execution boundary
 * - Coordinate detector
 * - Single and batch execution
 * - Winner filtering
 *
 * Rules
 * - No scoring logic
 * - No rule logic
 * - No repository
 * - No persistence
 * ==========================================================
 */


import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";


import type {
  WinningCandidate,
} from "./winning.types";


import {
  winningDetector,
} from "./winning.detector";



/* ==========================================================
 * ENGINE
 * ==========================================================
 */


export class WinningEngine {



  /**
   * ========================================================
   * EXECUTE ONE
   * ========================================================
   */

  execute(
    product: NormalizedProduct
  ): WinningCandidate {


    return winningDetector.detect(
      product
    );

  }



  /**
   * ========================================================
   * EXECUTE MANY
   * ========================================================
   */

  executeMany(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {


    return winningDetector.detectMany(
      products
    );

  }



  /**
   * ========================================================
   * WINNERS ONLY
   * ========================================================
   */

  executeWinners(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {


    return this.executeMany(
      products
    )
    .filter(
      candidate =>
        candidate.passed
    );

  }


}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const winningEngine =
  new WinningEngine();
