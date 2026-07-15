/**
 * ==========================================================
 * ADAPTER CACHE
 * ==========================================================
 *
 * Shared caching layer for marketplace adapters.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Cache adapter responses
 * • Reduce duplicate marketplace requests
 * • Manage cache expiration
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Store business decisions
 * ✗ Modify products
 * ✗ Replace Universal Store
 * ==========================================================
 */


export interface CacheEntry<T> {

  data: T;

  expiresAt: number;

}



export interface CacheOptions {

  ttlMs?: number;

}



export class AdapterCache {


  private cache:
    Map<string, CacheEntry<unknown>>
    =
    new Map();



  /**
   * Store cache data
   */
  public set<T>(
    key: string,
    data: T,
    options?: CacheOptions
  ): void {


    const ttl =
      options?.ttlMs ??
      5 * 60 * 1000;



    this.cache.set(
      key,
      {
        data,
        expiresAt:
          Date.now() + ttl,
      }
    );

  }



  /**
   * Get cache data
   */
  public get<T>(
    key: string
  ): T | null {


    const entry =
      this.cache.get(key);



    if (!entry) {

      return null;

    }



    if (
      Date.now() >
      entry.expiresAt
    ) {

      this.cache.delete(
        key
      );

      return null;

    }



    return entry.data as T;

  }



  /**
   * Check cache exists
   */
  public has(
    key: string
  ): boolean {

    return this.get(key) !== null;

  }



  /**
   * Remove cache item
   */
  public delete(
    key: string
  ): void {

    this.cache.delete(
      key
    );

  }



  /**
   * Clear all cache
   */
  public clear(): void {

    this.cache.clear();

  }



}


export const adapterCache =
  new AdapterCache();
