export interface CompressionInput {
  width: number;
  height: number;
  sizeKB: number;
  marketplace: "amazon" | "shopify" | "etsy" | "tiktok";
}

export interface CompressionOutput {
  quality: number;
  format: "webp" | "jpg" | "png";
  resize?: number;
}
