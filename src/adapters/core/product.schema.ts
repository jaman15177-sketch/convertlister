export interface MarketProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  url: string;
  image?: string;
  source: string; // amazon | aliexpress | shopify etc
}
