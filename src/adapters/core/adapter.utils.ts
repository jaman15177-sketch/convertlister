/**
 * ==========================================================
 * ADAPTER UTILS
 * ==========================================================
 *
 * Shared utility functions for marketplace adapters.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Common adapter helpers
 * • Query normalization
 * • Cache key generation
 * • Safe data handling
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Marketplace logic
 * ✗ Product transformation
 * ✗ Business decisions
 * ==========================================================
 */


/**
 * Safe string converter
 */
export function safeString(
  value: unknown
): string {

  if (
    value === null ||
    value === undefined
  ) {

    return "";

  }

  return String(value).trim();

}



/**
 * Safe number converter
 */
export function safeNumber(
  value: unknown,
  fallback = 0
): number {

  const number =
    Number(value);


  return Number.isFinite(number)
    ? number
    : fallback;

}



/**
 * Normalize keyword
 */
export function normalizeKeyword(
  keyword: string
): string {

  return keyword
    .trim()
    .toLowerCase()
    .replace(
      /\s+/g,
      " "
    );

}



/**
 * Generate adapter cache key
 */
export function createCacheKey(
  source: string,
  query: Record<string, unknown>
): string {


  const payload =
    JSON.stringify(
      query,
      Object.keys(query)
        .sort()
    );


  return `${source}:${payload}`;

}



/**
 * Pagination helper
 */
export function normalizePage(
  page?: number
): number {

  if (
    !page ||
    page < 1
  ) {

    return 1;

  }


  return Math.floor(page);

}



/**
 * Normalize page size
 */
export function normalizePageSize(
  size?: number,
  defaultSize = 20,
  maxSize = 100
): number {


  if (
    !size ||
    size < 1
  ) {

    return defaultSize;

  }


  return Math.min(
    Math.floor(size),
    maxSize
  );

}



/**
 * Merge metadata safely
 */
export function mergeMetadata(
  ...sources: Record<string, unknown>[]
): Record<string, unknown> {


  return Object.assign(
    {},
    ...sources
  );

}
