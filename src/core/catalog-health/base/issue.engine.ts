/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Issue Engine
 * ============================================================
 *
 * Shared issue creation engine.
 *
 * Used by:
 * • Title Validator
 * • Description Validator
 * • Price Validator
 * • Image Validator
 * • Category Validator
 * • Brand Validator
 * • Variant Validator
 * • SEO Validator
 * • Duplicate Validator
 * • Marketplace Validator
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Single issue format
 * ✓ Zero duplicated logic
 * ✓ Enterprise scalable
 * ✓ Build-safe
 * ============================================================
 */

import type {
  HealthCategory,
  HealthIssue,
  HealthSeverity,
} from "../health.types";

/**
 * ============================================================
 * ISSUE ENGINE
 * ============================================================
 */
export class IssueEngine {

  /**
   * Creates a standardized HealthIssue object.
   */
  public create(
    category: HealthCategory,
    severity: HealthSeverity,
    code: string,
    message: string,
    suggestion?: string
  ): HealthIssue {
    return {
      id: crypto.randomUUID(),
      category,
      severity,
      code,
      message,
      suggestion,
    };
  }
  /**
   * ============================================================
   * WARNING ISSUE
   * ============================================================
   */
  public warning(
    category: HealthCategory,
    code: string,
    message: string,
    suggestion?: string
  ): HealthIssue {
    return this.create(
      category,
      "WARNING",
      code,
      message,
      suggestion
    );
  }

  /**
   * ============================================================
   * INFO ISSUE
   * ============================================================
   */
  public info(
    category: HealthCategory,
    code: string,
    message: string,
    suggestion?: string
  ): HealthIssue {
    return this.create(
      category,
      "INFO",
      code,
      message,
      suggestion
    );
  }

  /**
   * ============================================================
   * CRITICAL ISSUE
   * ============================================================
   */
  public critical(
    category: HealthCategory,
    code: string,
    message: string,
    suggestion?: string
  ): HealthIssue {
    return this.create(
      category,
      "CRITICAL",
      code,
      message,
      suggestion
    );
  }  /**
   * ============================================================
   * MERGE ISSUES
   * ------------------------------------------------------------
   * Merges multiple issue collections into one.
   * ============================================================
   */
  public mergeIssues(
    ...collections: ReadonlyArray<ReadonlyArray<HealthIssue>>
  ): HealthIssue[] {
    const merged: HealthIssue[] = [];

    for (const collection of collections) {
      merged.push(...collection);
    }

    return merged;
  }

  /**
   * ============================================================
   * REMOVE DUPLICATE ISSUES
   * ------------------------------------------------------------
   * Duplicate definition:
   * category + severity + code
   * ============================================================
   */
  public deduplicateIssues(
    issues: ReadonlyArray<HealthIssue>
  ): HealthIssue[] {
    const unique = new Map<string, HealthIssue>();

    for (const issue of issues) {
      const key = [
        issue.category,
        issue.severity,
        issue.code,
      ].join("::");

      if (!unique.has(key)) {
        unique.set(key, issue);
      }
    }

    return Array.from(unique.values());
  }

  /**
   * ============================================================
   * SORT BY SEVERITY
   * ------------------------------------------------------------
   * Order:
   * CRITICAL
   * WARNING
   * INFO
   * ============================================================
   */
  public sortBySeverity(
    issues: ReadonlyArray<HealthIssue>
  ): HealthIssue[] {
    const priority: Record<HealthSeverity, number> = {
      CRITICAL: 0,
      WARNING: 1,
      INFO: 2,
    };

    return [...issues].sort(
      (a, b) =>
        priority[a.severity] - priority[b.severity]
    );
  }  /**
   * ============================================================
   * HAS CRITICAL ISSUES
   * ------------------------------------------------------------
   * Returns true if at least one critical issue exists.
   * ============================================================
   */
  public hasCritical(
    issues: ReadonlyArray<HealthIssue>
  ): boolean {
    return issues.some(
      issue => issue.severity === "CRITICAL"
    );
  }

  /**
   * ============================================================
   * COUNT BY SEVERITY
   * ============================================================
   */
  public countBySeverity(
    issues: ReadonlyArray<HealthIssue>,
    severity: HealthSeverity
  ): number {
    return issues.filter(
      issue => issue.severity === severity
    ).length;
  }

  /**
   * ============================================================
   * COUNT BY CATEGORY
   * ============================================================
   */
  public countByCategory(
    issues: ReadonlyArray<HealthIssue>,
    category: HealthCategory
  ): number {
    return issues.filter(
      issue => issue.category === category
    ).length;
  }

  /**
   * ============================================================
   * EMPTY CHECK
   * ============================================================
   */
  public isEmpty(
    issues: ReadonlyArray<HealthIssue>
  ): boolean {
    return issues.length === 0;
  }

  /**
   * ============================================================
   * TOTAL ISSUE COUNT
   * ============================================================
   */
  public total(
    issues: ReadonlyArray<HealthIssue>
  ): number {
    return issues.length;
  }
}
