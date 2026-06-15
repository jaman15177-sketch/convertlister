import axios from "axios";
import { tenantContext } from "../core/tenant/tenant.context";
import { logger } from "../core/observability/logger";

export interface ShopifyProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  images?: string[];
  sourceProductId?: string;
}

export class ShopifyAdapter {
  private baseUrl: string;
  private accessToken: string;

  constructor() {
    this.baseUrl = process.env.SHOPIFY_API_URL || "";
    this.accessToken = process.env.SHOPIFY_ACCESS_TOKEN || "";
  }

  private getHeaders() {
    const tenant = tenantContext.get();

    return {
      "X-Shopify-Access-Token": this.accessToken,
      "Content-Type": "application/json",
      "X-Tenant-ID": tenant.tenantId,
    };
  }

  async fetchProducts(limit = 50): Promise<ShopifyProduct[]> {
    try {
      const url = `${this.baseUrl}/products.json?limit=${limit}`;

      const res = await axios.get(url, {
        headers: this.getHeaders(),
      });

      const products = res.data.products || [];

      logger.info("SHOPIFY_FETCH_SUCCESS", {
        count: products.length,
      });

      return products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: Number(p.variants?.[0]?.price || 0),
        currency: p.currency || "USD",
        images: p.images?.map((img: any) => img.src) || [],
        sourceProductId: String(p.id),
      }));
    } catch (err: any) {
      logger.error("SHOPIFY_FETCH_FAILED", {
        error: err.message,
      });

      throw new Error("SHOPIFY_ADAPTER_ERROR");
    }
  }

  async fetchProductById(productId: string): Promise<ShopifyProduct | null> {
    try {
      const url = `${this.baseUrl}/products/${productId}.json`;

      const res = await axios.get(url, {
        headers: this.getHeaders(),
      });

      const p = res.data.product;

      if (!p) return null;

      return {
        id: p.id,
        title: p.title,
        price: Number(p.variants?.[0]?.price || 0),
        currency: "USD",
        images: p.images?.map((img: any) => img.src) || [],
        sourceProductId: String(p.id),
      };
    } catch (err: any) {
      logger.error("SHOPIFY_FETCH_ONE_FAILED", {
        productId,
        error: err.message,
      });

      return null;
    }
  }
}
