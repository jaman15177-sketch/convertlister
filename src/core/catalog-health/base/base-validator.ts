/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Base Validator (FINAL)
 * ============================================================
 */
import { ScoreEngine } from "./score.engine";
import { IssueEngine } from "./issue.engine";
import { MetadataEngine } from "./metadata.engine";
import { TelemetryEngine } from "./telemetry.engine";
import { NormalizationEngine } from "./normalization.engine";

import type { HealthCategory } from "../health.types";

import type {
  ValidatorInput,
  ValidatorResult,
} from "./validator.types";

import type {
  CatalogMetadata,
} from "./metadata.engine";

import type {
  TelemetryReport,
  RuleExecutionRecord,
} from "./telemetry.engine";

import type { AdapterProduct } from "@/adapters/core/adapter.contract";

/**
 * ============================================================
 * BASE VALIDATOR
 * ============================================================
 */
export abstract class BaseValidator {
  public abstract readonly category: HealthCategory;

  protected readonly scoreEngine: ScoreEngine;
  protected readonly issueEngine: IssueEngine;
  protected readonly metadataEngine: MetadataEngine;
  protected readonly telemetryEngine: TelemetryEngine;
  protected readonly normalizationEngine: NormalizationEngine;

  constructor() {
    this.scoreEngine = new ScoreEngine();
    this.issueEngine = new IssueEngine();
    this.metadataEngine = new MetadataEngine();
    this.telemetryEngine = new TelemetryEngine();
    this.normalizationEngine = new NormalizationEngine();
  }

  // ============================================================
  // LIFECYCLE HOOKS (FIXED CONTRACT)
  // ============================================================

  protected async beforeValidate(
    _input: ValidatorInput
  ): Promise<void> {}

  protected async afterValidate(
    _input: ValidatorInput,
    _result: ValidatorResult
  ): Promise<void> {}

  // ============================================================
  // RESULT HELPERS
  // ============================================================

  protected emptyResult(): ValidatorResult {
  return {
    category: this.category,
    score: 100,
    issues: [],
    warnings: [],
  };
}

  protected resetResult(result: ValidatorResult): void {
    result.score = 100;
    result.issues.length = 0;
    result.warnings.length = 0;
  }

  // ============================================================
  // ISSUE HELPERS
  // ============================================================

  protected critical(
    result: ValidatorResult,
    code: string,
    message: string,
    suggestion?: string
  ): void {
    result.issues.push(
      this.issueEngine.critical(this.category, code, message, suggestion)
    );
  }

  protected warning(
    result: ValidatorResult,
    code: string,
    message: string,
    suggestion?: string
  ): void {
    result.warnings.push(
      this.issueEngine.warning(this.category, code, message, suggestion)
    );
  }

  protected info(
    result: ValidatorResult,
    code: string,
    message: string,
    suggestion?: string
  ): void {
    result.warnings.push(
      this.issueEngine.info(this.category, code, message, suggestion)
    );
  }

  // ============================================================
  // SCORE HELPERS
  // ============================================================

  protected clampScore(score: number): number {
    return this.scoreEngine.clampScore(score);
  }

  protected deductScore(result: ValidatorResult, penalty: number): void {
    result.score = this.scoreEngine.deduct(result.score, penalty);
  }

  protected bonusScore(result: ValidatorResult, bonus: number): void {
    result.score = this.scoreEngine.bonus(result.score, bonus);
  }

  protected normalizeScore(score: number): number {
    return this.scoreEngine.normalize(score);
  }

  // ============================================================
  // NORMALIZATION HELPERS
  // ============================================================

  protected normalizeText(value?: string | null): string {
    return this.normalizationEngine.normalizeText(value);
  }

  protected normalizeBrand(value?: string | null): string {
    return this.normalizationEngine.normalizeBrand(value);
  }

  protected normalizeCategory(value?: string | null): string {
    return this.normalizationEngine.normalizeCategory(value);
  }

  protected normalizeSKU(value?: string | null): string {
    return this.normalizationEngine.normalizeSKU(value);
  }

  protected normalizeBarcode(value?: string | null): string {
    return this.normalizationEngine.normalizeBarcode(value);
  }

  protected normalizeAttributes(
    attributes?: Readonly<Record<string, string>>
  ): Record<string, string> {
    return this.normalizationEngine.normalizeAttributes(attributes);
  }

  protected normalizeKeyword(value?: string | null): string {
    return this.normalizationEngine.normalizeKeyword(value);
  }

  protected normalizeSlug(value?: string | null): string {
    return this.normalizationEngine.normalizeSlug(value);
  }

  protected normalizeUrl(value?: string | null): string {
    return this.normalizationEngine.normalizeUrl(value);
  }

  // ============================================================
  // METADATA + TELEMETRY
  // ============================================================

  protected buildMetadata(params: {
    validator: string;
    marketplace: string;
    executionTimeMs?: number;
    validatorCount?: number;
    ruleCount?: number;
  }): CatalogMetadata {
    return this.metadataEngine.build(params);
  }

  protected startTelemetry(): number {
    return this.telemetryEngine.now();
  }

  protected finishTelemetry(startedAt: number): {
    finishedAt: number;
    durationMs: number;
  } {
    return this.telemetryEngine.finishRule(startedAt);
  }

  protected buildTelemetryReport(params: {
    validator: string;
    startedAt: number;
    finishedAt: number;
    rules: ReadonlyArray<RuleExecutionRecord>;
  }): TelemetryReport {
    return this.telemetryEngine.buildReport(params);
  }

  // ============================================================
  // UTILITY HELPERS
  // ============================================================

  protected hasIssues(result: ValidatorResult): boolean {
    return result.issues.length > 0;
  }

  protected hasWarnings(result: ValidatorResult): boolean {
    return result.warnings.length > 0;
  }

  protected issueCount(result: ValidatorResult): number {
    return result.issues.length;
  }

  protected warningCount(result: ValidatorResult): number {
    return result.warnings.length;
  }

  protected hasCriticalIssues(result: ValidatorResult): boolean {
    return result.issues.some((i) => i.severity === "CRITICAL");
  }

  // ============================================================
  // SHARED ACCESS HELPERS
  // ============================================================

  protected getMarketplace(input: ValidatorInput): string {
    return String(
      input.product.marketplace ??
        input.product.metadata?.marketplace ??
        input.context.marketplace ??
        "generic"
    ).toLowerCase();
  }

  protected getMetadataString(
    product: AdapterProduct,
    key: string,
    fallback = ""
  ): string {
    const value = product.metadata?.[key];
    return typeof value === "string" ? value : fallback;
  }

  protected getMetadataNumber(
    product: AdapterProduct,
    key: string,
    fallback = 0
  ): number {
    const value = product.metadata?.[key];
    return typeof value === "number" ? value : fallback;
  }

  protected getMetadataBoolean(
    product: AdapterProduct,
    key: string,
    fallback = false
  ): boolean {
    const value = product.metadata?.[key];
    return typeof value === "boolean" ? value : fallback;
  }

  protected getAttribute(product: AdapterProduct, key: string): string {
    return product.attributes?.[key] ?? "";
  }

  protected getString(value: unknown, fallback = ""): string {
    return typeof value === "string" ? value : fallback;
  }

  protected getNumber(value: unknown, fallback = 0): number {
    return typeof value === "number" && Number.isFinite(value)
      ? value
      : fallback;
  }

  protected getBoolean(value: unknown, fallback = false): boolean {
    return typeof value === "boolean" ? value : fallback;
  }
}
