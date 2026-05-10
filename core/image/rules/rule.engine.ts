import { amazonRules } from "./amazon.rules";
import { shopifyRules } from "./shopify.rules";
import { etsyRules } from "./etsy.rules";
import { tiktokRules } from "./tiktok.rules";
import { ImageRule, Marketplace } from "./rule.types";

export function getRule(marketplace: Marketplace): ImageRule {

  switch (marketplace) {

    case "amazon":
      return amazonRules;

    case "shopify":
      return shopifyRules;

    case "etsy":
      return etsyRules;

    case "tiktok":
      return tiktokRules;

    default:
      return shopifyRules;
  }
}
