/**
 * ============================================================
 * CONVERTLISTER
 * NORMALIZER CONSTANTS
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Default normalization values
 * • Processing limits
 * • Cleaning rules
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute normalization
 * ✗ Access database
 * ✗ Call external APIs
 * ============================================================
 */


/**
 * Default values
 */
export const NORMALIZER_DEFAULTS = {

  currency: "USD",

  language: "en",

  status: "IMPORTED",

} as const;



/**
 * Text normalization rules
 */
export const NORMALIZER_TEXT_RULES = {

  /**
   * Maximum title length
   */
  maxTitleLength: 200,


  /**
   * Maximum description length
   */
  maxDescriptionLength: 5000,


  /**
   * Remove extra spaces
   */
  collapseSpaces: true,


  /**
   * Trim text
   */
  trimText: true,


} as const;



/**
 * Image rules
 */
export const NORMALIZER_IMAGE_RULES = {

  /**
   * Maximum images stored
   */
  maxImages: 20,


  /**
   * Remove invalid URLs
   */
  validateUrl: true,


} as const;



/**
 * Price rules
 */
export const NORMALIZER_PRICE_RULES = {

  minimumPrice: 0,

  fallbackPrice: 0,

} as const;



/**
 * Keyword rules
 */
export const NORMALIZER_KEYWORD_RULES = {

  minimumKeywordLength: 2,

  maximumKeywords: 30,

} as const;



/**
 * Attribute extraction rules
 */
export const NORMALIZER_ATTRIBUTE_RULES = {

  allowedFields: [

    "color",

    "size",

    "material",

    "brand",

    "model",

    "variant",

  ],

} as const;
