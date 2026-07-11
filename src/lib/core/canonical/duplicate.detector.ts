/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Duplicate Detector
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Detects whether a product already exists inside the
 * canonical identity layer.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Duplicate detection
 * ✓ Duplicate reason classification
 * ✓ Confidence calculation
 *
 * MUST NOT contain:
 * ✗ Repository storage
 * ✗ Database query
 * ✗ Merge execution
 * ✗ Product mutation
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Stateless
 * ✓ Explainable
 * ✓ Universal Store ready
 * ✓ Production safe
 * ============================================================
 */

import type {
  CanonicalProduct,
  DuplicateResult,
} from "./canonical.types";


import {
  DuplicateReason,
} from "./canonical.types";


import {
  IdentityEngine,
} from "./identity.engine";


/**
 * ============================================================
 * DUPLICATE DETECTOR
 * ============================================================
 */

export class DuplicateDetector {


  private readonly identityEngine:
    IdentityEngine;


  constructor() {

    this.identityEngine =
      new IdentityEngine();

  }


  /**
   * Detect duplicate product
   */
  public detect(
    incoming: CanonicalProduct,

    existingProducts:
      ReadonlyArray<CanonicalProduct>

  ): DuplicateResult {


    for (
      const existing
      of existingProducts
    ) {


      const result =
        this.compare(
          incoming,
          existing
        );


      if (result.duplicate) {

        return result;

      }

    }


    return {

      duplicate:
        false,

      reason:
        DuplicateReason.UNKNOWN,

      confidence:
        0,

    };

  }


  /**
   * Compare two products
   */
  private compare(
    incoming: CanonicalProduct,

    existing: CanonicalProduct

  ): DuplicateResult {


    /* ========================================================
     * BARCODE PRIORITY
     * ========================================================
     */

    if (
      incoming.barcode &&
      existing.barcode &&
      incoming.barcode === existing.barcode
    ) {

      return {

        duplicate:
          true,

        reason:
          DuplicateReason.BARCODE,

        confidence:
          100,

        existing,

      };

    }


    /* ========================================================
     * SKU PRIORITY
     * ========================================================
     */

    if (
      incoming.sku &&
      existing.sku &&
      incoming.sku === existing.sku
    ) {

      return {

        duplicate:
          true,

        reason:
          DuplicateReason.SKU,

        confidence:
          95,

        existing,

      };

    }


    /* ========================================================
     * IDENTITY MATCH
     * ========================================================
     */

    const identity =
      this.identityEngine.compare(
        incoming,
        existing
      );


    if (identity.matched) {

      return {

        duplicate:
          true,

        reason:
          DuplicateReason.CONTENT,

        confidence:
          identity.score,

        existing,

      };

    }


    return {

      duplicate:
        false,

      reason:
        DuplicateReason.UNKNOWN,

      confidence:
        0,

    };

  }

}
