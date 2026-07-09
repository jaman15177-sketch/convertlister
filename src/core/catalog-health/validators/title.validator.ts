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
 * Enterprise Title Validator
 * ============================================================
 */

export class TitleValidator extends BaseValidator {
  public readonly category: HealthCategory = "TITLE";

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {

    const startedAt = this.startTelemetry();

    await this.beforeValidate(input);

    const product: AdapterProduct = input.product;

    const result = this.emptyResult();

    const marketplace = this.getMarketplace(input);

    const title = this.normalizeText(
      String(
        product.title ??
        product.metadata?.title ??
        ""
      )
    );

    /**
     * ======================================================
     * PART 2 STARTS HERE
     * ======================================================
     */    /**
     * ======================================================
     * TITLE REQUIRED
     * ======================================================
     */

    if (!title) {
      this.critical(
        result,
        "TITLE_REQUIRED",
        "Product title is missing.",
        "Provide a product title."
      );

      this.deductScore(result, 50);
    }

    /**
     * ======================================================
     * TITLE LENGTH
     * ======================================================
     */

    if (title && title.length < 10) {
      this.warning(
        result,
        "TITLE_TOO_SHORT",
        "Title is too short.",
        "Use a more descriptive title."
      );

      this.deductScore(result, 15);
    }

    if (title.length > 200) {
      this.warning(
        result,
        "TITLE_TOO_LONG",
        "Title exceeds recommended length.",
        "Reduce unnecessary words."
      );

      this.deductScore(result, 15);
    }

    /**
     * ======================================================
     * DUPLICATE WORDS
     * ======================================================
     */

    if (title) {
      const words = title
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      const uniqueWords = new Set(words);

      if (uniqueWords.size < words.length) {
        this.warning(
          result,
          "TITLE_DUPLICATE_WORDS",
          "Duplicate words detected.",
          "Avoid repeating the same keywords."
        );

        this.deductScore(result, 10);
      }
    }

    /**
     * ======================================================
     * ALL CAPS
     * ======================================================
     */

    if (
      title &&
      title === title.toUpperCase() &&
      /[A-Z]/.test(title)
    ) {
      this.info(
        result,
        "TITLE_ALL_CAPS",
        "Title is written in all capital letters.",
        "Use normal title casing."
      );

      this.deductScore(result, 5);
    }

    /**
     * ======================================================
     * INVALID CHARACTERS
     * ======================================================
     */

    if (/[<>{}[\]|\\]/.test(title)) {
      this.warning(
        result,
        "TITLE_INVALID_CHARACTERS",
        "Invalid characters detected.",
        "Remove unsupported symbols."
      );

      this.deductScore(result, 10);
    }

    /**
     * ======================================================
     * PART 3 STARTS HERE
     * ======================================================
     */    /**
     * ======================================================
     * KEYWORD STUFFING
     * ======================================================
     */

    const words = title
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const frequency = new Map<string, number>();

    for (const word of words) {
      frequency.set(
        word,
        (frequency.get(word) ?? 0) + 1
      );
    }

    const maxFrequency =
      Math.max(0, ...frequency.values());

    if (maxFrequency > 4) {
      this.warning(
        result,
        "TITLE_KEYWORD_STUFFING",
        "Repeated keywords detected.",
        "Reduce keyword repetition."
      );

      this.deductScore(result, 15);
    }

    /**
     * ======================================================
     * AMAZON
     * ======================================================
     */

    if (
      marketplace === "amazon" &&
      title.length < 80
    ) {
      this.info(
        result,
        "AMAZON_SHORT_TITLE",
        "Amazon titles usually perform better when more descriptive.",
        "Consider using 80–150 characters."
      );
    }

    /**
     * ======================================================
     * SHOPIFY
     * ======================================================
     */

    if (
      marketplace === "shopify" &&
      title.length > 70
    ) {
      this.info(
        result,
        "SHOPIFY_LONG_TITLE",
        "Title may be too long for Shopify themes.",
        "Keep titles concise."
      );

      this.deductScore(result, 5);
    }

    /**
     * ======================================================
     * ETSY
     * ======================================================
     */

    if (
      marketplace === "etsy" &&
      title.length < 30
    ) {
      this.info(
        result,
        "ETSY_SHORT_TITLE",
        "Consider a more descriptive Etsy title.",
        "Include searchable keywords."
      );
    }

    /**
     * ======================================================
     * QUALITY BONUS
     * ======================================================
     */

    if (
      title.length >= 40 &&
      title.length <= 120 &&
      maxFrequency <= 2
    ) {
      this.bonusScore(result, 10);
    }

    /**
     * ======================================================
     * FINAL SCORE
     * ======================================================
     */

    result.score =
      this.normalizeScore(result.score);

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
        validator: "TitleValidator",
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
        validator: "TitleValidator",
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

export default TitleValidator;
