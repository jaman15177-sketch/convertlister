/**
 * ============================================================
 * CONVERTLISTER
 * KEYWORD EXTRACTOR
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Extract product keywords
 * • Remove duplicates
 * • Prepare search signals
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ SEO ranking
 * ✗ AI generation
 * ✗ Marketplace API call
 * ============================================================
 */


import {
  NORMALIZER_KEYWORD_RULES,
} from "./normalizer.constants";



export class KeywordExtractor {


  /**
   * Extract keywords
   */
  public extract(
    title: string,
    description?: string
  ): string[] {


    const text =
      [
        title,
        description ?? "",
      ]
        .join(" ");



    const words =
      text
        .toLowerCase()
        .replace(
          /[^a-z0-9\s]/g,
          " "
        )
        .split(
          /\s+/
        )
        .map(
          word =>
            word.trim()
        )
        .filter(
          word =>
            word.length >=
            NORMALIZER_KEYWORD_RULES
              .minimumKeywordLength
        );



    return Array.from(
      new Set(words)
    )
    .slice(
      0,
      NORMALIZER_KEYWORD_RULES
        .maximumKeywords
    );

  }


}



export const keywordExtractor =
  new KeywordExtractor();
