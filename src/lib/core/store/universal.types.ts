/**
 * ==========================================================
 * UNIVERSAL TYPES
 * ==========================================================
 *
 * Enterprise Universal Store Types (V2)
 *
 * Responsibilities
 * - Shared entity types
 * - Store query types
 * - Store result types
 * - Metadata definitions
 *
 * No business logic
 * No storage logic
 * ==========================================================
 */

/* ==========================================================
 * ENTITY METADATA
 * ==========================================================
 */

export interface UniversalMetadata {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly version: number;
}

/* ==========================================================
 * UNIVERSAL ENTITY
 * ==========================================================
 */

export interface UniversalEntity<T> {
  readonly id: string;

  readonly data: T;

  readonly metadata: UniversalMetadata;
}

/* ==========================================================
 * QUERY
 * ==========================================================
 */

export interface UniversalQuery {
  readonly ids?: readonly string[];

  readonly limit?: number;

  readonly offset?: number;
}

/* ==========================================================
 * STORE RESULT
 * ==========================================================
 */

export interface UniversalStoreResult<T> {
  readonly success: boolean;

  readonly data: T;

  readonly message?: string;
}

/* ==========================================================
 * PAGE
 * ==========================================================
 */

export interface UniversalPage<T> {
  readonly items: readonly T[];

  readonly total: number;

  readonly limit: number;

  readonly offset: number;
}
