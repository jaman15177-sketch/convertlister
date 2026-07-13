/**
 * ==========================================================
 * PRODUCT PERSISTENCE MAPPER
 * ==========================================================
 *
 * Enterprise Product Persistence Mapper
 *
 * Responsibilities
 * - Convert UniversalEntity -> Repository Input
 * - Pure mapping only
 * * No database logic
 * * No business logic
 * ==========================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  UniversalEntity,
} from "../store/universal.types";

import type {
  SupabaseProductCreateInput,
  SupabaseProductUpdateInput,
} from "../repository";

import {
  ProductPersistenceMapperError,
} from "./product.persistence.errors";

export class ProductPersistenceMapper {

  private constructor() {}

  /**
   * ========================================================
   * CREATE INPUT
   * ========================================================
   */

  static toCreateInput(
    organizationId: string,
    entity: UniversalEntity<AdapterProduct>,
  ): SupabaseProductCreateInput {

    this.ensureEntity(entity);

    return {

      organization_id: organizationId,

      title:
        entity.data.title,

      description:
        entity.data.description ?? null,

      price:
        entity.data.price,

      currency:
        entity.data.currency,

      source:
        entity.data.source,

      status:
        "raw",

      metadata: {

        sku:
          entity.data.sku,

        brand:
          entity.data.brand,

        category:
          entity.data.category,

        marketplace:
          entity.data.marketplace,

        barcode:
          entity.data.barcode,

        inventory:
          entity.data.inventory,

        bullets:
          entity.data.bullets,

        images:
          entity.data.images,

        attributes:
          entity.data.attributes,

        seo:
          entity.data.seo,

        variants:
          entity.data.variants,

        adapterMetadata:
          entity.data.metadata,

        createdAt:
          entity.metadata.createdAt.toISOString(),

        updatedAt:
          entity.metadata.updatedAt.toISOString(),

        version:
          entity.metadata.version,

      },

    };

  }/* ========================================================
 * TO UPDATE INPUT
 * ========================================================
 */

static toUpdateInput(
  entity: UniversalEntity<AdapterProduct>
): SupabaseProductUpdateInput {

  this.ensureEntity(entity);

  return {

    title:
      entity.data.title,

    description:
      entity.data.description ?? null,

    price:
      entity.data.price,

    currency:
      entity.data.currency,

    status:
      "raw",

    metadata: {

      metadata: {

  ...(entity.data.metadata ?? {}),

  createdAt:
    entity.metadata.createdAt.toISOString(),

  updatedAt:
    entity.metadata.updatedAt.toISOString(),

  version:
    entity.metadata.version,

},

    },

  };

}

  /* ========================================================
 * TO UPSERT INPUT
 * ========================================================
 */

static toUpsertInput(
  organizationId: string,
  entity: UniversalEntity<AdapterProduct>
): SupabaseProductCreateInput {

  return this.toCreateInput(

    organizationId,

    entity

  );

}

  /**
   * ========================================================
   * BATCH INPUT
   * ========================================================
   */

  static toBatchInput(
    organizationId: string,
    entities: readonly UniversalEntity<AdapterProduct>[],
  ): readonly SupabaseProductCreateInput[] {

    return entities.map(

  entity =>

    this.toCreateInput(

      organizationId,

      entity

    )

);

  }

  /**
   * ========================================================
   * VALIDATION
   * ========================================================
   */

  private static ensureEntity(
    entity: UniversalEntity<AdapterProduct>,
  ): void {

    if (!entity) {

      throw new ProductPersistenceMapperError(
        "Universal entity is required.",
      );

    }

    if (!entity.id) {

      throw new ProductPersistenceMapperError(
        "Entity id is required.",
      );

    }

    if (!entity.data) {

      throw new ProductPersistenceMapperError(
        "Adapter product is required.",
      );

    }

    if (!entity.metadata) {

      throw new ProductPersistenceMapperError(
        "Entity metadata is required.",
      );

    }

  }

}
