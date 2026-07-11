/**
 * ============================================================
 * CONVERTLISTER
 * Shared Foundation
 * Shared Types
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Global type definitions shared across every domain.
 *
 * This file MUST NOT contain:
 * • Business logic
 * • Marketplace logic
 * • Canonical logic
 * • Repository logic
 * • Validation logic
 *
 * This file MAY contain:
 * • Primitive aliases
 * • Utility generic types
 * • Collection types
 * • Common contracts
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Runtime-free
 * ✓ Tree-shakable
 * ✓ Zero dependencies
 * ✓ Enterprise reusable
 * ✓ Strict TypeScript
 * ✓ Build-safe
 * ============================================================
 */

/* ============================================================
 * PRIMITIVES
 * ============================================================
 */

export type UUID = string;

export type ISODateString = string;

export type Timestamp = Date;

export type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined;

/* ============================================================
 * NULLABILITY
 * ============================================================
 */

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = Nullable<Optional<T>>;

/* ============================================================
 * COLLECTIONS
 * ============================================================
 */

export type Dictionary<T> = Record<string, T>;

export type ReadonlyDictionary<T> =
  Readonly<Record<string, T>>;

export type StringMap = Record<string, string>;

export type NumberMap = Record<string, number>;

export type BooleanMap = Record<string, boolean>;

/* ============================================================
 * ARRAY HELPERS
 * ============================================================
 */

export type NonEmptyArray<T> = [T, ...T[]];

export type ReadonlyList<T> = ReadonlyArray<T>;

export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

export type Immutable<T> = {
  readonly [K in keyof T]: T[K];
};

/* ============================================================
 * OBJECT HELPERS
 * ============================================================
 */

export type DeepPartial<T> = {
  [K in keyof T]?:
    T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

export type DeepReadonly<T> = {
  readonly [K in keyof T]:
    T[K] extends object
      ? DeepReadonly<T[K]>
      : T[K];
};

export type ValueOf<T> = T[keyof T];

export type KeysOf<T> = keyof T;

/* ============================================================
 * FUNCTION TYPES
 * ============================================================
 */

export type AsyncOrSync<T> = T | Promise<T>;

export type AsyncVoid = Promise<void>;

export type Predicate<T> = (value: T) => boolean;

export type Mapper<TInput, TOutput> = (
  input: TInput
) => TOutput;

export type AsyncMapper<TInput, TOutput> = (
  input: TInput
) => Promise<TOutput>;

/* ============================================================
 * IDENTIFIERS
 * ============================================================
 */

export interface EntityIdentifier {
  readonly id: UUID;
}

export interface NamedEntity {
  readonly name: string;
}

export interface VersionedEntity {
  readonly version: string;
}

/* ============================================================
 * TIME
 * ============================================================
 */

export interface Timestamped {
  readonly createdAt: Timestamp;

  readonly updatedAt: Timestamp;
}

/* ============================================================
 * STATUS
 * ============================================================
 */

export interface Activatable {
  readonly active: boolean;
}

export interface SoftDeletable {
  readonly deleted: boolean;
}

/* ============================================================
 * PAGINATION
 * ============================================================
 */

export interface Pagination {
  readonly page: number;

  readonly limit: number;
}

export interface PageInfo extends Pagination {
  readonly total: number;

  readonly totalPages: number;
}

/* ============================================================
 * SORTING
 * ============================================================
 */

export type SortDirection =
  | "asc"
  | "desc";

export interface Sort {
  readonly field: string;

  readonly direction: SortDirection;
}

/* ============================================================
 * FILTER
 * ============================================================
 */

export type FilterValue =
  | Primitive
  | Primitive[];

export type FilterMap =
  Readonly<Record<string, FilterValue>>;

/* ============================================================
 * BRANDING TYPES
 * ============================================================
 */

export type Brand<T, B> = T & {
  readonly __brand: B;
};

export type EntityId = Brand<string, "EntityId">;

export type OrganizationId =
  Brand<string, "OrganizationId">;

export type WorkspaceId =
  Brand<string, "WorkspaceId">;

export type UserId =
  Brand<string, "UserId">;

/* ============================================================
 * EMPTY EXPORT
 * ============================================================
 */

export {};
