/**
 * ==========================================================
 * UNIVERSAL STORE VALIDATOR
 * ==========================================================
 *
 * Entity validation layer.
 *
 * Responsibilities:
 * - Validate entity structure
 * - Validate required fields
 * - Protect store boundary
 *
 * Rules:
 * - No database dependency
 * - No transformation logic
 * - No persistence logic
 * ==========================================================
 */

import {
  UniversalValidationError,
} from "./universal.errors";

import type {
  UniversalEntity,
} from "./universal.types";


/* ==========================================================
 * VALIDATOR
 * ========================================================== */

export class UniversalValidator<T = unknown> {



  /**
   * Validate entity
   */

  validate(
    entity: UniversalEntity<T>
  ): void {


    if (!entity) {

      throw new UniversalValidationError(
        "Entity is required"
      );

    }


    if (
      !entity.id ||
      typeof entity.id !== "string"
    ) {

      throw new UniversalValidationError(
        "Entity id is required"
      );

    }


    if (
      entity.data === undefined ||
      entity.data === null
    ) {

      throw new UniversalValidationError(
        "Entity data is required"
      );

    }


    if (
  typeof entity.metadata.version !== "number"
) {

      throw new UniversalValidationError(
        "Entity version must be number"
      );

    }

  }



  /**
   * Validate collection
   */

  validateMany(
    entities:
      readonly UniversalEntity<T>[]
  ): void {


    for (const entity of entities) {

      this.validate(entity);

    }

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalValidator =
  new UniversalValidator();
