/**
 * ============================================================
 * ADAPTER FACTORY
 * Enterprise Production Ready
 * ============================================================
 */

import type {
  AdapterContract,
} from "./adapter.contract";

import { AliExpressAdapter }
from "../aliexpress/aliexpress.adapter";

export class AdapterFactory {

  /**
   * Create adapter by marketplace name.
   */
  static create(
    marketplace: string
  ): AdapterContract<any, any> {

    switch (
      marketplace.toLowerCase()
    ) {

      case "aliexpress":
        return new AliExpressAdapter();

      default:
        throw new Error(
          `Unsupported marketplace: ${marketplace}`
        );

    }

  }

  /**
   * Create all supported adapters.
   */
  static createAll():
  AdapterContract<any, any>[] {

    return [

      new AliExpressAdapter(),

    ];

  }

}
