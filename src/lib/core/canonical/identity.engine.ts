/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Identity Engine
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Determines whether two products represent the same
 * real-world product identity.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Identity comparison
 * ✓ Match scoring
 * ✓ Match level decision
 * ✓ Explainable reasons
 *
 * MUST NOT contain:
 * ✗ Database access
 * ✗ Repository logic
 * ✗ Merge logic
 * ✗ Persistence
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Deterministic
 * ✓ Explainable AI-ready
 * ✓ Universal Store compatible
 * ✓ Production safe
 * ============================================================
 */

import type {
  CanonicalProduct,
  IdentityMatchResult,
} from "./canonical.types";


import {
  IdentityMatchLevel,
} from "./canonical.types";


import {
  MATCH_THRESHOLD,
} from "./canonical.constants";


import {
  NormalizationEngine,
} from "@/core/catalog-health/base/normalization.engine";


/**
 * ============================================================
 * IDENTITY ENGINE
 * ============================================================
 */

export class IdentityEngine {


  private readonly normalizer:
    NormalizationEngine;


  constructor() {

    this.normalizer =
      new NormalizationEngine();

  }


  /**
   * Compare two canonical products
   */
  public compare(
    first: CanonicalProduct,
    second: CanonicalProduct
  ): IdentityMatchResult {


    const reasons: string[] = [];

    let score = 0;


    /* ========================================================
     * BARCODE MATCH
     * ========================================================
     */

    if (
      first.barcode &&
      second.barcode &&
      first.barcode === second.barcode
    ) {

      score += 60;

      reasons.push(
        "barcode-match"
      );

    }


    /* ========================================================
     * SKU MATCH
     * ========================================================
     */

    if (
      first.sku &&
      second.sku &&
      first.sku === second.sku
    ) {

      score += 30;

      reasons.push(
        "sku-match"
      );

    }


    /* ========================================================
     * BRAND + TITLE MATCH
     * ========================================================
     */

    const firstText =
      this.productText(first);


    const secondText =
      this.productText(second);


    if (
      firstText &&
      secondText &&
      firstText === secondText
    ) {

      score += 40;

      reasons.push(
        "content-match"
      );

    }


    const level =
      this.resolveLevel(score);


    return {

      matched:
        level !== IdentityMatchLevel.NONE,

      level,

      score:
        Math.min(score, 100),

      reasons,

    };

  }


  /**
   * Resolve match level
   */
  private resolveLevel(
    score: number
  ): IdentityMatchLevel {


    if (
      score >= MATCH_THRESHOLD.EXACT
    ) {

      return IdentityMatchLevel.EXACT;

    }


    if (
      score >= MATCH_THRESHOLD.STRONG
    ) {

      return IdentityMatchLevel.STRONG;

    }


    if (
      score >= MATCH_THRESHOLD.POSSIBLE
    ) {

      return IdentityMatchLevel.POSSIBLE;

    }


    return IdentityMatchLevel.NONE;

  }


  /**
   * Build comparison text
   */
  private productText(
    product: CanonicalProduct
  ): string {


    return [

      product.brand,

      product.title,

    ]

      .map((value) =>
        this.normalizer
          .comparisonKey(value)
      )

      .filter(Boolean)

      .join("|");

  }

}
