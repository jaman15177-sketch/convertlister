/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT VALIDATOR
 * ============================================================================
 *
 * Responsibility:
 * Domain validation only
 *
 * No Repository
 * No Database
 * No API
 * ============================================================================
 */

import { READY_PRODUCT_LIMITS } from "./ready-product.types";

import type {
  CreateReadyProductInput,
  UpdateReadyProductInput,
} from "./ready-product.types";

import type {
  ReadyProductServiceInput,
} from "./ready-product.builder";

/**
 * ============================================================================
 * VALIDATION RESULT
 * ============================================================================
 */

export interface ReadyProductValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

/**
 * ============================================================================
 * VALIDATION INPUT
 * ============================================================================
 */

export interface ReadyProductValidationInput {
  readonly organizationId?: string;
  readonly productId?: string;
  readonly snapshotId?: string;

  readonly title?: string;
  readonly description?: string | null;

  readonly price?: number;

  readonly aiScore?: number;
  readonly healthScore?: number;

  readonly marketplace?: string;
}

/**
 * ============================================================================
 * VALIDATOR CONTRACT
 * ============================================================================
 */

export interface ReadyProductValidatorContract {
  validateCreate(
    input: CreateReadyProductInput,
  ): void;

  validateUpdate(
    input: UpdateReadyProductInput,
  ): void;

  validateId(
    id: string,
  ): void;
}

/**
 * ============================================================================
 * HELPERS
 * ============================================================================
 */

function successResult(): ReadyProductValidationResult {
  return {
    valid: true,
    errors: [],
  };
}

function failureResult(
  ...errors: string[]
): ReadyProductValidationResult {
  return {
    valid: false,
    errors,
  };
}

function createValidationError(
  message: string,
): Error {
  return new Error(message);
}
/**
 * ============================================================================
 * BASE VALIDATION
 * ============================================================================
 */

export function validateReadyProductBase(
  input: ReadyProductValidationInput,
): ReadyProductValidationResult {

  const errors: string[] = [];

  if (
    !input.organizationId ||
    input.organizationId.trim().length === 0
  ) {
    errors.push(
      "organizationId is required",
    );
  }

  if (
    !input.title ||
    input.title.trim().length === 0
  ) {
    errors.push(
      "Product title is required",
    );
  }

  if (
    input.title &&
    input.title.length >
      READY_PRODUCT_LIMITS.TITLE_MAX_LENGTH
  ) {
    errors.push(
      `Product title cannot exceed ${READY_PRODUCT_LIMITS.TITLE_MAX_LENGTH} characters`,
    );
  }

  if (
    input.description &&
    input.description.length >
      READY_PRODUCT_LIMITS.DESCRIPTION_MAX_LENGTH
  ) {
    errors.push(
      `Description cannot exceed ${READY_PRODUCT_LIMITS.DESCRIPTION_MAX_LENGTH} characters`,
    );
  }

  if (
    input.price !== undefined
  ) {

    const result =
      validateReadyProductPrice(
        input.price,
      );

    if (
      !result.valid
    ) {
      errors.push(
        ...result.errors,
      );
    }

  }

  if (
    errors.length === 0
  ) {
    return successResult();
  }

  return failureResult(
    ...errors,
  );

}
/**
 * ============================================================================
 * IDENTITY VALIDATION
 * ============================================================================
 */

export function validateReadyProductIdentity(
  input: ReadyProductValidationInput,
): ReadyProductValidationResult {

  const errors: string[] = [];

  if (
    !input.organizationId ||
    input.organizationId.trim().length === 0
  ) {
    errors.push(
      "organizationId is required",
    );
  }

  if (
    !input.productId ||
    input.productId.trim().length === 0
  ) {
    errors.push(
      "productId is required",
    );
  }

  if (
    !input.snapshotId ||
    input.snapshotId.trim().length === 0
  ) {
    errors.push(
      "snapshotId is required",
    );
  }

  if (
    errors.length === 0
  ) {
    return successResult();
  }

  return failureResult(
    ...errors,
  );

}

/**
 * ============================================================================
 * TEXT VALIDATION
 * ============================================================================
 */

export function validateReadyProductText(
  input: ReadyProductValidationInput,
): ReadyProductValidationResult {

  const errors: string[] = [];

  if (
    !input.title ||
    input.title.trim().length === 0
  ) {
    errors.push(
      "Product title is required",
    );
  }

  if (
    input.title &&
    input.title.length >
      READY_PRODUCT_LIMITS.TITLE_MAX_LENGTH
  ) {
    errors.push(
      `Product title cannot exceed ${READY_PRODUCT_LIMITS.TITLE_MAX_LENGTH} characters`,
    );
  }

  if (
    input.description &&
    input.description.length >
      READY_PRODUCT_LIMITS.DESCRIPTION_MAX_LENGTH
  ) {
    errors.push(
      `Description cannot exceed ${READY_PRODUCT_LIMITS.DESCRIPTION_MAX_LENGTH} characters`,
    );
  }

  if (
    errors.length === 0
  ) {
    return successResult();
  }

  return failureResult(
    ...errors,
  );

}

