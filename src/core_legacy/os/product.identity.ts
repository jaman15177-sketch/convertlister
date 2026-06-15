import crypto from "crypto";

/**
 * ProductIdentity
 * ----------------
 * Guarantees stable, deterministic IDs across all marketplaces:
 * AliExpress, Amazon, Shopify, TikTok, Custom
 */
export class ProductIdentity {
  /**
   * Normalize any raw product ID into a stable system-wide ID
   */
  static ensureId(rawId: string): string {
    if (!rawId || typeof rawId !== "string") {
      rawId = "unknown";
    }

    const cleaned = rawId
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

    return cleaned;
  }

  /**
   * Generate deterministic cross-market fingerprint ID
   * Used for merging same product across different sources
   */
  static generateGlobalId(
    source: string,
    rawId: string
  ): string {
    const base = `${source}_${rawId}`;

    return crypto
      .createHash("sha256")
      .update(base)
      .digest("hex")
      .slice(0, 16);
  }

  /**
   * Create stable merge key for cross-market deduplication
   */
  static mergeKey(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .trim()
      .slice(0, 64);
  }

  /**
   * Detect if two products are likely same entity (basic heuristic)
   */
  static isSameProduct(
    titleA: string,
    titleB: string
  ): boolean {
    const a = this.mergeKey(titleA);
    const b = this.mergeKey(titleB);

    let match = 0;

    const len = Math.min(a.length, b.length);

    for (let i = 0; i < len; i++) {
      if (a[i] === b[i]) match++;
    }

    const similarity = match / Math.max(a.length, b.length);

    return similarity >= 0.8;
  }
}

export const productIdentity = new ProductIdentity();
