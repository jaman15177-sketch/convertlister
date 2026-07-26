/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT
 * ============================================================================
 *
 * File:
 * ready-product.types.ts
 *
 * Single Source of Truth
 * ============================================================================
 */

export type UUID = string;

export type ISODateString = string;

/**
 * ============================================================================
 * JSON TYPES
 * ============================================================================
 */

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

/**
 * ============================================================================
 * MARKETPLACE
 * ============================================================================
 */

export type MarketplaceType =
  | "shopify"
  | "amazon"
  | "etsy"
  | "ebay"
  | "woocommerce"
  | "custom";

/**
 * ============================================================================
 * READY PRODUCT STATUS
 * ============================================================================
 */

export type ReadyProductStatus =
  | "DRAFT"
  | "READY"
  | "PUBLISHED"
  | "ARCHIVED";

export type ReadyProductVisibility =
  | "PRIVATE"
  | "TEAM"
  | "PUBLIC";

export type ReadyProductPublishStatus =
  | "NOT_PUBLISHED"
  | "QUEUED"
  | "PUBLISHED"
  | "FAILED";

export type ReadyProductPurchaseStatus =
  | "NOT_PURCHASED"
  | "PURCHASED";

export type ReadyProductLicenseStatus =
  | "NONE"
  | "ACTIVE"
  | "REVOKED";

/**
 * ============================================================================
 * AUDIT
 * ============================================================================
 */

export interface AuditFields {

  created_at: ISODateString;

  updated_at: ISODateString;

}

export interface PublishAuditFields {

  published_at: ISODateString | null;

  archived_at: ISODateString | null;

}





export interface ReadyProductTag {

  readonly id: string;

  readonly value: string;

}/**
 * ============================================================================
 * COMPATIBILITY CONTENT TYPES
 * ============================================================================
 */

export interface ReadyProductBullet {

  readonly order: number;

  readonly text: string;

}

export interface ReadyProductMedia {

  readonly id: string;

  readonly url: string;

  readonly type: "image" | "video";

  readonly alt?: string;

  readonly position: number;

  readonly width?: number;

  readonly height?: number;

}




export interface ReadyProductSeo {

  readonly title: string;

  readonly description: string;

  readonly keywords: readonly string[];

}/**
 * ============================================================================
 * COMPATIBILITY VIEW TYPES
 * ============================================================================
 */

export interface ReadyProductCategory {

  readonly id: string;

  readonly name: string;

  readonly slug: string;

}



export interface ReadyProductPreview {

  readonly title: string;

  readonly image: string | null;

  readonly price: number;

  readonly currency: string;

}



export interface ReadyProductSearch {

  readonly query: string;

  readonly marketplace?: MarketplaceType;

  readonly category?: string;

  readonly page?: number;

  readonly limit?: number;

}/**
 * ============================================================================
 * COMPATIBILITY MODEL
 * ============================================================================
 */

export interface ReadyProductCompatibility {

  readonly organizationId?: UUID;

  readonly snapshotId?: UUID | null;

  readonly sourceMarketplace?: MarketplaceType | null;

}



/**
 * ============================================================================
 * READY PRODUCT VIEW
 * ============================================================================
 */

export type ReadyProductView =
  ReadyProduct &
  ReadyProductCompatibility;/**
 * ============================================================================
 * COMPATIBILITY MAPPER TYPES
 * ============================================================================
 */

export interface ReadyProductMapInput {

  readonly product: ReadyProduct;

}



export interface ReadyProductMapOutput {

  readonly product: ReadyProduct;

}



export type ReadyProductList =
  readonly ReadyProduct[];



export interface ReadyProductCollection {

  readonly items: ReadyProductList;

  readonly total: number;

}/**
 * ============================================================================
 * LEGACY COMPATIBILITY EXPORTS
 * ============================================================================
 *
 * These aliases exist only for backward compatibility with
 * builder, mapper, engine, filter and search modules.
 *
 * Remove them after full migration.
 * ============================================================================
 */

export type ReadyProductSearchInput =
  ReadyProductSearch;

