/**
 * ============================================================================
 * CONVERTLISTER
 * READY PRODUCT STORE
 * ============================================================================
 */

import type {
  ReadyProduct,
  CreateReadyProductInput,
  UpdateReadyProductInput,
  ReadyProductFilters,
  PaginationOptions,
  PaginationResult,
} from "./ready-product.types";

import type {
  ReadyProductRepositoryProvider,
} from "./ready-product.repository";

export class ReadyProductStore {

  constructor(
    private readonly repository: ReadyProductRepositoryProvider,
  ) {}

  getRepository(): ReadyProductRepositoryProvider {

    return this.repository;

  }

}

/**
 * ============================================================================
 * Find Product
 * ============================================================================
 */

export async function findReadyProduct(
  store: ReadyProductStore,
  id: string,
  organization_id: string,
): Promise<ReadyProduct | null> {

  return store
    .getRepository()
    .findById(
      id,
      organization_id,
    );

}
/**
 * ============================================================================
 * Save Product
 * ============================================================================
 */

export async function saveReadyProduct(
  store: ReadyProductStore,
  product: ReadyProduct,
): Promise<ReadyProduct> {

  const input: CreateReadyProductInput = {

    organization_id: product.organization_id,

    snapshot_id: product.snapshot_id,

    product_id: product.product_id,

    ready_key: product.ready_key,

    title: product.title,

    description: product.description,

    images: product.images,

    marketplace: product.marketplace,

    category: product.category,

    price: product.price,

    compare_price: product.compare_price,

    currency: product.currency,

    platform_fee: product.platform_fee,

    ai_score: product.ai_score,

    health_score: product.health_score,

    status: product.status,

    visibility: product.visibility,

    publish_status: product.publish_status,

    purchase_status: product.purchase_status,

    license_status: product.license_status,

    tags: product.tags,

    metadata: product.metadata,

  };

  return store
    .getRepository()
    .save(input);

}
/**
 * ============================================================================
 * Update Product
 * ============================================================================
 */

export async function updateReadyProduct(
  store: ReadyProductStore,
  product: ReadyProduct,
): Promise<ReadyProduct> {

  const input: UpdateReadyProductInput = {

    ready_key: product.ready_key,

    title: product.title,

    description: product.description,

    images: product.images,

    marketplace: product.marketplace,

    category: product.category,

    price: product.price,

    compare_price: product.compare_price,

    currency: product.currency,

    platform_fee: product.platform_fee,

    ai_score: product.ai_score,

    health_score: product.health_score,

    status: product.status,

    visibility: product.visibility,

    publish_status: product.publish_status,

    purchase_status: product.purchase_status,

    license_status: product.license_status,

    tags: product.tags,

    metadata: product.metadata,

  };

  return store
    .getRepository()
    .update(
      product.id,
      product.organization_id,
      input,
    );

}
/**
 * ============================================================================
 * Delete Product
 * ============================================================================
 */

export async function deleteReadyProduct(
  store: ReadyProductStore,
  id: string,
  organization_id: string,
): Promise<void> {

  return store
    .getRepository()
    .delete(
      id,
      organization_id,
    );

}

/**
 * ============================================================================
 * Search Products
 * ============================================================================
 */

export async function searchReadyProducts(
  store: ReadyProductStore,
  filters: ReadyProductFilters,
  pagination: PaginationOptions,
): Promise<PaginationResult<ReadyProduct>> {

  return store
    .getRepository()
    .search(
      filters,
      pagination,
    );

}

/**
 * ============================================================================
 * Repository Health
 * ============================================================================
 */

export async function getReadyProductStoreHealth(
  store: ReadyProductStore,
): Promise<boolean> {

  return store
    .getRepository()
    .health();

}
