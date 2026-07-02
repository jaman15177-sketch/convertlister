/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Telemetry Engine
 * ============================================================
 *
 * Shared execution telemetry.
 *
 * Goals
 * ------------------------------------------------------------
 * ✓ Stateless
 * ✓ Build-safe
 * ✓ Enterprise reusable
 * ✓ Validator independent
 * ✓ Performance monitoring
 * ============================================================
 */

import type { HealthCategory } from "../health.types";

/**
 * ============================================================
 * RULE EXECUTION
 * ============================================================
 */
export interface RuleExecutionRecord {
  rule: string;

  category: HealthCategory;

  startedAt: number;

  finishedAt: number;

  durationMs: number;

  success: boolean;
}

/**
 * ============================================================
 * TELEMETRY REPORT
 * ============================================================
 */
export interface TelemetryReport {
  validator: string;

  startedAt: number;

  finishedAt: number;

  durationMs: number;

  executedRules: number;

  successfulRules: number;

  failedRules: number;

  rules: RuleExecutionRecord[];
}

/**
 * ============================================================
 * TELEMETRY ENGINE
 * ============================================================
 */
export class TelemetryEngine {

  /**
   * Creates a timestamp.
   */
  public now(): number {
    return Date.now();
  }
  /**
   * ============================================================
   * START RULE
   * ------------------------------------------------------------
   * Returns a timestamp used to measure execution time.
   * ============================================================
   */
  public startRule(): number {
    return this.now();
  }

  /**
   * ============================================================
   * FINISH RULE
   * ------------------------------------------------------------
   * Calculates execution duration.
   * ============================================================
   */
  public finishRule(startedAt: number): {
    finishedAt: number;
    durationMs: number;
  } {
    const finishedAt = this.now();

    return {
      finishedAt,
      durationMs: Math.max(
        0,
        finishedAt - startedAt
      ),
    };
  }

  /**
   * ============================================================
   * CREATE RULE RECORD
   * ------------------------------------------------------------
   * Creates one immutable telemetry record.
   * ============================================================
   */
  public createRuleRecord(params: {
    rule: string;
    category: HealthCategory;
    startedAt: number;
    finishedAt: number;
    success: boolean;
  }): RuleExecutionRecord {
    return {
      rule: params.rule,
      category: params.category,
      startedAt: params.startedAt,
      finishedAt: params.finishedAt,
      durationMs: Math.max(
        0,
        params.finishedAt - params.startedAt
      ),
      success: params.success,
    };
  }  /**
   * ============================================================
   * TOTAL DURATION
   * ------------------------------------------------------------
   * Calculates total execution time of all rules.
   * ============================================================
   */
  public totalDuration(
    rules: ReadonlyArray<RuleExecutionRecord>
  ): number {
    return rules.reduce(
      (total, rule) => total + rule.durationMs,
      0
    );
  }

  /**
   * ============================================================
   * SUCCESS COUNT
   * ============================================================
   */
  public countSuccess(
    rules: ReadonlyArray<RuleExecutionRecord>
  ): number {
    return rules.filter(
      rule => rule.success
    ).length;
  }

  /**
   * ============================================================
   * FAILURE COUNT
   * ============================================================
   */
  public countFailure(
    rules: ReadonlyArray<RuleExecutionRecord>
  ): number {
    return rules.length - this.countSuccess(rules);
  }

  /**
   * ============================================================
   * BUILD TELEMETRY REPORT
   * ============================================================
   */
  public buildReport(params: {
    validator: string;
    startedAt: number;
    finishedAt: number;
    rules: ReadonlyArray<RuleExecutionRecord>;
  }): TelemetryReport {
    return {
      validator: params.validator,

      startedAt: params.startedAt,

      finishedAt: params.finishedAt,

      durationMs: Math.max(
        0,
        params.finishedAt - params.startedAt
      ),

      executedRules: params.rules.length,

      successfulRules: this.countSuccess(
        params.rules
      ),

      failedRules: this.countFailure(
        params.rules
      ),

      rules: [...params.rules],
    };
  }  /**
   * ============================================================
   * MERGE REPORTS
   * ------------------------------------------------------------
   * Merges multiple telemetry reports into one collection.
   * ============================================================
   */
  public mergeReports(
    reports: ReadonlyArray<TelemetryReport>
  ): RuleExecutionRecord[] {
    return reports.flatMap(report => report.rules);
  }

  /**
   * ============================================================
   * AVERAGE RULE DURATION
   * ============================================================
   */
  public averageRuleDuration(
    rules: ReadonlyArray<RuleExecutionRecord>
  ): number {
    if (rules.length === 0) {
      return 0;
    }

    return this.totalDuration(rules) / rules.length;
  }

  /**
   * ============================================================
   * SLOWEST RULE
   * ============================================================
   */
  public slowestRule(
    rules: ReadonlyArray<RuleExecutionRecord>
  ): RuleExecutionRecord | null {
    if (rules.length === 0) {
      return null;
    }

    return rules.reduce((slowest, current) =>
      current.durationMs > slowest.durationMs
        ? current
        : slowest
    );
  }

  /**
   * ============================================================
   * FASTEST RULE
   * ============================================================
   */
  public fastestRule(
    rules: ReadonlyArray<RuleExecutionRecord>
  ): RuleExecutionRecord | null {
    if (rules.length === 0) {
      return null;
    }

    return rules.reduce((fastest, current) =>
      current.durationMs < fastest.durationMs
        ? current
        : fastest
    );
  }
}