export type ReadyProductSearchOutput =
  ReadyProductCollection;

export type ReadyProductMapperInput =
  ReadyProductMapInput;

export type ReadyProductMapperOutput =
  ReadyProductMapOutput;

/**
 * ============================================================================
 * FILE COMPLETE
 * ============================================================================
 *
 * ready-product.types.ts
 *
 * ✓ Core Types
 * ✓ Compatibility Types
 * ✓ Search Types
 * ✓ Preview Types
 * ✓ SEO Types
 * ✓ Media Types
 * ✓ Mapper Types
 * ✓ Legacy Aliases
 *
 * ============================================================================
 */
/**
 * ============================================================================
 * READY PRODUCT ENTITY
 * ============================================================================
 */

export interface ReadyProduct
  extends AuditFields,
    PublishAuditFields {

  id: UUID;

  organization_id: UUID;
snapshot_id: UUID | null;
  product_id: UUID | null;

  ready_key: string | null;

  ready_version: number;

  title: string;

  description: string | null;

  images: JsonValue | null;

  marketplace: string | null;

  category: string | null;

preview: ReadyProductPreview | null;

seo: ReadyProductSeo | null;

media: readonly ReadyProductMedia[];

bullets: readonly ReadyProductBullet[];

price: number;

compare_price: number | null;

  currency: string;

  platform_fee: number;

  ai_score: number;

  health_score: number;

  status: ReadyProductStatus;

  visibility: ReadyProductVisibility;

  publish_status: ReadyProductPublishStatus;

  purchase_status: ReadyProductPurchaseStatus;

  license_status: ReadyProductLicenseStatus;

  tags: readonly ReadyProductTag[];

  metadata: JsonValue | null;

}
/**
 * ============================================================================
 * CREATE DTO
 * ============================================================================
 */

export interface CreateReadyProductInput {

  organization_id: UUID;
snapshot_id: UUID | null;
  product_id?: UUID | null;

  ready_key?: string | null;

  title: string;

  description?: string | null;

  images?: JsonValue | null;

  marketplace?: string | null;

  category?: string | null;

  price: number;

  compare_price?: number | null;

  currency?: string;

  platform_fee?: number;

  ai_score?: number;

  health_score?: number;

  status?: ReadyProductStatus;

  visibility?: ReadyProductVisibility;

  publish_status?: ReadyProductPublishStatus;

  purchase_status?: ReadyProductPurchaseStatus;

  license_status?: ReadyProductLicenseStatus;

  tags?: readonly ReadyProductTag[];

  metadata?: JsonValue | null;

}

/**
 * ============================================================================
 * UPDATE DTO
 * ============================================================================
 */

export interface UpdateReadyProductInput {

  ready_key?: string | null;

  title?: string;

  description?: string | null;

  images?: JsonValue | null;

  marketplace?: string | null;

  category?: string | null;

  price?: number;

  compare_price?: number | null;

  currency?: string;

  platform_fee?: number;

  ai_score?: number;

  health_score?: number;

  status?: ReadyProductStatus;

  visibility?: ReadyProductVisibility;

  publish_status?: ReadyProductPublishStatus;

  purchase_status?: ReadyProductPurchaseStatus;

  license_status?: ReadyProductLicenseStatus;

  tags?: readonly ReadyProductTag[];

  metadata?: JsonValue | null;

}
/**
 * ============================================================================
 * READY PRODUCT FILTERS
 * ============================================================================
 */

export interface ReadyProductFilters {

  organization_id: UUID;

  status?: ReadyProductStatus;

  visibility?: ReadyProductVisibility;

  publish_status?: ReadyProductPublishStatus;

  purchase_status?: ReadyProductPurchaseStatus;

  license_status?: ReadyProductLicenseStatus;

  marketplace?: string;

  category?: string;

  search?: string;

}

/**
 * ============================================================================
 * PAGINATION
 * ============================================================================
 */

export interface PaginationOptions {

  page: number;

  limit: number;

}

export interface PaginationResult<T> {

  items: T[];

  total: number;

  page: number;

