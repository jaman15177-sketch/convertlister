/**
 * ==========================================================
 * ADAPTER MANAGER
 * ==========================================================
 *
 * Central orchestrator for marketplace adapters.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Validate adapter request
 * • Resolve adapter instance
 * • Execute adapter
 * • Handle adapter-level errors
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Marketplace API logic
 * ✗ Product mapping
 * ✗ Normalization
 * ✗ Universal Store access
 * ✗ AI logic
 * ==========================================================
 */

import type {
  AdapterQuery,
  AdapterResult,
  AdapterProduct,
} from "./adapter.contract";

import {
  AdapterFactory,
} from "./adapter.factory";

import {
  adapterValidator,
} from "./adapter.validator";

import {
  AdapterError,
} from "./adapter.errors";

import type {
  ImportSource,
} from "@/lib/core/import";


export class AdapterManager {


  /**
   * Execute marketplace adapter
   */
  public async execute(
    source: ImportSource,
    query: AdapterQuery
  ): Promise<
    AdapterResult<AdapterProduct[]>
  > {


    /**
     * Step 1
     * Validate query
     */
    adapterValidator.validate(
      query
    );


    /**
     * Step 2
     * Resolve adapter
     */
    const adapter =
      AdapterFactory.create(
        source
      );


    try {


      /**
       * Step 3
       * Transform input
       */
      const transformed =
        adapter.transform(
          query
        );


      /**
       * Step 4
       * Execute adapter
       */
      return await adapter.execute(
        transformed
      );


    } catch (error) {


      if (
        error instanceof AdapterError
      ) {
        throw error;
      }


      throw new AdapterError(
        error instanceof Error
          ? error.message
          : "Unknown adapter execution error"
      );

    }

  }


}


export const adapterManager =
  new AdapterManager();
