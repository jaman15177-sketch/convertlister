import { CompressionInput } from "./compression.types";

export function getResize(input: CompressionInput): number {

  switch (input.marketplace) {

    case "amazon":
      return 2000;

    case "shopify":
      return 2000;

    case "etsy":
      return 1800;

    case "tiktok":
      return 1080;

    default:
      return 1500;
  }
}
