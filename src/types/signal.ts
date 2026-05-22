export type SignalSource =
  | "google"
  | "reddit"
  | "product"
  | "tiktok"
  | "amazon"
  | "manual";

/**
 * Core Signal Object
 * Every trend, keyword, or product spike flows through this schema
 */
export type Signal = {
  id: string;
  source: SignalSource;
  keyword: string;

  volume?: number;
  engagement?: number;
  velocity?: number;

  timestamp: number;

  metadata?: SignalMeta;
};

export type SignalMeta = {
  country?: string;
  niche?: string;
  platform?: string;

  productIntent?: boolean;
  adSpotted?: boolean;

  confidenceScore?: number;

  tags?: string[];
};
