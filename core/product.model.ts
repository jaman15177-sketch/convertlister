export type Product = {
  // Identity
  id: string;
  source: string;
  sourceId?: string;

  // Raw Product
  title: string;
  description?: string;
  images?: string[];

  // Category
  category?: string;
  brand?: string;

  // Commerce
  price: number;
  cost?: number;
  currency?: string;
  shippingCost?: number;

  // Demand Signals
  sales?: number;
  views?: number;
  orders?: number;

  // Viral Signals
  likes?: number;
  shares?: number;
  comments?: number;

  // Competition
  sellerCount?: number;
  saturationScore?: number;

  // Trend Intelligence
  trendCurrent?: number;
  trendPast?: number;

  // Generated Listing
  optimizedTitle?: string;
  seoKeywords?: string[];
  bulletPoints?: string[];
  optimizedDescription?: string;

  // Pricing Intelligence
  suggestedPrice?: number;
  pricingStrategy?: "premium" | "penetration" | "viral";

  // AI / Quality
  listingScore?: number;
  confidenceScore?: number;

  // Decision System
  score?: number;
  decision?: "auto-import" | "review" | "reject";
  isWinning?: boolean;
};
