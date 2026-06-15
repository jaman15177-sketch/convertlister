export interface AdapterProduct {
  /**
   * Unique ID from marketplace
   */
  id: string;

  /**
   * Source marketplace name
   */
  source: "aliexpress" | "amazon" | "shopify" | "tiktok" | "custom";

  /**
   * Product title
   */
  title: string;

  /**
   * Normalized price (USD)
   */
  price: number;

  /**
   * Optional images
   */
  images?: string[];

  /**
   * Rich metadata for intelligence engines
   */
  metadata?: {
    category?: string;
    rating?: number;
    orders?: number;
    descriptionLength?: number;
    shippingTime?: number;
    [key: string]: any;
  };
}
