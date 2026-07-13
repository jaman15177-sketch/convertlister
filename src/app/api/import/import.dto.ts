import type {
  RawProduct,
} from "@/core/normalization/product-normalizer";

import type {
  ImportSource,
} from "@/lib/core/import";

/**
 * ==========================================================
 * IMPORT API DTO
 * ==========================================================
 *
 * External REST contract.
 *
 * Responsibilities:
 * - REST request payload
 * - REST response payload
 * - API layer only
 *
 * Rules:
 * - No business logic
 * - No persistence logic
 * - No normalization logic
 * - No service dependencies
 * ==========================================================
 */

/* ==========================================================
 * IMPORT REQUEST
 * ==========================================================
 */

export interface ImportApiRequest {

  readonly source:
    ImportSource;

  readonly products:
    readonly RawProduct[];

}

/* ==========================================================
 * IMPORT RESPONSE
 * ==========================================================
 */

export interface ImportApiResponse {

  readonly success: boolean;

  readonly imported: number;

  readonly failed: number;

  readonly skipped: number;

  readonly duplicated: number;

  readonly errors?:
    readonly string[];

}
