import { Product } from "../product.model";

export function normalizeProduct(raw: any): Product {
  return {
    id: crypto.randomUUID(),
    source: "ingest",
    sourceId: raw.id || "unknown",

    title: raw.title || "",
    description: raw.description || "",
    category: raw.category || "",
    brand: raw.brand || "",

    price: raw.price || 0,
    currency: raw.currency || "USD",
    shippingCost: raw.shippingCost || 0,

    sales: raw.sales || 0,
    views: raw.views || 0,
    orders: raw.orders || 0,

    likes: raw.likes || 0,
    shares: raw.shares || 0,
    comments: raw.comments || 0,

    sellerCount: raw.sellerCount || 0,
    saturationScore: raw.saturationScore || 0,

    score: 0,
    decision: "review",
    isWinning: false,
  };
}
