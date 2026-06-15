import {
  DedupeResult,
  NormalizedProduct,
  ProductDeduper,
} from "../types/import.types";

/**
 * ==========================================================
 * DEDUPE ENGINE
 * ==========================================================
 * Responsibilities:
 * - Detect duplicate products
 * - Prevent double imports
 * - Keep Universal Store clean
 * - Source-agnostic
 * ==========================================================
 */

export class DedupeEngine implements ProductDeduper {
  /**
   * Runtime dedupe index
   *
   * key format:
   * source:sourceProductId
   */
  private readonly index = new Map<string, string>();

  async check(
    product: NormalizedProduct
  ): Promise<DedupeResult> {
    const key = this.buildKey(
      product.source,
      product.sourceProductId
    );

    const existingProductId =
      this.index.get(key);

    if (existingProductId) {
      return {
        duplicate: true,
        existingProductId,
      };
    }

    this.index.set(key, product.id);

    return {
      duplicate: false,
    };
  }

  /**
   * Manual registration
   * Useful when loading existing products
   */
  register(product: NormalizedProduct): void {
    const key = this.buildKey(
      product.source,
      product.sourceProductId
    );

    this.index.set(key, product.id);
  }

  /**
   * Remove product from dedupe index
   */
  remove(
    source: string,
    sourceProductId: string
  ): void {
    const key = this.buildKey(
      source,
      sourceProductId
    );

    this.index.delete(key);
  }

  /**
   * Clear runtime state
   */
  clear(): void {
    this.index.clear();
  }

  /**
   * Stats
   */
  size(): number {
    return this.index.size;
  }

  private buildKey(
    source: string,
    sourceProductId: string
  ): string {
    return `${source}:${sourceProductId}`;
  }
}

/**
 * Singleton instance
 */
export const dedupeEngine =
  new DedupeEngine();
