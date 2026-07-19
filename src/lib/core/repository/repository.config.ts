/**
 * Repository Layer
 * Configuration
 *
 * Responsibility:
 * - Repository runtime configuration
 * - Default behavior settings
 *
 * No:
 * - Database connection
 * - Supabase client
 * - Business logic
 */


import {
  REPOSITORY_DEFAULTS,
} from "./repository.constants";



export interface RepositoryConfig {

  readonly enableCache: boolean;

  readonly enableTelemetry: boolean;

  readonly enableAudit: boolean;

  readonly enableMetrics: boolean;

  readonly enableTransaction: boolean;

  readonly defaultPageSize: number;

  readonly maxPageSize: number;

  readonly maxBatchSize: number;

  readonly retryCount: number;

}



export const DEFAULT_REPOSITORY_CONFIG:
  Readonly<RepositoryConfig> = {

  enableCache: true,

  enableTelemetry: true,

  enableAudit: true,

  enableMetrics: true,

  enableTransaction: true,

  defaultPageSize:
    REPOSITORY_DEFAULTS.PAGE_SIZE,

  maxPageSize:
    REPOSITORY_DEFAULTS.MAX_PAGE_SIZE,

  maxBatchSize:
    REPOSITORY_DEFAULTS.MAX_BATCH_SIZE,

  retryCount:
    REPOSITORY_DEFAULTS.RETRY_COUNT,

};



export type RepositoryConfigOverride =
  Partial<RepositoryConfig>;



export function createRepositoryConfig(
  override?: RepositoryConfigOverride,
): RepositoryConfig {

  return {
    ...DEFAULT_REPOSITORY_CONFIG,

    ...override,
  };
}
