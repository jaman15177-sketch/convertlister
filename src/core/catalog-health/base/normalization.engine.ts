/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Normalization Engine
 * ============================================================
 *
 * Shared normalization utilities.
 *
 * Used by:
 * • Title Validator
 * • Description Validator
 * • Brand Validator
 * • Variant Validator
 * • SEO Validator
 * • Duplicate Validator
 * • Marketplace Validator
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Stateless
 * ✓ Deterministic
 * ✓ Unicode-safe
 * ✓ Enterprise reusable
 * ✓ Build-safe
 * ============================================================
 */

export class NormalizationEngine {

  /**
   * ============================================================
   * SAFE STRING NORMALIZATION
   * ------------------------------------------------------------
   * - Converts null/undefined to empty string
   * - Trims leading/trailing whitespace
   * - Collapses multiple spaces
   * ============================================================
   */
  public normalizeString(value?: string | null): string {
    if (!value) {
      return "";
    }

    return value
      .trim()
      .replace(/\s+/g, " ");
  }
  /**
   * ============================================================
   * REMOVE HTML
   * ------------------------------------------------------------
   * Removes HTML/XML tags from text.
   * ============================================================
   */
  public removeHtml(value?: string | null): string {
    return this.normalizeString(value)
      .replace(/<[^>]*>/g, " ");
  }

  /**
   * ============================================================
   * COLLAPSE WHITESPACE
   * ------------------------------------------------------------
   * Converts tabs/newlines/multiple spaces into a
   * single whitespace.
   * ============================================================
   */
  public collapseWhitespace(
    value?: string | null
  ): string {
    return this.normalizeString(value)
      .replace(/[\t\r\n]+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  /**
   * ============================================================
   * FULL TEXT NORMALIZATION
   * ------------------------------------------------------------
   * Standard normalization used by every validator.
   * ============================================================
   */
  public normalizeText(
    value?: string | null
  ): string {
    return this.collapseWhitespace(
      this.removeHtml(value)
    );
  }

  /**
   * ============================================================
   * SAFE TRIM
   * ------------------------------------------------------------
   * Safe wrapper around String.trim().
   * ============================================================
   */
  public trim(
    value?: string | null
  ): string {
    return this.normalizeString(value).trim();
  }  /**
   * ============================================================
   * NORMALIZE SKU
   * ------------------------------------------------------------
   * Enterprise SKU normalization.
   *
   * Rules
   * ------------------------------------------------------------
   * • Uppercase
   * • Remove leading/trailing whitespace
   * • Remove unsupported characters
   * • Keep only A-Z, 0-9, -, _
   * ============================================================
   */
  public normalizeSKU(
    sku?: string | null
  ): string {
    const normalized = this.normalizeString(sku)
      .toUpperCase();

    return normalized.replace(/[^A-Z0-9\-_]/g, "");
  }

  /**
   * ============================================================
   * NORMALIZE BARCODE
   * ------------------------------------------------------------
   * Removes every non-digit character.
   * ============================================================
   */
  public normalizeBarcode(
    barcode?: string | null
  ): string {
    return this.normalizeString(barcode)
      .replace(/\D/g, "");
  }

  /**
   * ============================================================
   * NORMALIZE BRAND
   * ------------------------------------------------------------
   * Shared normalization for brand names.
   * ============================================================
   */
  public normalizeBrand(
    brand?: string | null
  ): string {
    return this.normalizeText(brand)
      .toLowerCase();
  }

  /**
   * ============================================================
   * NORMALIZE CATEGORY
   * ------------------------------------------------------------
   * Shared normalization for category names.
   * ============================================================
   */
  public normalizeCategory(
    category?: string | null
  ): string {
    return this.normalizeText(category)
      .toLowerCase();
  }  /**
   * ============================================================
   * NORMALIZE ATTRIBUTE KEY
   * ------------------------------------------------------------
   * Example:
   * " Color " → "color"
   * ============================================================
   */
  public normalizeAttributeKey(
    key?: string | null
  ): string {
    return this.normalizeText(key).toLowerCase();
  }

  /**
   * ============================================================
   * NORMALIZE ATTRIBUTE VALUE
   * ------------------------------------------------------------
   * Example:
   * "  Dark Blue  " → "dark blue"
   * ============================================================
   */
  public normalizeAttributeValue(
    value?: string | null
  ): string {
    return this.normalizeText(value).toLowerCase();
  }

  /**
   * ============================================================
   * NORMALIZE ATTRIBUTE MAP
   * ------------------------------------------------------------
   * Returns normalized key/value pairs.
   * ============================================================
   */
  public normalizeAttributes(
    attributes?: Readonly<Record<string, string>>
  ): Record<string, string> {
    if (!attributes) {
      return {};
    }

    const normalized: Record<string, string> = {};

    for (const [key, value] of Object.entries(attributes)) {
      const normalizedKey =
        this.normalizeAttributeKey(key);

      const normalizedValue =
        this.normalizeAttributeValue(value);

      if (
        normalizedKey.length === 0 ||
        normalizedValue.length === 0
      ) {
        continue;
      }

      normalized[normalizedKey] = normalizedValue;
    }

    return normalized;
  }

  /**
   * ============================================================
   * NORMALIZE STRING ARRAY
   * ------------------------------------------------------------
   * Removes empty values and duplicates while preserving
   * insertion order.
   * ============================================================
   */
  public normalizeStringArray(
    values?: ReadonlyArray<string>
  ): string[] {
    if (!values) {
      return [];
    }

    const unique = new Set<string>();

    for (const value of values) {
      const normalized =
        this.normalizeText(value).toLowerCase();

      if (normalized.length === 0) {
        continue;
      }

      unique.add(normalized);
    }

    return [...unique];
  }  /**
   * ============================================================
   * NORMALIZE SLUG
   * ------------------------------------------------------------
   * Example:
   * "Apple iPhone 16 Pro" -> "apple-iphone-16-pro"
   * ============================================================
   */
  public normalizeSlug(
    value?: string | null
  ): string {
    return this.normalizeText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /**
   * ============================================================
   * NORMALIZE KEYWORD
   * ------------------------------------------------------------
   * Used by:
   * Search
   * Duplicate Detection
   * SEO Validator
   * ============================================================
   */
  public normalizeKeyword(
    value?: string | null
  ): string {
    return this.normalizeText(value)
      .toLowerCase();
  }

  /**
   * ============================================================
   * NORMALIZE URL
   * ------------------------------------------------------------
   * Removes trailing slash and lowercases host/path.
   * ============================================================
   */
  public normalizeUrl(
    value?: string | null
  ): string {
    const url = this.normalizeString(value)
      .trim()
      .toLowerCase();

    return url.replace(/\/+$/, "");
  }

  /**
   * ============================================================
   * COMPARISON KEY
   * ------------------------------------------------------------
   * Stable comparison key used by duplicate detection.
   * ============================================================
   */
  public comparisonKey(
    value?: string | null
  ): string {
    return this.normalizeText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  /**
   * ============================================================
   * STABLE HASH
   * ------------------------------------------------------------
   * Lightweight deterministic hash.
   *
   * Used for:
   * • Duplicate detection
   * • Cache keys
   * • Comparison keys
   * ============================================================
   */
  public stableHash(
    value?: string | null
  ): string {
    const text = this.comparisonKey(value);

    let hash = 0;

    for (let i = 0; i < text.length; i++) {
      hash =
        ((hash << 5) - hash) +
        text.charCodeAt(i);

      hash |= 0;
    }

    return Math.abs(hash).toString(36);
  }
}
