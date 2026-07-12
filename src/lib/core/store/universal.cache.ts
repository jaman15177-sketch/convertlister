/**
 * ==========================================================
 * UNIVERSAL CACHE
 * ==========================================================
 *
 * Cache abstraction layer.
 *
 * Responsibilities:
 * - Store temporary entity data
 * - Fast lookup
 * - TTL support
 * - Cache invalidation
 *
 * Rules:
 * - No Redis dependency
 * - No database dependency
 * - Can be replaced by external cache adapter
 * ==========================================================
 */


/* ==========================================================
 * CACHE ENTRY
 * ========================================================== */

export interface UniversalCacheEntry<T = unknown> {

  readonly key: string;

  readonly value: T;

  readonly createdAt: Date;

  readonly expiresAt?: Date;

}



/* ==========================================================
 * CACHE MANAGER
 * ========================================================== */

export class UniversalCacheManager<T = unknown> {


  private readonly cache:
    Map<string, UniversalCacheEntry<T>> =
    new Map();



  /**
   * Set cache
   */

  set(
    key: string,
    value: T,
    ttlMs?: number
  ): void {


    const entry:
      UniversalCacheEntry<T> = {

      key,

      value,

      createdAt:
        new Date(),

      expiresAt:
        ttlMs
          ? new Date(
              Date.now() + ttlMs
            )
          : undefined,

    };



    this.cache.set(
      key,
      entry
    );

  }



  /**
   * Get cache
   */

  get(
    key: string
  ): T | undefined {


    const entry =
      this.cache.get(key);



    if (!entry) {

      return undefined;

    }



    if (
      entry.expiresAt &&
      entry.expiresAt.getTime()
        < Date.now()
    ) {

      this.delete(key);

      return undefined;

    }



    return entry.value;

  }



  /**
   * Check existence
   */

  has(
    key: string
  ): boolean {

    return (
      this.get(key)
      !== undefined
    );

  }



  /**
   * Delete cache
   */

  delete(
    key: string
  ): boolean {

    return this.cache.delete(
      key
    );

  }



  /**
   * Clear cache
   */

  clear(): void {

    this.cache.clear();

  }



  /**
   * Cache size
   */

  size(): number {

    return this.cache.size;

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalCache =
  new UniversalCacheManager();
