/**
 * ==========================================================
 * CSV TYPES
 * ==========================================================
 *
 * Enterprise CSV Import Contracts
 *
 * Responsibilities
 * - Shared CSV type definitions
 * - Marketplace profile contracts
 * - Parsed row contracts
 * * Rules
 * - Types only
 * - No business logic
 * - No parsing logic
 * - No validation logic
 * ==========================================================
 */

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

/* ==========================================================
 * CSV SOURCE TYPE
 * ==========================================================
 */
export type CsvSourceType =
  | "marketplace"
  | "supplier"
  | "platform";
/* ==========================================================
 * CSV VALUE
 * ==========================================================
 */

export type CsvValue =
  | string
  | number
  | boolean
  | null
  | undefined;

/* ==========================================================
 * CSV ROW
 * ==========================================================
 */

export type CsvRow =
  Record<
    string,
    CsvValue
  >;

/* ==========================================================
 * CSV FILE
 * ==========================================================
 */

export interface CsvFile {

  readonly name: string;

  readonly headers:
    readonly string[];

  readonly rows:
    readonly CsvRow[];

}

/* ==========================================================
 * CSV PROFILE NAME
 * ==========================================================
 */

export type CsvProfileName =
  | "aliexpress"
  | "alibaba"
  | "amazon"
  | "cjdropshipping"
  | "shopify"
  | "woocommerce"
  | "etsy"
  | "ebay"
  | "temu"
  | "unknown";

/* ==========================================================
 * CSV COLUMN MAP
 * ==========================================================
 */

export type CsvColumnMap =
  Record<
    keyof AdapterProduct,
    string
  >;

/* ==========================================================
 * CSV PROFILE
 * ==========================================================
 */
export interface CsvProfile {

  readonly sourceType:
    CsvSourceType;

  readonly version:
    string;

}


/* ==========================================================
 * CSV PARSE RESULT
 * ==========================================================
 */

export interface CsvParseResult {

  readonly success: boolean;

  readonly headers:
    readonly string[];

  readonly rows:
    readonly CsvRow[];

  readonly message?: string;

}

/* ==========================================================
 * CSV DETECTION RESULT
 * ==========================================================
 */

export interface CsvDetectionResult {

  readonly success: boolean;

  readonly profile:
    CsvProfileName;

  readonly confidence:
    number;

}

/* ==========================================================
 * CSV MAPPING RESULT
 * ==========================================================
 */

export interface CsvMappingResult {

  readonly success: boolean;

  readonly products:
    readonly AdapterProduct[];

  readonly message?: string;

}
