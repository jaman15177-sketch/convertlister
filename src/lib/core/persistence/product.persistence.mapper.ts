/**
 * ==========================================================
 * PRODUCT PERSISTENCE MAPPER
 * ==========================================================
 *
 * NormalizedProduct -> Repository Mapper
 *
 * Pure mapping only.
 * No business logic.
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

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
    entity: UniversalEntity<NormalizedProduct>,
  ): SupabaseProductCreateInput {

    this.ensureEntity(entity);

    return {

      organization_id: organizationId,

      title:
        entity.data.title,

      description:
        entity.data.description ?? null,

      price:
        entity.data.price.amount,

      currency:
        entity.data.price.currency,

      source:
        entity.data.source,

      status:
        "raw",

      metadata: {

        keywords:
          entity.data.keywords,

        images:
          entity.data.images.urls,

        createdAt:
          entity.metadata.createdAt.toISOString(),

        updatedAt:
          entity.metadata.updatedAt.toISOString(),

        version:
          entity.metadata.version,

      },

    };

  }  /**
   * ========================================================
   * UPDATE INPUT
   * ========================================================
   */

  static toUpdateInput(
    entity: UniversalEntity<NormalizedProduct>,
  ): SupabaseProductUpdateInput {

    this.ensureEntity(entity);

    return {

      title:
        entity.data.title,

      description:
        entity.data.description ?? null,

      price:
        entity.data.price.amount,

      currency:
        entity.data.price.currency,

      status:
        "raw",

      metadata: {

        keywords:
          entity.data.keywords,

        images:
          entity.data.images.urls,

        createdAt:
          entity.metadata.createdAt.toISOString(),

        updatedAt:
          entity.metadata.updatedAt.toISOString(),

        version:
          entity.metadata.version,

      },

    };

  }

  /**
   * ========================================================
   * UPSERT INPUT
   * ========================================================
   */

  static toUpsertInput(
    organizationId: string,
    entity: UniversalEntity<NormalizedProduct>,
  ): SupabaseProductCreateInput {

    return this.toCreateInput(
      organizationId,
      entity,
    );

  }

  /**
   * ========================================================
   * BATCH INPUT
   * ========================================================
   */

  static toBatchInput(
    organizationId: string,
    entities: readonly UniversalEntity<NormalizedProduct>[],
  ): readonly SupabaseProductCreateInput[] {

    return entities.map(
      entity =>
        this.toCreateInput(
          organizationId,
          entity,
        ),
    );

  }  /**
   * ========================================================
   * VALIDATION
   * ========================================================
   */

  private static ensureEntity(
    entity: UniversalEntity<NormalizedProduct>,
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
        "Normalized product is required.",
      );

    }

    if (!entity.metadata) {

      throw new ProductPersistenceMapperError(
        "Entity metadata is required.",
      );

    }

  }

}
