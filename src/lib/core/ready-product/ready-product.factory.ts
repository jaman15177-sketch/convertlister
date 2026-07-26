/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.factory.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Domain Factory
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Ready Product Creation
 * ✓ Domain Composition
 * ✓ Default Initialization
 * ✓ Immutable Product Assembly
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Service
 * ✗ API
 *
 * ===========================================================
 */


import type {
  ReadyProduct,
} from "./ready-product.types";


import type {
  ReadyProductPreview,
} from "./ready-product.preview";


import type {
  ReadyProductDetails,
} from "./ready-product.details";


import type {
  ReadyProductScore,
} from "./ready-product.score";


import type {
  ReadyProductHealth,
} from "./ready-product.health";


import type {
  ReadyProductFee,
} from "./ready-product.fee";


/**
 * ===========================================================
 * Factory Input
 * ===========================================================
 */

export interface ReadyProductFactoryInput {


  readonly product:
    ReadyProduct;



  readonly preview?:
    ReadyProductPreview;



  readonly details?:
    ReadyProductDetails;



  readonly score?:
    ReadyProductScore;



  readonly health?:
    ReadyProductHealth;



  readonly fee?:
    ReadyProductFee;

}



/**
 * ===========================================================
 * Ready Product Aggregate
 * ===========================================================
 */

export interface ReadyProductAggregate {


  readonly product:
    ReadyProduct;



  readonly preview?:
    ReadyProductPreview;



  readonly details?:
    ReadyProductDetails;



  readonly score?:
    ReadyProductScore;



  readonly health?:
    ReadyProductHealth;



  readonly fee?:
    ReadyProductFee;



  readonly createdAt:
    string;



  readonly version:
    number;

}



/**
 * ===========================================================
 * Factory
 * ===========================================================
 */

export function createReadyProductAggregate(

  input:
    ReadyProductFactoryInput,

): ReadyProductAggregate {


  return Object.freeze({

    product:
      input.product,


    preview:
      input.preview,


    details:
      input.details,


    score:
      input.score,


    health:
      input.health,


    fee:
      input.fee,


    createdAt:
      new Date().toISOString(),


    version:
      1,

  });

}



/**
 * ===========================================================
 * Empty Factory
 * ===========================================================
 */

export function createEmptyReadyProductAggregate(

  product:
    ReadyProduct,

): ReadyProductAggregate {


  return createReadyProductAggregate({

    product,

  });

}



/**
 * ===========================================================
 * Validation
 * ===========================================================
 */

export function isReadyProductAggregate(

  value:
    unknown,

): value is ReadyProductAggregate {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const aggregate =
    value as Partial<ReadyProductAggregate>;



  return (

    typeof aggregate.product === "object" &&

    typeof aggregate.version === "number"

  );

}



/**
 * ===========================================================
 * Version Helper
 * ===========================================================
 */

export function incrementReadyProductVersion(

  aggregate:
    ReadyProductAggregate,

): ReadyProductAggregate {


  return {

    ...aggregate,


    version:
      aggregate.version + 1,


    createdAt:
      new Date().toISOString(),

  };

}



/**
 * ===========================================================
 * Completeness Check
 * ===========================================================
 */

export function isReadyProductFullyPrepared(

  aggregate:
    ReadyProductAggregate,

): boolean {


  return Boolean(

    aggregate.preview &&

    aggregate.details &&

    aggregate.score &&

    aggregate.health

  );

}
