/**
 * ============================================================
 * CONVERTLISTER
 * Adapter Mapper Contract
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * ✓ RawProduct -> AdapterProduct
 *
 * MUST NOT
 * ------------------------------------------------------------
 * ✗ Validation
 * ✗ Normalization
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Queue
 * ✗ AI
 * ✗ Business Logic
 * ============================================================
 */

import type {
  AdapterProduct,
} from "./adapter.contract";

import type {
  RawProduct,
} from "@/core/normalization/normalizer.types";
export class AdapterMapper {

  /**
   * RawProduct
   * ↓
   * AdapterProduct
   */
  public static toAdapter(
    product: RawProduct,
  ): AdapterProduct {

    return {

      // Core
      id: "",
      title: "",
      price: 0,
      currency: "",
      source: "",

      // Optional
      marketplace: undefined,
     
      description: undefined,
      brand: undefined,
      category: undefined,
      sku: undefined,
      barcode: undefined,
      images: [],
      attributes: {},
      variants: [],
      metadata: {},

    };

  }

}