  limit: number;

}
/**
 * ============================================================================
 * REPOSITORY CONTRACT
 * ============================================================================
 */

export interface ReadyProductRepositoryContract {

  create(
    input: CreateReadyProductInput,
  ): Promise<ReadyProduct>;


  update(
    id: UUID,
    organization_id: UUID,
    input: UpdateReadyProductInput,
  ): Promise<ReadyProduct>;


  delete(
    id: UUID,
    organization_id: UUID,
  ): Promise<void>;


  findById(
    id: UUID,
    organization_id: UUID,
  ): Promise<ReadyProduct | null>;


  findMany(
    filters: ReadyProductFilters,
    pagination: PaginationOptions,
  ): Promise<PaginationResult<ReadyProduct>>;


  exists(
    id: UUID,
    organization_id: UUID,
  ): Promise<boolean>;

}


/**
 * ============================================================================
 * SERVICE CONTRACT
 * ============================================================================
 */

export interface ReadyProductServiceContract {


  create(
    input: CreateReadyProductInput,
  ): Promise<ReadyProduct>;


  update(
    id: UUID,
    organization_id: UUID,
    input: UpdateReadyProductInput,
  ): Promise<ReadyProduct>;


  get(
    id: UUID,
    organization_id: UUID,
  ): Promise<ReadyProduct>;


  list(
    filters: ReadyProductFilters,
    pagination: PaginationOptions,
  ): Promise<PaginationResult<ReadyProduct>>;


  remove(
    id: UUID,
    organization_id: UUID,
  ): Promise<void>;

}


/**
 * ============================================================================
 * API RESPONSE TYPES
 * ============================================================================
 */

export interface ApiSuccessResponse<T> {

  success: true;

  data: T;

}


export interface ApiErrorResponse {

  success: false;

  error: string;

}


export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;
/**
 * ============================================================================
 * SORT TYPES
 * ============================================================================
 */

export type ReadyProductSortField =
  | "created_at"
  | "updated_at"
  | "title"
  | "price"
  | "ai_score"
  | "health_score";


export type SortDirection =
  | "asc"
  | "desc";


export interface ReadyProductSort {

  field: ReadyProductSortField;

  direction: SortDirection;

}


/**
 * ============================================================================
 * DEFAULT VALUES
 * ============================================================================
 */

export const DEFAULT_PAGE = 1;

export const DEFAULT_LIMIT = 20;

export const MAX_LIMIT = 100;


export const DEFAULT_CURRENCY = "BDT";


export const DEFAULT_STATUS: ReadyProductStatus =
  "DRAFT";


export const DEFAULT_VISIBILITY: ReadyProductVisibility =
  "PRIVATE";


export const DEFAULT_PUBLISH_STATUS: ReadyProductPublishStatus =
  "NOT_PUBLISHED";


export const DEFAULT_PURCHASE_STATUS: ReadyProductPurchaseStatus =
  "NOT_PURCHASED";


export const DEFAULT_LICENSE_STATUS: ReadyProductLicenseStatus =
  "NONE";


/**
 * ============================================================================
 * VALIDATION LIMITS
 * ============================================================================
 */

export const READY_PRODUCT_LIMITS = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 500,

  DESCRIPTION_MAX_LENGTH: 5000,

  MIN_SCORE: 0,
  MAX_SCORE: 100,

  MIN_PRICE: 0,
  MAX_PRICE: 100000000,

  CURRENCY_LENGTH: 3,
} as const;

/**
 * ============================================================================
 * TYPE GUARD
 * ============================================================================
 */

export function isReadyProduct(
  value: unknown,
): value is ReadyProduct {

  return (

    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "organization_id" in value &&
    "title" in value

  );

}


/**
 * ============================================================================
 * FILE COMPLETE
 * ============================================================================
 *
 * ready-product.types.ts
 *
 * ✓ Entity
 * ✓ DTO
 * ✓ Filters
 * ✓ Pagination
 * ✓ Repository Contract
 * ✓ Service Contract
 * ✓ API Response
 * ✓ Constants
 * ✓ Type Guard
 *
 * Single Source of Truth
 * ============================================================================
 */