/**
 * ============================================================================
 * LEGACY WRAPPERS
 * ============================================================================
 */

export function validateReadyProduct(
  input: ReadyProductValidationInput,
): ReadyProductValidationResult {

  return validateReadyProductBase(
    input,
  );

}

export function isReadyProductValid(
  input: ReadyProductValidationInput,
): boolean {

  return validateReadyProductBase(
    input,
  ).valid;

}

export function assertReadyProduct(
  input: ReadyProductValidationInput,
): void {

  const result =
    validateReadyProductBase(
      input,
    );

  if (
    !result.valid
  ) {
    throw createValidationError(
      result.errors.join(", "),
    );
  }

}

/**
 * ============================================================================
 * LEGACY TYPE EXPORTS
 * ============================================================================
 */

export type ReadyProductValidatorResult =
  ReadyProductValidationResult;

export type ReadyProductBaseValidationResult =
  ReadyProductValidationResult;
/**
 * ============================================================================
 * ID VALIDATION
 * ============================================================================
 */

export function validateReadyProductId(
  id: string,
): ReadyProductValidationResult {

  const errors: string[] = [];

  if (
    !id ||
    id.trim().length === 0
  ) {
    errors.push(
      "Ready product id is required",
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };

}

/**
 * ============================================================================
 * PRICE VALIDATION
 * ============================================================================
 */

export function validateReadyProductPrice(
  price: number,
): ReadyProductValidationResult {

  const errors: string[] = [];

  if (
    Number.isNaN(price)
  ) {
    errors.push(
      "Price must be a valid number",
    );
  }

  if (
    price < READY_PRODUCT_LIMITS.MIN_PRICE
  ) {
    errors.push(
      `Price cannot be less than ${READY_PRODUCT_LIMITS.MIN_PRICE}`,
    );
  }

  if (
    price > READY_PRODUCT_LIMITS.MAX_PRICE
  ) {
    errors.push(
      `Price cannot exceed ${READY_PRODUCT_LIMITS.MAX_PRICE}`,
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };

}

/**
 * ============================================================================
 * INTERNAL CREATE VALIDATION
 * ============================================================================
 */

function validateCreate(
  input: CreateReadyProductInput,
): void {

  const result =
    validateReadyProductBase({

      organizationId:
        input.organization_id,

      title:
        input.title,

      description:
        input.description,

      price:
        input.price,

    });

  if (
    !result.valid
  ) {
    throw createValidationError(
      result.errors.join(", "),
    );
  }

}

/**
 * ============================================================================
 * INTERNAL UPDATE VALIDATION
 * ============================================================================
 */

function validateUpdate(
  input: UpdateReadyProductInput,
): void {

  if (
    input.title !== undefined &&
    input.title.trim().length === 0
  ) {
    throw createValidationError(
      "Product title cannot be empty",
    );
  }

  if (
    input.price !== undefined
  ) {

    const result =
      validateReadyProductPrice(
        input.price,
      );

    if (
      !result.valid
    ) {
      throw createValidationError(
        result.errors.join(", "),
      );
    }

  }

}
/**
 * ============================================================================
 * READY PRODUCT VALIDATOR CLASS
 * ============================================================================
 */

export class ReadyProductValidator
  implements ReadyProductValidatorContract {

  public validateCreate(
    input: CreateReadyProductInput,
  ): void {

    validateCreate(
      input,
    );

  }

  public validateUpdate(
    input: UpdateReadyProductInput,
  ): void {

    validateUpdate(
      input,
    );

  }

  public validateId(
    id: string,
  ): void {

    const result =
      validateReadyProductId(
        id,
      );

    if (
      !result.valid
    ) {

      throw createValidationError(
        result.errors.join(", "),
      );

    }

  }

}

/**
 * ============================================================================
 * SINGLETON
 * ============================================================================
 */

export const readyProductValidator =
  new ReadyProductValidator();
/**
 * ============================================================================
 * FILE COMPLETE
 * ============================================================================
 *
 * File:
 * ready-product.validator.ts
 *
 * Responsibility:
 *   ✓ Base validation
 *   ✓ Identity validation
 *   ✓ Text validation
 *   ✓ ID validation
 *   ✓ Price validation
 *   ✓ Create validation
 *   ✓ Update validation
 *   ✓ Validator class
 *   ✓ Singleton export
 *   ✓ Legacy compatibility
 *
 * This file contains domain validation only.
 * No Repository.
 * No Database.
 * No API.
 *
 * ============================================================================
 */
