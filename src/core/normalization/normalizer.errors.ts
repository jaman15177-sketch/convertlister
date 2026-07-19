/**
 * ============================================================
 * CONVERTLISTER
 * NORMALIZER ERRORS
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define normalization errors
 * • Provide consistent error handling
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Normalize products
 * ✗ Access database
 * ✗ Call external services
 * ============================================================
 */


/**
 * Base Normalizer Error
 */
export class NormalizerError extends Error {

  public readonly code: string;


  constructor(
    message: string,
    code = "NORMALIZER_ERROR"
  ) {

    super(message);

    this.name =
      "NormalizerError";

    this.code =
      code;

  }

}



/**
 * Invalid product input
 */
export class InvalidProductError
  extends NormalizerError {

  constructor(
    message =
      "Invalid product input."
  ) {

    super(
      message,
      "INVALID_PRODUCT"
    );

    this.name =
      "InvalidProductError";

  }

}



/**
 * Missing required field
 */
export class MissingFieldError
  extends NormalizerError {

  public readonly field: string;


  constructor(
    field: string
  ) {

    super(
      `Required field missing: ${field}`,
      "MISSING_FIELD"
    );

    this.field =
      field;

    this.name =
      "MissingFieldError";

  }

}



/**
 * Normalization failed
 */
export class NormalizationFailedError
  extends NormalizerError {

  constructor(
    message =
      "Product normalization failed."
  ) {

    super(
      message,
      "NORMALIZATION_FAILED"
    );

    this.name =
      "NormalizationFailedError";

  }

}
