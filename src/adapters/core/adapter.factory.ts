/**
 * ==========================================================
 * ADAPTER FACTORY
 * ==========================================================
 *
 * Creates marketplace adapter instances.
 *
 * Rules
 * ----------------------------------------------------------
 * • Factory only
 * • No business logic
 * • No API calls
 * • No data mapping
 * ==========================================================
 */

import { ImportSource } from "@/lib/core/import";

import type {
  AdapterContract,
} from "./adapter.contract";

import {
  UnsupportedAdapterError,
} from "./adapter.errors";

import {
  AliExpressAdapter,
} from "@/adapters/aliexpress/aliexpress.adapter";

import {
  AmazonAdapter,
} from "@/adapters/amazon/amazon.adapter";

import {
  ShopifyAdapter,
} from "@/adapters/shopify/shopify.adapter";

import {
  TikTokAdapter,
} from "@/adapters/tiktok/tiktok.adapter";

export class AdapterFactory {

  static create(
    source: ImportSource
  ): AdapterContract<any, any> {

    switch (source) {

      case ImportSource.ALIEXPRESS:
        return new AliExpressAdapter();

      case ImportSource.AMAZON:
        return new AmazonAdapter();

      case ImportSource.SHOPIFY:
        return new ShopifyAdapter();

      case ImportSource.MANUAL:
      case ImportSource.CSV:
      case ImportSource.API:
      case ImportSource.ETSY:
      case ImportSource.WOOCOMMERCE:
        throw new UnsupportedAdapterError(source);

      default:
        throw new UnsupportedAdapterError(source);

    }

  }

}
