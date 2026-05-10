export type ImageFormat = "jpg" | "webp" | "avif";

export interface FormatInput {
  marketplace: "amazon" | "shopify" | "etsy" | "tiktok";
  sizeKB: number;
  hasTransparency: boolean;
  priority?: "speed" | "quality" | "balanced";
}
