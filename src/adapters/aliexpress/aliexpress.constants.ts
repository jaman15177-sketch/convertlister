/**
 * ==========================================================
 * ALIEXPRESS CONSTANTS
 * ==========================================================
 *
 * Static configuration values for AliExpress Adapter.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Default adapter configuration
 * • API settings
 * • Pagination limits
 * • Field mappings constants
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Runtime state
 * ✗ Database values
 * ✗ Business decisions
 * ==========================================================
 */


/**
 * Adapter identity
 */
export const ALIEXPRESS_ADAPTER_NAME =
  "aliexpress";



/**
 * API Configuration
 */
export const ALIEXPRESS_API = {

  BASE_URL:
    "https://api.aliexpress.com",

  VERSION:
    "v1",

};



/**
 * Pagination Defaults
 */
export const ALIEXPRESS_PAGINATION = {

  DEFAULT_PAGE:
    1,

  DEFAULT_LIMIT:
    20,

  MAX_LIMIT:
    100,

};



/**
 * Currency Defaults
 */
export const ALIEXPRESS_DEFAULT_CURRENCY =
  "USD";



/**
 * Request Timeout
 */
export const ALIEXPRESS_TIMEOUT =
  15000;



/**
 * Retry Configuration
 */
export const ALIEXPRESS_RETRY = {

  MAX_ATTEMPTS:
    3,

  INITIAL_DELAY:
    1000,

};



/**
 * Supported Data Regions
 */
export const ALIEXPRESS_REGIONS = [

  "US",

  "EU",

  "UK",

  "CA",

  "AU",

  "GLOBAL",

] as const;



/**
 * Product Field Names
 */
export const ALIEXPRESS_FIELDS = {

  TITLE:
    "title",

  DESCRIPTION:
    "description",

  PRICE:
    "price",

  IMAGES:
    "images",

  REVIEWS:
    "reviews",

  ORDERS:
    "orders",

  SHIPPING:
    "shipping",

} as const;
