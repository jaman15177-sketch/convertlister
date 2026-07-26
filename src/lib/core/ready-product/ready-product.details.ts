/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.details.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Detailed Information Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Product Information
 * ✓ Pricing Details
 * ✓ Inventory Details
 * ✓ Marketplace Details
 * ✓ SEO Details
 * ✓ Variant Details
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ Store
 * ✗ Service
 * ✗ Engine
 * ✗ API
 *
 * ===========================================================
 */



import type {
  ReadyProduct,
} from "./ready-product.types";



/**
 * ===========================================================
 * Product Pricing Detail
 * ===========================================================
 */

export interface ReadyProductPricingDetail {

  readonly costPrice?:
    number;


  readonly sellingPrice?:
    number;


  readonly compareAtPrice?:
    number;


  readonly currency?:
    string;


  readonly marginPercentage?:
    number;

}



/**
 * ===========================================================
 * Inventory Detail
 * ===========================================================
 */

export interface ReadyProductInventoryDetail {


  readonly availableQuantity?:
    number;


  readonly trackInventory?:
    boolean;


  readonly inventoryStatus?:
    "IN_STOCK"
    | "OUT_OF_STOCK"
    | "UNKNOWN";

}



/**
 * ===========================================================
 * SEO Detail
 * ===========================================================
 */

export interface ReadyProductSEODetail {


  readonly metaTitle?:
    string;


  readonly metaDescription?:
    string;


  readonly keywords?:
    readonly string[];


  readonly slug?:
    string;

}



/**
 * ===========================================================
 * Variant Detail
 * ===========================================================
 */

export interface ReadyProductVariantDetail {


  readonly name:
    string;


  readonly values:
    readonly string[];

}



/**
 * ===========================================================
 * Marketplace Detail
 * ===========================================================
 */

export interface ReadyProductMarketplaceDetail {


  readonly marketplace:
    string;


  readonly categoryId?:
    string;


  readonly listingUrl?:
    string;


  readonly externalProductId?:
    string;

}



/**
 * ===========================================================
 * Main Details Contract
 * ===========================================================
 */

export interface ReadyProductDetails {


  readonly productId:
    string;



  readonly title:
    string;



  readonly description?:
    string;



  readonly pricing?:
    ReadyProductPricingDetail;



  readonly inventory?:
    ReadyProductInventoryDetail;



  readonly seo?:
    ReadyProductSEODetail;



  readonly variants?:
    readonly ReadyProductVariantDetail[];



  readonly marketplace?:
    ReadyProductMarketplaceDetail;



  readonly specifications?:
    Readonly<
      Record<string, string>
    >;



  readonly createdAt?:
    string;



  readonly updatedAt?:
    string;

}



/**
 * ===========================================================
 * Builder Input
 * ===========================================================
 */

export interface ReadyProductDetailsBuilderInput {


  readonly product:
    ReadyProduct;


  readonly pricing?:
    ReadyProductPricingDetail;


  readonly inventory?:
    ReadyProductInventoryDetail;


  readonly seo?:
    ReadyProductSEODetail;

}



/**
 * ===========================================================
 * Details Factory
 * ===========================================================
 */

export function createReadyProductDetails(

  input:
    ReadyProductDetailsBuilderInput,

): ReadyProductDetails {


  return {


    productId:
      input.product.id,


    title:
      input.product.title,


    pricing:
      input.pricing,


    inventory:
      input.inventory,


    seo:
      input.seo,

  };

}



/**
 * ===========================================================
 * Runtime Guard
 * ===========================================================
 */

export function isReadyProductDetails(

  value:
    unknown,

): value is ReadyProductDetails {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const details =
    value as Partial<ReadyProductDetails>;



  return (

    typeof details.productId === "string" &&

    typeof details.title === "string"

  );

}



/**
 * ===========================================================
 * Helpers
 * ===========================================================
 */

export function hasReadyProductPricing(

  details:
    ReadyProductDetails,

): boolean {


  return Boolean(

    details.pricing

  );

}



export function hasReadyProductSEO(

  details:
    ReadyProductDetails,

): boolean {


  return Boolean(

    details.seo

  );

}
