/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.mapper.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Transform input data into ReadyProduct domain model.
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
  ReadyProductStatus,
  ReadyProductCategory,
  ReadyProductPreview,
  ReadyProductSeo,
  ReadyProductMedia,
  ReadyProductBullet,
  ReadyProductTag,
  MarketplaceType,
  JsonValue,
} from "./ready-product.types";

/**
 * ===========================================================
 * Ready Product Mapper Input
 * ===========================================================
 */


export interface ReadyProductMapperInput {

  readonly id: string;

  readonly organizationId: string;

  readonly snapshotId: string;

  readonly title: string;

  readonly description: string;

}



/**
 * ===========================================================
 * Complete Ready Product Mapper Input
 * ===========================================================
 */


export interface ReadyProductCompleteMapperInput
  extends ReadyProductMapperInput {


  readonly status: ReadyProductStatus;


  readonly category:
    ReadyProductCategory | null;


  readonly preview:
    ReadyProductPreview;


  readonly seo:
    ReadyProductSeo;


  readonly media:
    readonly ReadyProductMedia[];


  readonly bullets:
    readonly ReadyProductBullet[];


  readonly tags:
    readonly ReadyProductTag[];


  readonly salePrice:
    number;


  readonly currency:
    string;


  readonly platformFee:
    number;


  readonly aiScore:
    number;


  readonly healthScore:
    number;


  readonly sourceMarketplace:
    MarketplaceType;


  readonly sourceProductId:
    string;


  readonly version:
    number;


  readonly createdAt:
    Date;


  readonly updatedAt:
    Date;

}
/**
 * ===========================================================
 * Ready Product Identity Mapper
 * ===========================================================
 */
export function mapReadyProductIdentity(
  input: ReadyProductMapperInput,
): Pick<
  ReadyProduct,
  | "id"
  | "organization_id"
  | "snapshot_id"
> {

  return {

    id:
      input.id,

    organization_id:
  input.organizationId,

    snapshot_id:
  input.snapshotId,

  };

}





/**
 * ===========================================================
 * Ready Product Basic Mapper
 * ===========================================================
 */


export function mapReadyProductBasic(
  input: ReadyProductMapperInput,
): Pick<
  ReadyProduct,
  | "title"
  | "description"
> {

  return {

    title:
      input.title,


    description:
      input.description,

  };

}



/**
 * ===========================================================
 * Ready Product Media Mapper
 * ===========================================================
 */


export interface ReadyProductAssetMapperInput {

  readonly id: string;

  readonly type:
    ReadyProductMedia["type"];

  readonly url: string;

  readonly alt?: string;

  readonly position: number;

  readonly width?: number;

  readonly height?: number;

}



/**
 * Map Single Media
 */
export function mapReadyProductMedia(
  input: ReadyProductAssetMapperInput,
): ReadyProductMedia {

  return {

    id:
      input.id,


    type:
      input.type,


    url:
      input.url,


    alt:
      input.alt,


    position:
      input.position,


    width:
      input.width,


    height:
      input.height,

  };

}



/**
 * Map Media Collection
 */
export function mapReadyProductMediaList(
  inputs:
    readonly ReadyProductAssetMapperInput[],
):
  readonly ReadyProductMedia[] {

  return inputs.map(
    mapReadyProductMedia,
  );

}
/**
 * ===========================================================
 * Ready Product Complete Domain Mapper
 * ===========================================================
 */


/**
 * Map Complete Ready Product Domain
 */
export function mapReadyProduct(
  input: ReadyProductCompleteMapperInput,
): ReadyProduct {

  return {

    /**
     * Identity
     */
    id:
      input.id,


    organization_id:
  input.organizationId,
snapshot_id:
  input.snapshotId,
    /**
     * Basic Information
     */
    title:
      input.title,


    description:
      input.description,

/**
 * Marketplace
 */
marketplace:
  input.sourceMarketplace,

product_id:
  input.sourceProductId,

    


 
    /**
     * price
     */
   price:
  input.salePrice,

    currency:
      input.currency,


    platform_fee:
  input.platformFee,



    /**
     * Scoring
     */
    ai_score:
      input.aiScore,


    health_score:
      input.healthScore,



    /**
     * Status
     */
    status:
      input.status,



    /**
     * Category
     */
    category:
  input.category?.slug ?? null,



    /**
     * SEO
     */
    seo:
      input.seo,



    /**
     * Assets
     */
    media:
      input.media,


    bullets:
      input.bullets,


    tags:
  input.tags,



    /**
     * Versioning
     */
    ready_version:
  input.version,



    /**
     * Timestamp
     */
    
    created_at:
  input.createdAt.toISOString(),

updated_at:
  input.updatedAt.toISOString(),

ready_key: null,

images: null,

compare_price: null,

visibility: "PRIVATE",

publish_status: "NOT_PUBLISHED",

purchase_status: "NOT_PURCHASED",

license_status: "NONE",

preview: null,

metadata: null,

published_at: null,

archived_at: null,  };

}
/**
 * ===========================================================
 * Ready Product Mapper Guard
 * ===========================================================
 */


/**
 * Check Basic Mapper Input
 */
export function isReadyProductMapperInput(
  value: unknown,
): value is ReadyProductMapperInput {


  if (
    typeof value !== "object" ||
    value === null
  ) {

    return false;

  }


  const input =
    value as Partial<ReadyProductMapperInput>;



  return (

    typeof input.id === "string" &&


    typeof input.organizationId === "string" &&


    typeof input.snapshotId === "string" &&


    typeof input.title === "string" &&


    typeof input.description === "string"

  );

}



/**
 * ===========================================================
 * Ready Product Complete Mapper Guard
 * ===========================================================
 */


export function isReadyProductCompleteMapperInput(
  value: unknown,
): value is ReadyProductCompleteMapperInput {


  if (
    !isReadyProductMapperInput(value)
  ) {

    return false;

  }



  const input =
    value as Partial<ReadyProductCompleteMapperInput>;



  return (

    typeof input.status === "string" &&


    typeof input.currency === "string" &&


    typeof input.platformFee === "number" &&


    typeof input.aiScore === "number" &&


    typeof input.healthScore === "number" &&


    typeof input.sourceMarketplace === "string" &&


    typeof input.sourceProductId === "string" &&


    typeof input.version === "number" &&


    input.createdAt instanceof Date &&


    input.updatedAt instanceof Date

  );

}
