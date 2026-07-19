/**
 * ============================================================
 * CONVERTLISTER
 * ADAPTER BOOTSTRAP
 * Enterprise Production Ready
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Register all marketplace adapters
 * • Execute once during application startup
 * • Prevent duplicate registration
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Import products
 * ✗ Execute adapters
 * ✗ Call marketplace APIs
 * ✗ Contain business logic
 * ============================================================
 */

import { AdapterRegistry } from "@/core/registry/adapter.registry";


import {
  AdapterFactory,
} from "@/adapters/core/adapter.factory";

export class AdapterBootstrap {

  private static initialized = false;

  /**
   * Register all adapters
   */
  static initialize(): void {

    if (this.initialized) {
      return;
    }

    const adapters =
      AdapterFactory.createAll();

    for (const adapter of adapters) {

      if (
        !AdapterRegistry.has(
          adapter.name
        )
      ) {

        AdapterRegistry.register(
          adapter
        );

      }

    }

    this.initialized = true;

  }

}
  
