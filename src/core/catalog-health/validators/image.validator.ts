import { BaseValidator } from "../base/base-validator";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type { HealthCategory } from "../health.types";

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";

/**
 * ============================================================
 * CONVERTLISTER
 * IMAGE VALIDATOR
 * Enterprise Production Version
 * ============================================================
 */

export class ImageValidator extends BaseValidator {
  public readonly category: HealthCategory = "IMAGE";

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {

    const startedAt = this.startTelemetry();

    await this.beforeValidate(input);

    const result = this.emptyResult();

    const product: AdapterProduct =
      input.product;

    const marketplace =
      input.context.marketplace || "generic";

    const images = Array.isArray(product.images)
      ? product.images.filter(
          (image): image is string =>
            typeof image === "string"
        )
      : [];

    let score = result.score;    /**
     * ============================================================
     * IMAGE EXISTENCE
     * ============================================================
     */
    if (images.length === 0) {
      result.issues.push(
        this.critical(
          "IMAGE_MISSING",
          "No product images found",
          "Add at least one high-quality product image."
        )
      );

      score = this.deductScore(score, 40);
    }

    /**
     * ============================================================
     * IMAGE COUNT
     * ============================================================
     */
    if (images.length > 0 && images.length < 3) {
      result.issues.push(
        this.warning(
          "LOW_IMAGE_COUNT",
          "Too few product images",
          "Use at least 3 product images."
        )
      );

      score = this.deductScore(score, 10);
    }

    if (images.length > 10) {
      result.issues.push(
        this.warning(
          "TOO_MANY_IMAGES",
          "Too many product images",
          "Keep image count between 3 and 10."
        )
      );

      score = this.deductScore(score, 10);
    }

    /**
     * ============================================================
     * URL VALIDATION
     * ============================================================
     */
    const invalidImages = images.filter(
      (image) => {
        try {
          const url = new URL(image);
          return !["http:", "https:"].includes(
            url.protocol
          );
        } catch {
          return true;
        }
      }
    );

    if (invalidImages.length > 0) {
      result.issues.push(
        this.warning(
          "INVALID_IMAGE_URL",
          "Invalid image URL detected",
          "Use valid HTTP or HTTPS image URLs."
        )
      );

      score = this.deductScore(score, 15);
    }

    /**
     * ============================================================
     * SEO FILE NAME
     * ============================================================
     */
    const weakSeoImages = images.filter((image) => {
      try {
        const pathname = new URL(image).pathname;

        const filename = pathname
          .split("/")
          .pop()
          ?.toLowerCase() ?? "";

        return /^(img|image|photo|pic)[-_]?\d*/.test(
          filename
        );
      } catch {
        return false;
      }
    });

    if (weakSeoImages.length > 0) {
      result.issues.push(
        this.info(
          "WEAK_IMAGE_SEO",
          "Some image filenames are not SEO-friendly",
          "Use descriptive filenames containing product keywords."
        )
      );

      score = this.deductScore(score, 5);
    }    /**
     * ============================================================
     * DUPLICATE IMAGE DETECTION
     * ============================================================
     */
    const normalizedImages = images.map((image) =>
      image.trim().toLowerCase()
    );

    const uniqueImages = new Set(normalizedImages);

    if (uniqueImages.size !== normalizedImages.length) {
      result.issues.push(
        this.warning(
          "DUPLICATE_IMAGES",
          "Duplicate product images detected",
          "Remove duplicate images."
        )
      );

      score = this.deductScore(score, 10);
    }

    /**
     * ============================================================
     * MARKETPLACE RULES
     * ============================================================
     */
    switch (marketplace.toLowerCase()) {
      case "amazon":
        if (images.length < 6) {
          result.issues.push(
            this.warning(
              "AMAZON_IMAGE_REQUIREMENT",
              "Amazon listings perform better with multiple images.",
              "Use at least 6 product images."
            )
          );

          score = this.deductScore(score, 10);
        }
        break;

      case "shopify":
        if (images.length < 4) {
          result.issues.push(
            this.info(
              "SHOPIFY_IMAGE_RECOMMENDATION",
              "More product images can improve conversion.",
              "Use at least 4 product images."
            )
          );

          score = this.deductScore(score, 5);
        }
        break;

      case "etsy":
        if (images.length < 5) {
          result.issues.push(
            this.info(
              "ETSY_IMAGE_RECOMMENDATION",
              "Etsy listings benefit from multiple lifestyle images.",
              "Use at least 5 product images."
            )
          );

          score = this.deductScore(score, 5);
        }
        break;

      default:
        break;
    }

    /**
     * ============================================================
     * QUALITY BONUS
     * ============================================================
     */
    if (
      images.length >= 5 &&
      images.length <= 8 &&
      invalidImages.length === 0 &&
      uniqueImages.size === images.length
    ) {
      score = this.bonusScore(score, 10);
    }

    /**
     * ============================================================
     * FINAL SCORE
     * ============================================================
     */
    result.score = this.normalizeScore(score);    /**
     * ============================================================
     * TELEMETRY
     * ============================================================
     */
    const finishedAt =
      this.finishTelemetry(startedAt);

    const telemetry =
      this.buildTelemetryReport({
        startedAt,
        finishedAt: finishedAt.finishedAt,
        rules: [],
      });

    /**
     * ============================================================
     * METADATA
     * ============================================================
     */
    const metadata =
      this.buildMetadata(
        finishedAt.durationMs,
        marketplace
      );

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


