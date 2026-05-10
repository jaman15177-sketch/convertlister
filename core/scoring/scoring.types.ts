export interface ImageMeta {
  width: number;
  height: number;
  format: "jpg" | "webp" | "png";
  hasBackground: boolean;
  fileSizeKB: number;
  marketplace: "amazon" | "shopify" | "etsy" | "tiktok";
}

export interface ScoreResult {
  score: number;
  grade: "low" | "medium" | "high" | "premium";
  reasons: string[];
}
