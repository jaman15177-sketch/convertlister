/**
 * ==========================================================
 * WINNING CACHE
 * ==========================================================
 *
 * Enterprise Winning Detection Cache
 *
 * Responsibilities:
 * - Temporary runtime cache
 * - Avoid repeated detection calculation
 * - Store calculated candidate results
 *
 * Rules:
 * - No repository
 * - No persistence
 * - No Supabase
 * - No business mutation
 * ==========================================================
 */



import type {
  WinningCandidate,
} from "./winning.types";



/* ==========================================================
 * CACHE TYPES
 * ==========================================================
 */

export interface WinningCacheEntry {

  readonly key: string;

  readonly candidate: WinningCandidate;

  readonly createdAt: Date;

}



/* ==========================================================
 * CACHE ENGINE
 * ==========================================================
 */

export class WinningCacheEngine {



  private cache =
    new Map<
      string,
      WinningCacheEntry
    >();



  /**
   * Generate cache key
   */

  private createKey(
    productId: string
  ): string {

    return (
      `winning:${productId}`
    );

  }



  /**
   * Store candidate
   */

  set(
    candidate: WinningCandidate
  ): void {


    const key =
      this.createKey(
        candidate.product.id
      );


    this.cache.set(
      key,
      {

        key,

        candidate,

        createdAt:
          new Date(),

      }
    );

  }



  /**
   * Get candidate
   */

  get(
    productId: string
  ):
    WinningCandidate | undefined {


    const key =
      this.createKey(
        productId
      );


    return this.cache.get(
      key
    )?.candidate;

  }



  /**
   * Check exists
   */

  has(
    productId: string
  ): boolean {


    return this.cache.has(
      this.createKey(
        productId
      )
    );

  }



  /**
   * Remove cache
   */

  delete(
    productId: string
  ): void {


    this.cache.delete(
      this.createKey(
        productId
      )
    );

  }



  /**
   * Clear all cache
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
 * ==========================================================
 */

export const winningCache =
  new WinningCacheEngine();
