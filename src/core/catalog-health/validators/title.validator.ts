/**
 * ============================================================
 * CONVERTLISTER
 * Enterprise Catalog Health
 * Title Validator
 * ============================================================
 */

import { BaseValidator } from "../base/base-validator";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type {
  HealthCategory,
  ValidatorHealthResult,
} from "../health.types";

const TITLE_MIN_LENGTH = 20;
const TITLE_RECOMMENDED_MIN = 40;
const TITLE_MAX_LENGTH = 150;

const TITLE_HARD_MAX = 200;

const MAX_REPEAT_WORD = 3;

const SYMBOL_REGEX =
  /[!@#$%^&*()+=\[\]{}<>\\|~`]/g;

const MULTISPACE_REGEX = /\s{2,}/g;

const REPEAT_CHAR_REGEX = /(.)\1{4,}/;

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "of",
  "for",
  "with",
  "to",
  "and",
]);

export class TitleValidator extends BaseValidator {
  public readonly category: HealthCategory = "TITLE";

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {

    await this.beforeValidate(input);

    const startedAt = this.startTelemetry();

    const result = this.emptyResult();

    let score = 100;

    const title = this.normalizeText(
      input.product.title
    );

    if (!title) {
      result.issues.push(
        this.critical(
          "TITLE_REQUIRED",
          "Product title is missing.",
          "Provide a product title."
        )
      );

      result.score = 0;

      await this.afterValidate(
        input,
        result
      );

      return result;
    }

        /**
     * ==========================================================
     * TITLE LENGTH RULES
     * ==========================================================
     */

    const length = title.length;

    if (length < TITLE_MIN_LENGTH) {
      score = this.deductScore(score, 30);

      result.issues.push(
        this.critical(
          "TITLE_TOO_SHORT",
          `Title has only ${length} characters.`,
          `Increase title length to at least ${TITLE_RECOMMENDED_MIN} characters.`
        )
      );
    } else if (length < TITLE_RECOMMENDED_MIN) {
      score = this.deductScore(score, 10);

      result.warnings.push(
        this.warning(
          "TITLE_COULD_BE_LONGER",
          "Title is valid but shorter than recommended.",
          `Target at least ${TITLE_RECOMMENDED_MIN} characters.`
        )
      );
    }

    if (length > TITLE_MAX_LENGTH) {
      score = this.deductScore(score, 15);

      result.warnings.push(
        this.warning(
          "TITLE_TOO_LONG",
          `Title contains ${length} characters.`,
          `Keep title below ${TITLE_MAX_LENGTH} characters.`
        )
      );
    }

    if (length > TITLE_HARD_MAX) {
      score = this.deductScore(score, 40);

      result.issues.push(
        this.critical(
          "TITLE_EXCEEDS_LIMIT",
          "Title exceeds hard safety limit.",
          `Reduce title below ${TITLE_HARD_MAX} characters.`
        )
      );
    }

    /**
     * ==========================================================
     * WHITESPACE
     * ==========================================================
     */

    if (MULTISPACE_REGEX.test(title)) {
      score = this.deductScore(score, 3);

      result.warnings.push(
        this.warning(
          "MULTIPLE_SPACES",
          "Title contains repeated spaces.",
          "Use a single space between words."
        )
      );
    }

    /**
     * ==========================================================
     * SPECIAL SYMBOLS
     * ==========================================================
     */

    const symbolMatches =
      title.match(SYMBOL_REGEX);

    if (
      symbolMatches &&
      symbolMatches.length > 3
    ) {
      score = this.deductScore(score, 5);

      result.warnings.push(
        this.warning(
          "EXCESSIVE_SYMBOLS",
          "Too many special symbols detected.",
          "Use only necessary punctuation."
        )
      );
    }

    /**
     * ==========================================================
     * REPEATED CHARACTERS
     * ==========================================================
     */

    if (REPEAT_CHAR_REGEX.test(title)) {
      score = this.deductScore(score, 10);

      result.warnings.push(
        this.warning(
          "REPEATED_CHARACTERS",
          "Repeated characters detected.",
          "Remove unnecessary repeated letters."
        )
      );
    }    /**
     * ==========================================================
     * WORD QUALITY RULES
     * ==========================================================
     */

    const words = title
      .split(/\s+/)
      .filter(Boolean);

    const normalizedWords = words.map(word =>
      this.normalizeKeyword(word)
    );

    /**
     * ==========================================================
     * DUPLICATE WORD DETECTION
     * ==========================================================
     */

    const frequency = new Map<string, number>();

    for (const word of normalizedWords) {
      if (STOP_WORDS.has(word)) {
        continue;
      }

      frequency.set(
        word,
        (frequency.get(word) ?? 0) + 1
      );
    }

    const repeatedWords: string[] = [];

    for (const [word, count] of frequency) {
      if (count > MAX_REPEAT_WORD) {
        repeatedWords.push(word);
      }
    }

    if (repeatedWords.length > 0) {
      score = this.deductScore(score, 15);

      result.warnings.push(
        this.warning(
          "KEYWORD_STUFFING",
          `Repeated keywords detected: ${repeatedWords.join(", ")}`,
          "Reduce repeated keywords for better readability."
        )
      );
    }

    /**
     * ==========================================================
     * UNIQUE WORD RATIO
     * ==========================================================
     */

    const uniqueWords = new Set(normalizedWords);

    if (
      normalizedWords.length >= 8 &&
      uniqueWords.size <
        normalizedWords.length * 0.6
    ) {
      score = this.deductScore(score, 10);

      result.warnings.push(
        this.warning(
          "LOW_UNIQUE_WORD_RATIO",
          "Too many duplicated words in title.",
          "Use more descriptive and varied wording."
        )
      );
    }

    /**
     * ==========================================================
     * SINGLE WORD TITLE
     * ==========================================================
     */

    if (words.length < 2) {
      score = this.deductScore(score, 25);

      result.issues.push(
        this.critical(
          "TITLE_TOO_SIMPLE",
          "Title contains too few words.",
          "Use a descriptive product title."
        )
      );
    }

    /**
     * ==========================================================
     * ALL CAPS DETECTION
     * ==========================================================
     */

    if (
      title === title.toUpperCase() &&
      title.length > 10
    ) {
      score = this.deductScore(score, 8);

      result.warnings.push(
        this.warning(
          "ALL_CAPS_TITLE",
          "Entire title is uppercase.",
          "Use normal title capitalization."
        )
      );
    }

    /**
     * ==========================================================
     * VERY SHORT WORD COVERAGE
     * ==========================================================
     */

    const tinyWords = words.filter(
      word => word.length <= 2
    );

    if (
      words.length >= 6 &&
      tinyWords.length >
        words.length * 0.5
    ) {
      score = this.deductScore(score, 5);

      result.warnings.push(
        this.warning(
          "LOW_INFORMATION_TITLE",
          "Title contains too many very short words.",
          "Use more meaningful descriptive words."
        )
      );
    }    /**
     * ==========================================================
     * READABILITY & QUALITY RULES
     * ==========================================================
     */

    const alphaCount =
      (title.match(/[A-Za-z]/g) ?? []).length;

    const digitCount =
      (title.match(/\d/g) ?? []).length;

    const punctuationCount =
      (title.match(/[.,;:()/\-]/g) ?? []).length;

    /**
     * ==========================================================
     * LETTER COVERAGE
     * ==========================================================
     */

    if (alphaCount < 5) {
      score = this.deductScore(score, 20);

      result.issues.push(
        this.critical(
          "LOW_ALPHA_CONTENT",
          "Title contains too few alphabetic characters.",
          "Use a descriptive product title."
        )
      );
    }

    /**
     * ==========================================================
     * EXCESSIVE NUMBERS
     * ==========================================================
     */

    if (
      digitCount > 0 &&
      digitCount > alphaCount
    ) {
      score = this.deductScore(score, 8);

      result.warnings.push(
        this.warning(
          "TOO_MANY_NUMBERS",
          "Title contains excessive numeric content.",
          "Keep numbers only when they describe the product."
        )
      );
    }

    /**
     * ==========================================================
     * EXCESSIVE PUNCTUATION
     * ==========================================================
     */

    if (punctuationCount > 10) {
      score = this.deductScore(score, 5);

      result.warnings.push(
        this.warning(
          "EXCESSIVE_PUNCTUATION",
          "Too much punctuation detected.",
          "Simplify title formatting."
        )
      );
    }

    /**
     * ==========================================================
     * SPAM PHRASES
     * ==========================================================
     */

    const spamPhrases = [
      "best price",
      "cheap",
      "free shipping",
      "guaranteed",
      "100% free",
      "limited offer",
      "buy now",
    ];

    const normalizedTitle =
      this.normalizeKeyword(title);

    const detectedSpam =
      spamPhrases.filter(phrase =>
        normalizedTitle.includes(phrase)
      );

    if (detectedSpam.length > 0) {
      score = this.deductScore(score, 12);

      result.warnings.push(
        this.warning(
          "SPAM_LANGUAGE",
          `Marketing phrases detected: ${detectedSpam.join(", ")}`,
          "Avoid promotional wording inside product titles."
        )
      );
    }

    /**
     * ==========================================================
     * LEADING / TRAILING PUNCTUATION
     * ==========================================================
     */

    if (/^[^\w]+/.test(title) || /[^\w]+$/.test(title)) {
      score = this.deductScore(score, 4);

      result.warnings.push(
        this.warning(
          "EDGE_PUNCTUATION",
          "Title starts or ends with punctuation.",
          "Remove unnecessary leading or trailing symbols."
        )
      );
    }

    /**
     * ==========================================================
     * WORD COUNT
     * ==========================================================
     */

    if (words.length > 30) {
      score = this.deductScore(score, 8);

      result.warnings.push(
        this.warning(
          "EXCESSIVE_WORD_COUNT",
          "Title contains too many words.",
          "Keep the title concise while remaining descriptive."
        )
      );
    }    result.score =
      this.normalizeScore(score);

    const telemetry =
      this.finishTelemetry(startedAt);

    void telemetry;

    await this.afterValidate(
      input,
      result
    );

    return result;
  }
}
