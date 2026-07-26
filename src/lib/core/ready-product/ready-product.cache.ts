/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.cache.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Cache Domain Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Cache Key Management
 * ✓ Cache Metadata
 * ✓ Cache Policy
 * ✓ Cache Expiration
 * ✓ Redis Ready
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Redis Client
 * ✗ API
 *
 * ===========================================================
 */



/**
 * ===========================================================
 * Cache Namespace
 * ===========================================================
 */

export const READY_PRODUCT_CACHE_NAMESPACE = {

  PRODUCT:
    "ready-product:product",

  SEARCH:
    "ready-product:search",

  CATEGORY:
    "ready-product:category",

  PREVIEW:
    "ready-product:preview",

  SCORE:
    "ready-product:score",

  HEALTH:
    "ready-product:health",

} as const;



export type ReadyProductCacheNamespace =
  typeof READY_PRODUCT_CACHE_NAMESPACE[
    keyof typeof READY_PRODUCT_CACHE_NAMESPACE
  ];



/**
 * ===========================================================
 * Cache Strategy
 * ===========================================================
 */

export const READY_PRODUCT_CACHE_STRATEGY = {

  MEMORY:
    "MEMORY",

  REDIS:
    "REDIS",

  EDGE:
    "EDGE",

} as const;



export type ReadyProductCacheStrategy =
  typeof READY_PRODUCT_CACHE_STRATEGY[
    keyof typeof READY_PRODUCT_CACHE_STRATEGY
  ];



/**
 * ===========================================================
 * Cache Key
 * ===========================================================
 */

export interface ReadyProductCacheKey {


  readonly namespace:
    ReadyProductCacheNamespace;



  readonly key:
    string;



  readonly organizationId?:
    string;

}



/**
 * ===========================================================
 * Cache Policy
 * ===========================================================
 */

export interface ReadyProductCachePolicy {


  readonly ttlSeconds:
    number;



  readonly strategy:
    ReadyProductCacheStrategy;



  readonly staleWhileRevalidate?:
    boolean;

}



/**
 * ===========================================================
 * Cache Entry
 * ===========================================================
 */

export interface ReadyProductCacheEntry<T = unknown> {


  readonly key:
    ReadyProductCacheKey;



  readonly data:
    T;



  readonly createdAt:
    string;



  readonly expiresAt:
    string;



  readonly policy:
    ReadyProductCachePolicy;

}



/**
 * ===========================================================
 * Cache Operation Result
 * ===========================================================
 */

export interface ReadyProductCacheResult<T = unknown> {


  readonly hit:
    boolean;



  readonly data?:
    T;



  readonly key:
    ReadyProductCacheKey;

}



/**
 * ===========================================================
 * Cache Builder
 * ===========================================================
 */

export function createReadyProductCacheKey(

  namespace:
    ReadyProductCacheNamespace,

  key:
    string,

  organizationId?:
    string,

): ReadyProductCacheKey {


  return {


    namespace,


    key,


    organizationId,


  };

}



/**
 * ===========================================================
 * Default Policy
 * ===========================================================
 */

export function createDefaultReadyProductCachePolicy():

ReadyProductCachePolicy {


  return {


    ttlSeconds:
      300,


    strategy:
      READY_PRODUCT_CACHE_STRATEGY.REDIS,


    staleWhileRevalidate:
      true,


  };

}



/**
 * ===========================================================
 * Cache Expiration
 * ===========================================================
 */

export function calculateReadyProductCacheExpiry(

  ttlSeconds:
    number,

): string {


  return new Date(

    Date.now() +
    ttlSeconds * 1000,

  ).toISOString();

}



/**
 * ===========================================================
 * Cache Guard
 * ===========================================================
 */

export function isReadyProductCacheEntry(

  value:
    unknown,

): value is ReadyProductCacheEntry {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const entry =
    value as Partial<ReadyProductCacheEntry>;



  return (

    typeof entry.data !== "undefined" &&

    typeof entry.createdAt === "string"

  );

}



/**
 * ===========================================================
 * Cache Helpers
 * ===========================================================
 */

export function isReadyProductCacheExpired(

  entry:
    ReadyProductCacheEntry,

): boolean {


  return (

    new Date(entry.expiresAt).getTime()
    <=
    Date.now()

  );

}



export function buildReadyProductCacheKeyString(

  key:
    ReadyProductCacheKey,

): string {


  return [

    key.namespace,

    key.organizationId,

    key.key,

  ]

  .filter(Boolean)

  .join(":");

}
