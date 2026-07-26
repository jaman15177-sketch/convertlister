/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.errors.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product domain error definitions.
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ API Response
 * ✗ Marketplace
 * ✗ External Service
 *
 * ===========================================================
 */


/**
 * Ready Product Error Codes
 */
export const READY_PRODUCT_ERROR_CODES = {

  PRODUCT_NOT_FOUND:
    "PRODUCT_NOT_FOUND",

  PRODUCT_ALREADY_EXISTS:
    "PRODUCT_ALREADY_EXISTS",

  INVALID_PRODUCT:
    "INVALID_PRODUCT",

  INVALID_STATUS:
    "INVALID_STATUS",

  INVALID_PRICE:
    "INVALID_PRICE",

  INVALID_MARKETPLACE:
    "INVALID_MARKETPLACE",

  INVALID_MEDIA:
    "INVALID_MEDIA",

  SNAPSHOT_NOT_FOUND:
    "SNAPSHOT_NOT_FOUND",

} as const;


export type ReadyProductErrorCode =
  (typeof READY_PRODUCT_ERROR_CODES)[keyof typeof READY_PRODUCT_ERROR_CODES];
/**
 * ===========================================================
 * Ready Product Domain Error
 * Part-2
 * ===========================================================
 */


/**
 * Ready Product Error Context
 */
export interface ReadyProductErrorContext {

  readonly productId?: string;

  readonly organizationId?: string;

  readonly snapshotId?: string;

  readonly marketplace?: string;

  readonly field?: string;

  readonly value?: unknown;

}



/**
 * Base Ready Product Error
 */
export class ReadyProductError extends Error {

  readonly code: ReadyProductErrorCode;

  readonly context?: ReadyProductErrorContext;


  constructor(
    code: ReadyProductErrorCode,
    message: string,
    context?: ReadyProductErrorContext,
  ) {

    super(message);

    this.name = "ReadyProductError";

    this.code = code;

    this.context = context;


    Object.setPrototypeOf(
      this,
      ReadyProductError.prototype,
    );

  }

}/**
 * ===========================================================
 * Ready Product Specific Errors
 * Part-3
 * ===========================================================
 */


/**
 * Product Not Found Error
 */
export class ReadyProductNotFoundError extends ReadyProductError {

  constructor(
    productId: string,
  ) {

    super(
      READY_PRODUCT_ERROR_CODES.PRODUCT_NOT_FOUND,
      `Ready product not found: ${productId}`,
      {
        productId,
      },
    );


    this.name =
      "ReadyProductNotFoundError";


    Object.setPrototypeOf(
      this,
      ReadyProductNotFoundError.prototype,
    );

  }

}


/**
 * Duplicate Product Error
 */
export class ReadyProductAlreadyExistsError extends ReadyProductError {

  constructor(
    productId: string,
  ) {

    super(
      READY_PRODUCT_ERROR_CODES.PRODUCT_ALREADY_EXISTS,
      `Ready product already exists: ${productId}`,
      {
        productId,
      },
    );


    this.name =
      "ReadyProductAlreadyExistsError";


    Object.setPrototypeOf(
      this,
      ReadyProductAlreadyExistsError.prototype,
    );

  }

}


/**
 * Invalid Product Error
 */
export class ReadyProductInvalidError extends ReadyProductError {

  constructor(
    message: string,
    context?: ReadyProductErrorContext,
  ) {

    super(
      READY_PRODUCT_ERROR_CODES.INVALID_PRODUCT,
      message,
      context,
    );


    this.name =
      "ReadyProductInvalidError";


    Object.setPrototypeOf(
      this,
      ReadyProductInvalidError.prototype,
    );

  }

}
/**
 * ===========================================================
 * Ready Product Specific Errors
 * Part-4 Final
 * ===========================================================
 */


/**
 * Invalid Price Error
 */
export class ReadyProductInvalidPriceError extends ReadyProductError {

  constructor(
    value: unknown,
  ) {

    super(
      READY_PRODUCT_ERROR_CODES.INVALID_PRICE,
      `Invalid ready product price`,
      {
        field: "price",
        value,
      },
    );


    this.name =
      "ReadyProductInvalidPriceError";


    Object.setPrototypeOf(
      this,
      ReadyProductInvalidPriceError.prototype,
    );

  }

}


/**
 * Invalid Marketplace Error
 */
export class ReadyProductInvalidMarketplaceError extends ReadyProductError {

  constructor(
    marketplace: string,
  ) {

    super(
      READY_PRODUCT_ERROR_CODES.INVALID_MARKETPLACE,
      `Invalid marketplace: ${marketplace}`,
      {
        marketplace,
      },
    );


    this.name =
      "ReadyProductInvalidMarketplaceError";


    Object.setPrototypeOf(
      this,
      ReadyProductInvalidMarketplaceError.prototype,
    );

  }

}


/**
 * Invalid Media Error
 */
export class ReadyProductInvalidMediaError extends ReadyProductError {

  constructor(
    message: string,
    context?: ReadyProductErrorContext,
  ) {

    super(
      READY_PRODUCT_ERROR_CODES.INVALID_MEDIA,
      message,
      context,
    );


    this.name =
      "ReadyProductInvalidMediaError";


    Object.setPrototypeOf(
      this,
      ReadyProductInvalidMediaError.prototype,
    );

  }

}


/**
 * Snapshot Not Found Error
 */
export class ReadyProductSnapshotNotFoundError extends ReadyProductError {

  constructor(
    snapshotId: string,
  ) {

    super(
      READY_PRODUCT_ERROR_CODES.SNAPSHOT_NOT_FOUND,
      `Snapshot not found: ${snapshotId}`,
      {
        snapshotId,
      },
    );


    this.name =
      "ReadyProductSnapshotNotFoundError";


    Object.setPrototypeOf(
      this,
      ReadyProductSnapshotNotFoundError.prototype,
    );

  }

}


/**
 * Ready Product Error Guard
 */
export function isReadyProductError(
  error: unknown,
): error is ReadyProductError {

  return (
    error instanceof ReadyProductError
  );

}
