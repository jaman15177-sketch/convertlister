/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.config.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product runtime configuration.
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Business Logic
 * ✗ API
 * ✗ Marketplace Push
 *
 * Purpose:
 * -----------------------------------------------------------
 * Central configuration layer for Ready Product domain.
 *
 * ===========================================================
 */


/**
 * Ready Product Environment Mode
 */
export const READY_PRODUCT_ENV = {

  DEVELOPMENT: "development",

  PRODUCTION: "production",

  TEST: "test",

} as const;


export type ReadyProductEnvironment =
  (typeof READY_PRODUCT_ENV)[keyof typeof READY_PRODUCT_ENV];



/**
 * Ready Product Base Configuration
 */
export interface ReadyProductConfig {

  readonly environment: ReadyProductEnvironment;

  readonly enableAIOptimization: boolean;

  readonly enableCatalogHealth: boolean;

  readonly enableFreezeEngine: boolean;

  readonly enableSnapshot: boolean;

}/**
 * ===========================================================
 * Ready Product Default Runtime Configuration
 * Part-2
 * ===========================================================
 */


/**
 * Default Ready Product Config
 */
export const DEFAULT_READY_PRODUCT_CONFIG: ReadyProductConfig = {

  environment: READY_PRODUCT_ENV.DEVELOPMENT,

  enableAIOptimization: true,

  enableCatalogHealth: true,

  enableFreezeEngine: true,

  enableSnapshot: true,

};



/**
 * Production Ready Product Config
 */
export const PRODUCTION_READY_PRODUCT_CONFIG: ReadyProductConfig = {

  environment: READY_PRODUCT_ENV.PRODUCTION,

  enableAIOptimization: true,

  enableCatalogHealth: true,

  enableFreezeEngine: true,

  enableSnapshot: true,

};



/**
 * Test Ready Product Config
 */
export const TEST_READY_PRODUCT_CONFIG: ReadyProductConfig = {

  environment: READY_PRODUCT_ENV.TEST,

  enableAIOptimization: false,

  enableCatalogHealth: false,

  enableFreezeEngine: false,

  enableSnapshot: true,

};/**
 * ===========================================================
 * Ready Product Config Resolver
 * Part-3
 * ===========================================================
 */


/**
 * Environment Config Map
 */
export const READY_PRODUCT_CONFIG_MAP = {

  [READY_PRODUCT_ENV.DEVELOPMENT]:
    DEFAULT_READY_PRODUCT_CONFIG,

  [READY_PRODUCT_ENV.PRODUCTION]:
    PRODUCTION_READY_PRODUCT_CONFIG,

  [READY_PRODUCT_ENV.TEST]:
    TEST_READY_PRODUCT_CONFIG,

} as const;



/**
 * Resolve Ready Product Configuration
 */
export function getReadyProductConfig(
  environment: ReadyProductEnvironment =
    READY_PRODUCT_ENV.DEVELOPMENT,
): ReadyProductConfig {

  return (
    READY_PRODUCT_CONFIG_MAP[environment]
  );

}
/**
 * ===========================================================
 * Ready Product Config Validation
 * Part-4 Final
 * ===========================================================
 */


/**
 * Validate Ready Product Config
 */
export function validateReadyProductConfig(
  config: ReadyProductConfig,
): boolean {

  return (

    typeof config.environment === "string" &&

    typeof config.enableAIOptimization === "boolean" &&

    typeof config.enableCatalogHealth === "boolean" &&

    typeof config.enableFreezeEngine === "boolean" &&

    typeof config.enableSnapshot === "boolean"

  );

}



/**
 * Immutable Ready Product Config Factory
 */
export function createReadyProductConfig(
  config: ReadyProductConfig,
): Readonly<ReadyProductConfig> {

  if (
    !validateReadyProductConfig(config)
  ) {

    throw new Error(
      "Invalid Ready Product configuration",
    );

  }


  return Object.freeze(
    config,
  );

}
