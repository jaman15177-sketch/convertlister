/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.category.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product Category Domain Contracts
 *
 * Layer:
 * -----------------------------------------------------------
 * Ready Product Library
 *
 * Supports:
 * -----------------------------------------------------------
 * ✓ Category Tree
 * ✓ Product Classification
 * ✓ AI Category Mapping Ready
 * ✓ Marketplace Category Mapping Ready
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



/**
 * ===========================================================
 * Category Identity
 * ===========================================================
 */

export type ReadyProductCategoryId =
  string;



/**
 * ===========================================================
 * Category Status
 * ===========================================================
 */

export const READY_PRODUCT_CATEGORY_STATUS = {

  ACTIVE:
    "ACTIVE",

  INACTIVE:
    "INACTIVE",

  ARCHIVED:
    "ARCHIVED",

} as const;



export type ReadyProductCategoryStatus =
  typeof READY_PRODUCT_CATEGORY_STATUS[
    keyof typeof READY_PRODUCT_CATEGORY_STATUS
  ];



/**
 * ===========================================================
 * Category Type
 * ===========================================================
 */

export const READY_PRODUCT_CATEGORY_TYPES = {

  ROOT:
    "ROOT",

  PARENT:
    "PARENT",

  CHILD:
    "CHILD",

  AI_SUGGESTED:
    "AI_SUGGESTED",

} as const;



export type ReadyProductCategoryType =
  typeof READY_PRODUCT_CATEGORY_TYPES[
    keyof typeof READY_PRODUCT_CATEGORY_TYPES
  ];



/**
 * ===========================================================
 * Marketplace Mapping
 * ===========================================================
 *
 * Future:
 * Shopify taxonomy
 * Amazon browse node
 * Etsy category
 *
 * ===========================================================
 */

export interface ReadyProductCategoryMarketplaceMapping {

  readonly marketplace:
    string;


  readonly externalCategoryId:
    string;


  readonly externalCategoryName?:
    string;

}



/**
 * ===========================================================
 * Category Entity
 * ===========================================================
 */

export interface ReadyProductCategory {


  readonly id:
    ReadyProductCategoryId;


  readonly organizationId?:
    string;


  readonly name:
    string;


  readonly slug:
    string;


  readonly description?:
    string;



  readonly type:
    ReadyProductCategoryType;



  readonly status:
    ReadyProductCategoryStatus;



  readonly parentId?:
    ReadyProductCategoryId;



  readonly marketplaceMappings?:
    readonly ReadyProductCategoryMarketplaceMapping[];



  /**
   * AI Classification
   */

  readonly aiGenerated?:
    boolean;



  readonly aiConfidenceScore?:
    number;



  readonly productCount?:
    number;



  readonly createdAt?:
    string;



  readonly updatedAt?:
    string;

}



/**
 * ===========================================================
 * Category Tree Node
 * ===========================================================
 */

export interface ReadyProductCategoryTreeNode {


  readonly category:
    ReadyProductCategory;



  readonly children:
    readonly ReadyProductCategoryTreeNode[];

}



/**
 * ===========================================================
 * Category Query
 * ===========================================================
 */

export interface ReadyProductCategoryQuery {


  readonly organizationId?:
    string;



  readonly parentId?:
    string;



  readonly status?:
    ReadyProductCategoryStatus;



  readonly keyword?:
    string;

}



/**
 * ===========================================================
 * Category Result
 * ===========================================================
 */

export interface ReadyProductCategoryResult {


  readonly items:
    readonly ReadyProductCategory[];



  readonly total:
    number;

}



/**
 * ===========================================================
 * Category Helpers
 * ===========================================================
 */



export function createRootReadyProductCategory(

  input: {

    id: string;

    name: string;

    slug: string;

  },

): ReadyProductCategory {


  return {

    id:
      input.id,


    name:
      input.name,


    slug:
      input.slug,


    type:
      READY_PRODUCT_CATEGORY_TYPES.ROOT,


    status:
      READY_PRODUCT_CATEGORY_STATUS.ACTIVE,

  };

}



/**
 * ===========================================================
 * Category Guard
 * ===========================================================
 */

export function isReadyProductCategory(

  value:
    unknown,

): value is ReadyProductCategory {


  if (

    typeof value !== "object" ||

    value === null

  ) {

    return false;

  }



  const category =
    value as Partial<ReadyProductCategory>;



  return (

    typeof category.id === "string" &&

    typeof category.name === "string" &&

    typeof category.slug === "string"

  );

}



/**
 * ===========================================================
 * Category Utility
 * ===========================================================
 */

export function isRootReadyProductCategory(

  category:
    ReadyProductCategory,

): boolean {


  return (

    category.type ===
      READY_PRODUCT_CATEGORY_TYPES.ROOT

  );

}



export function hasChildReadyProductCategory(

  category:
    ReadyProductCategory,

): boolean {


  return Boolean(

    category.parentId

  );

}
