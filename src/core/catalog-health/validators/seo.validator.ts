/**
 * ============================================================
 * CONVERTLISTER
 * Enterprise SEO Validator
 * Part 1 — Foundation
 * ============================================================
 */

import { BaseValidator } from "../base/base-validator";
import { KeywordEngine } from "../engines/keyword.engine";
import type { AdapterProduct } from "@/adapters/core/adapter.contract";

import type { HealthCategory } from "../health.types";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

export default class SEOValidator extends BaseValidator {
  public readonly category: HealthCategory = "SEO";

  private readonly keywordEngine =
    new KeywordEngine();

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {    const startedAt = this.startTelemetry();

    await this.beforeValidate(input);

    const result = this.emptyResult();

    const product: AdapterProduct = input.product;

    const marketplace =
      this.getMarketplace(input);

    /**
     * Normalized values
     */

    const title =
      this.normalizeText(product.title);

    const description =
      this.normalizeText(product.description);

    const brand =
      this.normalizeBrand(product.brand);

    const category =
      this.normalizeCategory(product.category);
/**
 * ============================================================
 * PART 1 — SECTION 1
 * Keyword Intelligence Foundation
 * ============================================================
 */

const seoText = [
  title,
  description,
  brand,
  category,
]
  .filter((value) => value.length > 0)
  .join(" ");

const keywordAnalysis =
  this.keywordEngine.analyze(
    seoText,
    marketplace
  );

const {
  marketplaceProfile,
  totalWords,
  uniqueKeywords,
  primaryKeyword,
  frequency,
  density,
} = keywordAnalysis;

const keywordContext = {
  marketplaceProfile,
  totalWords,
  uniqueKeywords,
  primaryKeyword,
  frequency,
  density,
} as const;if (
  keywordAnalysis.uniqueKeywords <
  keywordAnalysis.marketplaceProfile.minimumTitleKeywords
) {
  this.warning(
    result,
    "SEO_KEYWORD_TOO_FEW",
    "Not enough unique keywords.",
    `Use at least ${keywordAnalysis.marketplaceProfile.minimumTitleKeywords} keywords.`
  );

  this.deductScore(result, 5);
} /**
 * ============================================================
 * PART 1 — SECTION 2
 * Coverage Validation
 * Duplicate Validation
 * ============================================================
 */

const coverage =
  keywordContext.totalWords === 0
    ? 0
    : Number(
        (
          (keywordContext.uniqueKeywords /
            keywordContext.totalWords) *
          100
        ).toFixed(2)
      );

if (coverage < 60) {

  this.warning(
    result,
    "SEO_LOW_KEYWORD_COVERAGE",
    "Keyword coverage is below the recommended threshold.",
    "Increase unique keyword diversity."
  );

  this.deductScore(result, 5);

}

const duplicateKeywords: string[] = [];

for (const [keyword, count] of keywordContext.frequency.entries()) {

  if (count > 1) {

    duplicateKeywords.push(keyword);

  }

}

if (duplicateKeywords.length > 0) {

  this.warning(
    result,
    "SEO_DUPLICATE_KEYWORDS",
    `Detected ${duplicateKeywords.length} duplicated keyword(s).`,
    "Reduce repeated keyword usage."
  );

  this.deductScore(
    result,
    Math.min(
      duplicateKeywords.length * 2,
      10
    )
  );

}     /**
/**
 * ============================================================
 * PART 1 — SECTION 3a
 * KeywordEngine Enterprise SEO Evaluation
 * ============================================================
 */

const seoEvaluation =
  this.keywordEngine.evaluateSeo({
    frequency: keywordContext.frequency,
    density: keywordContext.density,
    coverage,
    duplicates: duplicateKeywords,
    marketplaceProfile:
      keywordContext.marketplaceProfile,
  });const seoScore = seoEvaluation.score;
/**
 * ============================================================
 * PART 1 — SECTION 3b
 * SEO Score Integration
 * ============================================================
 */

(result as ValidatorResult & {
  seoScore?: number;
}).seoScore = seoEvaluation.score;
/**
 * ============================================================
 * PART 1 — SECTION 3c
 * SEO Grade Integration
 * ============================================================
 */

(result as ValidatorResult & {
  seoGrade?: "A" | "B" | "C" | "D";
}).seoGrade = seoEvaluation.grade;/**
 * ============================================================
 * PART 1 — SECTION 3d
 * Strengths Integration
 * ============================================================
 */

(result as ValidatorResult & {
  strengths?: readonly string[];
}).strengths = seoEvaluation.strengths;/**
 * ============================================================
 * PART 1 — SECTION 3e
 * Penalties Integration
 * ============================================================
 */

(result as ValidatorResult & {
  penalties?: readonly string[];
}).penalties = seoEvaluation.penalties;/**
 * ============================================================
 * PART 1 — SECTION 3f
 * Recommendations Integration
 * ============================================================
 */

(result as ValidatorResult & {
  recommendations?: readonly string[];
}).recommendations = seoEvaluation.recommendations;/**
 * ============================================================
 * PART 2 — SECTION 1
 * Readability Analysis
 * ============================================================
 */

const readability =
  this.keywordEngine.analyzeReadability(
    description
  );/**
 * ============================================================
 * PART 2 — SECTION 2
 * Word & Sentence Metrics
 * ============================================================
 */

const readabilityMetrics = {
  wordCount: readability.words,
  sentenceCount: readability.sentences,
  averageWordsPerSentence:
    readability.averageWordsPerSentence,
} as const;/**
 * ============================================================
 * PART 2 — SECTION 3
 * Readability Score Calculation
 * ============================================================
 */

let readabilityScore = 100;

/**
 * Very short descriptions
 */

if (readabilityMetrics.wordCount < 30) {
  readabilityScore -= 25;
}

/**
 * Very long descriptions
 */

if (readabilityMetrics.wordCount > 500) {
  readabilityScore -= 5;
}

/**
 * Long sentences
 */

if (
  readabilityMetrics.averageWordsPerSentence >
  25
) {
  readabilityScore -= 15;
}

/**
 * Too few sentences
 */

if (
  readabilityMetrics.sentenceCount < 2
) {
  readabilityScore -= 10;
}

readabilityScore = Math.max(
  0,
  Math.min(100, readabilityScore)
);/**
 * ============================================================
 * PART 2 — SECTION 4
 * Readability Validation Rules
 * ============================================================
 */

if (readabilityMetrics.wordCount < 30) {

  this.warning(
    result,
    "SEO_READABILITY_TOO_SHORT",
    "Description is too short for good readability.",
    "Expand the description with more useful content."
  );

  this.deductScore(result, 8);

}

if (
  readabilityMetrics.averageWordsPerSentence >
  25
) {

  this.warning(
    result,
    "SEO_SENTENCE_TOO_LONG",
    "Sentences are too long.",
    "Break long sentences into shorter ones."
  );

  this.deductScore(result, 5);

}

if (
  readabilityMetrics.sentenceCount < 2
) {

  this.warning(
    result,
    "SEO_TOO_FEW_SENTENCES",
    "Description contains too few sentences.",
    "Use multiple sentences to improve readability."
  );

  this.deductScore(result, 5);

}/**
 * ============================================================
 * PART 2 — SECTION 5
 * Readability Result Integration
 * ============================================================
 */

if (readabilityScore >= 90) {

  (result as ValidatorResult & {
    strengths?: string[];
  }).strengths ??= [];

  (result as ValidatorResult & {
    strengths: string[];
  }).strengths.push(
    "Excellent readability."
  );

}

if (readabilityScore < 70) {

  (result as ValidatorResult & {
    penalties?: string[];
  }).penalties ??= [];

  (result as ValidatorResult & {
    penalties: string[];
  }).penalties.push(
    "Poor readability."
  );

}

if (readabilityScore < 80) {

  (result as ValidatorResult & {
    recommendations?: string[];
  }).recommendations ??= [];

  (result as ValidatorResult & {
    recommendations: string[];
  }).recommendations.push(
    "Improve sentence structure and readability."
  );

/**
 * ============================================================
 * PART 2 — SECTION 6
 * Final Readability Integration
 * ============================================================
 */

(result as ValidatorResult & {
  readabilityScore?: number;
}).readabilityScore = readabilityScore;}/**
 * ============================================================
 * PART 3 — SECTION 1
 * Core Content Weight
 * ============================================================
 */

let titleWeight = 0;
let descriptionWeight = 0;
let brandWeight = 0;
let categoryWeight = 0;

/**
 * ------------------------------------------------------------
 * Title Weight (40)
 * ------------------------------------------------------------
 */

if (title.length >= 80 && title.length <= 120) {

  titleWeight = 40;

} else if (title.length >= 25) {

  titleWeight = 35;

} else if (title.length > 0) {

  titleWeight = 20;

}

/**
 * ------------------------------------------------------------
 * Description Weight (30)
 * ------------------------------------------------------------
 */

if (description.length >= 300) {

  descriptionWeight = 30;

} else if (description.length >= 120) {

  descriptionWeight = 25;

} else if (description.length > 0) {

  descriptionWeight = 15;

}

/**
 * ------------------------------------------------------------
 * Brand Weight (15)
 * ------------------------------------------------------------
 */

if (brand.length > 0) {

  brandWeight = 15;

}

/**
 * ------------------------------------------------------------
 * Category Weight (15)
 * ------------------------------------------------------------
 */

if (category.length > 0) {

  categoryWeight = 15;

}

/**
 * ------------------------------------------------------------
 * Core Content Score
 * ------------------------------------------------------------
 */

const coreContentScore =
  titleWeight +
  descriptionWeight +
  brandWeight +
  categoryWeight;/**
 * ============================================================
 * PART 3 — SECTION 2
 * Keyword Weight
 * ============================================================
 */

let keywordPlacementWeight = 0;
let exactMatchWeight = 0;
let longTailKeywordWeight = 0;

/**
 * ------------------------------------------------------------
 * Keyword Placement (15)
 * ------------------------------------------------------------
 */

if (
  keywordContext.primaryKeyword.length > 0 &&
  title
    .toLowerCase()
    .includes(
      keywordContext.primaryKeyword.toLowerCase()
    )
) {

  keywordPlacementWeight = 15;

}

/**
 * ------------------------------------------------------------
 * Exact Match (10)
 * ------------------------------------------------------------
 */

if (
  keywordContext.primaryKeyword.length > 0 &&
  title
    .trim()
    .toLowerCase()
    .startsWith(
      keywordContext.primaryKeyword.toLowerCase()
    )
) {

  exactMatchWeight = 10;

}

/**
 * ------------------------------------------------------------
 * Long-tail Keywords (15)
 * ------------------------------------------------------------
 */

const longTailKeywords =
  Array.from(
    keywordContext.frequency.keys()
  ).filter(
    (keyword) =>
      keyword.trim().split(/\s+/).length >= 3
  );

if (longTailKeywords.length >= 3) {

  longTailKeywordWeight = 15;

} else if (longTailKeywords.length >= 1) {

  longTailKeywordWeight = 8;

}

/**
 * ------------------------------------------------------------
 * Keyword Score
 * ------------------------------------------------------------
 */

const keywordWeightScore =
  keywordPlacementWeight +
  exactMatchWeight +
  longTailKeywordWeight;/**
 * ============================================================
 * PART 3 — SECTION 3
 * Weighted SEO Engine
 * ============================================================
 */

/**
 * Core Content
 * = 100
 *
 * Keyword Weight
 * = 40
 *
 * Total
 * = 140
 */

const weightedSeoScore = Math.round(
  ((coreContentScore + keywordWeightScore) /
    140) *
    100
);

/**
 * Clamp
 */

const normalizedWeightedSeoScore =
  Math.max(
    0,
    Math.min(
      100,
      weightedSeoScore
    )
  );

/**
 * Grade
 */

let weightedSeoGrade:
  | "A"
  | "B"
  | "C"
  | "D";

if (
  normalizedWeightedSeoScore >= 90
) {

  weightedSeoGrade = "A";

} else if (
  normalizedWeightedSeoScore >= 75
) {

  weightedSeoGrade = "B";

} else if (
  normalizedWeightedSeoScore >= 60
) {

  weightedSeoGrade = "C";

} else {

  weightedSeoGrade = "D";

}/**
 * ============================================================
 * PART 3 — SECTION 4
 * Weighted SEO Result Integration
 * ============================================================
 */

(result as ValidatorResult & {
  weightedSeoScore?: number;
}).weightedSeoScore =
  normalizedWeightedSeoScore;

(result as ValidatorResult & {
  weightedSeoGrade?: "A" | "B" | "C" | "D";
}).weightedSeoGrade =
  weightedSeoGrade;

/**
 * ------------------------------------------------------------
 * Strengths
 * ------------------------------------------------------------
 */

if (normalizedWeightedSeoScore >= 90) {

  (result as ValidatorResult & {
    strengths?: string[];
  }).strengths ??= [];

  (result as ValidatorResult & {
    strengths: string[];
  }).strengths.push(
    "Excellent weighted SEO optimization."
  );

}

/**
 * ------------------------------------------------------------
 * Penalties
 * ------------------------------------------------------------
 */

if (normalizedWeightedSeoScore < 70) {

  (result as ValidatorResult & {
    penalties?: string[];
  }).penalties ??= [];

  (result as ValidatorResult & {
    penalties: string[];
  }).penalties.push(
    "Overall weighted SEO score is below the recommended threshold."
  );

}

/**
 * ------------------------------------------------------------
 * Recommendations
 * ------------------------------------------------------------
 */

if (normalizedWeightedSeoScore < 90) {

  (result as ValidatorResult & {
    recommendations?: string[];
  }).recommendations ??= [];

  (result as ValidatorResult & {
    recommendations: string[];
  }).recommendations.push(
    "Improve title quality, description quality and keyword placement."
  );

}/**
 * ============================================================
 * PART 4 — SECTION 1
 * Metadata Validation
 * ============================================================
 */

const metaTitle =
  this.normalizeText(
    product.seo?.metaTitle ?? ""
  );

const metaDescription =
  this.normalizeText(
    product.seo?.metaDescription ?? ""
  );

/**
 * ------------------------------------------------------------
 * Meta Title
 * ------------------------------------------------------------
 */

if (!metaTitle) {

  this.warning(
    result,
    "SEO_META_TITLE_MISSING",
    "Meta title is missing.",
    "Add an SEO meta title."
  );

  this.deductScore(result, 5);

} else {

  if (metaTitle.length < 30) {

    this.warning(
      result,
      "SEO_META_TITLE_TOO_SHORT",
      "Meta title is too short.",
      "Recommended length is 30–60 characters."
    );

    this.deductScore(result, 2);

  }

  if (metaTitle.length > 60) {

    this.warning(
      result,
      "SEO_META_TITLE_TOO_LONG",
      "Meta title is too long.",
      "Keep the meta title below 60 characters."
    );

    this.deductScore(result, 2);

  }

}

/**
 * ------------------------------------------------------------
 * Meta Description
 * ------------------------------------------------------------
 */

if (!metaDescription) {

  this.warning(
    result,
    "SEO_META_DESCRIPTION_MISSING",
    "Meta description is missing.",
    "Add an SEO meta description."
  );

  this.deductScore(result, 5);

} else {

  if (metaDescription.length < 120) {

    this.warning(
      result,
      "SEO_META_DESCRIPTION_TOO_SHORT",
      "Meta description is too short.",
      "Recommended length is 120–160 characters."
    );

    this.deductScore(result, 2);

  }

  if (metaDescription.length > 160) {

    this.warning(
      result,
      "SEO_META_DESCRIPTION_TOO_LONG",
      "Meta description is too long.",
      "Keep the meta description below 160 characters."
    );

    this.deductScore(result, 2);

  }

}/**
 * ============================================================
 * PART 4 — SECTION 2
 * URL SEO Validation
 * ============================================================
 */

const slug =
  this.normalizeText(
    product.seo?.slug ?? ""
  );

const canonicalUrl =
  this.normalizeText(
    product.seo?.canonicalUrl ?? ""
  );

/**
 * ------------------------------------------------------------
 * URL Slug
 * ------------------------------------------------------------
 */

if (!slug) {

  this.warning(
    result,
    "SEO_SLUG_MISSING",
    "URL slug is missing.",
    "Generate an SEO-friendly slug."
  );

  this.deductScore(result, 3);

} else {

  if (!/^[a-z0-9-]+$/.test(slug)) {

    this.warning(
      result,
      "SEO_SLUG_INVALID",
      "Slug contains invalid characters.",
      "Use lowercase letters, numbers and hyphens only."
    );

    this.deductScore(result, 2);

  }

  if (slug.length > 80) {

    this.warning(
      result,
      "SEO_SLUG_TOO_LONG",
      "Slug is too long.",
      "Keep the slug below 80 characters."
    );

    this.deductScore(result, 2);

  }

}

/**
 * ------------------------------------------------------------
 * Canonical URL
 * ------------------------------------------------------------
 */

if (!canonicalUrl) {

  this.warning(
    result,
    "SEO_CANONICAL_MISSING",
    "Canonical URL is missing.",
    "Specify a canonical URL."
  );

  this.deductScore(result, 3);

} else {

  try {

    new URL(canonicalUrl);

  } catch {

    this.warning(
      result,
      "SEO_CANONICAL_INVALID",
      "Canonical URL is invalid.",
      "Provide a valid absolute URL."
    );

    this.deductScore(result, 2);

  }
}/**
 * ============================================================
 * PART 4 — SECTION 4
 * Meta SEO Result Integration
 * ============================================================
 */

/**
 * Meta SEO Score
 */
const robots =
  this.normalizeText(
    product.seo?.robots ?? ""
  ).toLowerCase();
let metaSeoScore = 100;

/**
 * Missing Metadata
 */

if (!metaTitle) {
  metaSeoScore -= 15;
}

if (!metaDescription) {
  metaSeoScore -= 15;
}

if (!slug) {
  metaSeoScore -= 10;
}

if (!canonicalUrl) {
  metaSeoScore -= 10;
}

if (!robots) {
  metaSeoScore -= 10;
}

/**
 * Clamp
 */

metaSeoScore = Math.max(
  0,
  Math.min(100, metaSeoScore)
);

/**
 * Grade
 */

let metaSeoGrade:
  | "A"
  | "B"
  | "C"
  | "D";

if (metaSeoScore >= 90) {

  metaSeoGrade = "A";

} else if (metaSeoScore >= 75) {

  metaSeoGrade = "B";

} else if (metaSeoScore >= 60) {

  metaSeoGrade = "C";

} else {

  metaSeoGrade = "D";

}

/**
 * Result Integration
 */

(result as ValidatorResult & {
  metaSeoScore?: number;
}).metaSeoScore = metaSeoScore;

(result as ValidatorResult & {
  metaSeoGrade?: "A" | "B" | "C" | "D";
}).metaSeoGrade = metaSeoGrade;

/**
 * Strengths
 */

if (metaSeoScore >= 90) {

  (result as ValidatorResult & {
    strengths?: string[];
  }).strengths ??= [];

  (result as ValidatorResult & {
    strengths: string[];
  }).strengths.push(
    "Excellent metadata optimization."
  );

}

/**
 * Penalties
 */

if (metaSeoScore < 70) {

  (result as ValidatorResult & {
    penalties?: string[];
  }).penalties ??= [];

  (result as ValidatorResult & {
    penalties: string[];
  }).penalties.push(
    "Metadata quality needs improvement."
  );

}

/**
 * Recommendations
 */

if (metaSeoScore < 90) {

  (result as ValidatorResult & {
    recommendations?: string[];
  }).recommendations ??= [];

  (result as ValidatorResult & {
    recommendations: string[];
  }).recommendations.push(
    "Improve Meta Title, Description, Slug, Canonical URL and Robots directives."
  );

}/**
 * ============================================================
 * PART 5A
 * Marketplace-specific SEO Rules
 * ============================================================
 */

switch (marketplace.toLowerCase()) {

  /**
   * ------------------------------------------------------------
   * AMAZON
   * ------------------------------------------------------------
   */

  case "amazon":

    if (title.length < 80) {

      this.warning(
        result,
        "AMAZON_TITLE_TOO_SHORT",
        "Amazon titles should normally be at least 80 characters.",
        "Increase title length."
      );

      this.deductScore(result, 4);

    }

    if (description.length < 200) {

      this.warning(
        result,
        "AMAZON_DESCRIPTION_SHORT",
        "Amazon description is too short.",
        "Expand product description."
      );

      this.deductScore(result, 3);

    }

    break;

  /**
   * ------------------------------------------------------------
   * SHOPIFY
   * ------------------------------------------------------------
   */

  case "shopify":

    if (metaTitle.length === 0) {

      this.warning(
        result,
        "SHOPIFY_META_TITLE",
        "Missing Shopify meta title.",
        "Provide SEO title."
      );

      this.deductScore(result, 3);

    }

    break;

  /**
   * ------------------------------------------------------------
   * WOOCOMMERCE
   * ------------------------------------------------------------
   */

  case "woocommerce":

    if (!category) {

      this.warning(
        result,
        "WC_CATEGORY",
        "WooCommerce category missing.",
        "Assign a category."
      );

      this.deductScore(result, 3);

    }

    break;

  /**
   * ------------------------------------------------------------
   * ETSY
   * ------------------------------------------------------------
   */

  case "etsy":

    if (
      keywordContext.uniqueKeywords < 10
    ) {

      this.warning(
        result,
        "ETSY_KEYWORDS",
        "Not enough Etsy keywords.",
        "Increase keyword diversity."
      );

      this.deductScore(result, 3);

    }

    break;

  /**
   * ------------------------------------------------------------
   * EBAY
   * ------------------------------------------------------------
   */

  case "ebay":

    if (title.length > 80) {

      this.warning(
        result,
        "EBAY_TITLE_LONG",
        "eBay title exceeds recommended length.",
        "Shorten the title."
      );

      this.deductScore(result, 2);

    }

    break;

  /**
   * ------------------------------------------------------------
   * TIKTOK SHOP
   * ------------------------------------------------------------
   */

  case "tiktok":

  case "tiktok-shop":

    if (description.length < 150) {

      this.warning(
        result,
        "TIKTOK_DESCRIPTION",
        "TikTok Shop description is short.",
        "Expand description."
      );

      this.deductScore(result, 3);

    }

    break;

  /**
   * ------------------------------------------------------------
   * GENERIC
   * ------------------------------------------------------------
   */

  default:

    if (title.length < 30) {

      this.warning(
        result,
        "GENERIC_TITLE",
        "Title is shorter than recommended.",
        "Improve title quality."
      );

      this.deductScore(result, 2);

    }

    break;

}/**
 * ============================================================
 * PART 5B-1
 * Marketplace SEO Score
 * ============================================================
 */

let marketplaceSeoScore = 100;

/**
 * Marketplace deductions
 */

switch (marketplace.toLowerCase()) {

  case "amazon":

    if (title.length < 80) {
      marketplaceSeoScore -= 10;
    }

    if (description.length < 200) {
      marketplaceSeoScore -= 5;
    }

    break;

  case "shopify":

    if (!metaTitle) {
      marketplaceSeoScore -= 8;
    }

    if (!metaDescription) {
      marketplaceSeoScore -= 8;
    }

    break;

  case "woocommerce":

    if (!category) {
      marketplaceSeoScore -= 8;
    }

    break;

  case "etsy":

    if (
      keywordContext.uniqueKeywords < 10
    ) {
      marketplaceSeoScore -= 8;
    }

    break;

  case "ebay":

    if (title.length > 80) {
      marketplaceSeoScore -= 5;
    }

    break;

  case "tiktok":

  case "tiktok-shop":

    if (description.length < 150) {
      marketplaceSeoScore -= 8;
    }

    break;

  default:

    if (title.length < 30) {
      marketplaceSeoScore -= 5;
    }

    break;

}

/**
 * Clamp
 */

marketplaceSeoScore = Math.max(
  0,
  Math.min(
    100,
    Math.round(marketplaceSeoScore)
  )
);

/**
 * Marketplace Grade
 */

let marketplaceSeoGrade:
  | "A"
  | "B"
  | "C"
  | "D";

if (marketplaceSeoScore >= 90) {

  marketplaceSeoGrade = "A";

} else if (marketplaceSeoScore >= 75) {

  marketplaceSeoGrade = "B";

} else if (marketplaceSeoScore >= 60) {

  marketplaceSeoGrade = "C";

} else {

  marketplaceSeoGrade = "D";

}/**
 * ============================================================
 * PART 5B-2
 * Marketplace Result Integration
 * ============================================================
 */

const marketplaceStrengths: string[] = [];
const marketplacePenalties: string[] = [];
const marketplaceRecommendations: string[] = [];

/**
 * ------------------------------------------------------------
 * Marketplace Evaluation
 * ------------------------------------------------------------
 */

if (marketplaceSeoScore >= 90) {

  marketplaceStrengths.push(
    `${marketplace} SEO is highly optimized.`
  );

} else if (marketplaceSeoScore >= 75) {

  marketplaceStrengths.push(
    `${marketplace} SEO is well optimized.`
  );

} else {

  marketplacePenalties.push(
    `${marketplace} SEO requires optimization.`
  );

}

switch (marketplace.toLowerCase()) {

  case "amazon":

    if (title.length < 80) {

      marketplaceRecommendations.push(
        "Increase Amazon title length."
      );

    }

    if (description.length < 200) {

      marketplaceRecommendations.push(
        "Expand Amazon description."
      );

    }

    break;

  case "shopify":

    if (!metaTitle) {

      marketplaceRecommendations.push(
        "Add Shopify meta title."
      );

    }

    if (!metaDescription) {

      marketplaceRecommendations.push(
        "Add Shopify meta description."
      );

    }

    break;

  case "woocommerce":

    if (!category) {

      marketplaceRecommendations.push(
        "Assign WooCommerce category."
      );

    }

    break;

  case "etsy":

    if (
      keywordContext.uniqueKeywords < 10
    ) {

      marketplaceRecommendations.push(
        "Increase Etsy keyword diversity."
      );

    }

    break;

  case "ebay":

    if (title.length > 80) {

      marketplaceRecommendations.push(
        "Reduce eBay title length."
      );

    }

    break;

  case "tiktok":

  case "tiktok-shop":

    if (description.length < 150) {

      marketplaceRecommendations.push(
        "Expand TikTok Shop description."
      );

    }

    break;

  default:

    marketplaceRecommendations.push(
      "Follow marketplace SEO best practices."
    );

}

/**
 * ------------------------------------------------------------
 * Result Integration
 * ------------------------------------------------------------
 */

(result as ValidatorResult & {
  marketplaceSeoScore?: number;
}).marketplaceSeoScore = marketplaceSeoScore;

(result as ValidatorResult & {
  marketplaceSeoGrade?: "A" | "B" | "C" | "D";
}).marketplaceSeoGrade = marketplaceSeoGrade;

(result as ValidatorResult & {
  marketplaceStrengths?: string[];
}).marketplaceStrengths = marketplaceStrengths;

(result as ValidatorResult & {
  marketplacePenalties?: string[];
}).marketplacePenalties = marketplacePenalties;

(result as ValidatorResult & {
  marketplaceRecommendations?: string[];
}).marketplaceRecommendations =
  marketplaceRecommendations;/**
 * ============================================================
 * PART 6 — SECTION 1
 * BLOCK A
 * Priority Analysis Engine
 * ============================================================
 */

const criticalIssues: string[] = [];

const highPriorityIssues: string[] = [];

const mediumPriorityIssues: string[] = [];

const lowPriorityIssues: string[] = [];

/**
 * ------------------------------------------------------------
 * Critical
 * ------------------------------------------------------------
 */

if (!title) {

  criticalIssues.push(
    "Missing product title."
  );

}

if (!description) {

  criticalIssues.push(
    "Missing product description."
  );

}

if (!category) {

  criticalIssues.push(
    "Missing product category."
  );

}

/**
 * ------------------------------------------------------------
 * High Priority
 * ------------------------------------------------------------
 */

if (!metaTitle) {

  highPriorityIssues.push(
    "Missing meta title."
  );

}

if (!metaDescription) {

  highPriorityIssues.push(
    "Missing meta description."
  );

}

if (!canonicalUrl) {

  highPriorityIssues.push(
    "Missing canonical URL."
  );

}

if (!slug) {

  highPriorityIssues.push(
    "Missing SEO slug."
  );

}

/**
 * ------------------------------------------------------------
 * Medium Priority
 * ------------------------------------------------------------
 */

if (
  keywordContext.uniqueKeywords <
  keywordContext.marketplaceProfile.minimumTitleKeywords
) {

  mediumPriorityIssues.push(
    "Increase keyword diversity."
  );

}

if (
  readabilityScore < 70
) {

  mediumPriorityIssues.push(
    "Improve readability."
  );

}

if (
  weightedSeoScore < 75
) {

  mediumPriorityIssues.push(
    "Improve weighted SEO quality."
  );

}

/**
 * ------------------------------------------------------------
 * Low Priority
 * ------------------------------------------------------------
 */

if (
  marketplaceSeoScore < 90
) {

  lowPriorityIssues.push(
    "Fine tune marketplace SEO."
  );

}

if (
  metaSeoScore < 90
) {

  lowPriorityIssues.push(
    "Optimize metadata."
  );

}/**
 * ============================================================
 * PART 6 — SECTION 1
 * BLOCK B
 * Priority Scoring Engine
 * ============================================================
 */

let priorityScore = 100;

/**
 * ------------------------------------------------------------
 * Priority Score
 * ------------------------------------------------------------
 */

priorityScore -= criticalIssues.length * 25;

priorityScore -= highPriorityIssues.length * 10;

priorityScore -= mediumPriorityIssues.length * 5;

priorityScore -= lowPriorityIssues.length * 2;

priorityScore = Math.max(
  0,
  Math.min(
    100,
    Math.round(priorityScore)
  )
);

/**
 * ------------------------------------------------------------
 * Issue Ranking
 * ------------------------------------------------------------
 */

const rankedIssues = [
  ...criticalIssues.map(issue => ({
    level: "critical" as const,
    issue,
    weight: 100,
  })),

  ...highPriorityIssues.map(issue => ({
    level: "high" as const,
    issue,
    weight: 75,
  })),

  ...mediumPriorityIssues.map(issue => ({
    level: "medium" as const,
    issue,
    weight: 50,
  })),

  ...lowPriorityIssues.map(issue => ({
    level: "low" as const,
    issue,
    weight: 25,
  })),
].sort(
  (a, b) => b.weight - a.weight
);

/**
 * ------------------------------------------------------------
 * Recommendation Ranking
 * ------------------------------------------------------------
 */

const rankedRecommendations = [
  ...marketplaceRecommendations,
].filter(
  (value, index, array) =>
    array.indexOf(value) === index
);

/**
 * ------------------------------------------------------------
 * Temporary Result Integration
 * ------------------------------------------------------------
 */

(result as ValidatorResult & {
  priorityScore?: number;
}).priorityScore = priorityScore;

(result as ValidatorResult & {
  rankedIssues?: typeof rankedIssues;
}).rankedIssues = rankedIssues;

(result as ValidatorResult & {
  rankedRecommendations?: string[];
}).rankedRecommendations =
  rankedRecommendations;/**
  
 * ============================================================
 * TITLE REQUIRED
 * ============================================================
 */    if (!title) {
      this.critical(
        result,
        "SEO_TITLE_REQUIRED",
        "Product title is missing.",
        "Provide a descriptive SEO-friendly title."
      );

      this.deductScore(result, 30);
    }

    /**
     * ============================================================
     * TITLE LENGTH
     * ============================================================
     */

    if (title.length > 0 && title.length < 25) {
      this.warning(
        result,
        "SEO_TITLE_TOO_SHORT",
        "SEO title is too short.",
        "Use at least 25 characters."
      );

      this.deductScore(result, 8);
    }

    if (title.length > 120) {
      this.warning(
        result,
        "SEO_TITLE_TOO_LONG",
        "SEO title is too long.",
        "Keep title below 120 characters."
      );

      this.deductScore(result, 8);
    }

    /**
     * ============================================================
     * DESCRIPTION REQUIRED
     * ============================================================
     */

    if (!description) {
      this.warning(
        result,
        "SEO_DESCRIPTION_MISSING",
        "Product description is missing.",
        "Add an SEO description."
      );

      this.deductScore(result, 15);
    }

    /**
     * ============================================================
     * DESCRIPTION LENGTH
     * ============================================================
     */

    if (
      description.length > 0 &&
      description.length < 120
    ) {
      this.warning(
        result,
        "SEO_DESCRIPTION_TOO_SHORT",
        "Description is too short.",
        "Write at least 120 characters."
      );

      this.deductScore(result, 6);
    }

    /**
     * ============================================================
     * MARKETPLACE BONUS
     * ============================================================
     */

    switch (marketplace) {
      case "amazon":
        if (title.length >= 80 && title.length <= 120) {
          this.bonusScore(result, 2);
        }
        break;

      case "shopify":
        if (description.length >= 160) {
          this.bonusScore(result, 2);
        }
        break;

      case "etsy":
        if (title.length >= 40 && title.length <= 140) {
          this.bonusScore(result, 2);
        }
        break;

      default:
        break;
    }/**
 * ============================================================
 * PART 6
 * SECTION 2.1
 * Action Plan Generator
 * ============================================================
 */

const actionPlan = {
  critical: [...criticalIssues],
  high: [...highPriorityIssues],
  medium: [...mediumPriorityIssues],
  low: [...lowPriorityIssues],
};

(result as ValidatorResult & {
  actionPlan?: typeof actionPlan;
}).actionPlan = actionPlan;
const telemetryFinished =
  this.finishTelemetry(startedAt);
/**
 * ============================================================
 * PART 6
 * SECTION 2.2
 * Next Best Action
 * ============================================================
 */

let nextBestAction =
  "No action required.";

if (criticalIssues.length > 0) {

  nextBestAction =
    criticalIssues[0];

} else if (
  highPriorityIssues.length > 0
) {

  nextBestAction =
    highPriorityIssues[0];

} else if (
  mediumPriorityIssues.length > 0
) {

  nextBestAction =
    mediumPriorityIssues[0];

} else if (
  lowPriorityIssues.length > 0
) {

  nextBestAction =
    lowPriorityIssues[0];

}

(result as ValidatorResult & {
  nextBestAction?: string;
}).nextBestAction =
  nextBestAction;/**
 * ============================================================
 * PART 6
 * SECTION 2.3
 * Final Health Summary
 * ============================================================
 */

const healthSummary = {
  seoScore,
  weightedSeoScore,
  metaSeoScore,
  marketplaceSeoScore,
  priorityScore,

  totalCriticalIssues:
    criticalIssues.length,

  totalHighPriorityIssues:
    highPriorityIssues.length,

  totalMediumPriorityIssues:
    mediumPriorityIssues.length,

  totalLowPriorityIssues:
    lowPriorityIssues.length,

  rankedIssueCount:
    rankedIssues.length,

  recommendationCount:
    rankedRecommendations.length,
};

(result as ValidatorResult & {
  healthSummary?: typeof healthSummary;
}).healthSummary =
  healthSummary;/**
 * ============================================================
 * PART 6
 * SECTION 2.4
 * Overall Health Score & Grade
 * ============================================================
 */

const overallHealthScore = Math.round(
  (
    seoScore +
    weightedSeoScore +
    metaSeoScore +
    marketplaceSeoScore +
    priorityScore
  ) / 5
);

let overallHealthGrade:
  | "A"
  | "B"
  | "C"
  | "D";

if (overallHealthScore >= 90) {

  overallHealthGrade = "A";

} else if (overallHealthScore >= 75) {

  overallHealthGrade = "B";

} else if (overallHealthScore >= 60) {

  overallHealthGrade = "C";

} else {

  overallHealthGrade = "D";

}

(result as ValidatorResult & {
  overallHealthScore?: number;
}).overallHealthScore =
  overallHealthScore;

(result as ValidatorResult & {
  overallHealthGrade?:
    | "A"
    | "B"
    | "C"
    | "D";
}).overallHealthGrade =
  overallHealthGrade;/**
 * ============================================================
 * PART 6
 * SECTION 2.5
 * Enterprise Result Integration
 * ============================================================
 */

(result as ValidatorResult & {
  enterprise?: {
    actionPlan: typeof actionPlan;
    nextBestAction: string;
    healthSummary: typeof healthSummary;
    overallHealthScore: number;
    overallHealthGrade:
      | "A"
      | "B"
      | "C"
      | "D";
    priorityScore: number;
  };
}).enterprise = {
  actionPlan,
  nextBestAction,
  healthSummary,
  overallHealthScore,
  overallHealthGrade,
  priorityScore,
};
const telemetry =
  this.buildTelemetryReport({
    validator: "SEOValidator",
    startedAt,
    finishedAt: telemetryFinished.finishedAt,
    rules: [],
  });

const metadata =
  this.buildMetadata({
    validator: "SEOValidator",
    marketplace,
    executionTimeMs:
      telemetryFinished.durationMs,
  });

await this.afterValidate(
  input,
  result
);/**
 * ============================================================
 * SEOValidator Enterprise V1
 * Status: Frozen
 * Future development -> SEOValidator V2
 * ============================================================
 */

return {
  ...result,

  actionPlan,

  nextBestAction,

  healthSummary,

  overallHealthScore,

  overallHealthGrade,



  enterprise: (result as ValidatorResult & {
    enterprise?: unknown;
  }).enterprise,

  metadata,

  telemetry,
};
  }

}
