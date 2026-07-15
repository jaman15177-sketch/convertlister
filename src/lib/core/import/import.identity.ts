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
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

/* ==========================================================
 * IMPORT IDENTITY
 * ==========================================================
 */

export class ImportIdentity {

  /**
   * Apply canonical identity
   * to AdapterProduct.
   */
  static apply(
    product: AdapterProduct,
    canonical: CanonicalEngineOutput,
  ): AdapterProduct {

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
