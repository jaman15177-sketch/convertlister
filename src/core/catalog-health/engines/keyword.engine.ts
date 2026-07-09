/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Keyword Engine
 * Part 3.1.1 — Foundation
 * ============================================================
 *
 * Enterprise Goals
 * ------------------------------------------------------------
 * ✓ Stateless foundation
 * ✓ Build-safe
 * ✓ Strict TypeScript
 * ✓ Marketplace-aware
 * ✓ SOLID
 * ✓ Reusable across validators
 * ✓ No business logic
 * ============================================================
 */

export interface KeywordToken {
  readonly value: string;
  readonly normalized: string;
  readonly position: number;
}

export interface KeywordFrequency {
  readonly keyword: string;
  readonly count: number;
}

export interface KeywordDensity {
  readonly keyword: string;
  readonly count: number;
  readonly density: number;
}

export interface MarketplaceKeywordProfile {
  readonly marketplace: string;
  readonly minimumTitleKeywords: number;
  readonly maximumTitleKeywords: number;
  readonly recommendedDensity: number;
  readonly maximumDensity: number;
}

export interface KeywordAnalysis {
  readonly keywords: readonly string[];

  readonly primaryKeyword: string;

  readonly frequency: ReadonlyMap<string, number>;
  readonly density: ReadonlyMap<string, number>;

  readonly marketplaceProfile: MarketplaceKeywordProfile;

  readonly totalWords: number;

  readonly uniqueKeywords: number;
}export interface SeoEvaluation {
  readonly score: number;
  readonly grade: "A" | "B" | "C" | "D";
  readonly strengths: readonly string[];
  readonly penalties: readonly string[];
  readonly recommendations: readonly string[];
}

const MIN_KEYWORD_LENGTH = 2;

const MAX_KEYWORD_LENGTH = 64;

const DEFAULT_STOP_WORDS = Object.freeze([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "with",
]);
const AMAZON_STOP_WORDS = Object.freeze([
  ...DEFAULT_STOP_WORDS,
]);

const SHOPIFY_STOP_WORDS = Object.freeze([
  ...DEFAULT_STOP_WORDS,
]);

const ETSY_STOP_WORDS = Object.freeze([
...DEFAULT_STOP_WORDS,

]);
const MARKETPLACE_PROFILES: Readonly<Record<string, MarketplaceKeywordProfile>> =
  Object.freeze({
    generic: {
      marketplace: "generic",
      minimumTitleKeywords: 3,
      maximumTitleKeywords: 12,
      recommendedDensity: 2.0,
      maximumDensity: 3.5,
    },

    amazon: {
      marketplace: "amazon",
      minimumTitleKeywords: 5,
      maximumTitleKeywords: 15,
      recommendedDensity: 2.0,
      maximumDensity: 3.0,
    },

    shopify: {
      marketplace: "shopify",
      minimumTitleKeywords: 3,
      maximumTitleKeywords: 12,
      recommendedDensity: 2.0,
      maximumDensity: 3.5,
    },

    etsy: {
      marketplace: "etsy",
      minimumTitleKeywords: 4,
      maximumTitleKeywords: 14,
      recommendedDensity: 2.5,
      maximumDensity: 4.0,
    },
  });

export class KeywordEngine {
  public constructor() {}
  private normalizeKeyword(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, " ");
  }

  private tokenize(text: string): string[] {
    const normalized = this.normalizeKeyword(text);

    if (!normalized) {
      return [];
    }

    return normalized
      .split(" ")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword.length > 0);
  }

  private removeStopWords(
    keywords: readonly string[],
    marketplace: string
  ): string[] {
    const profile = marketplace.toLowerCase();

    const stopWords = new Set<string>([
      ...DEFAULT_STOP_WORDS,
      ...(profile === "amazon"
        ? AMAZON_STOP_WORDS
        : profile === "shopify"
        ? SHOPIFY_STOP_WORDS
        : profile === "etsy"
        ? ETSY_STOP_WORDS
        : []),
    ]);

    return keywords.filter(
      (keyword) => !stopWords.has(keyword)
    );
  }

  private filterKeywordLength(
  keywords: readonly string[]
): string[] {
  return keywords.filter(
    (keyword) =>
      keyword.length >= MIN_KEYWORD_LENGTH &&
      keyword.length <= MAX_KEYWORD_LENGTH
  );

  }

  private buildFrequencyMap(
  keywords: readonly string[]
): ReadonlyMap<string, number> {
  const frequency = new Map<string, number>();

  for (const keyword of keywords) {
    frequency.set(
      keyword,
      (frequency.get(keyword) ?? 0) + 1
    );
  }

  return frequency;
 }private calculateDensity(
  frequency: ReadonlyMap<string, number>,
  totalWords: number
): ReadonlyMap<string, number> {
  const density = new Map<string, number>();

  if (totalWords <= 0) {
    return density;
  }

  for (const [keyword, count] of frequency.entries()) {
    density.set(
      keyword,
      Number(
        ((count / totalWords) * 100).toFixed(2)
      )
    );
  }

  return density;
}private findPrimaryKeyword(
  frequency: ReadonlyMap<string, number>
): string {
  let primary = "";
  let highest = 0;

  for (const [keyword, count] of frequency.entries()) {
    if (count > highest) {
      highest = count;
      primary = keyword;
    }
  }

  return primary;
}private calculateReadability(text: string) {
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;

  return {
    words,
    sentences,
    averageWordsPerSentence:
      sentences === 0 ? words : words / sentences,
  };
}

