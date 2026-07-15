/**
 * ==========================================================
 * ALIEXPRESS ERRORS
 * ==========================================================
 *
 * Custom error definitions for AliExpress Adapter.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Adapter specific error handling
 * • API failure classification
 * • Debug friendly errors
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Retry logic
 * ✗ API calls
 * ✗ Business decisions
 * ==========================================================
 */


/**
 * Base AliExpress Error
 */
export class AliExpressError
  extends Error {

  public readonly code: string;


  constructor(
    message: string,
    code = "ALIEXPRESS_ERROR"
  ) {

    super(message);

    this.name =
      "AliExpressError";

    this.code =
      code;

  }

}



/**
 * Authentication Error
 */
export class AliExpressAuthError
  extends AliExpressError {

  constructor(
    message =
      "AliExpress authentication failed."
  ) {

    super(
      message,
      "ALIEXPRESS_AUTH_ERROR"
    );

    this.name =
      "AliExpressAuthError";

  }

}



/**
 * API Request Error
 */
export class AliExpressApiError
  extends AliExpressError {

  constructor(
    message =
      "AliExpress API request failed."
  ) {

    super(
      message,
      "ALIEXPRESS_API_ERROR"
    );

    this.name =
      "AliExpressApiError";

  }

}



/**
 * Product Not Found Error
 */
export class AliExpressProductNotFoundError
  extends AliExpressError {

  constructor(
    message =
      "AliExpress product not found."
  ) {

    super(
      message,
      "ALIEXPRESS_PRODUCT_NOT_FOUND"
    );

    this.name =
      "AliExpressProductNotFoundError";

  }

}



/**
 * Invalid Response Error
 */
export class AliExpressResponseError
  extends AliExpressError {

  constructor(
    message =
      "Invalid AliExpress response."
  ) {

    super(
      message,
      "ALIEXPRESS_INVALID_RESPONSE"
    );

    this.name =
      "AliExpressResponseError";

  }

}
