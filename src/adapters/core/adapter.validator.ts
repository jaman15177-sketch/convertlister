/**
 * ==========================================================
 * ADAPTER VALIDATOR
 * ==========================================================
 *
 * Shared validator for all marketplace adapters.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Validate adapter query
 * • Validate pagination
 * • Validate region
 * • Validate currency
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Marketplace-specific validation
 * ✗ API calls
 * ✗ Business logic
 * ==========================================================
 */

import type {
  AdapterQuery,
} from "./adapter.contract";

import {
  AdapterValidationError,
} from "./adapter.errors";

export class AdapterValidator {

  /**
   * Validate adapter query.
   */
  public validate(
    query: AdapterQuery
  ): void {

    if (!query) {
      throw new AdapterValidationError(
        "Adapter query is required."
      );
    }

    if (
      !query.keyword ||
      query.keyword.trim() === ""
    ) {
      throw new AdapterValidationError(
        "Keyword is required."
      );
    }

    if (
      query.page !== undefined &&
      query.page < 1
    ) {
      throw new AdapterValidationError(
        "Page must be greater than zero."
      );
    }

    if (
      query.pageSize !== undefined &&
      query.pageSize < 1
    ) {
      throw new AdapterValidationError(
        "Page size must be greater than zero."
      );
    }

    if (
      query.region !== undefined &&
      query.region.trim() === ""
    ) {
      throw new AdapterValidationError(
        "Region cannot be empty."
      );
    }

    if (
      query.currency !== undefined &&
      query.currency.trim() === ""
    ) {
      throw new AdapterValidationError(
        "Currency cannot be empty."
      );
    }

    if (
      query.language !== undefined &&
      query.language.trim() === ""
    ) {
      throw new AdapterValidationError(
        "Language cannot be empty."
      );
    }

  }

}

export const adapterValidator =
  new AdapterValidator();