public analyzeReadability(text: string) {
  return this.calculateReadability(text);
}

private buildSeoSummary(params: {
  frequency: ReadonlyMap<string, number>;
  duplicates: KeywordFrequency[];
  coverage: number;
}) {

  const score =
    Math.max(
      0,
      100 -
      params.duplicates.length * 5 -
      (100 - params.coverage)
    );

  const strengths: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  if (params.coverage > 70) {
    strengths.push("Good keyword coverage");
  } else {
    recommendations.push("Improve keyword coverage");
  }

  if (params.duplicates.length > 0) {
    warnings.push("Duplicate keywords detected");
    recommendations.push("Reduce keyword repetition");
  }
return {
  score: Math.round(score),
  strengths,
  warnings,
  recommendations,
};
}/**private calculateSeoScore(params: {
  frequency: ReadonlyMap<string, number>;
  density: ReadonlyMap<string, number>;
  duplicates: readonly KeywordFrequency[];
  coverage: number;
  marketplaceProfile: MarketplaceKeywordProfile;
}): SeoScoreResult {

  let score = 100;

  const strengths: string[] = [];
  const penalties: string[] = [];
  const recommendations: string[] = [];

  // ----------------------------------
  // Coverage
  // ----------------------------------

  if (params.coverage >= 80) {
    strengths.push("Excellent keyword coverage");
  } else if (params.coverage >= 60) {
    strengths.push("Good keyword coverage");
    score -= 5;
  } else {
    penalties.push("Low keyword coverage");
    recommendations.push("Increase keyword diversity");
    score -= 20;
  }

  // ----------------------------------
  // Duplicate keywords
  // ----------------------------------

  if (params.duplicates.length > 0) {
    const penalty = Math.min(
      params.duplicates.length * 5,
      20
    );

    score -= penalty;

    penalties.push(
      `${params.duplicates.length} duplicated keyword(s)`
    );

    recommendations.push(
      "Reduce repeated keyword usage"
    );
  }

 

      penalties.push(
        `"${keyword}" exceeds recommended density`
      );

      recommendations.push(
        `Reduce usage of "${keyword}"`
      );
    }
  }

  // ----------------------------------
  // Clamp
  // ----------------------------------

  score = Math.max(
    0,
    Math.min(
      100,
      Math.round(score)
    )
  );

  // ----------------------------------
  // Grade
  // ----------------------------------

  let grade: "A" | "B" | "C" | "D";

  if (score >= 90) {

    grade = "A";

  } else if (score >= 75) {

    grade = "B";

  } else if (score >= 60) {

    grade = "C";

  } else {

    grade = "D";

  }

  return {
    score,
    grade,
    strengths,
    penalties,
    recommendations,
  };
} * Build duplicate keyword list
 */
private detectDuplicates(
  frequency: ReadonlyMap<string, number>
): KeywordFrequency[] {

  const duplicates: KeywordFrequency[] = [];

  for (const [keyword, count] of frequency.entries()) {
    if (count > 1) {
      duplicates.push({
        keyword,
        count,
      });
    }
  }

   return duplicates;
}

/**
 * Generate N-Gram phrases
 */
private generateNGrams(
  tokens: string[],
  size: number
): string[] {  const result: string[] = [];

  if (tokens.length < size) {
    return result;
  }

  for (let i = 0; i <= tokens.length - size; i++) {
    const phrase = tokens.slice(i, i + size).join(" ");
    result.push(phrase);
  }

  return result;
}

/**
 * Extract keyword phrases (2-gram + 3-gram)
 */
private extractPhrases(tokens: string[]): string[] {
  const bigrams = this.generateNGrams(tokens, 2);
  const trigrams = this.generateNGrams(tokens, 3);

  return [...bigrams, ...trigrams];
}

/**
 * Keyword coverage score
 */
