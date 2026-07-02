import { ScoreEngine } from "./score.engine";
import { IssueEngine } from "./issue.engine";
import { NormalizationEngine } from "./normalization.engine";
import { TelemetryEngine } from "./telemetry.engine";
import { MetadataEngine } from "./metadata.engine";

import type {
  BaseValidatorConfig,
  ValidatorInput,
  ValidatorResult,
} from "./validator.types";

import type { HealthCategory } from "../health.types";

export abstract class BaseValidator {
  public abstract readonly category: HealthCategory;

  protected readonly scoreEngine: ScoreEngine;
  protected readonly issueEngine: IssueEngine;
  protected readonly normalizationEngine: NormalizationEngine;
  protected readonly telemetryEngine: TelemetryEngine;
  protected readonly metadataEngine: MetadataEngine;

  protected readonly config: BaseValidatorConfig;

  protected constructor(
    config?: Partial<BaseValidatorConfig>
  ) {
    this.config = {
      strictMode: false,
      enableWarnings: true,
      validatorVersion: "1.0.0",
      ...config,
    };

    this.scoreEngine = new ScoreEngine();
    this.issueEngine = new IssueEngine();
    this.normalizationEngine = new NormalizationEngine();
    this.telemetryEngine = new TelemetryEngine();
    this.metadataEngine = new MetadataEngine();
  }

  protected emptyResult(): ValidatorResult {
    return {
      score: 100,
      issues: [],
      warnings: [],
    };
  }

  protected normalizeScore(score: number): number {
    return this.scoreEngine.normalize(score);
  }

  protected deductScore(
    score: number,
    penalty: number
  ): number {
    return this.scoreEngine.deduct(score, penalty);
  }

  protected bonusScore(
    score: number,
    bonus: number
  ): number {
    return this.scoreEngine.bonus(score, bonus);
  }

  protected clampScore(score: number): number {
    return this.scoreEngine.clampScore(score);
  }

  public abstract validate(
    input: ValidatorInput
  ): Promise<ValidatorResult>;
  /**
   * ============================================================
   * CREATE INFO ISSUE
   * ============================================================
   */
  protected info(
    code: string,
    message: string,
    suggestion?: string
  ) {
    return this.issueEngine.info(
      this.category,
      code,
      message,
      suggestion
    );
  }

  /**
   * ============================================================
   * CREATE WARNING ISSUE
   * ============================================================
   */
  protected warning(
    code: string,
    message: string,
    suggestion?: string
  ) {
    return this.issueEngine.warning(
      this.category,
      code,
      message,
      suggestion
    );
  }

  /**
   * ============================================================
   * CREATE CRITICAL ISSUE
   * ============================================================
   */
  protected critical(
    code: string,
    message: string,
    suggestion?: string
  ) {
    return this.issueEngine.critical(
      this.category,
      code,
      message,
      suggestion
    );
  }

  /**
   * ============================================================
   * TEXT NORMALIZATION
   * ============================================================
   */
  protected normalizeText(
    value?: string | null
  ): string {
    return this.normalizationEngine.normalizeText(
      value
    );
  }

    /**
   * ============================================================
   * NORMALIZE KEYWORD
   * ============================================================
   */
  protected normalizeKeyword(
    value?: string | null
  ): string {
    return this.normalizationEngine.normalizeKeyword(
      value
    );
  }

  /**
   * ============================================================
   * NORMALIZE BRAND
   * ============================================================
   */
  protected normalizeBrand(
    value?: string | null
  ): string {
    return this.normalizationEngine.normalizeBrand(
      value
    );
  }  /**
   * ============================================================
   * START TELEMETRY
   * ============================================================
   */
  protected startTelemetry(): number {
    return this.telemetryEngine.startRule();
  }

  /**
   * ============================================================
   * FINISH TELEMETRY
   * ============================================================
   */
  protected finishTelemetry(
  startedAt: number
) {
  return this.telemetryEngine.finishRule(
    startedAt
  );
}  /**
   * ============================================================
   * BUILD VALIDATOR METADATA
   * ============================================================
   */
  protected buildMetadata(
    executionTimeMs: number,
    marketplace = "generic"
  ) {
    return this.metadataEngine.build({
      validator: this.constructor.name,
      marketplace,
      executionTimeMs,
      validatorCount: 1,
      ruleCount: 0,
    });
  }

  /**
   * ============================================================
   * BEFORE VALIDATION HOOK
   * ------------------------------------------------------------
   * Override when needed.
   * ============================================================
   */
  protected async beforeValidate(
    _input: ValidatorInput
  ): Promise<void> {
    // default no-op
  }

  /**
   * ============================================================
   * AFTER VALIDATION HOOK
   * ------------------------------------------------------------
   * Override when needed.
   * ============================================================
   */
  protected async afterValidate(
    _input: ValidatorInput,
    _result: ValidatorResult
  ): Promise<void> {
    // default no-op
  }

  /**
   * ============================================================
   * BUILD TELEMETRY REPORT
   * ============================================================
   */
  protected buildTelemetryReport(params: {
    startedAt: number;
    finishedAt: number;
    rules: Parameters<
      TelemetryEngine["buildReport"]
    >[0]["rules"];
  }) {
    return this.telemetryEngine.buildReport({
      validator: this.constructor.name,
      startedAt: params.startedAt,
      finishedAt: params.finishedAt,
      rules: params.rules,
    });
    }
}
