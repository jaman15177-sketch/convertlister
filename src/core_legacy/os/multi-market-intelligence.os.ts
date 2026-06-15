import { AliExpressAdapter } from "../../adapters/aliexpress/aliexpress.adapter";
import { ShopifyAdapter } from "../../adapters/shopify/shopify.adapter";
import { AmazonAdapter } from "../../adapters/amazon/amazon.adapter";
import { TikTokAdapter } from "../../adapters/tiktok/tiktok.adapter";
import { CustomMarketAdapter } from "../../adapters/custom/custom-market.adapter";

import { ProductIdentity } from "./product.identity";

import { crossMarketMergeEngine } from "../graph/cross-market-merge.engine";

import { marketFitDetector } from "../intelligence/market-fit.detector";
import { trendDetector } from "../intelligence/trend.detector";
import { profitabilityEngine } from "../intelligence/profitability.engine";
import { winningProbabilityEngine } from "../intelligence/winning-probability.engine";
import { productRankingEngine } from "../intelligence/product-ranking.engine";
import { decisionEngine } from "../intelligence/decision.engine";

export interface MarketSourceConfig {
  type: "aliexpress" | "amazon" | "shopify" | "tiktok" | "custom";
  config?: any;
}

export interface UnifiedProduct {
  source: string;
  sourceProductId: string;
  globalId?: string;

  title: string;
  price: number;

  images: string[];
  metadata: Record<string, any>;
}

export class MultiMarketOS {
  private adapters: any[] = [];

  constructor(private readonly sources: MarketSourceConfig[]) {
    this.adapters = sources.map((s) => this.createAdapter(s));
  }

  private createAdapter(source: MarketSourceConfig) {
    switch (source.type) {
      case "aliexpress":
        return new AliExpressAdapter();

      case "amazon":
        return new AmazonAdapter();

      case "shopify":
        return new ShopifyAdapter();

      case "tiktok":
        return new TikTokAdapter();

      case "custom":
        return new CustomMarketAdapter(source.config);

      default:
        throw new Error(`UNKNOWN_SOURCE: ${source.type}`);
    }
  }

  // -----------------------------------------------------
  // 🚀 STEP 1: INGEST + NORMALIZE + CROSS-MARKET MERGE
  // -----------------------------------------------------
  async ingestAll(): Promise<UnifiedProduct[]> {
    const results = await Promise.all(
      this.adapters.map(async (adapter) => {
        try {
          const data = await adapter.fetchProducts();
          return Array.isArray(data) ? data : [];
        } catch (e) {
          console.error("ADAPTER_ERROR", e);
          return [];
        }
      })
    );

    const flat = results.flat().filter(Boolean);

    const normalized: UnifiedProduct[] = flat.map((p: any) => {
      const source = p.source || "unknown";
      const rawId = p.id ?? p.productId ?? "unknown";

      const sourceProductId = ProductIdentity.ensureId(
        `${source}_${rawId}`
      );

      return {
        source,
        sourceProductId,
        title: p.title || "Untitled",
        price: Number(p.price || 0),
        images: Array.isArray(p.images) ? p.images : [],
        metadata: p.metadata || {},
      };
    });

    // -----------------------------------------------------
    // 🚀 CROSS-MARKET MERGE ENGINE (GLOBAL PRODUCT GRAPH)
    // -----------------------------------------------------
    const mergedIds = normalized.map((p) => {
      return crossMarketMergeEngine.merge({
        source: p.source,
        id: p.sourceProductId,
        title: p.title,
        price: p.price,
      });
    });

    return normalized.map((p, i) => ({
      ...p,
      globalId: mergedIds[i],
    })) as any;
  }

  // -----------------------------------------------------
  // 🚀 STEP 2: ANALYZE SINGLE PRODUCT
  // -----------------------------------------------------
  async analyzeProduct(product: UnifiedProduct) {
    const safe = {
      ...product,
      sourceProductId: ProductIdentity.ensureId(
        product.sourceProductId
      ),
    };

    const marketFit = marketFitDetector.detect({
      title: safe.title,
      price: safe.price,
      category: safe.metadata?.category,
      imagesCount: safe.images?.length || 0,
      descriptionLength: safe.metadata?.descriptionLength || 200,
    });

    const trend = trendDetector.detect({
      productId: safe.sourceProductId,
      title: safe.title,
      category: safe.metadata?.category,
    });

    const profit = profitabilityEngine.calculate({
      sellingPrice: safe.price,
      productCost: safe.price * 0.4,
      shippingCost: 3,
      adCost: 5,
      packagingCost: 1,
    });

    const winning = winningProbabilityEngine.calculate({
      marketFitScore: marketFit.score,
      trendScore: trend.trendScore,
      profitScore: profit.profitScore,
      competitionScore: 60,
      supplierScore: 80,
    });

    const ranking = productRankingEngine.rank([
      {
        productId: safe.globalId || safe.sourceProductId,
        title: safe.title,
        marketFitScore: marketFit.score,
        trendScore: trend.trendScore,
        winningProbability: winning.winningProbability,
        profitabilityScore: profit.profitScore,
        competitionScore: 60,
      },
    ])[0];

    const decision = decisionEngine.decide({
      marketFitScore: marketFit.score,
      trendScore: trend.trendScore,
      competitionScore: 60,
      profitScore: profit.profitScore,
      winningProbability: winning.winningProbability,
    });

    return {
      productId: safe.globalId || safe.sourceProductId,
      title: safe.title,
      globalId: safe.globalId,

      marketFitScore: marketFit.score,
      trendScore: trend.trendScore,
      competitionScore: 60,
      profitabilityScore: profit.profitScore,
      winningProbability: winning.winningProbability,

      decision: decision.decision,
      finalScore: ranking.finalScore,
    };
  }

  // -----------------------------------------------------
  // 🚀 STEP 3: RUN FULL OS PIPELINE
  // -----------------------------------------------------
  async runOS() {
    console.log("🚀 MULTI-MARKET INTELLIGENCE OS START");

    const products = await this.ingestAll();

    console.log(`📦 INGESTED: ${products.length}`);

    const results = await Promise.all(
      products.map((p) => this.analyzeProduct(p))
    );

    // group by GLOBAL ID (cross-market intelligence)
    const grouped = new Map<string, any[]>();

    for (const r of results) {
      const key = r.globalId || r.productId;

      if (!grouped.has(key)) {
        grouped.set(key, []);
      }

      grouped.get(key)!.push(r);
    }

    const mergedProducts = Array.from(grouped.entries()).map(
      ([globalId, items]) => {
        const base = items[0];

        return {
          productId: globalId,
          title: base.title,

          marketFitScore: Math.max(...items.map(i => i.marketFitScore)),
          trendScore: Math.max(...items.map(i => i.trendScore)),
          winningProbability: Math.max(...items.map(i => i.winningProbability)),
          profitabilityScore: Math.max(...items.map(i => i.profitabilityScore)),
          competitionScore: Math.min(...items.map(i => i.competitionScore)),
        };
      }
    );

    const ranked = productRankingEngine.rank(mergedProducts);

    console.log("🏆 TOP PRODUCTS:", ranked.slice(0, 5));

    return {
      totalProducts: products.length,
      totalMergedEntities: mergedProducts.length,
      results,
      ranked,
    };
  }
}

export function createMultiMarketOS() {
  return new MultiMarketOS([
    { type: "aliexpress" },
    { type: "amazon" },
    { type: "shopify" },
    { type: "tiktok" },
    { type: "custom", config: { products: [] } },
  ]);
}
