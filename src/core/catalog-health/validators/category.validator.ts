import { BaseValidator } from "../base/base-validator";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type { HealthCategory } from "../health.types";

import type { AdapterProduct } from "@/adapters/core/adapter.contract";

const AMAZON_ALLOWED = [
  "electronics",
  "fashion",
  "home",
  "beauty",
  "sports",
  "toys",
  "grocery",
  "automotive",
] as const;

const SHOPIFY_ALLOWED = [
  "clothing",
  "accessories",
  "home decor",
  "electronics",
  "beauty",
  "fitness",
] as const;

const ETSY_ALLOWED = [
  "handmade",
  "art",
  "craft",
  "jewelry",
  "vintage",
  "gift",
] as const;

const CATEGORY_SPAM_PATTERNS = [
  "best",
  "cheap",
  "sale",
  "discount",
  "limited offer",
  "hot deal",
] as const;

export class CategoryValidator extends BaseValidator {
  public readonly category: HealthCategory = "CATEGORY";

  public constructor() {
    super();
  }

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {
    const startedAt = this.startTelemetry();

    await this.beforeValidate(input);

    const result = this.emptyResult();

    const product: AdapterProduct =
      input.product;

    const category = this.normalizeText(
      String(
        product.category ??
        product.metadata?.category ??
        ""
      )
    ).toLowerCase();

    const marketplace =
      input.context.marketplace || "generic";

    /**
     * ==========================================
     * CATEGORY REQUIRED
     * ==========================================
     */

    if (!category) {
      result.issues.push(
        this.critical(
          "CATEGORY_MISSING",
          "Product category is missing",
          "Assign a valid marketplace category"
        )
      );

      result.score = this.deductScore(
        result.score,
        50
      );
    }

    /**
     * ==========================================
     * CATEGORY LENGTH
     * ==========================================
     */

    if (
      category &&
      category.length < 3
    ) {
      result.issues.push(
        this.warning(
          "CATEGORY_TOO_SHORT",
          "Category name too short",
          "Use a more descriptive category"
        )
      );

      result.score = this.deductScore(
        result.score,
        10
      );
    }

    if (
      category &&
      category.length > 50
    ) {
      result.issues.push(
        this.warning(
          "CATEGORY_TOO_LONG",
          "Category name too long",
          "Use standardized category names"
        )
      );

      result.score = this.deductScore(
        result.score,
        10
      );
    }

    /**
     * ==========================================
     * INVALID CHARACTERS
     * ==========================================
     */

    const hasInvalidChars =
      /[^a-z0-9\s&-]/i.test(category);

    if (
      category &&
      hasInvalidChars
    ) {
      result.issues.push(
        this.warning(
          "CATEGORY_INVALID_CHARS",
          "Category contains invalid characters",
          "Use marketplace-safe category names"
        )
      );

      result.score = this.deductScore(
        result.score,
        15
      );
    }    /**
     * ==========================================
     * AMAZON CATEGORY VALIDATION
     * ==========================================
     */

    if (
      marketplace === "amazon" &&
      category &&
      !AMAZON_ALLOWED.includes(
        category as (typeof AMAZON_ALLOWED)[number]
      )
    ) {
      result.issues.push(
        this.warning(
          "AMAZON_CATEGORY_MISMATCH",
          "Category is not optimized for Amazon.",
          "Use an Amazon-supported category."
        )
      );

      result.score = this.deductScore(
        result.score,
        20
      );
    }

    /**
     * ==========================================
     * SHOPIFY CATEGORY VALIDATION
     * ==========================================
     */

    if (
      marketplace === "shopify" &&
      category &&
      !SHOPIFY_ALLOWED.includes(
        category as (typeof SHOPIFY_ALLOWED)[number]
      )
    ) {
      result.issues.push(
        this.info(
          "SHOPIFY_CATEGORY_MISMATCH",
          "Category is not aligned with Shopify taxonomy.",
          "Use Shopify standard product taxonomy."
        )
      );

      result.score = this.deductScore(
        result.score,
        10
      );
    }

    /**
     * ==========================================
     * ETSY CATEGORY VALIDATION
     * ==========================================
     */

    if (
      marketplace === "etsy" &&
      category &&
      !ETSY_ALLOWED.includes(
        category as (typeof ETSY_ALLOWED)[number]
      )
    ) {
      result.issues.push(
        this.info(
          "ETSY_CATEGORY_MISMATCH",
          "Category is not aligned with Etsy taxonomy.",
          "Choose an Etsy marketplace category."
        )
      );

      result.score = this.deductScore(
        result.score,
        10
      );
    }

    /**
     * ==========================================
     * GENERIC CATEGORY BONUS
     * ==========================================
     */

    if (
      category &&
      category.length >= 5 &&
      category.length <= 25
    ) {
      result.score = this.bonusScore(
        result.score,
        10
      );
    }    /**
     * ==========================================
     * CATEGORY SPAM DETECTION
     * ==========================================
     */

    const spamDetected =
      CATEGORY_SPAM_PATTERNS.some((pattern) =>
        category.includes(pattern)
      );

    if (category && spamDetected) {
      result.issues.push(
        this.warning(
          "CATEGORY_SPAM_DETECTED",
          "Category contains promotional or spam keywords.",
          "Use only the actual marketplace category."
        )
      );

      result.score = this.deductScore(
        result.score,
        20
      );
    }

    /**
     * ==========================================
     * DUPLICATE WORD DETECTION
     * ==========================================
     */

    if (category) {
      const words = category
        .split(/\s+/)
        .filter(Boolean);

      const uniqueWords = new Set(words);

      if (
        words.length > 1 &&
        uniqueWords.size < words.length
      ) {
        result.issues.push(
          this.warning(
            "CATEGORY_DUPLICATE_WORDS",
            "Duplicate words detected in category.",
            "Avoid repeating the same keyword."
          )
        );

        result.score = this.deductScore(
          result.score,
          10
        );
      }
    }

    /**
     * ==========================================
     * QUALITY BONUS
     * ==========================================
     */

    if (
      category &&
      category.length >= 8 &&
      category.length <= 30 &&
      !spamDetected
    ) {
      result.score = this.bonusScore(
        result.score,
        5
      );
    }

    /**
     * ==========================================
     * FINAL SCORE NORMALIZATION
     * ==========================================
     */

    result.score = this.normalizeScore(
      result.score
    );

    const finishedAt =
      this.finishTelemetry(startedAt);

    const telemetry =
      this.buildTelemetryReport({
        startedAt,
        finishedAt: finishedAt.finishedAt,
        rules: [],
      });

    const metadata =
      this.buildMetadata(
        finishedAt.durationMs,
        marketplace
      );

    await this.afterValidate(
      input,
      result
    );    return {
      ...result,
      metadata,
      telemetry,
    };
  }
}

/**
 * ============================================================
 * SINGLETON EXPORT
 * ============================================================
 */
export const categoryValidator =
  new CategoryValidator();
