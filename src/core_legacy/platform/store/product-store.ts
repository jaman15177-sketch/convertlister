import type {
  ProductRecord,
  ProductSource,
  ProductStatus,
  ProductIntelligence,
} from "./product.types";/**
 * ==========================================================
 * PRODUCT STORE (PRODUCTION CLEAN VERSION)
 * ==========================================================
 * - In-memory store
 * - Type-safe (no runtime import leak)
 * - Debug enabled
 * ==========================================================
 */

export class ProductStore {
  private readonly products = new Map<string, ProductRecord>();

  /**
   * ADD PRODUCT
   */
  add(product: ProductRecord): ProductRecord {
    console.log("📦 STORE ADD:", product.id);

    this.products.set(product.id, product);

    console.log("✔ STORED:", product.id);

    return product;
  }

  /**
   * GET SINGLE PRODUCT
   */
  get(id: string): ProductRecord | undefined {
    return this.products.get(id);
  }

  /**
   * EXISTS CHECK
   */
  exists(id: string): boolean {
    return this.products.has(id);
  }

  /**
   * GET ALL PRODUCTS
   */
  getAll(): ProductRecord[] {
    return Array.from(this.products.values());
  }

  /**
   * COUNT
   */
  count(): number {
    return this.products.size;
  }

  /**
   * FILTER BY SOURCE
   */
  getBySource(source: ProductSource): ProductRecord[] {
    return this.getAll().filter(
      (p) => p.source === source
    );
  }

  /**
   * FILTER BY STATUS
   */
  getByStatus(status: ProductStatus): ProductRecord[] {
    return this.getAll().filter(
      (p) => p.status === status
    );
  }

  /**
   * UPDATE PRODUCT
   */
  update(
    id: string,
    updates: Partial<Omit<ProductRecord, "id">>
  ): ProductRecord | null {
    const current = this.products.get(id);

    if (!current) {
      console.log("❌ UPDATE FAILED:", id);
      return null;
    }

    const updated: ProductRecord = {
      ...current,
      ...updates,
      version: current.version + 1,
      updatedAt: new Date(),
    };

    this.products.set(id, updated);

    console.log("🔄 UPDATED:", id);

    return updated;
  }

  /**
   * UPDATE STATUS
   */
  updateStatus(
    id: string,
    status: ProductStatus
  ): ProductRecord | null {
    return this.update(id, { status });
  }

  /**
   * UPDATE INTELLIGENCE
   */
  updateIntelligence(
    id: string,
    intelligence: ProductIntelligence
  ): ProductRecord | null {
    return this.update(id, { intelligence });
  }

  /**
   * REMOVE PRODUCT
   */
  remove(id: string): boolean {
    console.log("🗑 REMOVE:", id);
    return this.products.delete(id);
  }

  /**
   * CLEAR STORE
   */
  clear(): void {
    console.log("⚠ STORE CLEARED");
    this.products.clear();
  }

  /**
   * SAFE SNAPSHOT
   */
  dump(): readonly ProductRecord[] {
    return Object.freeze(this.getAll());
  }
}

/**
 * SINGLETON INSTANCE
 */
export const productStore = new ProductStore();
