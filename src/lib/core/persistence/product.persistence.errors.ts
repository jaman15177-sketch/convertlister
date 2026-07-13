/**
 * ==========================================================
 * PRODUCT PERSISTENCE ERRORS
 * ==========================================================
 *
 * Enterprise Product Persistence Errors
 *
 * Responsibilities:
 * - Persistence layer exceptions
 * - Batch persistence exceptions
 * - Transaction exceptions
 * - Metrics exceptions
 *
 * Rules:
 * - No business logic
 * - No persistence logic
 * - Custom error hierarchy only
 * ==========================================================
 */

/* ==========================================================
 * BASE ERROR
 * ==========================================================
 */

export class ProductPersistenceError
  extends Error {

  override readonly name: string =
  "ProductPersistenceError";

  constructor(
    message =
      "Product persistence failed."
  ) {

    super(message);

    Object.setPrototypeOf(
      this,
      new.target.prototype
    );

  }

}

/* ==========================================================
 * CREATE ERROR
 * ==========================================================
 */

export class ProductPersistenceCreateError
  extends ProductPersistenceError {

  

  constructor(
    message =
      "Unable to create product."
  ) {

    super(message);

  }

}

/* ==========================================================
 * UPDATE ERROR
 * ==========================================================
 */

export class ProductPersistenceUpdateError
  extends ProductPersistenceError {

  

  constructor(
    message =
      "Unable to update product."
  ) {

    super(message);

  }

}

/* ==========================================================
 * UPSERT ERROR
 * ==========================================================
 */

export class ProductPersistenceUpsertError
  extends ProductPersistenceError {

  

  constructor(
    message =
      "Unable to upsert product."
  ) {

    super(message);

  }

}

/* ==========================================================
 * BATCH ERROR
 * ==========================================================
 */

export class ProductPersistenceBatchError
  extends ProductPersistenceError {

  

  constructor(
    message =
      "Batch persistence failed."
  ) {

    super(message);

  }

}

/* ==========================================================
 * TRANSACTION ERROR
 * ==========================================================
 */

export class ProductPersistenceTransactionError
  extends ProductPersistenceError {

  

  constructor(
    message =
      "Persistence transaction failed."
  ) {

    super(message);

  }

}

/* ==========================================================
 * MAPPER ERROR
 * ==========================================================
 */

export class ProductPersistenceMapperError
  extends ProductPersistenceError {

  

  constructor(
    message =
      "Product mapping failed."
  ) {

    super(message);

  }

}

/* ==========================================================
 * METRICS ERROR
 * ==========================================================
 */

export class ProductPersistenceMetricsError
  extends ProductPersistenceError {

 

  constructor(
    message =
      "Persistence metrics failed."
  ) {

    super(message);

  }

}
