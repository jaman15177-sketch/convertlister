import { Product } from "../../product.model";

import { SEOResult } from "./seo.types";

import { KeywordExtractor } from "./keyword.extractor";

export class SEOEngine {
  private extractor = new KeywordExtractor();

  generate(product: Product): SEOResult {
    const keywords = this.extractor.extract(product.title);

    return {
      primaryKeywords: keywords.slice(0, 3),

      secondaryKeywords: keywords.slice(3, 6),

      longTailKeywords: [
        `${product.title} best price`,
        `${product.title} trending product`,
      ],
    };
  }
}
