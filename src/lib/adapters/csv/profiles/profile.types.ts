/**
 * ==========================================================
 * PROFILE TYPES
 * ==========================================================
 *
 * Enterprise CSV Profile Types
 *
 * Responsibilities
 * - Marketplace profile types
 * - Column mapping types
 * - Detection types
 *
 * Rules
 * - Types only
 * - No business logic
 * ==========================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  CsvProfileName,
  CsvSourceType,
} from "../csv.types";

/* ==========================================================
 * PROFILE COLUMN
 * ==========================================================
 */

export interface ProfileColumn {

  readonly source: string;

  readonly target:
    keyof AdapterProduct;

  readonly required: boolean;

}

/* ==========================================================
 * PROFILE HEADER
 * ==========================================================
 */

export interface ProfileHeader {

  readonly name: string;

  readonly required: boolean;

}

/* ==========================================================
 * PROFILE DEFINITION
 * ==========================================================
 */

export interface ProfileDefinition {

  readonly name:
    CsvProfileName;

  readonly sourceType:
    CsvSourceType;

  readonly version: string;

  readonly headers:
    readonly ProfileHeader[];

  readonly columns:
    readonly ProfileColumn[];

}

/* ==========================================================
 * PROFILE MATCH RESULT
 * ==========================================================
 */

export interface ProfileMatchResult {

  readonly matched: boolean;

  readonly confidence: number;

}


