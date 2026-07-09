/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Bullet Point Validator
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Validate product bullet points
 * ✓ Detect missing bullets
 * ✓ Validate bullet quality
 * ✓ Marketplace compliance
 * ✓ Quality scoring
 * ✓ Metadata + Telemetry
 * ============================================================
 */

import { BaseValidator } from "../base/base-validator";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type {
  HealthCategory,
} from "../health.types";

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

import type {
  CatalogMetadata,
} from "../base/metadata.engine";

import type {
  TelemetryReport,
} from "../base/telemetry.engine";

/**
 * ============================================================
 * CONFIG
 * ============================================================
 */

interface BulletPointConfig {

  readonly minimumBullets: number;

  readonly maximumBullets: number;

  readonly minimumLength: number;

  readonly maximumLength: number;

}

const DEFAULT_CONFIG: BulletPointConfig = {

  minimumBullets: 3,

  maximumBullets: 10,

  minimumLength: 40,

  maximumLength: 255,

};

/**
 * ============================================================
 * VALIDATOR
 * ============================================================
 */

export class BulletPointValidator
  extends BaseValidator {

  public readonly category: HealthCategory =
    "BULLET_POINTS";

  public constructor() {

    super();

  }

  /**
   * ============================================================
   * VALIDATE
   * ============================================================
   */

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {

    const startedAt =
      this.startTelemetry();

    await this.beforeValidate(input);

    const result =
      this.emptyResult();

    const product: AdapterProduct =
      input.product;

    const marketplace =
      this.getMarketplace(input);
    /**
     * ============================================================
     * BULLET SOURCE RESOLUTION
     * ============================================================
     */

    const rawBullets: readonly string[] =
      Array.isArray(product.bullets)
        ? product.bullets
        : [];

    /**
     * ============================================================
     * NORMALIZATION
     * ============================================================
     */

    const bullets =
      rawBullets
        .map(bullet =>
          this.normalizeText(bullet)
        )
        .filter(
          (bullet): bullet is string =>
            bullet.length > 0
        );

    /**
     * ============================================================
     * FOUNDATION METRICS
     * ============================================================
     */

    const bulletCount =
      bullets.length;

    const totalCharacters =
      bullets.reduce(
        (sum, bullet) =>
          sum + bullet.length,
        0
      );

    const averageLength =
      bulletCount === 0
        ? 0
        : Math.round(
            totalCharacters /
            bulletCount
          );

    const shortestBullet =
      bulletCount === 0
        ? 0
        : Math.min(
            ...bullets.map(
              bullet => bullet.length
            )
          );

    const longestBullet =
      bulletCount === 0
        ? 0
        : Math.max(
            ...bullets.map(
              bullet => bullet.length
            )
          );

    /**
     * ============================================================
     * EMPTY DETECTION
     * ============================================================
     */

    if (bulletCount === 0) {

      this.critical(
        result,
        "BULLET_POINTS_MISSING",
        "Product bullet points are missing.",
        "Add high-quality bullet points."
      );

      this.deductScore(
        result,
        50
      );

    }

    /**
     * ============================================================
     * INITIAL STATISTICS
     * ============================================================
     */

    const statistics = {

      bulletCount,

      totalCharacters,

      averageLength,

      shortestBullet,

      longestBullet,

    };
    /**
     * ============================================================
     * BULLET COUNT RULES
     * ============================================================
     */

    if (
      bulletCount > 0 &&
      bulletCount < DEFAULT_CONFIG.minimumBullets
    ) {

      this.warning(
        result,
        "BULLET_COUNT_TOO_LOW",
        `Only ${bulletCount} bullet point(s) found.`,
        `Add at least ${DEFAULT_CONFIG.minimumBullets} bullet points.`
      );

      this.deductScore(
        result,
        (
          DEFAULT_CONFIG.minimumBullets -
          bulletCount
        ) * 5
      );

    }

    if (
      bulletCount >
      DEFAULT_CONFIG.maximumBullets
    ) {

      this.warning(
        result,
        "BULLET_COUNT_TOO_HIGH",
        `${bulletCount} bullet points detected.`,
        `Reduce bullet points to ${DEFAULT_CONFIG.maximumBullets} or fewer.`
      );

      this.deductScore(
        result,
        Math.min(
          20,
          (
            bulletCount -
            DEFAULT_CONFIG.maximumBullets
          ) * 2
        )
      );

    }

    /**
     * ============================================================
     * RECOMMENDED COUNT BONUS
     * ============================================================
     */

    if (
      bulletCount >=
        DEFAULT_CONFIG.minimumBullets &&
      bulletCount <=
        DEFAULT_CONFIG.maximumBullets
    ) {

      this.bonusScore(
        result,
        3
      );

    }

    /**
     * ============================================================
     * IDEAL COUNT BONUS
     * ============================================================
     */

    if (
      bulletCount >= 5 &&
      bulletCount <= 7
    ) {

      this.bonusScore(
        result,
        2
      );

    }
    /**
     * ============================================================
     * LENGTH INTELLIGENCE
     * ============================================================
     */

    let optimalLengthBullets = 0;

    for (const [index, bullet] of bullets.entries()) {

      const length = bullet.length;

      /**
       * ------------------------------------------------------------
       * MINIMUM LENGTH
       * ------------------------------------------------------------
       */

      if (
        length <
        DEFAULT_CONFIG.minimumLength
      ) {

        this.warning(
          result,
          "BULLET_TOO_SHORT",
          `Bullet ${index + 1} is too short (${length} characters).`,
          `Increase to at least ${DEFAULT_CONFIG.minimumLength} characters.`
        );

        this.deductScore(
          result,
          3
        );

      }

      /**
       * ------------------------------------------------------------
       * MAXIMUM LENGTH
       * ------------------------------------------------------------
       */

      if (
        length >
        DEFAULT_CONFIG.maximumLength
      ) {

        this.warning(
          result,
          "BULLET_TOO_LONG",
          `Bullet ${index + 1} exceeds ${DEFAULT_CONFIG.maximumLength} characters.`,
          "Shorten the bullet point while keeping key information."
        );

        this.deductScore(
          result,
          3
        );

      }

      /**
       * ------------------------------------------------------------
       * OPTIMAL LENGTH
       * ------------------------------------------------------------
       */

      if (
        length >= 80 &&
        length <= 180
      ) {

        optimalLengthBullets++;

      }

    }

    /**
     * ============================================================
     * AVERAGE LENGTH ANALYSIS
     * ============================================================
     */

    if (
      bulletCount > 0 &&
      averageLength < 60
    ) {

      this.warning(
        result,
        "AVERAGE_BULLET_LENGTH_TOO_SHORT",
        "Average bullet length is below the recommended range.",
        "Expand bullets with meaningful product information."
      );

      this.deductScore(
        result,
        5
      );

    }

    if (
      bulletCount > 0 &&
      averageLength > 220
    ) {

      this.warning(
        result,
        "AVERAGE_BULLET_LENGTH_TOO_LONG",
        "Average bullet length exceeds the recommended range.",
        "Keep bullets concise and focused."
      );

      this.deductScore(
        result,
        5
      );

    }

    /**
     * ============================================================
     * OPTIMAL LENGTH SCORE
     * ============================================================
     */

    if (
      bulletCount > 0 &&
      optimalLengthBullets === bulletCount
    ) {

      this.bonusScore(
        result,
        5
      );

    } else if (
      bulletCount > 0 &&
      optimalLengthBullets >=
        Math.ceil(bulletCount * 0.7)
    ) {

      this.bonusScore(
        result,
        2
      );

    }
    /**
     * ============================================================
     * FEATURE DETECTION ENGINE
     * ============================================================
     */

    const featureKeywords = [

      "material",
      "size",
      "weight",
      "dimension",
      "capacity",
      "storage",
      "memory",
      "battery",
      "display",
      "screen",
      "resolution",
      "processor",
      "cpu",
      "gpu",
      "camera",
      "wireless",
      "bluetooth",
      "wifi",
      "usb",
      "waterproof",
      "color",
      "fabric",
      "steel",
      "aluminum",
      "plastic",

    ];

    const specificationKeywords = [

      "cm",
      "mm",
      "kg",
      "g",
      "lb",
      "inch",
      "\"",
      "mah",
      "gb",
      "tb",
      "mp",
      "hz",
      "w",
      "v",
      "%",

    ];

    let featureBulletCount = 0;

    let specificationBulletCount = 0;

    const detectedFeatures =
      new Set<string>();

    for (const bullet of bullets) {

      const normalized =
        bullet.toLowerCase();

      let featureFound = false;

      for (const keyword of featureKeywords) {

        if (normalized.includes(keyword)) {

          detectedFeatures.add(keyword);

          featureFound = true;

        }

      }

      if (featureFound) {

        featureBulletCount++;

      }

      if (
        specificationKeywords.some(
          keyword =>
            normalized.includes(keyword)
        )
      ) {

        specificationBulletCount++;

      }

    }

    /**
     * ============================================================
     * FEATURE COMPLETENESS
     * ============================================================
     */

    if (
      bulletCount > 0 &&
      featureBulletCount === 0
    ) {

      this.warning(
        result,
        "FEATURE_INFORMATION_MISSING",
        "No product feature information detected.",
        "Add key product features to bullet points."
      );

      this.deductScore(
        result,
        8
      );

    }

    if (
      bulletCount > 0 &&
      specificationBulletCount === 0
    ) {

      this.info(
        result,
        "SPECIFICATION_NOT_FOUND",
        "No measurable product specification detected.",
        "Include specifications where appropriate."
      );

      this.deductScore(
        result,
        3
      );

    }

    /**
     * ============================================================
     * FEATURE QUALITY BONUS
     * ============================================================
     */

    if (
      featureBulletCount >=
        Math.ceil(bulletCount * 0.7)
    ) {

      this.bonusScore(
        result,
        4
      );

    }

    if (
      detectedFeatures.size >= 5
    ) {

      this.bonusScore(
        result,
        3
      );

    }
    /**
     * ============================================================
     * BENEFIT DETECTION ENGINE
     * ============================================================
     */

    const benefitKeywords = [

      "easy",
      "comfortable",
      "durable",
      "lightweight",
      "portable",
      "safe",
      "strong",
      "fast",
      "quick",
      "premium",
      "professional",
      "efficient",
      "reliable",
      "convenient",
      "compact",
      "ergonomic",
      "breathable",
      "eco-friendly",
      "energy saving",
      "long lasting",

    ];

    const valueKeywords = [

      "helps",
      "allows",
      "designed",
      "ideal",
      "perfect",
      "improves",
      "reduces",
      "protects",
      "supports",
      "enhances",
      "keeps",
      "prevents",
      "provides",
      "delivers",
      "offers",

    ];

    let benefitBulletCount = 0;

    let valueBulletCount = 0;

    const detectedBenefits =
      new Set<string>();

    for (const bullet of bullets) {

      const normalized =
        bullet.toLowerCase();

      let hasBenefit = false;

      for (const keyword of benefitKeywords) {

        if (normalized.includes(keyword)) {

          detectedBenefits.add(keyword);

          hasBenefit = true;

        }

      }

      if (hasBenefit) {

        benefitBulletCount++;

      }

      if (
        valueKeywords.some(keyword =>
          normalized.includes(keyword)
        )
      ) {

        valueBulletCount++;

      }

    }

    /**
     * ============================================================
     * BENEFIT COVERAGE
     * ============================================================
     */

    if (
      bulletCount > 0 &&
      benefitBulletCount === 0
    ) {

      this.warning(
        result,
        "CUSTOMER_BENEFITS_MISSING",
        "No customer benefits detected in bullet points.",
        "Explain how the product benefits the buyer."
      );

      this.deductScore(
        result,
        8
      );

    }

    if (
      bulletCount > 0 &&
      valueBulletCount === 0
    ) {

      this.info(
        result,
        "VALUE_PROPOSITION_WEAK",
        "Bullet points focus on features but not customer value.",
        "Add buyer-focused outcomes and benefits."
      );

      this.deductScore(
        result,
        3
      );

    }

    /**
     * ============================================================
     * BENEFIT QUALITY BONUS
     * ============================================================
     */

    if (
      benefitBulletCount >=
      Math.ceil(bulletCount * 0.7)
    ) {

      this.bonusScore(
        result,
        4
      );

    }

    if (
      detectedBenefits.size >= 4
    ) {

      this.bonusScore(
        result,
        3
      );

    }

    /**
     * ============================================================
     * FEATURE → BENEFIT BALANCE
     * ============================================================
     */

    if (
      featureBulletCount > 0 &&
      benefitBulletCount > 0 &&
      Math.abs(
        featureBulletCount -
        benefitBulletCount
      ) <= 1
    ) {

      this.bonusScore(
        result,
        2
      );

    }
    /**
     * ============================================================
     * KEYWORD COVERAGE ENGINE
     * ============================================================
     */

    const title =
      this.normalizeText(product.title);

    const titleKeywords =
      title
        .toLowerCase()
        .split(/\s+/)
        .map(keyword => keyword.trim())
        .filter(keyword => keyword.length >= 3);

    const uniqueTitleKeywords =
      [...new Set(titleKeywords)];

    let primaryKeywordHits = 0;

    let secondaryKeywordHits = 0;

    const matchedKeywords =
      new Set<string>();

    const keywordFrequency =
      new Map<string, number>();

    for (const bullet of bullets) {

      const normalized =
        bullet.toLowerCase();

      for (const keyword of uniqueTitleKeywords) {

        if (!normalized.includes(keyword)) {
          continue;
        }

        matchedKeywords.add(keyword);

        keywordFrequency.set(
          keyword,
          (keywordFrequency.get(keyword) ?? 0) + 1
        );
      }
    }

    if (uniqueTitleKeywords.length > 0) {

      primaryKeywordHits =
        matchedKeywords.size;

      secondaryKeywordHits =
        Math.max(
          0,
          matchedKeywords.size - 1
        );

    }

    /**
     * ============================================================
     * PRIMARY KEYWORD COVERAGE
     * ============================================================
     */

    const keywordCoverage =
      uniqueTitleKeywords.length === 0
        ? 100
        : Math.round(
            (
              primaryKeywordHits /
              uniqueTitleKeywords.length
            ) * 100
          );

    if (
      uniqueTitleKeywords.length > 0 &&
      keywordCoverage < 50
    ) {

      this.warning(
        result,
        "LOW_KEYWORD_COVERAGE",
        "Bullet points contain poor title keyword coverage.",
        "Include important title keywords naturally."
      );

      this.deductScore(
        result,
        8
      );

    }

    /**
     * ============================================================
     * KEYWORD STUFFING
     * ============================================================
     */

    for (const [
      keyword,
      frequency,
    ] of keywordFrequency) {

      if (frequency > bulletCount) {

        this.warning(
          result,
          "KEYWORD_STUFFING",
          `"${keyword}" appears too frequently in bullet points.`,
          "Reduce repeated keyword usage."
        );

        this.deductScore(
          result,
          5
        );

      }

    }

    /**
     * ============================================================
     * KEYWORD QUALITY BONUS
     * ============================================================
     */

    if (keywordCoverage >= 80) {

      this.bonusScore(
        result,
        5
      );

    } else if (
      keywordCoverage >= 60
    ) {

      this.bonusScore(
        result,
        2
      );

    }

    /**
     * ============================================================
     * KEYWORD PLACEMENT
     * ============================================================
     */

    let firstBulletKeywordHits = 0;

    if (bullets.length > 0) {

      const firstBullet =
        bullets[0].toLowerCase();

      firstBulletKeywordHits =
        uniqueTitleKeywords.filter(
          keyword =>
            firstBullet.includes(keyword)
        ).length;

    }

    if (
      firstBulletKeywordHits === 0 &&
      uniqueTitleKeywords.length > 0
    ) {

      this.info(
        result,
        "PRIMARY_KEYWORD_PLACEMENT",
        "Primary keywords are not used in the first bullet.",
        "Place important keywords earlier when appropriate."
      );

    }
    /**
     * ============================================================
     * DUPLICATE INTELLIGENCE
     * ============================================================
     */

    const canonicalBullets =
      bullets.map(bullet =>
        bullet
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, " ")
          .trim()
      );

    const exactDuplicateMap =
      new Map<string, number>();

    let exactDuplicateCount = 0;

    let similarDuplicateCount = 0;

    let repeatedConceptCount = 0;

    const repeatedWords =
      new Map<string, number>();

    for (const bullet of canonicalBullets) {

      exactDuplicateMap.set(
        bullet,
        (exactDuplicateMap.get(bullet) ?? 0) + 1
      );

      for (const word of bullet.split(" ")) {

        if (word.length < 4) {
          continue;
        }

        repeatedWords.set(
          word,
          (repeatedWords.get(word) ?? 0) + 1
        );

      }

    }

    /**
     * ============================================================
     * EXACT DUPLICATES
     * ============================================================
     */

    for (const count of exactDuplicateMap.values()) {

      if (count > 1) {

        exactDuplicateCount += count - 1;

      }

    }

    if (exactDuplicateCount > 0) {

      this.warning(
        result,
        "EXACT_DUPLICATE_BULLETS",
        `${exactDuplicateCount} duplicate bullet point(s) detected.`,
        "Remove duplicated bullet points."
      );

      this.deductScore(
        result,
        Math.min(
          20,
          exactDuplicateCount * 5
        )
      );

    }

    /**
     * ============================================================
     * REPEATED CONCEPTS
     * ============================================================
     */

    for (const frequency of repeatedWords.values()) {

      if (frequency >= 3) {

        repeatedConceptCount++;

      }

    }

    if (repeatedConceptCount >= 5) {

      this.info(
        result,
        "REPEATED_PRODUCT_CONCEPTS",
        "Multiple bullet points repeat the same concepts.",
        "Diversify bullet point content."
      );

      this.deductScore(
        result,
        3
      );

    }

    /**
     * ============================================================
     * SIMILARITY DETECTION
     * ============================================================
     */

    for (let i = 0; i < canonicalBullets.length; i++) {

      for (
        let j = i + 1;
        j < canonicalBullets.length;
        j++
      ) {

        const left =
          canonicalBullets[i]
            .split(" ");

        const right =
          canonicalBullets[j]
            .split(" ");

        const shared =
          left.filter(word =>
            right.includes(word)
          ).length;

        const similarity =
          shared /
          Math.max(
            left.length,
            right.length
          );

        if (similarity >= 0.80) {

          similarDuplicateCount++;

        }

      }

    }

    if (similarDuplicateCount > 0) {

      this.warning(
        result,
        "SIMILAR_BULLET_POINTS",
        `${similarDuplicateCount} highly similar bullet pair(s) detected.`,
        "Rewrite similar bullet points with unique information."
      );

      this.deductScore(
        result,
        Math.min(
          10,
          similarDuplicateCount * 2
        )
      );

    }

    /**
     * ============================================================
     * UNIQUENESS BONUS
     * ============================================================
     */

    if (
      exactDuplicateCount === 0 &&
      similarDuplicateCount === 0
    ) {

      this.bonusScore(
        result,
        5
      );

    }
    /**
     * ============================================================
     * READABILITY INTELLIGENCE
     * ============================================================
     */

    let readableBullets = 0;

    let punctuationIssues = 0;

    let longSentenceCount = 0;

    let passiveStyleCount = 0;

    let buyerFriendlyCount = 0;

    const buyerWords = [

      "you",
      "your",
      "ideal",
      "perfect",
      "easy",
      "comfort",
      "convenient",
      "save",
      "protect",
      "improve",
      "enjoy",
      "designed",

    ];

    for (const bullet of bullets) {

      const trimmed =
        bullet.trim();

      const words =
        trimmed
          .split(/\s+/)
          .filter(Boolean);

      /**
       * ------------------------------------------------------------
       * WORD DENSITY
       * ------------------------------------------------------------
       */

      if (
        words.length >= 8 &&
        words.length <= 30
      ) {

        readableBullets++;

      }

      /**
       * ------------------------------------------------------------
       * SENTENCE COMPLEXITY
       * ------------------------------------------------------------
       */

      if (
        words.length > 35
      ) {

        longSentenceCount++;

      }

      /**
       * ------------------------------------------------------------
       * PUNCTUATION QUALITY
       * ------------------------------------------------------------
       */

      if (
        /[!?]{2,}/.test(trimmed) ||
        /\.{3,}/.test(trimmed)
      ) {

        punctuationIssues++;

      }

      /**
       * ------------------------------------------------------------
       * PASSIVE STYLE (Simple Heuristic)
       * ------------------------------------------------------------
       */

      if (
        /\b(is|are|was|were|been|being)\b/i.test(trimmed)
      ) {

        passiveStyleCount++;

      }

      /**
       * ------------------------------------------------------------
       * BUYER LANGUAGE
       * ------------------------------------------------------------
       */

      if (
        buyerWords.some(word =>
          trimmed
            .toLowerCase()
            .includes(word)
        )
      ) {

        buyerFriendlyCount++;

      }

    }

    /**
     * ============================================================
     * READABILITY SCORE
     * ============================================================
     */

    const readabilityScore =
      bulletCount === 0
        ? 0
        : Math.round(
            (readableBullets / bulletCount) * 100
          );

    if (
      readabilityScore < 60
    ) {

      this.warning(
        result,
        "LOW_BULLET_READABILITY",
        "Bullet points are difficult to read.",
        "Use shorter, clearer and buyer-focused bullet points."
      );

      this.deductScore(
        result,
        8
      );

    }

    /**
     * ============================================================
     * COMPLEX SENTENCES
     * ============================================================
     */

    if (
      longSentenceCount > 0
    ) {

      this.info(
        result,
        "LONG_BULLET_SENTENCES",
        `${longSentenceCount} long bullet(s) detected.`,
        "Split long ideas into shorter bullet points."
      );

      this.deductScore(
        result,
        3
      );

    }

    /**
     * ============================================================
     * PUNCTUATION QUALITY
     * ============================================================
     */

    if (
      punctuationIssues > 0
    ) {

      this.warning(
        result,
        "POOR_BULLET_PUNCTUATION",
        "Unnecessary punctuation detected.",
        "Use clean and professional punctuation."
      );

      this.deductScore(
        result,
        2
      );

    }

    /**
     * ============================================================
     * PASSIVE LANGUAGE
     * ============================================================
     */

    if (
      passiveStyleCount >
      Math.ceil(bulletCount * 0.5)
    ) {

      this.info(
        result,
        "PASSIVE_WRITING_STYLE",
        "Many bullet points use passive language.",
        "Prefer active and direct writing."
      );

      this.deductScore(
        result,
        2
      );

    }

    /**
     * ============================================================
     * BUYER LANGUAGE BONUS
     * ============================================================
     */

    if (
      buyerFriendlyCount >=
      Math.ceil(bulletCount * 0.6)
    ) {

      this.bonusScore(
        result,
        4
      );

    }

    /**
     * ============================================================
     * READABILITY BONUS
     * ============================================================
     */

    if (
      readabilityScore >= 85 &&
      punctuationIssues === 0
    ) {

      this.bonusScore(
        result,
        4
      );

    }
    /**
     * ============================================================
     * MARKETPLACE RULES ENGINE
     * ============================================================
     */

    switch (marketplace) {

      /**
       * ------------------------------------------------------------
       * AMAZON
       * ------------------------------------------------------------
       */

      case "amazon": {

        if (bulletCount < 5) {

          this.warning(
            result,
            "AMAZON_BULLET_COUNT",
            "Amazon listings perform better with at least 5 bullet points.",
            "Provide five informative bullet points."
          );

          this.deductScore(result, 5);

        }

        for (const [index, bullet] of bullets.entries()) {

          if (bullet.length > 255) {

            this.warning(
              result,
              "AMAZON_BULLET_LENGTH",
              `Amazon bullet ${index + 1} exceeds 255 characters.`,
              "Keep each bullet within Amazon recommendations."
            );

            this.deductScore(result, 2);

          }

        }

        break;

      }

      /**
       * ------------------------------------------------------------
       * SHOPIFY
       * ------------------------------------------------------------
       */

      case "shopify": {

        if (bulletCount < 3) {

          this.info(
            result,
            "SHOPIFY_BULLET_RECOMMENDATION",
            "Consider adding more feature-focused bullet points.",
            "Three or more bullets usually improve product pages."
          );

        }

        break;

      }

      /**
       * ------------------------------------------------------------
       * WOOCOMMERCE
       * ------------------------------------------------------------
       */

      case "woocommerce": {

        if (averageLength < 60) {

          this.info(
            result,
            "WOOCOMMERCE_CONTENT_DEPTH",
            "Bullet points could contain more product details.",
            "Expand key product features."
          );

        }

        break;

      }

      /**
       * ------------------------------------------------------------
       * ETSY
       * ------------------------------------------------------------
       */

      case "etsy": {

        if (benefitBulletCount === 0) {

          this.warning(
            result,
            "ETSY_BUYER_BENEFITS",
            "Etsy buyers respond well to benefit-oriented bullet points.",
            "Explain why the product is valuable."
          );

          this.deductScore(result, 3);

        }

        break;

      }

      /**
       * ------------------------------------------------------------
       * TIKTOK SHOP
       * ------------------------------------------------------------
       */

      case "tiktok":
      case "tiktok_shop": {

        if (averageLength > 160) {

          this.info(
            result,
            "TIKTOK_SHORT_CONTENT",
            "Shorter bullet points generally perform better.",
            "Keep bullets concise and easy to scan."
          );

        }

        break;

      }

      /**
       * ------------------------------------------------------------
       * DEFAULT
       * ------------------------------------------------------------
       */

      default:

        break;

    }

    /**
     * ============================================================
     * MARKETPLACE COMPLIANCE BONUS
     * ============================================================
     */

    if (
      result.issues.length === 0 &&
      bulletCount >= DEFAULT_CONFIG.minimumBullets
    ) {

      this.bonusScore(
        result,
        3
      );

    }
    /**
     * ============================================================
     * ADVANCED ISSUE ENGINE
     * ============================================================
     */

    const criticalIssues =
      result.issues.filter(
        issue => issue.severity === "CRITICAL"
      );

    const warningIssues =
      result.warnings.filter(
        issue => issue.severity === "WARNING"
      );

    const infoIssues =
      result.warnings.filter(
        issue => issue.severity === "INFO"
      );

    let priorityScore = 100;

    priorityScore -=
      criticalIssues.length * 25;

    priorityScore -=
      warningIssues.length * 10;

    priorityScore -=
      infoIssues.length * 2;

    priorityScore =
      Math.max(
        0,
        Math.min(
          100,
          priorityScore
        )
      );

    /**
     * ============================================================
     * ISSUE CLASSIFICATION
     * ============================================================
     */

    const issueSummary = {

      critical:
        criticalIssues.length,

      warning:
        warningIssues.length,

      info:
        infoIssues.length,

      total:
        criticalIssues.length +
        warningIssues.length +
        infoIssues.length,

    };

    /**
     * ============================================================
     * PRIORITY ANALYSIS
     * ============================================================
     */

    const optimizationPriority: string[] = [];

    if (
      criticalIssues.length > 0
    ) {

      optimizationPriority.push(
        "Resolve all critical bullet-point issues."
      );

    }

    if (
      exactDuplicateCount > 0
    ) {

      optimizationPriority.push(
        "Remove duplicate bullet points."
      );

    }

    if (
      keywordCoverage < 60
    ) {

      optimizationPriority.push(
        "Improve keyword coverage."
      );

    }

    if (
      readabilityScore < 70
    ) {

      optimizationPriority.push(
        "Improve readability."
      );

    }

    if (
      benefitBulletCount === 0
    ) {

      optimizationPriority.push(
        "Add customer-focused benefits."
      );

    }

    if (
      featureBulletCount === 0
    ) {

      optimizationPriority.push(
        "Include important product features."
      );

    }

    if (
      optimizationPriority.length === 0
    ) {

      optimizationPriority.push(
        "Maintain current bullet quality."
      );

    }

    /**
     * ============================================================
     * PRIORITY BONUS
     * ============================================================
     */

    if (
      priorityScore >= 90
    ) {

      this.bonusScore(
        result,
        3
      );

    }

    /**
     * ============================================================
     * RUNTIME ANALYTICS
     * ============================================================
     */

    const analytics = {

      statistics,

      issueSummary,

      priorityScore,

      keywordCoverage,

      readabilityScore,

      featureBulletCount,

      benefitBulletCount,

      exactDuplicateCount,

      similarDuplicateCount,

      optimizationPriority,

    };
    /**
     * ============================================================
     * QUALITY SCORE ENGINE
     * ============================================================
     */

    const qualityBreakdown = {

      count: bulletCount >= DEFAULT_CONFIG.minimumBullets
        ? 100
        : Math.round(
            (bulletCount / DEFAULT_CONFIG.minimumBullets) * 100
          ),

      length:
        bulletCount === 0
          ? 0
          : Math.round(
              (optimalLengthBullets / bulletCount) * 100
            ),

      keyword:
        keywordCoverage,

      readability:
        readabilityScore,

      features:
        bulletCount === 0
          ? 0
          : Math.round(
              (featureBulletCount / bulletCount) * 100
            ),

      benefits:
        bulletCount === 0
          ? 0
          : Math.round(
              (benefitBulletCount / bulletCount) * 100
            ),

      uniqueness:
        exactDuplicateCount === 0 &&
        similarDuplicateCount === 0
          ? 100
          : Math.max(
              0,
              100 -
              (
                exactDuplicateCount * 15 +
                similarDuplicateCount * 5
              )
            ),

    };

    /**
     * ============================================================
     * WEIGHTED QUALITY SCORE
     * ============================================================
     */

    const weightedQualityScore =
      Math.round(

        qualityBreakdown.count * 0.15 +

        qualityBreakdown.length * 0.15 +

        qualityBreakdown.keyword * 0.20 +

        qualityBreakdown.readability * 0.15 +

        qualityBreakdown.features * 0.15 +

        qualityBreakdown.benefits * 0.10 +

        qualityBreakdown.uniqueness * 0.10

      );

    /**
     * ============================================================
     * QUALITY GRADE
     * ============================================================
     */

    let qualityGrade:
      | "A"
      | "B"
      | "C"
      | "D";

    if (weightedQualityScore >= 90) {

      qualityGrade = "A";

    } else if (
      weightedQualityScore >= 75
    ) {

      qualityGrade = "B";

    } else if (
      weightedQualityScore >= 60
    ) {

      qualityGrade = "C";

    } else {

      qualityGrade = "D";

    }

    /**
     * ============================================================
     * FINAL VALIDATOR SCORE
     * ============================================================
     */

    result.score =
      this.normalizeScore(
        Math.round(
          (
            result.score +
            weightedQualityScore
          ) / 2
        )
      );

    /**
     * ============================================================
     * ENTERPRISE QUALITY SUMMARY
     * ============================================================
     */

    const qualitySummary = {

      score: weightedQualityScore,

      grade: qualityGrade,

      priorityScore,

      breakdown:
        qualityBreakdown,

    };
    /**
     * ============================================================
     * ENTERPRISE HEALTH SUMMARY
     * ============================================================
     */

    const healthSummary = {

      bulletQualityScore:
        weightedQualityScore,

      overallValidatorScore:
        result.score,

      qualityGrade,

      priorityScore,

      totalBullets:
        bulletCount,

      featureBullets:
        featureBulletCount,

      benefitBullets:
        benefitBulletCount,

      keywordCoverage,

      readabilityScore,

      exactDuplicateCount,

      similarDuplicateCount,

      issueCount:
        result.issues.length,

      warningCount:
        result.warnings.length,

    };

    /**
     * ============================================================
     * ACTION PLAN
     * ============================================================
     */

    const actionPlan = {

      critical:
        optimizationPriority.filter(item =>
          item.toLowerCase().includes("critical")
        ),

      high:
        optimizationPriority.filter(item =>
          item.toLowerCase().includes("duplicate") ||
          item.toLowerCase().includes("keyword")
        ),

      medium:
        optimizationPriority.filter(item =>
          item.toLowerCase().includes("readability") ||
          item.toLowerCase().includes("feature")
        ),

      low:
        optimizationPriority.filter(item =>
          item.toLowerCase().includes("benefit")
        ),

    };

    /**
     * ============================================================
     * NEXT BEST ACTION
     * ============================================================
     */

    const nextBestAction =

      optimizationPriority.length > 0
        ? optimizationPriority[0]
        : "No optimization required.";

    /**
     * ============================================================
     * ENTERPRISE OBJECT
     * ============================================================
     */

    result.actionPlan = actionPlan;

    result.nextBestAction =
      nextBestAction;

    result.healthSummary = {

      seoScore:
        weightedQualityScore,

      weightedSeoScore:
        weightedQualityScore,

      metaSeoScore:
        readabilityScore,

      marketplaceSeoScore:
        keywordCoverage,

      priorityScore,

      totalCriticalIssues:
        result.issues.length,

      totalHighPriorityIssues:
        actionPlan.high.length,

      totalMediumPriorityIssues:
        actionPlan.medium.length,

      totalLowPriorityIssues:
        actionPlan.low.length,

      rankedIssueCount:
        optimizationPriority.length,

      recommendationCount:
        optimizationPriority.length,

    };

    result.overallHealthScore =
      weightedQualityScore;

    result.overallHealthGrade =
      qualityGrade;

    result.enterprise = {

      actionPlan,

      nextBestAction,

      healthSummary:
        result.healthSummary,

      overallHealthScore:
        weightedQualityScore,

      overallHealthGrade:
        qualityGrade,

      priorityScore,

    };
    /**
     * ============================================================
     * FINAL SCORE NORMALIZATION
     * ============================================================
     */

    result.score =
      this.normalizeScore(
        result.score
      );

    /**
     * ============================================================
     * TELEMETRY
     * ============================================================
     */

    const finished =
      this.finishTelemetry(
        startedAt
      );

    const telemetry: TelemetryReport =
      this.buildTelemetryReport({

        validator:
          "BulletPointValidator",

        startedAt,

        finishedAt:
          finished.finishedAt,

        rules: [],

      });

    /**
     * ============================================================
     * METADATA
     * ============================================================
     */

    const metadata: CatalogMetadata =
      this.buildMetadata({

        validator:
          "BulletPointValidator",

        marketplace,

        executionTimeMs:
          finished.durationMs,

      });

    /**
     * ============================================================
     * AFTER VALIDATION
     * ============================================================
     */

    await this.afterValidate(
      input,
      result
    );

    /**
     * ============================================================
     * FINAL RETURN
     * ============================================================
     */

        return {
      ...result,
      metadata,
      telemetry,
    };
  }
}

/**
 * ============================================================
 * EXPORT
 * ============================================================
 */

export default BulletPointValidator;
