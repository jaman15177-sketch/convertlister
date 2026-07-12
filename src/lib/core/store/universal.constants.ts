/**
 * ==========================================================
 * UNIVERSAL STORE CONSTANTS
 * ==========================================================
 *
 * Shared constants for Universal Store subsystem.
 *
 * Responsibilities:
 * - Default configuration values
 * - Safety limits
 * - Version defaults
 *
 * Rules:
 * - Constants only
 * - No business logic
 * - No environment access
 * ==========================================================
 */


/* ==========================================================
 * STORE VERSION
 * ========================================================== */

export const UNIVERSAL_STORE_VERSION = 1;


/* ==========================================================
 * PAGINATION DEFAULTS
 * ========================================================== */

export const UNIVERSAL_DEFAULT_PAGE = 1;

export const UNIVERSAL_DEFAULT_LIMIT = 50;

export const UNIVERSAL_MAX_LIMIT = 1000;


/* ==========================================================
 * BATCH PROCESSING
 * ========================================================== */

export const UNIVERSAL_DEFAULT_BATCH_SIZE = 100;

export const UNIVERSAL_MAX_BATCH_SIZE = 1000;


/* ==========================================================
 * CACHE SETTINGS
 * ========================================================== */

export const UNIVERSAL_CACHE_TTL_SECONDS = 300;


/* ==========================================================
 * RETRY SETTINGS
 * ========================================================== */

export const UNIVERSAL_DEFAULT_RETRY_COUNT = 3;

export const UNIVERSAL_RETRY_DELAY_MS = 1000;


/* ==========================================================
 * LOCK SETTINGS
 * ========================================================== */

export const UNIVERSAL_LOCK_TIMEOUT_MS = 30000;


/* ==========================================================
 * ENTITY LIMITS
 * ========================================================== */

export const UNIVERSAL_MAX_METADATA_SIZE = 10000;


/* ==========================================================
 * ERROR CODES
 * ========================================================== */

export const UNIVERSAL_ERROR_CODES = {

  ENTITY_NOT_FOUND:
    "UNIVERSAL_ENTITY_NOT_FOUND",

  DUPLICATE_ENTITY:
    "UNIVERSAL_DUPLICATE_ENTITY",

  INVALID_ENTITY:
    "UNIVERSAL_INVALID_ENTITY",

  STORAGE_FAILURE:
    "UNIVERSAL_STORAGE_FAILURE",

  TRANSACTION_FAILURE:
    "UNIVERSAL_TRANSACTION_FAILURE",

} as const;
