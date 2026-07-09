import { BaseValidator } from "../base/base-validator";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type { HealthCategory } from "../health.types";

import type { AdapterProduct } from "@/adapters/core/adapter.contract";

export class BrandValidator extends BaseValidator {
  public readonly category: HealthCategory = "BRAND";

  public constructor() {
    super();
  }

  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {
    const startedAt = this.startTelemetry();

    await this.beforeValidate(input);

    const result = this.emptyResult();

    const product: AdapterProduct = input.product;

    const brand = this.normalizeText(
      String(
        product.metadata?.brand ??
        product.brand ??
        ""
      )
    ).toLowerCase();

    // Business rules will be added in Phase 2.
    void brand;

    result.score = this.normalizeScore(result.score);

    const finished = this.finishTelemetry(startedAt);

    const telemetry = this.buildTelemetryReport({
      validator: "BrandValidator",
      startedAt,
      finishedAt: finished.finishedAt,
      rules: [],
    });

    const metadata = this.buildMetadata({
      validator: "BrandValidator",
      marketplace: this.getMarketplace(input),
      executionTimeMs: finished.durationMs,
    });

    await this.afterValidate(input, result);

    return {
      ...result,
      metadata,
      telemetry,
    };
  }
}

export const brandValidator = new BrandValidator();
