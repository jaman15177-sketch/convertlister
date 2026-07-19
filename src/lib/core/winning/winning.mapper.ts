/**
 * ==========================================================
 * WINNING MAPPER
 * ==========================================================
 *
 * Enterprise Winning Mapper
 *
 * Responsibilities
 * - NormalizedProduct -> WinningCandidate
 * - Pure data transformation
 * - No business logic
 * - No scoring
 * - No repository access
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

import type {
  WinningCandidate,
} from "./winning.types";

export class WinningMapper {

  private constructor() {}

  /**
   * PRODUCT -> CANDIDATE
   */

  static toCandidate(
    product: NormalizedProduct
  ): WinningCandidate {

    return {
  id: product.id,
  product,
  score: 0,
confidence: 0,

passed: false,
  winner: false,
  reasons: [],


      explanation: {

        summary: "Not evaluated",

        factors: [],

        strengths: [],

        weaknesses: [],

      },

      createdAt: new Date(),

    };

  }

  /**
   * PRODUCTS -> CANDIDATES
   */

  static toCandidates(
    products:
      readonly NormalizedProduct[]
  ): readonly WinningCandidate[] {

    return products.map(
      product =>
        this.toCandidate(product)
    );

  }

  /**
   * CLONE
   */

  static clone(
    candidate: WinningCandidate
  ): WinningCandidate {

    return {

      ...candidate,

      product: structuredClone(
        candidate.product
      ),

      reasons: [
        ...candidate.reasons,
      ],

      explanation:
        structuredClone(
          candidate.explanation
        ),

      createdAt: new Date(
        candidate.createdAt
      ),

    };

  }

}
