/**
 * ==========================================================
 * REPOSITORY INTERFACE
 * ==========================================================
 *
 * Enterprise Repository Contract (V2)
 *
 * Responsibilities
 * - Generic CRUD abstraction
 * - Async persistence contract
 * - Shared repository API
 *
 * No implementation
 * No business logic
 * No infrastructure
 * ==========================================================
 */

import type {
  UniversalEntity,
  UniversalQuery,
  UniversalStoreResult,
} from "../store/universal.types";

/* ==========================================================
 * REPOSITORY
 * ==========================================================
 */

export interface Repository<T> {

  /**
   * Create entity
   */
  create(
    entity: UniversalEntity<T>
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<T>
    >
  >;

  /**
   * Update entity
   */
  update(
    entity: UniversalEntity<T>
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<T>
    >
  >;

  /**
   * Create or Update
   */
  upsert(
    entity: UniversalEntity<T>
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<T>
    >
  >;

  /**
   * Find by id
   */
  findById(
    id: string
  ): Promise<
    UniversalStoreResult<
      UniversalEntity<T>
    >
  >;

  /**
   * Find entities
   */
  find(
    query?: UniversalQuery
  ): Promise<
    UniversalStoreResult<
      readonly UniversalEntity<T>[]
    >
  >;

  /**
   * Delete entity
   */
  delete(
    id: string
  ): Promise<
    UniversalStoreResult<boolean>
  >;

  /**
   * Check existence
   */
  exists(
    id: string
  ): Promise<boolean>;

}
