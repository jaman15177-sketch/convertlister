/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Merge Engine
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Combines multiple product records into one canonical
 * product identity.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Merge canonical products
 * ✓ Preserve source history
 * ✓ Resolve field priority
 * ✓ Produce immutable result
 *
 * MUST NOT contain:
 * ✗ Database operations
 * ✗ Repository access
 * ✗ Audit persistence
 * ✗ Queue handling
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Deterministic
 * ✓ Safe merge strategy
 * ✓ Universal Store ready
 * ✓ Future AI enrichment compatible
 * ============================================================
 */

import type {
  CanonicalProduct,
  MergeResult,
} from "./canonical.types";


import {
  MergeStrategy,
} from "./canonical.types";


/**
 * ============================================================
 * MERGE ENGINE
 * ============================================================
 */

export class MergeEngine {


  /**
   * Merge incoming product with existing
   */
  public merge(
    existing: CanonicalProduct,

    incoming: CanonicalProduct

  ): MergeResult {


    const changes: string[] = [];


    const merged =
      this.mergeProduct(
        existing,
        incoming,
        changes
      );


    return {

      strategy:
        MergeStrategy.UPDATE_EXISTING,

      product:
        merged,

      changes,

    };

  }


  /**
   * Product merge rules
   */
  private mergeProduct(
    existing: CanonicalProduct,

    incoming: CanonicalProduct,

    changes: string[]

  ): CanonicalProduct {


    const title = this.resolveRequiredValue(
  existing.title,
  incoming.title,
  "title",
  changes
);const brand = this.resolveOptionalValue(
  existing.brand,
  incoming.brand,
  "brand",
  changes
);const description = this.resolveOptionalValue(
  existing.description,
  incoming.description,
  "description",
  changes
);


    return {

      ...existing,


      title,

      brand,

      description,


      sku:
        existing.sku ??
        incoming.sku,


      barcode:
        existing.barcode ??
        incoming.barcode,


      category:
        existing.category ??
        incoming.category,


      attributes:
        {
          ...existing.attributes,

          ...incoming.attributes,

        },


      variants:
        [
          ...existing.variants,

          ...incoming.variants,

        ],


      sources:
        [
          ...existing.sources,

          ...incoming.sources,

        ],


      metadata:
        {
          ...existing.metadata,

          updatedAt:
            new Date(),

        },

    };

  }


  /**
   * Resolve field value
   */
  private resolveRequiredValue(
  current: string,
  incoming: string | undefined,
  field: string,
  changes: string[]
): string {

  if (!current && incoming) {
    changes.push(`${field}-added`);
    return incoming;
  }

  if (
    incoming &&
    current !== incoming
  ) {
    changes.push(`${field}-updated`);
    return incoming;
  }

  return current;
}
private resolveOptionalValue(
  current: string | undefined,
  incoming: string | undefined,
  field: string,
  changes: string[]
): string | undefined {

  if (!current && incoming) {
    changes.push(`${field}-added`);
    return incoming;
  }

  if (
    current &&
    incoming &&
    current !== incoming
  ) {
    changes.push(`${field}-updated`);
    return incoming;
  }

  return current;
  }

}
