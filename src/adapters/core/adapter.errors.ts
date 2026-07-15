/**
 * ==========================================================
 * ADAPTER ERRORS
 * ==========================================================
 *
 * Shared error classes for all marketplace adapters.
 *
 * Rules
 * ----------------------------------------------------------
 * • Error classes only
 * • No business logic
 * • No retry logic
 * • Shared by every adapter
 * ==========================================================
 */

/* ==========================================================
 * BASE ERROR
 * ==========================================================
 */

export class AdapterError extends Error {

  constructor(message: string) {
    super(message);

    this.name = "AdapterError";
  }

}

/* ==========================================================
 * VALIDATION
 * ==========================================================
 */

export class AdapterValidationError
  extends AdapterError {

  constructor(message: string) {
    super(message);

    this.name =
      "AdapterValidationError";
  }

}

/* ==========================================================
 * AUTHENTICATION
 * ==========================================================
 */

export class AdapterAuthenticationError
  extends AdapterError {

  constructor(message: string) {
    super(message);

    this.name =
      "AdapterAuthenticationError";
  }

}

/* ==========================================================
 * AUTHORIZATION
 * ==========================================================
 */

export class AdapterAuthorizationError
  extends AdapterError {

  constructor(message: string) {
    super(message);

    this.name =
      "AdapterAuthorizationError";
  }

}

/* ==========================================================
 * NETWORK
 * ==========================================================
 */

export class AdapterNetworkError
  extends AdapterError {

  constructor(message: string) {
    super(message);

    this.name =
      "AdapterNetworkError";
  }

}

/* ==========================================================
 * RATE LIMIT
 * ==========================================================
 */

export class AdapterRateLimitError
  extends AdapterError {

  constructor(message: string) {
    super(message);

    this.name =
      "AdapterRateLimitError";
  }

}

/* ==========================================================
 * TIMEOUT
 * ==========================================================
 */

export class AdapterTimeoutError
  extends AdapterError {

  constructor(message: string) {
    super(message);

    this.name =
      "AdapterTimeoutError";
  }

}

/* ==========================================================
 * NOT FOUND
 * ==========================================================
 */

export class AdapterNotFoundError
  extends AdapterError {

  constructor(message: string) {
    super(message);

    this.name =
      "AdapterNotFoundError";
  }

}

/* ==========================================================
 * MAPPING
 * ==========================================================
 */

export class AdapterMappingError
  extends AdapterError {

  constructor(message: string) {
    super(message);

    this.name =
      "AdapterMappingError";
  }

}

/* ==========================================================
 * UNSUPPORTED
 * ==========================================================
 */

export class UnsupportedAdapterError
  extends AdapterError {

  constructor(source: string) {
    super(
      `Unsupported adapter: ${source}`
    );

    this.name =
      "UnsupportedAdapterError";
  }

}
