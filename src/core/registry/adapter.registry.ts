/**
 * ============================================================
 * CONVERTLISTER
 * ADAPTER REGISTRY
 * Enterprise Production Ready
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Register marketplace adapters
 * • Resolve adapters
 * • Execute adapters
 * • Prevent duplicate registration
 * • Registry lifecycle
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Create adapters
 * ✗ Bootstrap adapters
 * ✗ Call external services directly
 * ✗ Perform import business logic
 * ============================================================
 */

import type {
  AdapterContract,
  AdapterProduct,
  AdapterQuery,
  AdapterResult,
} from "@/adapters/core/adapter.contract";

export class AdapterRegistry {

  private static readonly adapters =
    new Map<
      string,
      AdapterContract<any, any>
    >();

  /**
   * Register adapter
   */
  static register(
  adapter: AdapterContract<any, any>
): void{

    if (!adapter) {
      throw new Error(
        "Adapter instance is required."
      );
    }

    if (!adapter.name?.trim()) {
      throw new Error(
        "Adapter name is required."
      );
    }

    if (this.adapters.has(adapter.name)) {
      throw new Error(
        `Adapter already registered: ${adapter.name}`
      );
    }

    this.adapters.set(
      adapter.name,
      adapter
    );

  }

  /**
   * Remove adapter
   */
  static unregister(
    name: string
  ): boolean {

    return this.adapters.delete(name);

  }

  /**
   * Get adapter
   */
static get(
  name: string
): AdapterContract<any, any> {

    const adapter =
      this.adapters.get(name);

    if (!adapter) {
      throw new Error(
        `Adapter not found: ${name}`
      );
    }

    return adapter;

  }

  /**
   * Check adapter exists
   */
  static has(
    name: string
  ): boolean {

    return this.adapters.has(name);

  }

  /**
   * Registered adapter names
   */
  static list(): string[] {

    return Array.from(
      this.adapters.keys()
    );

  }

 /**
 * Number of adapters
 */
static size(): number {

  return this.adapters.size;

}

  /**
   * Clear registry
   */
  static clear(): void {

    this.adapters.clear();

  }

  /**
   * Execute adapter
   */
  static async execute<Q extends AdapterQuery>(
  name: string,
  input: Q
): Promise<
  AdapterResult<
    AdapterProduct[]
  >
>{

    const adapter =
      this.get(name);

    const normalized =
  adapter.transform(input);

    return adapter.execute(
      normalized
    );

  }

}
