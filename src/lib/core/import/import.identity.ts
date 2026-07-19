/**
 * ==========================================================
 * IMPORT IDENTITY
 * ==========================================================
 *
 * Enterprise Import Identity Mapper
 *
 * Responsibilities
 * ----------------
 * • Apply Canonical Identity
 * • Generate Universal Store Identity
 * • Deterministic ID mapping
 * • Zero business logic
 * • Zero persistence
 * • Zero queue
 * • Pure utility
 *
 * ==========================================================
 */

import type {
  CanonicalEngineOutput,
} from "@/lib/core/canonical/canonical.engine";

import type {
  NormalizedProduct,
} from "@/core/normalization";

/* ==========================================================
 * IMPORT IDENTITY
 * ==========================================================
 */

export class ImportIdentity {

 /**
 * Apply canonical identity
 * to normalized product.
 */
static apply(
  product: NormalizedProduct,
  canonical: CanonicalEngineOutput,
): NormalizedProduct {

  return {

    ...product,

    id:
      canonical.canonical.key.value,

  };

}
    
  /**
   * Universal Store ID
   */
  static entityId(
    canonical: CanonicalEngineOutput,
  ): string {

    return canonical
      .canonical
      .key
      .value;

  }

  /**
   * Compare identity
   */
  static equals(
    left: string,
    right: string,
  ): boolean {

    return left === right;

  }

}
