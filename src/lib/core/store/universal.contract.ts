/**
 * ==========================================================
 * UNIVERSAL STORE CONTRACT
 * ==========================================================
 *
 * Public contracts for Universal Store subsystem.
 *
 * Responsibilities:
 * - Store abstraction
 * - Repository boundary
 * - Service communication contract
 *
 * Rules:
 * - Interface only
 * - No implementation
 * - No database dependency
 * - No infrastructure
 * ==========================================================
 */

import type {
  UniversalEntity,
  UniversalQuery,
  UniversalStoreResult,
} from "./universal.types";


/* ==========================================================
 * UNIVERSAL STORE CONTRACT
 * ========================================================== */

export interface UniversalStoreContract<T = unknown> {

  /**
   * Create new entity
   */
  create(
    entity: UniversalEntity<T>
  ): Promise<UniversalStoreResult<UniversalEntity<T>>>;


  /**
   * Find entity by id
   */
  findById(
    id: string
  ): Promise<UniversalStoreResult<UniversalEntity<T>>>;


  /**
   * Query entities
   */
  find(
    query: UniversalQuery
  ): Promise<
    UniversalStoreResult<readonly UniversalEntity<T>[]>
  >;


  /**
   * Update entity
   */
  update(
    entity: UniversalEntity<T>
  ): Promise<UniversalStoreResult<UniversalEntity<T>>>;


  /**
   * Delete entity
   */
  delete(
    id: string
  ): Promise<UniversalStoreResult<boolean>>;
}


/* ==========================================================
 * UNIVERSAL REPOSITORY CONTRACT
 * ========================================================== */

export interface UniversalRepositoryContract<T = unknown>
  extends UniversalStoreContract<T> {


  /**
   * Check entity existence
   */
  exists(
    id: string
  ): Promise<boolean>;


  /**
   * Count entities
   */
  count(
    query: UniversalQuery
  ): Promise<number>;

}


/* ==========================================================
 * UNIVERSAL SERVICE CONTRACT
 * ========================================================== */

export interface UniversalServiceContract<T = unknown> {


  /**
   * Save entity
   */
  save(
    entity: UniversalEntity<T>
  ): Promise<UniversalStoreResult<UniversalEntity<T>>>;


  /**
   * Retrieve entity
   */
  get(
    id: string
  ): Promise<UniversalStoreResult<UniversalEntity<T>>>;


  /**
   * Search entities
   */
  search(
    query: UniversalQuery
  ): Promise<
    UniversalStoreResult<readonly UniversalEntity<T>[]>
  >;

}
