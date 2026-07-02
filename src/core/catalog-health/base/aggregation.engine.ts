/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Aggregation Engine
 * ============================================================
 *
 * Version 1 (Foundation)
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Merge validator scores
 * ✓ Merge issues
 * ✓ Merge warnings
 * ✓ Build final result
 * ✓ Stateless
 * ✓ Build-safe
 * ============================================================
 */

import type {
  CatalogHealthResult,
  HealthIssue,
  HealthScoreBreakdown,
} from "../health.types";

import type {
  ValidatorResult,
} from "./validator.types";

import type {
  CatalogMetadata,
} from "./metadata.engine";

export class AggregationEngine {
  /**
   * ============================================================
   * EMPTY BREAKDOWN
   * ============================================================
   */
  public emptyBreakdown(): HealthScoreBreakdown {
    return {
      title: 100,
      description: 100,
      price: 100,
      image: 100,
      category: 100,
      brand: 100,
      variant: 100,
      seo: 100,
      duplicate: 100,
      marketplace: 100,
    };
  }
/**
 * ============================================================
 * DEFAULT WEIGHTS
 * ============================================================
 */
private readonly weights: Readonly<HealthScoreBreakdown> = {
  title: 20,
  description: 15,
  price: 10,
  image: 10,
  category: 10,
  brand: 5,
  variant: 10,
  seo: 10,
  duplicate: 5,
  marketplace: 5,
};

/**
 * ============================================================
 * BUILD BREAKDOWN
 * ============================================================
 */
public buildBreakdown(
  partial: Partial<HealthScoreBreakdown>
): HealthScoreBreakdown {
  return {
    ...this.emptyBreakdown(),
    ...partial,
  };
}

/**
 * ============================================================
 * UPDATE BREAKDOWN
 * ============================================================
 */
public updateBreakdown(
  breakdown: HealthScoreBreakdown,
  category: keyof HealthScoreBreakdown,
  score: number
): HealthScoreBreakdown {
  return {
    ...breakdown,
    [category]: score,
  };
}

/**
 * ============================================================
 * MERGE BREAKDOWNS
 * ============================================================
 */
public mergeBreakdowns(
  ...items: ReadonlyArray<HealthScoreBreakdown>
): HealthScoreBreakdown {
  let merged = this.emptyBreakdown();

  for (const item of items) {
    merged = {
      ...merged,
      ...item,
    };
  }

  return merged;
}
  /**
   * ============================================================
   * AVERAGE SCORE
   * ============================================================
   */
  private averageScore(
    results: ReadonlyArray<ValidatorResult>
  ): number {
    if (results.length === 0) {
      return 100;
    }

    const total = results.reduce(
      (sum, result) => sum + result.score,
      0
    );

    return Number(
      (total / results.length).toFixed(2)
    );
  }
/**
 * ============================================================
 * WEIGHTED SCORE
 * ============================================================
 */
private weightedAverageScore(
  breakdown: HealthScoreBreakdown
): number {
  let weighted = 0;
  let totalWeight = 0;

  for (const key of Object.keys(
    this.weights
  ) as Array<keyof HealthScoreBreakdown>) {

    const weight = this.weights[key];

    weighted += breakdown[key] * weight;

    totalWeight += weight;
  }

  return Number(
    (weighted / totalWeight).toFixed(2)
  );
}
  /**
   * ============================================================
   * MERGE ISSUES
   * ============================================================
   */
  private mergeIssues(
    results: ReadonlyArray<ValidatorResult>
  ): HealthIssue[] {
    return results.flatMap(r => r.issues);
  }

  /**
   * ============================================================
   * MERGE WARNINGS
   * ============================================================
   */
  private mergeWarnings(
    results: ReadonlyArray<ValidatorResult>
  ): HealthIssue[] {
    return results.flatMap(r => r.warnings);
  }
/**
 * ============================================================
 * VALIDATE RESULTS
 * ============================================================
 */
private validateResults(
  results: ReadonlyArray<ValidatorResult>
): void {
  if (!Array.isArray(results)) {
    throw new Error("Validator results must be an array.");
  }
}

/**
 * ============================================================
 * NORMALIZE VALIDATOR SCORES
 * ============================================================
 */
private normalizeValidatorScores(
  results: ReadonlyArray<ValidatorResult>
): ValidatorResult[] {
  return results.map(result => ({
    ...result,
    score: Math.max(
      0,
      Math.min(100, result.score)
    ),
  }));
}

/**
 * ============================================================
 * DEDUPLICATE ISSUES
 * ============================================================
 */
private deduplicateIssues(
  issues: ReadonlyArray<HealthIssue>
): HealthIssue[] {

  const map = new Map<string, HealthIssue>();

  for (const issue of issues) {
    map.set(issue.id, issue);
  }

  return [...map.values()];
}

/**
 * ============================================================
 * DEDUPLICATE WARNINGS
 * ============================================================
 */
private deduplicateWarnings(
  warnings: ReadonlyArray<HealthIssue>
): HealthIssue[] {

  const map = new Map<string, HealthIssue>();

  for (const warning of warnings) {
    map.set(warning.id, warning);
  }

  return [...map.values()];
}
  /**
   * ============================================================
   * DETERMINE STATUS
   * ============================================================
   */
  private determineStatus(
    score: number
  ): CatalogHealthResult["status"] {
    if (score >= 90) return "EXCELLENT";
    if (score >= 75) return "GOOD";
    if (score >= 50) return "WARNING";
    return "FAILED";
  }

  /**
   * ============================================================
   * BUILD RESULT
   * ============================================================
   */
  private buildResult(params: {
    overallScore: number;
    breakdown: HealthScoreBreakdown;
    issues: HealthIssue[];
    warnings: HealthIssue[];
    metadata: CatalogMetadata;
  }): CatalogHealthResult {
    return {
      status: this.determineStatus(
        params.overallScore
      ),

      overallScore: params.overallScore,

      breakdown: params.breakdown,

      issues: params.issues,

      warnings: params.warnings,

      metadata: params.metadata,

      checkedAt: params.metadata.generatedAt,
    };
  }

  /**
   * ============================================================
   * AGGREGATE
   * ============================================================
   */
  public aggregate(params: {
  results: ReadonlyArray<ValidatorResult>;
  breakdown: HealthScoreBreakdown;
  metadata: CatalogMetadata;
}): CatalogHealthResult {
this.validateResults(params.results);

const normalizedResults =
  this.normalizeValidatorScores(
    params.results
  );
  const normalizedBreakdown =
    this.buildBreakdown(
      params.breakdown
    );

  const overallScore =
    this.weightedAverageScore(
      normalizedBreakdown
    );

  return this.buildResult({
  overallScore,

  breakdown:
    normalizedBreakdown,

  issues:
    this.deduplicateIssues(
      this.mergeIssues(
        normalizedResults
      )
    ),

  warnings:
    this.deduplicateWarnings(
      this.mergeWarnings(
        normalizedResults
      )
    ),

        metadata:
        params.metadata,
    });
  }
}
