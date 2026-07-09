import { BaseValidator } from "../base/base-validator";

import type { AdapterProduct } from "@/adapters/core/adapter.contract";

import type {
  HealthCategory,
} from "../health.types";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type {
  CatalogMetadata,
} from "../base/metadata.engine";

import type {
  TelemetryReport,
} from "../base/telemetry.engine";

/**
 * ============================================================
 * CONVERTLISTER
 * Enterprise Category Validator
 * ============================================================
 */

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
  public readonly category: HealthCategory =
    "CATEGORY";

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {

    const startedAt =
      this.startTelemetry();

    const result =
      this.emptyResult();

    const product: AdapterProduct =
      input.product;

    const category =
      this.normalizeCategory(
        String(
          product.category ??
          product.metadata?.category ??
          ""
        )
      ).toLowerCase();

    const marketplace = String(
      product.marketplace ??
      product.metadata?.marketplace ??
      input.context.marketplace ??
      "generic"
    ).toLowerCase();

    /**
     * ======================================================
     * PART 2 STARTS HERE
     * ======================================================
     */    /**
     * ======================================================
     * CATEGORY REQUIRED
     * ======================================================
     */

    if (!category) {
      this.critical(
        result,
        "CATEGORY_MISSING",
        "Product category is missing",
        "Assign a valid marketplace category."
      );

      result.score = 0;

      return result;
    }

    /**
     * ======================================================
     * CATEGORY LENGTH
     * ======================================================
     */

    if (category.length < 3) {
      this.warning(
        result,
        "CATEGORY_TOO_SHORT",
        "Category name is too short",
        "Use a more descriptive category."
      );

      this.deductScore(result, 10);
    }

    if (category.length > 50) {
      this.warning(
        result,
        "CATEGORY_TOO_LONG",
        "Category name is too long",
        "Use a standardized marketplace category."
      );

      this.deductScore(result, 10);
    }

    /**
     * ======================================================
     * INVALID CHARACTERS
     * ======================================================
     */

    if (/[^a-z0-9\s&/-]/i.test(category)) {
      this.warning(
        result,
        "CATEGORY_INVALID_CHARACTERS",
        "Category contains unsupported characters",
        "Remove unsupported symbols."
      );

      this.deductScore(result, 15);
    }

    /**
     * ======================================================
     * PART 3 STARTS HERE
     * ======================================================
     */    /**
     * ======================================================
     * AMAZON CATEGORY RULES
     * ======================================================
     */

    if (
      marketplace === "amazon" &&
      !AMAZON_ALLOWED.includes(
        category as (typeof AMAZON_ALLOWED)[number]
      )
    ) {
      this.warning(
        result,
        "AMAZON_CATEGORY_MISMATCH",
        "Category is not recognized by Amazon.",
        "Use an Amazon-supported category."
      );

      this.deductScore(result, 20);
    }

    /**
     * ======================================================
     * SHOPIFY CATEGORY RULES
     * ======================================================
     */

    if (
      marketplace === "shopify" &&
      !SHOPIFY_ALLOWED.includes(
        category as (typeof SHOPIFY_ALLOWED)[number]
      )
    ) {
      this.info(
        result,
        "SHOPIFY_CATEGORY_MISMATCH",
        "Category is outside Shopify taxonomy.",
        "Use Shopify standard taxonomy."
      );

      this.deductScore(result, 10);
    }

    /**
     * ======================================================
     * ETSY CATEGORY RULES
     * ======================================================
     */

    if (
      marketplace === "etsy" &&
      !ETSY_ALLOWED.includes(
        category as (typeof ETSY_ALLOWED)[number]
      )
    ) {
      this.info(
        result,
        "ETSY_CATEGORY_MISMATCH",
        "Category is outside Etsy taxonomy.",
        "Choose an Etsy marketplace category."
      );

      this.deductScore(result, 10);
    }

    /**
     * ======================================================
     * SPAM DETECTION
     * ======================================================
     */

    const spamDetected =
      CATEGORY_SPAM_PATTERNS.some(pattern =>
        category.includes(pattern)
      );

    if (spamDetected) {
      this.warning(
        result,
        "CATEGORY_SPAM_DETECTED",
        "Promotional words detected in category.",
        "Use only the actual category."
      );

      this.deductScore(result, 20);
    }

    /**
     * ======================================================
     * DUPLICATE WORDS
     * ======================================================
     */

    const words = category
      .split(/\s+/)
      .filter(Boolean);

    if (
      words.length > 1 &&
      new Set(words).size !== words.length
    ) {
      this.warning(
        result,
        "CATEGORY_DUPLICATE_WORDS",
        "Duplicate words detected.",
        "Avoid repeating category keywords."
      );

      this.deductScore(result, 10);
    }

    /**
     * ======================================================
     * QUALITY BONUS
     * ======================================================
     */

    if (
      category.length >= 8 &&
      category.length <= 30 &&
      !spamDetected
    ) {
      this.bonusScore(result, 10);
    }

    result.score =
      this.clampScore(result.score);

    /**
     * ======================================================
     * PART 4 STARTS HERE
     * ======================================================
     */    /**
     * ======================================================
     * TELEMETRY
     * ======================================================
     */

    const telemetryFinished =
      this.finishTelemetry(startedAt);

    const telemetry: TelemetryReport =
      this.buildTelemetryReport({
        validator: "CategoryValidator",
        startedAt,
        finishedAt: telemetryFinished.finishedAt,
        rules: [],
      });

    /**
     * ======================================================
     * METADATA
     * ======================================================
     */

    const metadata: CatalogMetadata =
      this.buildMetadata({
        validator: "CategoryValidator",
        marketplace,
        executionTimeMs:
          telemetryFinished.durationMs,
      });

    await this.afterValidate(
      input,
      result
    );

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

export default CategoryValidator;
