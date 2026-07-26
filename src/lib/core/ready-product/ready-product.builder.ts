/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.service.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product domain service.
 *
 * Coordinates:
 * -----------------------------------------------------------
 * ✓ Validator
 * ✓ Mapper
 * ✓ Identity
 * ✓ Key
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ API
 * ✗ Marketplace Push
 *
 * ===========================================================
 */


import type {

  ReadyProduct,

} from "./ready-product.types";


import type {

  ReadyProductValidationResult,

} from "./ready-product.validator";


import type {

  ReadyProductCompleteMapperInput,

} from "./ready-product.mapper";


import type {

  ReadyProductIdentityInput,
  ReadyProductIdentityResult,

} from "./ready-product.identity";


import type {

  ReadyProductKeyInput,
  ReadyProductKeyResult,

} from "./ready-product.key";



import {

  validateReadyProductBase,

} from "./ready-product.validator";


import {

  createReadyProductIdentity,

} from "./ready-product.identity";


import {

  buildReadyProductKey,

} from "./ready-product.key";


import {

  mapReadyProduct,

} from "./ready-product.mapper";



/**
 * ===========================================================
 * Service Result
 * ===========================================================
 */


export interface ReadyProductServiceResult {


  readonly valid:
    boolean;



  readonly validation:
    ReadyProductValidationResult;



  readonly identity?:
    ReadyProductIdentityResult;



  readonly key?:
    ReadyProductKeyResult;



  readonly product?:
    ReadyProduct;

}
/**
 * ===========================================================
 * Ready Product Service Input
 * ===========================================================
 */


export interface ReadyProductServiceInput
  extends ReadyProductCompleteMapperInput,
    ReadyProductIdentityInput,
    ReadyProductKeyInput {

}



/**
 * ===========================================================
 * Ready Product Service Output
 * ===========================================================
 */


export interface ReadyProductServiceOutput
  extends ReadyProductServiceResult {

}



/**
 * ===========================================================
 * Build Ready Product Domain Object
 * ===========================================================
 */


export function buildReadyProduct(
  input: ReadyProductServiceInput,
): ReadyProductServiceOutput {

const validation =
  validateReadyProductBase({

    organizationId:
      input.organizationId,

    snapshotId:
      input.snapshotId,

    title:
      input.title,

    description:
      input.description,

    price:
      input.salePrice,

    aiScore:
      input.aiScore,

    healthScore:
      input.healthScore,

    marketplace:
      input.sourceMarketplace,

  });
  



  if (
    !validation.valid
  ) {

    return {

      valid: false,

      validation,

    };

  }



  const identity =
    createReadyProductIdentity({

      productId:
        input.productId,


      organizationId:
        input.organizationId,


      snapshotId:
        input.snapshotId,

    });



  const key =
    buildReadyProductKey({

      productId:
        input.productId,


      organizationId:
        input.organizationId,


      snapshotId:
        input.snapshotId,

    });



  const product =
    mapReadyProduct(
      input,
    );



  return {

    valid: true,

    validation,

    identity,

    key,

    product,

  };

}
/**
 * ===========================================================
 * Ready Product Service Helpers
 * ===========================================================
 */


/**
 * ===========================================================
 * Build Identity Only
 * ===========================================================
 */


export function buildReadyProductIdentity(
  input: ReadyProductIdentityInput,
): ReadyProductIdentityResult {


  return createReadyProductIdentity(
    input,
  );

}



/**
 * ===========================================================
 * Build Key Only
 * ===========================================================
 */


export function buildReadyProductKeyService(
  input: ReadyProductKeyInput,
): ReadyProductKeyResult {


  return buildReadyProductKey(
    input,
  );

}



/**
 * ===========================================================
 * Build Mapper Only
 * ===========================================================
 */


export function buildReadyProductMapper(
  input: ReadyProductServiceInput,
): ReadyProduct {


  return mapReadyProduct(
    input,
  );

}
/**
 * ===========================================================
 * Ready Product Service Guards
 * ===========================================================
 */


/**
 * Check Service Result Success
 */
export function isReadyProductServiceSuccess(
  result: ReadyProductServiceOutput,
): boolean {


  return (

    result.valid === true &&

    result.product !== undefined

  );

}



/**
 * Check Service Result Failure
 */
export function isReadyProductServiceFailed(
  result: ReadyProductServiceOutput,
): boolean {


  return (

    result.valid === false

  );

}



/**
 * Extract Product Safely
 */
export function getReadyProductFromService(
  result: ReadyProductServiceOutput,
): ReadyProduct | null {


  if (
    !result.product
  ) {

    return null;

  }


  return result.product;

}
