/**
 * ============================================================
 * CONVERTLISTER
 * Enterprise Marketplace Validator
 * ============================================================
 *
 * Phase 1
 * Foundation
 * Production Ready
 * Build Safe
 * ============================================================
 */

import { BaseValidator } from "../base/base-validator";

import type { AdapterProduct } from "@/adapters/core/adapter.contract";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type {
  HealthCategory,
} from "../health.types";

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

interface MarketplaceValidatorConfig {
  supportedMarketplaces: readonly string[];
  allowUnknownMarketplace: boolean;
}

const DEFAULT_CONFIG: MarketplaceValidatorConfig = {
  supportedMarketplaces: [
    "shopify",
    "woocommerce",
    "amazon",
    "etsy",
    "ebay",
    "tiktok",
    "generic",
  ],
  allowUnknownMarketplace: true,
};

/**
 * ============================================================
 * MARKETPLACE VALIDATOR
 * ============================================================
 */

export class MarketplaceValidator
  extends BaseValidator {

  public readonly category: HealthCategory =
    "MARKETPLACE";

  public constructor(
    private readonly config: MarketplaceValidatorConfig =
      DEFAULT_CONFIG
  ) {
    super();
  }

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
      this.normalizeText(
        String(
          product.marketplace ??
          product.source ??
          "generic"
        )
      ).toLowerCase();

    /**
     * ========================================================
     * MESSAGE 2 STARTS HERE
     * ========================================================
     *//**
 * ========================================================
 * MARKETPLACE EXISTS
 * ========================================================
 */

if (!marketplace) {

  this.critical(
    result,
    "MARKETPLACE_REQUIRED",
    "Marketplace is missing.",
    "Provide a valid marketplace."
  );

  this.deductScore(result, 30);

} else {

  /**
   * ======================================================
   * BASIC FORMAT
   * ======================================================
   */

  if (marketplace.length < 2) {

    this.warning(
      result,
      "MARKETPLACE_TOO_SHORT",
      "Marketplace name is too short.",
      "Use a valid marketplace name."
    );

    this.deductScore(result, 5);
  }

  if (marketplace.length > 50) {

    this.warning(
      result,
      "MARKETPLACE_TOO_LONG",
      "Marketplace name is too long.",
      "Use the canonical marketplace name."
    );

    this.deductScore(result, 5);
  }

  /**
   * ======================================================
   * WHITESPACE CHECK
   * ======================================================
   */

  if (
    marketplace !== marketplace.trim()
  ) {

    this.warning(
      result,
      "MARKETPLACE_WHITESPACE",
      "Marketplace contains leading or trailing whitespace.",
      "Trim marketplace value."
    );

    this.deductScore(result, 2);
  }

  /**
   * ======================================================
   * BASIC CHARACTER CHECK
   * ======================================================
   */

  if (!/^[a-z0-9-_]+$/i.test(marketplace)) {

    this.warning(
      result,
      "MARKETPLACE_INVALID_FORMAT",
      "Marketplace contains unsupported characters.",
      "Use only letters, numbers, hyphen or underscore."
    );

    this.deductScore(result, 3);
  }
}/**
 * ========================================================
 * SUPPORTED MARKETPLACE VALIDATION
 * ========================================================
 */

const supported =
  this.config.supportedMarketplaces;

const isSupported =
  supported.includes(marketplace);

if (!isSupported) {

  if (this.config.allowUnknownMarketplace) {

    this.warning(
      result,
      "MARKETPLACE_NOT_SUPPORTED",
      `Marketplace '${marketplace}' is not in the supported list.`,
      "The product will continue using generic compatibility rules."
    );

    this.deductScore(result, 10);

  } else {

    this.critical(
      result,
      "MARKETPLACE_UNSUPPORTED",
      `Marketplace '${marketplace}' is not supported.`,
      "Use one of the supported marketplaces."
    );

    this.deductScore(result, 30);

  }

}

/**
 * ========================================================
 * CANONICAL MARKETPLACE CHECK
 * ========================================================
 */

const canonical = new Set([
  "shopify",
  "woocommerce",
  "amazon",
  "etsy",
  "ebay",
  "tiktok",
  "generic",
]);

if (
  isSupported &&
  !canonical.has(marketplace)
) {

  this.warning(
    result,
    "MARKETPLACE_NON_STANDARD",
    "Marketplace is supported but not part of the canonical set.",
    "Verify marketplace naming."
  );

  this.deductScore(result, 2);

}/**
 * ========================================================
 * MARKETPLACE NORMALIZATION
 * ========================================================
 */

const marketplaceAliases:
  Readonly<Record<string, string>> = {

  "amazon.com": "amazon",
  "amazon marketplace": "amazon",

  "shopify-store": "shopify",
  "shopify store": "shopify",

  "woo": "woocommerce",
  "woo-commerce": "woocommerce",

  "ebay.com": "ebay",

  "tiktok shop": "tiktok",
  "tiktok-shop": "tiktok",

};

const normalizedMarketplace =
  marketplaceAliases[marketplace] ??
  marketplace;

/**
 * ========================================================
 * NORMALIZATION WARNING
 * ========================================================
 */

if (
  normalizedMarketplace !==
  marketplace
) {

  this.info(
    result,
    "MARKETPLACE_NORMALIZED",
    `Marketplace '${marketplace}' normalized to '${normalizedMarketplace}'.`,
    "Canonical marketplace name applied."
  );

}

/**
 * ========================================================
 * CONFIGURATION CONSISTENCY
 * ========================================================
 */

if (
  !this.config.supportedMarketplaces.includes(
    normalizedMarketplace
  ) &&
  !this.config.allowUnknownMarketplace
) {

  this.critical(
    result,
    "MARKETPLACE_CONFIGURATION_ERROR",
    "Normalized marketplace is not supported by the current configuration.",
    "Update validator configuration."
  );

  this.deductScore(result, 20);

}/**
 * ========================================================
 * MARKETPLACE READINESS SCORING
 * ========================================================
 */

let readinessScore = 100;

if (!marketplace) {
  readinessScore -= 30;
}

if (!isSupported) {
  readinessScore -=
    this.config.allowUnknownMarketplace
      ? 10
      : 30;
}

if (
  normalizedMarketplace !==
  marketplace
) {
  readinessScore -= 2;
}

if (
  marketplace.length < 2 ||
  marketplace.length > 50
) {
  readinessScore -= 5;
}

if (!/^[a-z0-9-_]+$/i.test(marketplace)) {
  readinessScore -= 3;
}

/**
 * ========================================================
 * FINAL MARKETPLACE SCORE
 * ========================================================
 */

readinessScore = Math.max(
  0,
  Math.min(100, readinessScore)
);

result.score = Math.min(
  result.score,
  readinessScore
);

/**
 * ========================================================
 * READINESS SUMMARY
 * ========================================================
 */

if (readinessScore >= 95) {

  this.info(
    result,
    "MARKETPLACE_READY",
    "Marketplace configuration is ready.",
    "No action required."
  );

} else if (readinessScore >= 80) {

  this.info(
    result,
    "MARKETPLACE_ACCEPTABLE",
    "Marketplace configuration is acceptable.",
    "Minor improvements recommended."
  );

} else if (readinessScore >= 60) {

  this.warning(
    result,
    "MARKETPLACE_NEEDS_ATTENTION",
    "Marketplace configuration requires improvement.",
    "Review marketplace configuration."
  );

} else {

  this.critical(
    result,
    "MARKETPLACE_NOT_READY",
    "Marketplace configuration is not ready.",
    "Resolve marketplace issues before publishing."
  );

}

    void product;
    void marketplace;
    void this.config;

    result.score =
      this.normalizeScore(result.score);

    const finished =
      this.finishTelemetry(startedAt);
/**
 * ========================================================
 * TELEMETRY RULES
 * ========================================================
 */

const telemetry: TelemetryReport =
  this.buildTelemetryReport({
    validator: "MarketplaceValidator",
    startedAt,
    finishedAt: finished.finishedAt,
    rules: [],
  });

    const metadata: CatalogMetadata =
  this.buildMetadata({
    validator: "MarketplaceValidator",
    marketplace: normalizedMarketplace,
    executionTimeMs: finished.durationMs,
  });

    await this.afterValidate(
      input,
      result
    );/**
 * ========================================================
 * FINAL CONSISTENCY
 * ========================================================
 */

result.score =
  this.normalizeScore(result.score);

    return {
      ...result,
      metadata,
      telemetry,
    };
  }
}

export const marketplaceValidator =
  new MarketplaceValidator();

export default MarketplaceValidator;
