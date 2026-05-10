export type Marketplace = "amazon" | "shopify" | "etsy" | "tiktok";

export interface ImageRule {
  marketplace: Marketplace;

  width: number;
  height: number;

  format: "webp" | "jpg" | "png";
  quality: number;

  background: "white" | "transparent" | "auto";
}
