/**
 * ==========================================================
 * SUPABASE PRODUCT ERRORS
 * ==========================================================
 *
 * Production Repository Error Layer
 *
 * Responsibilities:
 * - Typed repository errors
 * - Persistence failure handling
 *
 * Rules:
 * - No Supabase dependency
 * - No business logic
 * - Error classes only
 * ==========================================================
 */


/* ==========================================================
 * BASE ERROR
 * ==========================================================
 */

export class SupabaseProductRepositoryError
  extends Error
{

  readonly code: string;


  constructor(
    message: string,
    code = "SUPABASE_PRODUCT_ERROR"
  )
  {

    super(message);

    this.name =
      "SupabaseProductRepositoryError";

    this.code =
      code;


    Object.setPrototypeOf(
      this,
      SupabaseProductRepositoryError.prototype
    );

  }

}



/* ==========================================================
 * CREATE ERROR
 * ==========================================================
 */

export class ProductCreateError
  extends SupabaseProductRepositoryError
{

  constructor(
    message =
      "Failed to create product."
  )
  {

    super(
      message,
      "PRODUCT_CREATE_ERROR"
    );

    this.name =
      "ProductCreateError";

  }

}



/* ==========================================================
 * READ ERROR
 * ==========================================================
 */

export class ProductReadError
  extends SupabaseProductRepositoryError
{

  constructor(
    message =
      "Failed to read product."
  )
  {

    super(
      message,
      "PRODUCT_READ_ERROR"
    );

    this.name =
      "ProductReadError";

  }

}



/* ==========================================================
 * UPDATE ERROR
 * ==========================================================
 */

export class ProductUpdateError
  extends SupabaseProductRepositoryError
{

  constructor(
    message =
      "Failed to update product."
  )
  {

    super(
      message,
      "PRODUCT_UPDATE_ERROR"
    );

    this.name =
      "ProductUpdateError";

  }

}



/* ==========================================================
 * DELETE ERROR
 * ==========================================================
 */

export class ProductDeleteError
  extends SupabaseProductRepositoryError
{

  constructor(
    message =
      "Failed to delete product."
  )
  {

    super(
      message,
      "PRODUCT_DELETE_ERROR"
    );

    this.name =
      "ProductDeleteError";

  }

}



/* ==========================================================
 * NOT FOUND ERROR
 * ==========================================================
 */

export class ProductNotFoundError
  extends SupabaseProductRepositoryError
{

  constructor(
    id: string
  )
  {

    super(
      `Product not found: ${id}`,
      "PRODUCT_NOT_FOUND"
    );

    this.name =
      "ProductNotFoundError";

  }

}
