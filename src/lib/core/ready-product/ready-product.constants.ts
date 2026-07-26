/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.constants.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product domain constants.
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Business Logic
 * ✗ API
 * ✗ Marketplace Push
 *
 * ===========================================================
 */


/**
 * Default Ready Product Values
 */
export const READY_PRODUCT_DEFAULTS = {

  DEFAULT_CURRENCY: "USD",

  DEFAULT_STATUS: "DRAFT",

  DEFAULT_PAGE_SIZE: 20,

  MAX_PAGE_SIZE: 100,

} as const;



/**
 * Ready Product Score Limits
 */
export const READY_PRODUCT_SCORE_LIMITS = {

  MIN_SCORE: 0,

  MAX_SCORE: 100,

} as const;



/**
 * Ready Product Price Limits
 */
export const READY_PRODUCT_PRICE_LIMITS = {

  MIN_PRICE: 0,

  MAX_PRICE: 999999999,

} as const;
/**
 * ===========================================================
 * Ready Product Marketplace Constants
 * Part-2
 * ===========================================================
 */


/**
 * Supported Marketplace Groups
 */
export const READY_PRODUCT_MARKETPLACE_GROUPS = {

  DROPSHIPPING: "DROPSHIPPING",

  STORE_PLATFORM: "STORE_PLATFORM",

  RETAIL_MARKETPLACE: "RETAIL_MARKETPLACE",

  SOCIAL_COMMERCE: "SOCIAL_COMMERCE",

  CUSTOM: "CUSTOM",

} as const;



export type ReadyProductMarketplaceGroup =
  (typeof READY_PRODUCT_MARKETPLACE_GROUPS)[keyof typeof READY_PRODUCT_MARKETPLACE_GROUPS];

/**
 * Ready Product Media Limits
 */
export const READY_PRODUCT_MEDIA_LIMITS = {

  MAX_IMAGES: 50,

  MAX_VIDEOS: 10,

  MAX_MEDIA_SIZE_MB: 25,

} as const;



/**
 * Ready Product Sort Options
 */
export const READY_PRODUCT_SORT_OPTIONS = {

  PRICE: "PRICE",

  AI_SCORE: "AI_SCORE",

  HEALTH_SCORE: "HEALTH_SCORE",

  CREATED_AT: "CREATED_AT",

  UPDATED_AT: "UPDATED_AT",

} as const;
/**
 * ===========================================================
 * Ready Product Search Constants
 * Part-3
 * ===========================================================
 */


/**
 * Search Configuration
 */
export const READY_PRODUCT_SEARCH_DEFAULTS = {

  MIN_QUERY_LENGTH: 2,

  MAX_QUERY_LENGTH: 100,

  DEFAULT_LIMIT: 20,

  MAX_LIMIT: 100,

} as const;



/**
 * Category Configuration
 */
export const READY_PRODUCT_CATEGORY_CONFIG = {

  MAX_DEPTH: 5,

  ROOT_CATEGORY_PARENT_ID: null,

} as const;



/**
 * Product Version Configuration
 */
export const READY_PRODUCT_VERSION_CONFIG = {

  INITIAL_VERSION: 1,

  MIN_VERSION: 1,

} as const;



/**
 * Product Asset Configuration
 */
export const READY_PRODUCT_ASSET_CONFIG = {

  MAX_TAGS: 50,

  MAX_BULLETS: 20,

  MAX_KEYWORDS: 100,

} as const;
/**
 * ===========================================================
 * Ready Product Lifecycle Constants
 * Part-4 Final
 * ===========================================================
 */


/**
 * Ready Product Lifecycle Groups
 */
export const READY_PRODUCT_LIFECYCLE = {

  TEMPORARY: "TEMPORARY",

  READY: "READY",

  FROZEN: "FROZEN",

  ARCHIVED: "ARCHIVED",

  DISABLED: "DISABLED",

} as const;



export type ReadyProductLifecycle =
  (typeof READY_PRODUCT_LIFECYCLE)[keyof typeof READY_PRODUCT_LIFECYCLE];



/**
 * Ready Product Feature Flags
 */
export const READY_PRODUCT_FEATURE_FLAGS = {

  AI_OPTIMIZATION: true,

  CATALOG_HEALTH: true,

  READY_IMAGE_LIBRARY: true,

  MULTI_STORE_SUPPORT: true,

  MARKETPLACE_PUSH: true,

} as const;



/**
 * Ready Product Export Formats
 */
export const READY_PRODUCT_EXPORT_FORMATS = {

  JSON: "JSON",

  CSV: "CSV",

  XML: "XML",

} as const;



/**
 * Ready Product Freeze Configuration
 */
export const READY_PRODUCT_FREEZE_CONFIG = {

  IMMUTABLE: true,

  REQUIRE_HEALTH_CHECK: true,

  REQUIRE_AI_SCORE: true,

  REQUIRE_SNAPSHOT: true,

} as const;
