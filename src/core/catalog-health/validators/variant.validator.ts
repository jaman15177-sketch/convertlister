/**
 * ============================================================
 * CONVERTLISTER
 * Enterprise Variant Validator
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

import type { HealthCategory } from "../health.types";

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

interface VariantValidatorConfig {
  requireSku: boolean;
  requireBarcode: boolean;
  requireInventory: boolean;
  maxVariants: number;
}

const DEFAULT_CONFIG: VariantValidatorConfig = {
  requireSku: false,
  requireBarcode: false,
  requireInventory: false,
  maxVariants: 500,
};

/**
 * ============================================================
 * VARIANT VALIDATOR
 * ============================================================
 */

export class VariantValidator extends BaseValidator {

  public readonly category: HealthCategory = "VARIANT";

  public constructor(
    private readonly config: VariantValidatorConfig =
      DEFAULT_CONFIG
  ) {
    super();
  }

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {

    const startedAt = this.startTelemetry();

    await this.beforeValidate(input);

    const result = this.emptyResult();

    const product: AdapterProduct = input.product;

    const marketplace =
      this.getMarketplace(input);

    const variants =
      Array.isArray(product.variants)
        ? product.variants
        : [];

    /**
     * ========================================================
     * MESSAGE 2 STARTS HERE
     * ========================================================
     */
/**
 * ========================================================
 * VARIANT COLLECTION
 * ========================================================
 */

if (!Array.isArray(product.variants)) {

  this.warning(
    result,
    "VARIANT_COLLECTION_MISSING",
    "Product does not contain a variant collection.",
    "Provide an empty array or a valid variant collection."
  );

} else if (variants.length === 0) {

  this.info(
    result,
    "NO_VARIANTS",
    "Product has no variants.",
    "Nothing to validate."
  );

} else {

  /**
   * ======================================================
   * VARIANT COUNT
   * ======================================================
   */

  if (variants.length > this.config.maxVariants) {

    this.warning(
      result,
      "VARIANT_LIMIT_EXCEEDED",
      `Product contains ${variants.length} variants.`,
      `Recommended maximum is ${this.config.maxVariants}.`
    );

    this.deductScore(result, 5);
  }

  /**
   * ======================================================
   * BASIC STRUCTURE
   * ======================================================
   */

  for (const variant of variants) {

    if (!variant) {

      this.critical(
        result,
        "VARIANT_NULL",
        "Variant entry is null or undefined.",
        "Remove invalid variant."
      );

      this.deductScore(result, 10);

      continue;
    }

    if (!variant.id) {

      this.warning(
        result,
        "VARIANT_ID_MISSING",
        "Variant id is missing.",
        "Provide a unique variant id."
      );

      this.deductScore(result, 5);
    }

    if (
      variant.title !== undefined &&
      !this.normalizeText(variant.title)
    ) {

      this.warning(
        result,
        "VARIANT_TITLE_EMPTY",
        "Variant title is empty.",
        "Provide a descriptive variant title."
      );/**
 * ======================================================
 * SKU
 * ======================================================
 */

if (
  this.config.requireSku &&
  !this.normalizeText(variant.sku)
) {

  this.warning(
    result,
    "VARIANT_SKU_MISSING",
    "Variant SKU is missing.",
    "Provide a unique SKU."
  );

  this.deductScore(result, 5);
}

/**
 * ======================================================
 * PRICE
 * ======================================================
 */

if (
  variant.price !== undefined &&
  (
    typeof variant.price !== "number" ||
    Number.isNaN(variant.price) ||
    variant.price < 0
  )
) {

  this.critical(
    result,
    "VARIANT_PRICE_INVALID",
    "Variant price is invalid.",
    "Provide a valid numeric price."
  );

  this.deductScore(result, 10);
}

/**
 * ======================================================
 * INVENTORY
 * ======================================================
 */

if (
  this.config.requireInventory &&
  (
    variant.inventory === undefined ||
    !Number.isInteger(variant.inventory) ||
    variant.inventory < 0
  )
) {

  this.warning(
    result,
    "VARIANT_INVENTORY_INVALID",
    "Variant inventory is invalid.",
    "Provide a valid inventory quantity."
  );

  this.deductScore(result, 5);
}

/**
 * ======================================================
 * BARCODE
 * ======================================================
 */

if (
  this.config.requireBarcode &&
  !this.normalizeText(variant.barcode)
) {

  this.warning(
    result,
    "VARIANT_BARCODE_MISSING",
    "Variant barcode is missing.",
    "Provide a barcode."
  );

  this.deductScore(result, 3);
}
     this.deductScore(result, 3);/**
 * ======================================================
 * ATTRIBUTE / METADATA VALIDATION
 * ======================================================
 */

for (const variant of variants) {

  if (
    variant.attributes !== undefined &&
    (
      typeof variant.attributes !== "object" ||
      variant.attributes === null ||
      Array.isArray(variant.attributes)
    )
  ) {

    this.warning(
      result,
      "VARIANT_ATTRIBUTES_INVALID",
      "Variant attributes must be an object.",
      "Use a key-value attribute object."
    );

    this.deductScore(result, 3);
  }

  if (
    variant.metadata !== undefined &&
    (
      typeof variant.metadata !== "object" ||
      variant.metadata === null ||
      Array.isArray(variant.metadata)
    )
  ) {

    this.warning(
      result,
      "VARIANT_METADATA_INVALID",
      "Variant metadata must be an object.",
      "Use a metadata object."
    );

    this.deductScore(result, 2);
  }
}

/**
 * ======================================================
 * DUPLICATE VARIANT ID
 * ======================================================
 */

const variantIds = new Set<string>();

for (const variant of variants) {

  if (!variant.id) {
    continue;
  }

  if (variantIds.has(variant.id)) {

    this.critical(
      result,
      "DUPLICATE_VARIANT_ID",
      `Duplicate variant id '${variant.id}' detected.`,
      "Each variant id must be unique."
    );

    this.deductScore(result, 10);

  } else {

    variantIds.add(variant.id);

  }
}

/**
 * ======================================================
 * DUPLICATE SKU
 * ======================================================
 */

const skuSet = new Set<string>();

for (const variant of variants) {

  const sku =
    this.normalizeText(
      variant.sku ?? ""
    ).toLowerCase();

  if (!sku) {
    continue;
  }

  if (skuSet.has(sku)) {

    this.warning(
      result,
      "DUPLICATE_VARIANT_SKU",
      `Duplicate SKU '${sku}' detected.`,
      "Each variant SKU should be unique."
    );

    this.deductScore(result, 5);

  } else {

    skuSet.add(sku);

  }
}/**
 * ======================================================
 * FINAL SCORE NORMALIZATION
 * ======================================================
 */

result.score =
  this.normalizeScore(result.score);

/**
 * ======================================================
 * REMOVE DUPLICATE ISSUES
 * ======================================================
 */

result.issues = Array.from(
  new Map(
    result.issues.map(issue => [
      issue.id,
      issue,
    ])
  ).values()
);

/**
 * ======================================================
 * REMOVE DUPLICATE WARNINGS
 * ======================================================
 */

result.warnings = Array.from(
  new Map(
    result.warnings.map(issue => [
      issue.id,
      issue,
    ])
  ).values()
);

/**
 * ======================================================
 * FINAL CONSISTENCY CHECK
 * ======================================================
 */

if (result.score > 100) {
  result.score = 100;
}

if (result.score < 0) {
  result.score = 0;
}
    }

  }

}
    void marketplace;
    void variants;
    void product;
    void this.config;

    result.score =
      this.normalizeScore(result.score);

    const finished =
      this.finishTelemetry(startedAt);

    const telemetry: TelemetryReport =
      this.buildTelemetryReport({
        validator: "VariantValidator",
        startedAt,
        finishedAt: finished.finishedAt,
        rules: [],
      });

    const metadata: CatalogMetadata =
      this.buildMetadata({
        validator: "VariantValidator",
        marketplace,
        executionTimeMs: finished.durationMs,
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

export const variantValidator =
  new VariantValidator();

export default VariantValidator;
