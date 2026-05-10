import { AmazonBehavior } from "./amazon.behavior";

import { TikTokBehavior } from "./tiktok.behavior";

import { EtsyBehavior } from "./etsy.behavior";

import { ShopifyBehavior } from "./shopify.behavior";

export const MARKETPLACE_REGISTRY = {
  amazon: AmazonBehavior,

  tiktok: TikTokBehavior,

  etsy: EtsyBehavior,

  shopify: ShopifyBehavior,
};
