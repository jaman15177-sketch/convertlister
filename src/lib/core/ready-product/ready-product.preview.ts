/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.preview.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Preview Domain Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Product Preview
 * ✓ Marketplace Preview
 * ✓ Image Preview
 * ✓ AI Preview Metadata
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
 * Preview Mode
 * ===========================================================
 */

export const READY_PRODUCT_PREVIEW_MODE = {

  BASIC:
    "BASIC",

  FULL:
    "FULL",

  MARKETPLACE:
    "MARKETPLACE",

  AI_ENHANCED:
    "AI_ENHANCED",

} as const;



export type ReadyProductPreviewMode =
  typeof READY_PRODUCT_PREVIEW_MODE[
    keyof typeof READY_PRODUCT_PREVIEW_MODE
  ];



/**
 * ===========================================================
 * Image Preview
 * ===========================================================
 */

export interface ReadyProductPreviewImage {


  readonly url:
    string;


  readonly alt?:
    string;


  readonly position:
    number;


  readonly isPrimary?:
    boolean;

}



/**
 * ===========================================================
 * Marketplace Preview
 * ===========================================================
 */

export interface ReadyProductMarketplacePreview {


  readonly marketplace:
    string;


  readonly title:
    string;


  readonly description?:
    string;


  readonly price?:
    number;


  readonly tags?:
    readonly string[];

}



/**
 * ===========================================================
 * AI Preview Metadata
 * ===========================================================
 */

export interface ReadyProductAIPreviewMetadata {


  readonly generated:
    boolean;


  readonly confidenceScore?:
    number;


  readonly suggestions?:
    readonly string[];

}



/**
 * ===========================================================
 * Main Preview Contract
 * ===========================================================
 */

export interface ReadyProductPreview {


  readonly productId:
    string;



  readonly mode:
    ReadyProductPreviewMode;



  readonly title:
    string;



  readonly shortDescription?:
    string;



  readonly images:
    readonly ReadyProductPreviewImage[];



  readonly marketplacePreview?:
    ReadyProductMarketplacePreview;



  readonly aiMetadata?:
    ReadyProductAIPreviewMetadata;



  readonly generatedAt?:
    string;

}



/**
 * ===========================================================
 * Preview Builder Input
 * ===========================================================
 */

export interface ReadyProductPreviewBuilderInput {


  readonly product:
    ReadyProduct;



  readonly mode?:
    ReadyProductPreviewMode;


}



/**
 * ===========================================================
 * Preview Factory
 * ===========================================================
 */

export function createReadyProductPreview(

  input:
    ReadyProductPreviewBuilderInput,

): ReadyProductPreview {


  return {


    productId:
      input.product.id,


    mode:
      input.mode ??
      READY_PRODUCT_PREVIEW_MODE.BASIC,


    title:
      input.product.title,


    images:
      [],


  };

}



/**
 * ===========================================================
 * Preview Guard
 * ===========================================================
 */

export function isReadyProductPreview(

  value:
    unknown,

): value is ReadyProductPreview {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const preview =
    value as Partial<ReadyProductPreview>;



  return (

    typeof preview.productId === "string" &&

    typeof preview.title === "string"

  );

}



/**
 * ===========================================================
 * Preview Helpers
 * ===========================================================
 */

export function hasReadyProductPreviewImages(

  preview:
    ReadyProductPreview,

): boolean {


  return (

    preview.images.length > 0

  );

}



export function isAIReadyProductPreview(

  preview:
    ReadyProductPreview,

): boolean {


  return (

    preview.mode ===
      READY_PRODUCT_PREVIEW_MODE.AI_ENHANCED

  );

}
