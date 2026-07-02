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
 * Enterprise Price Validator
 * ============================================================
 */

export class PriceValidator extends BaseValidator {
  public readonly category: HealthCategory = "PRICE";

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {

    const startedAt = this.startTelemetry();

    const product: AdapterProduct = input.product;

    const result = this.emptyResult();

    const price = Number(product.price ?? 0);

    const currency = String(
      product.currency ?? "USD"
    ).toUpperCase();

    const marketplace = String(
      product.marketplace ??
      product.metadata?.marketplace ??
      "generic"
    ).toLowerCase();

    /**
     * ======================================================
     * Part 2 starts here
     * ======================================================
     */    /**
     * ======================================================
     * PRICE REQUIRED
     * ======================================================
     */
    if (!Number.isFinite(price) || price <= 0) {
      this.critical(
        result,
        "PRICE_MISSING",
        "Product price is missing or invalid",
        "Provide a valid product price."
      );

      result.score = 0;
      return result;
    }

    /**
     * ======================================================
     * NEGATIVE PRICE
     * ======================================================
     */
    if (price < 0) {
      this.critical(
        result,
        "NEGATIVE_PRICE",
        "Negative price detected",
        "Price cannot be negative."
      );

      this.deductScore(result, 100);
    }

    /**
     * ======================================================
     * EXTREMELY LOW PRICE
     * ======================================================
     */
    if (price > 0 && price < 0.10) {
      this.warning(
        result,
        "PRICE_TOO_LOW",
        "Suspiciously low price detected",
        "Verify marketplace pricing."
      );

      this.deductScore(result, 10);
    }

    /**
     * ======================================================
     * EXTREMELY HIGH PRICE
     * ======================================================
     */
    if (price > 1_000_000) {
      this.warning(
        result,
        "PRICE_TOO_HIGH",
        "Suspiciously high price detected",
        "Verify marketplace pricing."
      );

      this.deductScore(result, 20);
    }

    /**
     * ======================================================
     * DECIMAL PRECISION
     * ======================================================
     */
    const decimal = price.toString().split(".")[1];

    if (decimal && decimal.length > 2) {
      this.info(
        result,
        "PRICE_PRECISION",
        "Price contains excessive decimal precision",
        "Limit prices to two decimal places."
      );
    }

    /**
     * ======================================================
     * PSYCHOLOGICAL PRICING
     * ======================================================
     */
    const priceText = price.toFixed(2);

    if (
      priceText.endsWith(".99") ||
      priceText.endsWith(".95")
    ) {
      this.bonusScore(result, 5);
    }    /**
     * ======================================================
     * SUPPORTED CURRENCIES
     * ======================================================
     */
    const supportedCurrencies = new Set([
      "USD",
      "EUR",
      "GBP",
      "CAD",
      "AUD",
      "JPY",
      "INR",
      "BDT",
    ]);

    if (!supportedCurrencies.has(currency)) {
      this.warning(
        result,
        "UNSUPPORTED_CURRENCY",
        `Unsupported currency: ${currency}`,
        "Use a supported ISO currency code."
      );

      this.deductScore(result, 10);
    }

    /**
     * ======================================================
     * AMAZON RULES
     * ======================================================
     */
    if (marketplace === "amazon") {
      if (price < 5) {
        this.warning(
          result,
          "AMAZON_LOW_PRICE",
          "Price is unusually low for Amazon.",
          "Review marketplace pricing."
        );

        this.deductScore(result, 15);
      }
    }

    /**
     * ======================================================
     * SHOPIFY RULES
     * ======================================================
     */
    if (marketplace === "shopify") {
      if (price > 5000) {
        this.info(
          result,
          "SHOPIFY_HIGH_PRICE",
          "High-ticket Shopify product detected.",
          "Ensure sufficient trust signals."
        );

        this.deductScore(result, 10);
      }
    }

    /**
     * ======================================================
     * ETSY RULES
     * ======================================================
     */
    if (marketplace === "etsy") {
      if (price < 1) {
        this.warning(
          result,
          "ETSY_LOW_PRICE",
          "Price appears unusually low for Etsy.",
          "Verify handcrafted product pricing."
        );

        this.deductScore(result, 10);
      }
    }

    /**
     * ======================================================
     * GENERIC QUALITY BONUS
     * ======================================================
     */
    if (price >= 10 && price <= 1000) {
      this.bonusScore(result, 5);
    }

    /**
     * ======================================================
     * FINAL SCORE
     * ======================================================
     */
    result.score = this.clampScore(result.score);

    /**
     * ======================================================
     * Part 4 starts here
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
        validator: "PriceValidator",
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
        validator: "PriceValidator",
        marketplace,
        executionTimeMs:
          telemetryFinished.durationMs,
      });

    return {
      ...result,
      metadata,
      telemetry,
    };
  }
}

/**
 * ============================================================
 * EXPORT CLASS
 * ============================================================
 *
 * BaseValidator constructor is protected.
 * Export the class instead of creating a singleton.
 */
export default PriceValidator;
