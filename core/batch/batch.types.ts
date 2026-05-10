export interface BatchItem {
  id: string;
  input: string;
  marketplace: "amazon" | "shopify" | "etsy" | "tiktok";
}

export interface BatchResult {
  id: string;
  success: boolean;
  output?: string;
  error?: string;
}
