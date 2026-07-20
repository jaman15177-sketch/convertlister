/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE VALIDATORS
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Execute all quality validators.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Run validator pipeline
 * • Aggregate validator results
 * • Return validator outputs
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Calculate final score
 * ✗ Generate reports
 * ✗ Execute approval logic
 * ✗ Execute AI
 * ============================================================
 */

import type {
  QualityValidatorContract,
} from "./quality.contract";

import type {
  QualityInput,
} from "./quality.input";

import type {
  QualityValidatorResult,
} from "./quality.types";

/* ============================================================
 * QUALITY VALIDATORS
 * ============================================================
 */

export class QualityValidators {

  constructor(

    private readonly validators:
      readonly QualityValidatorContract[],

  ) {}

  async execute(

    input:
      QualityInput,

  ): Promise<
    readonly QualityValidatorResult[]
  > {

    return Promise.all(

      this.validators.map(

        (
          validator,
        ) =>
          validator.validate(
  input,
)

      ),

    );

  }

}

/* ============================================================
 * EXPORT
 * ============================================================
 */

export const qualityValidators =
  QualityValidators;
