/**
 * Repository Layer
 * Shared Constants
 *
 * Responsibility:
 * - Repository default values
 * - Repository operation names
 * - Repository limits
 * - Repository states
 *
 * No:
 * - Database dependency
 * - Supabase dependency
 * - Business logic
 */


export const REPOSITORY_DEFAULTS = {
  PAGE_SIZE: 50,

  MAX_PAGE_SIZE: 500,

  CACHE_TTL_SECONDS: 300,

  MAX_BATCH_SIZE: 1000,

  RETRY_COUNT: 3,
} as const;



export const REPOSITORY_OPERATIONS = {
  CREATE: "create",

  READ: "read",

  UPDATE: "update",

  DELETE: "delete",

  UPSERT: "upsert",

  LIST: "list",

  SEARCH: "search",

  COUNT: "count",

  BATCH_CREATE: "batch_create",

  BATCH_UPDATE: "batch_update",

  BATCH_DELETE: "batch_delete",
} as const;



export const REPOSITORY_STATUS = {
  IDLE: "idle",

  LOADING: "loading",

  SUCCESS: "success",

  FAILED: "failed",
} as const;



export const REPOSITORY_SORT_DIRECTION = {
  ASC: "asc",

  DESC: "desc",
} as const;



export const REPOSITORY_FILTER_OPERATORS = {
  EQUAL: "eq",

  NOT_EQUAL: "neq",

  GREATER_THAN: "gt",

  GREATER_THAN_EQUAL: "gte",

  LESS_THAN: "lt",

  LESS_THAN_EQUAL: "lte",

  CONTAINS: "contains",

  IN: "in",
} as const;



export const REPOSITORY_EVENTS = {
  CREATED: "repository.created",

  UPDATED: "repository.updated",

  DELETED: "repository.deleted",

  FAILED: "repository.failed",

} as const;



export const REPOSITORY_CACHE_KEYS = {
  PRODUCT: "repository:product",

  ENTITY: "repository:entity",

  QUERY: "repository:query",

} as const;



export const REPOSITORY_ERROR_CODES = {
  NOT_FOUND: "REPOSITORY_NOT_FOUND",

  VALIDATION_FAILED: "REPOSITORY_VALIDATION_FAILED",

  DUPLICATE: "REPOSITORY_DUPLICATE",

  DATABASE_ERROR: "REPOSITORY_DATABASE_ERROR",

  UNKNOWN: "REPOSITORY_UNKNOWN_ERROR",

} as const;
