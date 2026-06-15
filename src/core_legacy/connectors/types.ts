export type ConnectorName =
  | "shopify"
  | "amazon"
  | "aliexpress"
  | "tiktok"
  | "csv"
  | "api"
  | "custom";

export interface RawProduct {
  source: ConnectorName;
  sourceProductId: string;
  payload: any;
  importedAt: Date;
}

export interface IConnector {
  name: ConnectorName;

  /**
   * Fetch multiple products
   */
  fetchProducts(): Promise<RawProduct[]>;

  /**
   * Fetch single product
   */
  fetchProductById(
    id: string
  ): Promise<RawProduct | null>;
}
