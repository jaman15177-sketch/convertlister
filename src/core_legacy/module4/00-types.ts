// =======================================
// MODULE 4 GLOBAL TYPES
// =======================================

export type Platform =
  | "amazon"
  | "shopify"
  | "aliexpress"
  | "tiktok"
  | "etsy"
  | "ebay"
  | "facebook"
  | "custom";

export type BuyerIntent =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "BUY_NOW";

export type ProductVerdict =
  | "WINNER"
  | "PROMISING"
  | "AVERAGE"
  | "REJECT";

export type TrendLevel =
  | "COLD"
  | "WARM"
  | "HOT"
  | "VIRAL";

export type MarketType =
  | "BLUE_OCEAN"
  | "RED_OCEAN"
  | "SATURATED";

export type CopyType =
  | "SHORT"
  | "LONG"
  | "SEO"
  | "ADS";

export type OptimizationAction =
  | "REWRITE_COPY"
  | "CHANGE_POSITIONING"
  | "CHANGE_PRICE"
  | "CHANGE_OFFER"
  | "LAUNCH"
  | "REJECT";

export type EmotionTrigger =
  | "FEAR"
  | "DESIRE"
  | "STATUS"
  | "GREED"
  | "CURIOSITY"
  | "SECURITY";

export type Score =
  number;

export type Currency =
  "USD"
  | "EUR"
  | "GBP"
  | "BDT";

export type ProductId = string;
export type GlobalProductId = string;
