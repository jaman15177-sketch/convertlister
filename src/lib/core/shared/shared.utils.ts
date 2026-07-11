/**
 * ============================================================
 * CONVERTLISTER
 * Shared Foundation
 * Shared Utilities
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Stateless utility helpers shared across every core module.
 *
 * Used By
 * ------------------------------------------------------------
 * ✓ Canonical
 * ✓ Repository
 * ✓ Universal Store
 * ✓ Import
 * ✓ Catalog Health
 * ✓ AI Pipeline
 *
 * MUST NOT contain
 * ------------------------------------------------------------
 * ✗ Business logic
 * ✗ Marketplace logic
 * ✗ Database logic
 * ✗ Repository logic
 * ✗ Canonical logic
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Pure functions
 * ✓ Deterministic
 * ✓ Runtime safe
 * ✓ Tree-shakable
 * ✓ Zero side effects
 * ============================================================
 */

import {
  EMPTY_STRING,
  REGEX,
} from "./shared.constants";

/**
 * ============================================================
 * SHARED UTILITIES
 * ============================================================
 */

export class SharedUtils {

  /**
   * Safe string conversion
   */
  public toString(
    value: unknown
  ): string {

    if (value == null) {
      return EMPTY_STRING;
    }

    return String(value);

  }

  /**
   * Trim + collapse whitespace
   */
  public normalizeWhitespace(
    value?: string | null
  ): string {

    return this.toString(value)
      .trim()
      .replace(REGEX.MULTIPLE_WHITESPACE, " ");

  }

  /**
   * Remove HTML tags
   */
  public removeHtml(
    value?: string | null
  ): string {

    return this.normalizeWhitespace(value)
      .replace(REGEX.HTML_TAG, " ");

  }

  /**
   * Normalize text
   */
  public normalizeText(
    value?: string | null
  ): string {

    return this.removeHtml(value)
      .replace(REGEX.MULTIPLE_WHITESPACE, " ")
      .trim();

  }

  /**
   * Safe lowercase
   */
  public lower(
    value?: string | null
  ): string {

    return this.normalizeText(value)
      .toLowerCase();

  }

  /**
   * Safe uppercase
   */
  public upper(
    value?: string | null
  ): string {

    return this.normalizeText(value)
      .toUpperCase();

  }

  /**
   * Is empty
   */
  public isEmpty(
    value: unknown
  ): boolean {

    if (value == null) {
      return true;
    }

    if (typeof value === "string") {
      return this.normalizeWhitespace(value).length === 0;
    }

    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return false;

  }

  /**
   * Unique array
   */
  public unique<T>(
    values: ReadonlyArray<T>
  ): T[] {

    return [...new Set(values)];

  }

  /**
   * Deep clone
   *
   * Note:
   * Uses structuredClone available in modern
   * browsers and recent Node.js versions.
   */
  public clone<T>(
    value: T
  ): T {

    return structuredClone(value);

  }

}

/**
 * ============================================================
 * SINGLETON
 * ============================================================
 */

export const SharedUtility =
  Object.freeze(
    new SharedUtils()
  );
