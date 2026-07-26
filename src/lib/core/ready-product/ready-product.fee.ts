/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.fee.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Platform Fee Domain Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Platform Fee Calculation
 * ✓ Product Purchase Fee
 * ✓ Discount Ready
 * ✓ Tax Ready
 * ✓ Payment Integration Ready
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Service
 * ✗ Payment Gateway
 * ✗ API
 *
 * ===========================================================
 */



import type {
  ReadyProduct,
} from "./ready-product.types";



/**
 * ===========================================================
 * Fee Types
 * ===========================================================
 */

export const READY_PRODUCT_FEE_TYPES = {

  PLATFORM:
    "PLATFORM",

  TRANSACTION:
    "TRANSACTION",

  PREMIUM:
    "PREMIUM",

  CUSTOM:
    "CUSTOM",

} as const;



export type ReadyProductFeeType =
  typeof READY_PRODUCT_FEE_TYPES[
    keyof typeof READY_PRODUCT_FEE_TYPES
  ];



/**
 * ===========================================================
 * Currency
 * ===========================================================
 */

export type ReadyProductCurrency =
  | "USD"
  | "BDT";



/**
 * ===========================================================
 * Fee Rule
 * ===========================================================
 */

export interface ReadyProductFeeRule {


  readonly type:
    ReadyProductFeeType;



  readonly percentage?:
    number;



  readonly fixedAmount?:
    number;



  readonly currency?:
    ReadyProductCurrency;

}



/**
 * ===========================================================
 * Fee Breakdown
 * ===========================================================
 */

export interface ReadyProductFeeBreakdown {


  readonly productPrice:
    number;



  readonly platformFee:
    number;



  readonly transactionFee?:
    number;



  readonly taxAmount?:
    number;



  readonly discountAmount?:
    number;



  readonly totalPayable:
    number;

}



/**
 * ===========================================================
 * Main Fee Contract
 * ===========================================================
 */

export interface ReadyProductFee {


  readonly productId:
    string;



  readonly currency:
    ReadyProductCurrency;



  readonly breakdown:
    ReadyProductFeeBreakdown;



  readonly rules:
    readonly ReadyProductFeeRule[];



  readonly calculatedAt?:
    string;

}



/**
 * ===========================================================
 * Fee Calculation Input
 * ===========================================================
 */

export interface ReadyProductFeeCalculationInput {


  readonly product:
    ReadyProduct;



  readonly productPrice:
    number;



  readonly currency?:
    ReadyProductCurrency;



  readonly platformFeePercentage?:
    number;

}



/**
 * ===========================================================
 * Fee Calculator
 * ===========================================================
 */

export function calculateReadyProductFee(

  input:
    ReadyProductFeeCalculationInput,

): ReadyProductFee {


  const currency =
    input.currency ?? "USD";


  const percentage =
    input.platformFeePercentage ?? 10;


  const platformFee =
    calculatePercentage(

      input.productPrice,

      percentage,

    );


  return {


    productId:
      input.product.id,


    currency,


    breakdown: {

      productPrice:
        input.productPrice,


      platformFee,


      totalPayable:
        input.productPrice +
        platformFee,

    },


    rules: [

      {

        type:
          READY_PRODUCT_FEE_TYPES.PLATFORM,


        percentage,

        currency,

      },

    ],

  };

}



/**
 * ===========================================================
 * Percentage Helper
 * ===========================================================
 */

export function calculatePercentage(

  amount:
    number,

  percentage:
    number,

): number {


  return Number(

    (
      amount *
      percentage /
      100

    ).toFixed(2)

  );

}



/**
 * ===========================================================
 * Fee Guard
 * ===========================================================
 */

export function isReadyProductFee(

  value:
    unknown,

): value is ReadyProductFee {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const fee =
    value as Partial<ReadyProductFee>;



  return (

    typeof fee.productId === "string" &&

    typeof fee.breakdown === "object"

  );

}



/**
 * ===========================================================
 * Helpers
 * ===========================================================
 */

export function getReadyProductPlatformFee(

  fee:
    ReadyProductFee,

): number {


  return fee.breakdown.platformFee;

}



export function getReadyProductTotalPayable(

  fee:
    ReadyProductFee,

): number {


  return fee.breakdown.totalPayable;

}
