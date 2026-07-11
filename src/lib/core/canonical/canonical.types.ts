/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Types
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Core type contracts for product canonicalization.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Canonical product identity
 * ✓ Normalized product structure
 * ✓ Identity matching contracts
 * ✓ Duplicate detection contracts
 * ✓ Merge contracts
 *
 * MUST NOT contain:
 * ✗ Business logic
 * ✗ Database logic
 * ✗ Repository logic
 * ✗ Marketplace logic
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Stable contract
 * ✓ Repository ready
 * ✓ Universal Store ready
 * ✓ AI optimization ready
 * ✓ Build-safe
 * ============================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

/* ============================================================
 * CANONICAL ID
 * ============================================================
 */

export type CanonicalId = string;


/* ============================================================
 * CANONICAL SOURCE
 * ============================================================
 */

export interface CanonicalSource {
  readonly marketplace: string;

  readonly sourceId: string;

  readonly importedAt: Date;
}


/* ============================================================
 * CANONICAL PRODUCT
 * ============================================================
 */

export interface CanonicalProduct {

  readonly id: CanonicalId;

  readonly title: string;

  readonly brand?: string;

  readonly category?: string;

  readonly description?: string;

  readonly sku?: string;

  readonly barcode?: string;


  readonly attributes:
    Readonly<Record<string,string>>;


  readonly variants:
    ReadonlyArray<CanonicalVariant>;


  readonly sources:
    ReadonlyArray<CanonicalSource>;


  readonly metadata:
    CanonicalMetadata;
}


/* ============================================================
 * CANONICAL VARIANT
 * ============================================================
 */

export interface CanonicalVariant {

  readonly id: string;

  readonly sku?: string;

  readonly barcode?: string;

  readonly title?: string;

  readonly attributes:
    Readonly<Record<string,string>>;
}


/* ============================================================
 * METADATA
 * ============================================================
 */

export interface CanonicalMetadata {

  readonly version: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  readonly fingerprint?: string;
}


/* ============================================================
 * NORMALIZATION
 * ============================================================
 */

export interface CanonicalNormalizedProduct {

  readonly title: string;

  readonly brand: string;

  readonly sku: string;

  readonly barcode: string;

  readonly attributes:
    Readonly<Record<string,string>>;
}


/* ============================================================
 * IDENTITY
 * ============================================================
 */

export enum IdentityMatchLevel {

  EXACT = "exact",

  STRONG = "strong",

  POSSIBLE = "possible",

  NONE = "none",
}


export interface IdentityMatchResult {

  readonly matched: boolean;

  readonly level: IdentityMatchLevel;

  readonly score: number;

  readonly reasons:
    ReadonlyArray<string>;
}


/* ============================================================
 * DUPLICATE
 * ============================================================
 */

export enum DuplicateReason {

  MARKETPLACE_ID = "marketplace_id",

  SKU = "sku",

  BARCODE = "barcode",

  CONTENT = "content",

  UNKNOWN = "unknown",
}


export interface DuplicateResult {

  readonly duplicate: boolean;

  readonly reason: DuplicateReason;

  readonly confidence: number;

  readonly existing?: CanonicalProduct;
}


/* ============================================================
 * MERGE
 * ============================================================
 */

export enum MergeStrategy {

  KEEP_EXISTING = "keep_existing",

  UPDATE_EXISTING = "update_existing",

  CREATE_NEW = "create_new",
}


export interface MergeResult {

  readonly strategy: MergeStrategy;

  readonly product: CanonicalProduct;

  readonly changes:
    ReadonlyArray<string>;
}


/* ============================================================
 * ENGINE CONTRACT
 * ============================================================
 */

export interface CanonicalBuildInput {

  readonly product: AdapterProduct;
}


export interface CanonicalEngineResult {

  readonly success: boolean;

  readonly product?: CanonicalProduct;

  readonly duplicate?: DuplicateResult;

  readonly error?: string;
}
