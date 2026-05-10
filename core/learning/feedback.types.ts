export type ListingFeedback = {
  productId: string;

  marketplace: "amazon" | "tiktok" | "etsy" | "shopify";

  ctr: number;
  conversionRate: number;
  views: number;
  clicks: number;
  purchases: number;

  title: string;
  bullets: string[];
  description: string;

  timestamp: number;
};
