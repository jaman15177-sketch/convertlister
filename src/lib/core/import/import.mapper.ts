/**
 * ==========================================================
 * IMPORT MAPPER
 * ==========================================================
 *
 * Enterprise Import Mapper
 *
 * Responsibilities
 * - AdapterProduct → UniversalEntity
 * - Pure mapping
 *
 * Rules
 * - No repository
 * - No store
 * - No database
 * - No business logic
 * ==========================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  UniversalEntity,
} from "../store/universal.types";

/* ==========================================================
 * IMPORT MAPPER
 * ==========================================================
 */

export class ImportMapper {

  /**
   * AdapterProduct
   * ↓
   * UniversalEntity
   */
  static toEntity(
    product: AdapterProduct
  ): UniversalEntity<AdapterProduct> {

    const now = new Date();

    return {

      id: product.id,

      data: product,

      metadata: {

        createdAt: now,

        updatedAt: now,

        version: 1,

      },

    };

  }

}
