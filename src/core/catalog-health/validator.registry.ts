/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Validator Registry
 * ============================================================
 */

import type { HealthScoreBreakdown } from "./health.types";
import type { CatalogValidator } from "./base/validator.types";
export interface ValidatorRegistration {
  readonly validator: CatalogValidator;
  readonly category: keyof HealthScoreBreakdown;
}

export class ValidatorRegistry {
  private readonly validators: ValidatorRegistration[] = [];

  public register(
  validator: CatalogValidator,
  category: keyof HealthScoreBreakdown
): void{
    this.validators.push({
      validator,
      category,
    });
  }

  public getValidators(): readonly ValidatorRegistration[] {
    return this.validators;
  }

  public size(): number {
    return this.validators.length;
  }

  public clear(): void {
    this.validators.length = 0;
  }
}

export const validatorRegistry =
  new ValidatorRegistry();
