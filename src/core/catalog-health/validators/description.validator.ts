import { BaseValidator } from "../base/base-validator";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type { HealthCategory } from "../health.types";

import type { AdapterProduct } from "@/adapters/core/adapter.contract";

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
      input.context.marketplace ||
      "generic";

    if (!description) {
      result.issues.push(
        this.critical(
          "DESCRIPTION_MISSING",
          "Product description is missing",
          "Add a detailed product description"
        )
      );

      result.score =
        this.deductScore(
          result.score,
          50
        );
    }

    if (
      description &&
      description.length <
        DEFAULT_CONFIG.minLength
    ) {
      result.issues.push(
        this.warning(
          "DESCRIPTION_TOO_SHORT",
          "Description is too short",
          "Provide more product details"
        )
      );

      result.score =
        this.deductScore(
          result.score,
          20
        );
    }

    if (
      description.length >
      DEFAULT_CONFIG.maxLength
    ) {
      result.issues.push(
        this.warning(
          "DESCRIPTION_TOO_LONG",
          "Description is too long",
          "Reduce unnecessary content"
        )
      );

      result.score =
        this.deductScore(
          result.score,
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
      result.issues.push(
        this.warning(
          "DESCRIPTION_LOW_READABILITY",
          "Description is difficult to read",
          "Use shorter sentences."
        )
      );

      result.score = this.deductScore(
        result.score,
        10
      );
    }

    /**
     * ============================================================
     * KEYWORD STUFFING
     * ============================================================
     */

    const frequency = new Map<string, number>();

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
      result.issues.push(
        this.warning(
          "DESCRIPTION_KEYWORD_STUFFING",
          "Repeated keywords detected",
          "Reduce repeated keyword usage."
        )
      );

      result.score = this.deductScore(
        result.score,
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
      result.issues.push(
        this.info(
          "DESCRIPTION_CALL_TO_ACTION",
          "Call-to-action text detected",
          "Avoid promotional wording for marketplace compliance."
        )
      );

      result.score = this.deductScore(
        result.score,
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
      result.issues.push(
        this.warning(
          "DESCRIPTION_TOO_MANY_BULLETS",
          "Too many bullet points detected",
          "Keep the description concise."
        )
      );

      result.score = this.deductScore(
        result.score,
        10
      );
    }    /**
     * ============================================================
     * MARKETPLACE SAFETY
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
      result.issues.push(
        this.critical(
          "DESCRIPTION_POLICY_RISK",
          "Potential marketplace policy violation detected",
          "Remove prohibited marketing claims."
        )
      );

      result.score = this.deductScore(
        result.score,
        40
      );
    }

    /**
     * ============================================================
     * GRAMMAR COMPLEXITY
     * ============================================================
     */

    const longWords =
      words.filter(
        word => word.length > 12
      ).length;

    if (longWords > 5) {
      result.issues.push(
        this.info(
          "DESCRIPTION_COMPLEX_LANGUAGE",
          "Description contains many complex words",
          "Prefer simpler wording for readability."
        )
      );

      result.score = this.deductScore(
        result.score,
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
      result.score = this.bonusScore(
        result.score,
        5
      );
    }

    if (
      marketplace === "shopify" &&
      description.length >= 150
    ) {
      result.score = this.bonusScore(
        result.score,
        5
      );
    }

    if (
      marketplace === "etsy" &&
      description.length >= 100
    ) {
      result.score = this.bonusScore(
        result.score,
        5
      );
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
      result.score = this.bonusScore(
        result.score,
        10
      );
    }

    /**
     * ============================================================
     * FINAL SCORE
     * ============================================================
     */

    result.score =
      this.normalizeScore(
        result.score
      );

    const finishedAt =
      this.finishTelemetry(
        startedAt
      );

    const telemetry =
      this.buildTelemetryReport({
        startedAt,
        finishedAt:
          finishedAt.finishedAt,
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
export const descriptionValidator =
  new DescriptionValidator();
