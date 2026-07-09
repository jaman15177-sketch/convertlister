import { BaseValidator } from "../base/base-validator";

import type { AdapterProduct } from "@/adapters/core/adapter.contract";

import type { HealthCategory } from "../health.types";

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
 * Enterprise Image Validator
 * ============================================================
 */

export class ImageValidator extends BaseValidator {
  public readonly category: HealthCategory = "IMAGE";

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {

    const startedAt = this.startTelemetry();

    await this.beforeValidate(input);

    const product: AdapterProduct = input.product;

    const result = this.emptyResult();

    const marketplace = this.getMarketplace(input);

    const images = Array.isArray(product.images)
  ? product.images.filter(
      (image): image is string =>
        typeof image === "string"
    )
  : []; 
/**
 * ============================================================
 * IMAGE REQUIRED
 * ============================================================
 */

    if (images.length === 0) {
      this.critical(
        result,
        "IMAGE_MISSING",
        "No product images found",
        "Add at least one high-quality product image."
      );

      this.deductScore(result, 40);
    }

    /**
     * ============================================================
     * IMAGE COUNT
     * ============================================================
     */

    if (images.length > 0 && images.length < 3) {
      this.warning(
        result,
        "LOW_IMAGE_COUNT",
        "Too few product images",
        "Use at least 3 product images."
      );

      this.deductScore(result, 10);
    }

    if (images.length > 10) {
      this.warning(
        result,
        "TOO_MANY_IMAGES",
        "Too many product images",
        "Keep image count between 3 and 10."
      );

      this.deductScore(result, 10);
    }

    /**
     * ============================================================
     * URL VALIDATION
     * ============================================================
     */

    const invalidImages = images.filter((image) => {
      try {
        const url = new URL(image);
        return !["http:", "https:"].includes(url.protocol);
      } catch {
        return true;
      }
    });

    if (invalidImages.length > 0) {
      this.warning(
        result,
        "INVALID_IMAGE_URL",
        "Invalid image URL detected",
        "Use valid HTTP or HTTPS image URLs."
      );

      this.deductScore(result, 15);
    }

    /**
     * ============================================================
     * DUPLICATE IMAGE DETECTION
     * ============================================================
     */

    const normalizedImages = images.map((image) =>
      image.trim().toLowerCase()
    );

    const uniqueImages = new Set(normalizedImages);

    if (uniqueImages.size !== normalizedImages.length) {
      this.warning(
        result,
        "DUPLICATE_IMAGES",
        "Duplicate product images detected",
        "Remove duplicate images."
      );

      this.deductScore(result, 10);
    }    /**
     * ============================================================
     * SEO FILE NAME
     * ============================================================
     */

    const weakSeoImages = images.filter((image) => {
      try {
        const pathname = new URL(image).pathname;

        const filename =
          pathname.split("/").pop()?.toLowerCase() ?? "";

        return /^(img|image|photo|pic)[-_]?\d*/.test(filename);
      } catch {
        return false;
      }
    });

    if (weakSeoImages.length > 0) {
      this.info(
        result,
        "WEAK_IMAGE_SEO",
        "Some image filenames are not SEO-friendly",
        "Use descriptive filenames containing product keywords."
      );
    }

    /**
     * ============================================================
     * MARKETPLACE RULES
     * ============================================================
     */

    switch (marketplace) {
      case "amazon":
        if (images.length < 6) {
          this.warning(
            result,
            "AMAZON_IMAGE_REQUIREMENT",
            "Amazon listings perform better with multiple images.",
            "Use at least 6 product images."
          );

          this.deductScore(result, 10);
        }
        break;

      case "shopify":
        if (images.length < 4) {
          this.info(
            result,
            "SHOPIFY_IMAGE_RECOMMENDATION",
            "More product images can improve conversion.",
            "Use at least 4 product images."
          );

          this.deductScore(result, 5);
        }
        break;

      case "etsy":
        if (images.length < 5) {
          this.info(
            result,
            "ETSY_IMAGE_RECOMMENDATION",
            "Etsy listings benefit from multiple lifestyle images.",
            "Use at least 5 product images."
          );

          this.deductScore(result, 5);
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
      this.bonusScore(result, 10);
    }

    /**
     * ============================================================
     * FINAL SCORE
     * ============================================================
     */

    result.score = this.clampScore(result.score);    /**
     * ============================================================
     * TELEMETRY
     * ============================================================
     */

    const telemetryFinished =
      this.finishTelemetry(startedAt);

    const telemetry =
      this.buildTelemetryReport({
        validator: "ImageValidator",
        startedAt,
        finishedAt: telemetryFinished.finishedAt,
        rules: [],
      });

    /**
     * ============================================================
     * METADATA
     * ============================================================
     */

    const metadata =
      this.buildMetadata({
        validator: "ImageValidator",
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


export default ImageValidator;
    