private calculateCoverage(
  tokens: string[],
  frequency: ReadonlyMap<string, number>
): number {
  if (tokens.length === 0) {
    return 0;
  }

  const uniqueKeywords = frequency.size;
  const coverage = (uniqueKeywords / tokens.length) * 100;

  return Number(coverage.toFixed(2));
}

/**
 * Weight keywords based on frequency importance
 */
private calculateKeywordWeight(
  frequency: ReadonlyMap<string, number>
): Map<string, number> {
  const weights = new Map<string, number>();

  for (const [keyword, count] of frequency.entries()) {
    weights.set(keyword, count);
  }

  return weights;
}

/**
 * Check if engine output is SEO-ready
 */
private isSeoReady(
  tokens: string[],
  frequency: ReadonlyMap<string, number>
): boolean {
  return tokens.length > 0 && frequency.size > 0;
 }/**
 * ============================================================
 * Enterprise SEO Evaluation
 * Public API
 * ============================================================
 */
public evaluateSeo(params: {
  readonly frequency: ReadonlyMap<string, number>;
  readonly density: ReadonlyMap<string, number>;
  readonly coverage: number;
  readonly duplicates: readonly string[];
  readonly marketplaceProfile: MarketplaceKeywordProfile;
}): SeoEvaluation {

  const {
    frequency,
    density,
    coverage,
    duplicates,
    marketplaceProfile,
  } = params;

  const strengths: string[] = [];

  const penalties: string[] = [];

  const recommendations: string[] = [];

  let score = 100;

// --------------------------------------------------
// Coverage
// --------------------------------------------------

if (coverage >= 80) {

  strengths.push("Excellent keyword coverage");

} else if (coverage >= 60) {

  strengths.push("Good keyword coverage");

} else {

  penalties.push("Low keyword coverage");
  recommendations.push(
    "Increase unique keyword diversity."
  );

  score -= 15;

}

// --------------------------------------------------
// Duplicate Keywords
// --------------------------------------------------

if (duplicates.length > 0) {

  penalties.push(
    `${duplicates.length} duplicate keyword(s) detected.`
  );

  recommendations.push(
    "Reduce repeated keyword usage."
  );

  score -= Math.min(
    duplicates.length * 3,
    20
  );

}

// --------------------------------------------------
// Density Validation
// --------------------------------------------------

for (const [keyword, value] of density.entries()) {

  if (
    value >
    marketplaceProfile.maximumDensity
  ) {

    penalties.push(
      `"${keyword}" exceeds recommended density.`
    );

     score -= 5;

    }

} // --------------------------------------------------
// Clamp Score
// --------------------------------------------------

score = Math.max(
  0,
  Math.min(
    100,
    Math.round(score)
  )
);

// --------------------------------------------------
// Grade
// --------------------------------------------------

let grade: "A" | "B" | "C" | "D";

if (score >= 90) {

  grade = "A";

} else if (score >= 75) {

  grade = "B";

} else if (score >= 60) {

  grade = "C";

} else {

  grade = "D";

}

// --------------------------------------------------
// Return
// --------------------------------------------------

return {
  score,
  grade,
  strengths,
  penalties,
  recommendations,
};

}
  private createMarketplaceProfile(
  marketplace: string
): MarketplaceKeywordProfile {
  const key = marketplace.trim().toLowerCase();

  if (
    Object.prototype.hasOwnProperty.call(
      MARKETPLACE_PROFILES,
      key
    )
  ) {
    return MARKETPLACE_PROFILES[key];
  }

  return MARKETPLACE_PROFILES.generic;
}public analyze(
  text: string,
  marketplace = "generic"
): KeywordAnalysis {
  const tokens = this.tokenize(text);

  const keywords = this.filterKeywordLength(
    this.removeStopWords(
      tokens,
      marketplace
    )
  );

  const frequency =
    this.buildFrequencyMap(keywords);

  const density =
    this.calculateDensity(
      frequency,
      keywords.length
    );

  const primaryKeyword =
    this.findPrimaryKeyword(frequency);

  return {
    keywords,
    primaryKeyword,
    frequency,
    density,
    marketplaceProfile:
      this.createMarketplaceProfile(
        marketplace
      ),
    totalWords: keywords.length,
    uniqueKeywords: frequency.size,
  };
}
} // KeywordEngine class ends here

export {
  MIN_KEYWORD_LENGTH,
  MAX_KEYWORD_LENGTH,
  DEFAULT_STOP_WORDS,
  AMAZON_STOP_WORDS,
  SHOPIFY_STOP_WORDS,
  ETSY_STOP_WORDS,
  MARKETPLACE_PROFILES,
};
