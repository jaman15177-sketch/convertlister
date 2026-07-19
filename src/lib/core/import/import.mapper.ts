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
  NormalizedProduct,
} from "@/core/normalization";
import type {
  UniversalEntity,
} from "../store/universal.types";
import type {
  ProductPersistenceRequest,
} from "../persistence";

import type {
  ImportPersistenceRequest,
} from "./import.types";


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
  product: NormalizedProduct
): UniversalEntity<NormalizedProduct> {    const now = new Date();

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
/* ==========================================================
 * TO PERSISTENCE REQUEST
 * ==========================================================
 */

static toPersistenceRequest(
  request: ImportPersistenceRequest
): ProductPersistenceRequest {

  return {

    organizationId:
      request.organizationId,

    entity:
      request.entity,

    mode:
      request.mode,

  };

}
}

