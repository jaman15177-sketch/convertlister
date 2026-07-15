/**
 * ==========================================================
 * ADAPTER CONSTANTS
 * ==========================================================
 *
 * Shared constants for all marketplace adapters.
 *
 * Rules
 * ----------------------------------------------------------
 * • Constants only
 * • No business logic
 * • No implementation
 * ==========================================================
 */

/* ==========================================================
 * DEFAULT CONFIGURATION
 * ==========================================================
 */

export const DEFAULT_TIMEOUT = 30_000;

export const DEFAULT_RETRY_COUNT = 3;

export const DEFAULT_PAGE = 1;

export const DEFAULT_PAGE_SIZE = 50;

export const MAX_PAGE_SIZE = 100;

export const DEFAULT_CACHE_TTL = 300; // seconds

/* ==========================================================
 * RATE LIMIT
 * ==========================================================
 */


export const DEFAULT_RATE_LIMIT_PER_MINUTE = 60;

export const DEFAULT_RATE_LIMIT_WINDOW = 60_000;

export const DEFAULT_RATE_LIMIT_REQUESTS =
  DEFAULT_RATE_LIMIT_PER_MINUTE;
/* ==========================================================
 * HTTP STATUS
 * ==========================================================
 */

export const HTTP_STATUS_OK = 200;

export const HTTP_STATUS_BAD_REQUEST = 400;

export const HTTP_STATUS_UNAUTHORIZED = 401;

export const HTTP_STATUS_FORBIDDEN = 403;

export const HTTP_STATUS_NOT_FOUND = 404;

export const HTTP_STATUS_TOO_MANY_REQUESTS = 429;

export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

/* ==========================================================
 * DEFAULT HEADERS
 * ==========================================================
 */

export const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
} as const;
