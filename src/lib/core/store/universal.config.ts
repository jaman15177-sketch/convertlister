/**
 * ==========================================================
 * UNIVERSAL STORE CONFIGURATION
 * ==========================================================
 *
 * Runtime configuration for Universal Store.
 *
 * Responsibilities:
 * - Store behavior configuration
 * - Feature flags
 * - Operational settings
 *
 * Rules:
 * - No database dependency
 * - No environment access
 * - No business logic
 * ==========================================================
 */


/* ==========================================================
 * UNIVERSAL STORE CONFIG
 * ========================================================== */

export interface UniversalStoreConfig {

  /**
   * Enable duplicate checking
   */
  readonly enableDeduplication: boolean;


  /**
   * Enable version tracking
   */
  readonly enableVersioning: boolean;


  /**
   * Enable audit tracking
   */
  readonly enableAudit: boolean;


  /**
   * Enable event publishing
   */
  readonly enableEvents: boolean;


  /**
   * Enable cache layer
   */
  readonly enableCache: boolean;


  /**
   * Enable transaction support
   */
  readonly enableTransactions: boolean;


  /**
   * Default page size
   */
  readonly defaultPageSize: number;


  /**
   * Default batch size
   */
  readonly defaultBatchSize: number;
}


/* ==========================================================
 * DEFAULT CONFIG
 * ========================================================== */

export const DEFAULT_UNIVERSAL_STORE_CONFIG:
  UniversalStoreConfig = {

  enableDeduplication: true,

  enableVersioning: true,

  enableAudit: true,

  enableEvents: true,

  enableCache: false,

  enableTransactions: true,

  defaultPageSize: 50,

  defaultBatchSize: 100,

};
