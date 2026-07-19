/**
 * ==========================================================
 * UNIVERSAL STORE REGISTRY
 * ==========================================================
 *
 * Enterprise Multi-Tenant Store Registry
 *
 * Responsibilities
 * - One UniversalStore per organization
 * - Store lifecycle management
 * - Tenant isolation
 *
 * Rules
 * - No business logic
 * - No persistence
 * - No database dependency
 * ==========================================================
 */

import { UniversalStore } from "./universal.store";
import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";
/* ==========================================================
 * STORE REGISTRY
 * ==========================================================
 */

export class UniversalStoreRegistry<T = unknown> {

  private readonly stores =
    new Map<
      string,
      UniversalStore<T>
    >();

  /**
   * Get or create a store for an organization.
   */
  get(
    organizationId: string
  ): UniversalStore<T> {

    let store =
      this.stores.get(
        organizationId
      );

    if (!store) {

      store =
        new UniversalStore<T>();

      this.stores.set(
        organizationId,
        store
      );

    }

    return store;

  }

  /**
   * Check if a store exists.
   */
  has(
    organizationId: string
  ): boolean {

    return this.stores.has(
      organizationId
    );

  }

  /**
   * Remove a store.
   */
  remove(
    organizationId: string
  ): boolean {

    return this.stores.delete(
      organizationId
    );

  }

  /**
   * Clear all stores.
   */
  clear(): void {

    this.stores.clear();

  }

  /**
   * Number of active stores.
   */
  count(): number {

    return this.stores.size;

  }

}

/* ==========================================================
 * DEFAULT REGISTRY
 * ==========================================================
 */

export const universalStoreRegistry =
  new UniversalStoreRegistry<NormalizedProduct>();
