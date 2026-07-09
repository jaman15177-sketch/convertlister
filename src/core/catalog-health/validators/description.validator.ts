import { BaseValidator } from "../base/base-validator";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type { HealthCategory } from "../health.types";

import type { AdapterProduct } from "@/adapters/core/adapter.contract";

import type {
  CatalogMetadata,
} from "../base/metadata.engine";

import type {
  TelemetryReport,
} from "../base/telemetry.engine";

interface DescriptionConfig {
  minLength: number;
  maxLength: number;

  bannedPhrases: readonly string[];

  ctaKeywords: readonly string[];
}

const DEFAULT_CONFIG: DescriptionConfig = {
  minLength: 20,

  maxLength: 3000,

  bannedPhrases: [
    "guaranteed profit",
    "100% income",
    "fake",
  ],

  ctaKeywords: [
    "buy",
    "order",
    "shop now",
    "click here",
  ],
};

export class DescriptionValidator extends BaseValidator {
  public readonly category: HealthCategory =
    "DESCRIPTION";

  public constructor() {
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

    const description =
      this.normalizeText(
        String(
          product.description ??
          product.metadata?.description ??
          ""
        )
      );

    const marketplace =
      this.getMarketplace(input);

    /**
     * ============================================================
     * DESCRIPTION REQUIRED
     * ============================================================
     */

    if (!description) {

      this.critical(
        result,
        "DESCRIPTION_MISSING",
        "Product description is missing",
        "Add a detailed product description"
      );

      this.deductScore(
        result,
        50
      );
    }

    /**
     * ============================================================
     * DESCRIPTION LENGTH
     * ============================================================
     */

    if (
      description &&
      description.length <
        DEFAULT_CONFIG.minLength
    ) {

      this.warning(
        result,
        "DESCRIPTION_TOO_SHORT",
        "Description is too short",
        "Provide more product details"
      );

      this.deductScore(
        result,
        20
      );
    }

    if (
      description.length >
      DEFAULT_CONFIG.maxLength
    ) {

      this.warning(
        result,
        "DESCRIPTION_TOO_LONG",
        "Description is too long",
        "Reduce unnecessary content"
      );

      this.deductScore(
        result,
        15
      );
    }    /**
     * ============================================================
     * READABILITY
     * ============================================================
     */

    const words = description
      .split(/\s+/)
      .filter(Boolean);

    const sentences = description
      .split(/[.!?]+/)
      .filter(Boolean);

    const averageWordsPerSentence =
      words.length /
      Math.max(sentences.length, 1);

    if (averageWordsPerSentence > 25) {

      this.warning(
        result,
        "DESCRIPTION_LOW_READABILITY",
        "Description is difficult to read",
        "Use shorter sentences."
      );

      this.deductScore(
        result,
        10
      );
    }

    /**
     * ============================================================
     * KEYWORD STUFFING
     * ============================================================
     */

    const frequency =
      new Map<string, number>();

    for (const word of words) {

      const normalized =
        word.toLowerCase();

      frequency.set(
        normalized,
        (frequency.get(normalized) ?? 0) + 1
      );
    }

    const highestFrequency =
      Math.max(
        0,
        ...frequency.values()
      );

    if (highestFrequency > 6) {

      this.warning(
        result,
        "DESCRIPTION_KEYWORD_STUFFING",
        "Repeated keywords detected",
        "Reduce repeated keyword usage."
      );

      this.deductScore(
        result,
        20
      );
    }

    /**
     * ============================================================
     * CTA DETECTION
     * ============================================================
     */

    const lowerDescription =
      description.toLowerCase();

    const hasCTA =
      DEFAULT_CONFIG.ctaKeywords.some(
        keyword =>
          lowerDescription.includes(keyword)
      );

    if (hasCTA) {

      this.info(
        result,
        "DESCRIPTION_CALL_TO_ACTION",
        "Call-to-action text detected",
        "Avoid promotional wording for marketplace compliance."
      );

      this.deductScore(
        result,
        5
      );
    }

    /**
     * ============================================================
     * BULLET DENSITY
     * ============================================================
     */

    const bulletCount =
      (
        description.match(
          /(?:^|\n)\s*(?:[-*•])/gm
        ) ?? []
      ).length;

    if (bulletCount > 15) {

      this.warning(
        result,
        "DESCRIPTION_TOO_MANY_BULLETS",
        "Too many bullet points detected",
        "Keep the description concise."
      );

      this.deductScore(
        result,
        10
      );
    }

    /**
     * ============================================================
     * POLICY SAFETY
     * ============================================================
     */

    const hasBannedPhrase =
      DEFAULT_CONFIG.bannedPhrases.some(
        phrase =>
          lowerDescription.includes(
            phrase.toLowerCase()
          )
      );

    if (hasBannedPhrase) {

      this.critical(
        result,
        "DESCRIPTION_POLICY_RISK",
        "Potential marketplace policy violation detected",
        "Remove prohibited marketing claims."
      );

      this.deductScore(
        result,
        40
      );
    }

    /**
     * ============================================================
     * PART 3 STARTS HERE
     * ============================================================
     */    /**
     * ============================================================
     * COMPLEX LANGUAGE
     * ============================================================
     */

    const longWords =
      words.filter(
        word => word.length > 12
      ).length;

    if (longWords > 5) {

      this.info(
        result,
        "DESCRIPTION_COMPLEX_LANGUAGE",
        "Description contains many complex words",
        "Prefer simpler wording for readability."
      );

      this.deductScore(
        result,
        5
      );
    }

    /**
     * ============================================================
     * MARKETPLACE BONUS
     * ============================================================
     */

    if (
      marketplace === "amazon" &&
      description.length >= 200 &&
      description.length <= 2000
    ) {
      this.bonusScore(result, 5);
    }

    if (
      marketplace === "shopify" &&
      description.length >= 150
    ) {
      this.bonusScore(result, 5);
    }

    if (
      marketplace === "etsy" &&
      description.length >= 100
    ) {
      this.bonusScore(result, 5);
    }

    /**
     * ============================================================
     * QUALITY BONUS
     * ============================================================
     */

    if (
      !hasCTA &&
      !hasBannedPhrase &&
      description.length >= 150 &&
      description.length <= 1200
    ) {
      this.bonusScore(result, 10);
    }

    /**
     * ============================================================
     * FINAL SCORE
     * ============================================================
     */

    result.score =
      this.normalizeScore(result.score);

    /**
     * ============================================================
     * TELEMETRY
     * ============================================================
     */

    const finishedAt =
      this.finishTelemetry(startedAt);

    const telemetry: TelemetryReport =
      this.buildTelemetryReport({
        validator: "DescriptionValidator",
        startedAt,
        finishedAt: finishedAt.finishedAt,
        rules: [],
      });

    /**
     * ============================================================
     * METADATA
     * ============================================================
     */

    const metadata: CatalogMetadata =
      this.buildMetadata({
        validator: "DescriptionValidator",
        marketplace,
        executionTimeMs:
          finishedAt.durationMs,
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

export default DescriptionValidator;
