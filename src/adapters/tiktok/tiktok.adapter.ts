import { AdapterProduct } from "../core/adapter.contract";

export class TikTokAdapter {
  async fetchProducts(): Promise<AdapterProduct[]> {
    return [
      {
        id: "tt_1",
        source: "tiktok",
        title: "Trending Wireless Gadgets Bundle",
        price: 0,
        images: [],
        metadata: {
          trendScore: 95,
          keyword: "wireless gadgets",
        },
      },
    ];
  }
}
