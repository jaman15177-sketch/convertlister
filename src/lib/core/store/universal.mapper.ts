/**
 * ==========================================================
 * UNIVERSAL STORE MAPPER
 * ==========================================================
 *
 * Entity transformation layer.
 *
 * Responsibilities:
 * - Convert external data into Universal Entity
 * - Convert Universal Entity into plain output
 * - Keep mapping logic isolated
 *
 * Rules:
 * - No database dependency
 * - No API dependency
 * - No business validation
 * ==========================================================
 */

import type {
  UniversalEntity,
} from "./universal.types";


/* ==========================================================
 * MAPPER
 * ========================================================== */

export class UniversalMapper<T = unknown> {



  /**
   * Map raw input to Universal Entity
   */

  toEntity(
    id: string,
    data: T
  ): UniversalEntity<T> {

    const now = new Date();

return {
  id,

  data,

  metadata: {
    createdAt: now,
    updatedAt: now,
    version: 1,
  },
};

  }



  /**
   * Update existing entity timestamp
   */

  updateEntity(
  entity: UniversalEntity<T>,
  data: T
): UniversalEntity<T> {

  const now = new Date();

  return {
    id: entity.id,

    data,

    metadata: {
      createdAt: entity.metadata.createdAt,
      updatedAt: now,
      version: entity.metadata.version + 1,
    },
  };

}
  /**
   * Convert entity to output object
   */

  toPlain(
    entity: UniversalEntity<T>
  ): T {

    return entity.data;

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalMapper =
  new UniversalMapper();
