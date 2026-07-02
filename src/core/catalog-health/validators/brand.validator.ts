import { BaseValidator } from "../base/base-validator";
import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";
import type { HealthCategory } from "../health.types";
import type { AdapterProduct } from "@/adapters/core/adapter.contract";

/**
 * ============================================================
 * BRAND VALIDATOR — ENTERPRISE VERSION
 * ============================================================
 */

export class BrandValidator extends BaseValidator {
  public readonly category: HealthCategory = "BRAND";
public constructor() {
  super();
}
  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {
    const startedAt = this.startTelemetry();

    await this.beforeValidate(input);

    const result = this.emptyResult();
const product: AdapterProduct = input.product;

const brand = this.normalizeText(
  String(
    product.metadata?.brand ??
    product.brand ??
    ""
  )
).toLowerCase();
     // BRAND MISSING    // =========================
    if (!brand) {
      result.issues.push(
        this.warning(
          "BRAND_MISSING",
          "Product brand is missing",
          "Add a valid brand name for trust & SEO"
        )
      );

      result.score = this.deductScore(result.score, 20);
    }

    // =========================
    // BRAND LENGTH CHECK
    // =========================
    if (brand && brand.length < 2) {
      result.issues.push(
        this.warning(
          "BRAND_TOO_SHORT",
          "Brand name is too short",
          "Use a recognizable brand name"
        )
      );

      result.score = this.deductScore(result.score, 10);
    }

    if (brand && brand.length > 40) {
      result.issues.push(
        this.warning(
          "BRAND_TOO_LONG",
          "Brand name is too long",
          "Use standardized brand naming"
        )
      );

      result.score = this.deductScore(result.score, 10);
    }    const spamPatterns = [
      "cheap",
      "best deal",
      "100% profit",
      "official store",
      "hot sale",
      "limited offer",
    ];

    const isSpam = spamPatterns.some((p) =>
      brand.includes(p)
    );

    if (isSpam) {
      result.issues.push(
        this.critical(
          "BRAND_SPAM_DETECTED",
          "Suspicious or spam-like brand detected",
          "Use authentic brand identity only"
        )
      );

      result.score = this.deductScore(result.score, 40);
    }
    const marketplace =
      input.context.marketplace || "generic";

    const trustedBrands = [
      "apple",
      "samsung",
      "sony",
      "nike",
      "adidas",
      "lenovo",
    ];

    // AMAZON / MARKETPLACE RULES
    if (marketplace === "amazon") {
      if (brand && !trustedBrands.includes(brand)) {
        result.issues.push(
          this.info(
            "AMAZON_BRAND_UNKNOWN",
            "Brand not in trusted index",
            "Ensure brand legitimacy for better conversion"
          )
        );

        result.score = this.deductScore(result.score, 10);
      }
    }

    // TRUST BOOST
    if (brand.length >= 3 && brand.length <= 20) {
      result.score = this.bonusScore(result.score, 10);
    }

    if (trustedBrands.includes(brand)) {
      result.score = this.bonusScore(result.score, 15);
    }    result.score = this.normalizeScore(result.score);

    const finishedAt = this.finishTelemetry(startedAt);

    const telemetry = this.buildTelemetryReport({
      startedAt,
      finishedAt: finishedAt.finishedAt,
      rules: [],
    });

    const metadata = this.buildMetadata(
      finishedAt.durationMs,
      marketplace
    );

    await this.afterValidate(input, result);

    return {
      ...result,
      metadata,
      telemetry,
    };
  }
}

/**
 * SINGLETON EXPORT
 */
export const brandValidator = new BrandValidator();
