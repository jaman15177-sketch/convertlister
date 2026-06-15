import {
  ProductInput,
} from "../00-interfaces";

export interface KeywordResult {
  primaryKeywords: string[];
  longTailKeywords: string[];
  buyerIntentKeywords: string[];
  seoScore: number;
}

export class KeywordIntelligenceEngine {
  analyze(
    product: ProductInput
  ): KeywordResult {
    const text =
      `${product.title} ${product.description || ""}`.toLowerCase();

    const primaryKeywords =
      this.extractPrimary(text);

    const longTailKeywords =
      this.generateLongTail(
        product.title,
        product.category
      );

    const buyerIntentKeywords =
      this.detectBuyerIntent(text);

    const seoScore =
      this.calculateSEOScore(
        primaryKeywords,
        buyerIntentKeywords
      );

    return {
      primaryKeywords,
      longTailKeywords,
      buyerIntentKeywords,
      seoScore,
    };
  }

  private extractPrimary(
    text: string
  ): string[] {
    const keywords = [
      "wireless",
      "portable",
      "smart",
      "led",
      "bluetooth",
      "usb",
      "rechargeable",
      "mini",
      "waterproof",
    ];

    return keywords.filter((k) =>
      text.includes(k)
    );
  }

  private generateLongTail(
    title: string,
    category?: string
  ): string[] {
    const base =
      title.toLowerCase();

    const categoryText =
      category || "product";

    return [
      `best ${base} for ${categoryText}`,
      `cheap ${base} online`,
      `${base} review`,
      `buy ${base} in 2026`,
    ];
  }

  private detectBuyerIntent(
    text: string
  ): string[] {
    const intents = [];

    if (
      text.includes("buy") ||
      text.includes("price")
    ) {
      intents.push(
        "high buying intent"
      );
    }

    if (
      text.includes("best")
    ) {
      intents.push(
        "comparison intent"
      );
    }

    if (
      text.includes("cheap")
    ) {
      intents.push(
        "price-sensitive intent"
      );
    }

    return intents;
  }

  private calculateSEOScore(
    primary: string[],
    intent: string[]
  ): number {
    const score =
      primary.length * 10 +
      intent.length * 15;

    return Math.min(
      100,
      score
    );
  }
}

export const keywordIntelligenceEngine =
  new KeywordIntelligenceEngine();
