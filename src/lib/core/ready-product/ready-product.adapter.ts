/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.adapter.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * External boundary adapters.
 *
 * Layer
 * -----------------------------------------------------------
 * Adapter Layer
 *
 * Depends On
 * -----------------------------------------------------------
 * ✓ Types
 * ✓ Repository
 * ✓ Database
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ Business Logic
 * ✗ AI
 * ✗ Marketplace Logic
 * ✗ API Routes
 * ===========================================================
 */

import type {
  ReadyProduct,
} from "./ready-product.types";

import type {
  ReadyProductRepositoryProvider,
} from "./ready-product.repository";

import type {
  ReadyProductDatabaseProvider,
} from "./ready-product.database";

/**
 * ===========================================================
 * Repository Adapter
 * ===========================================================
 */

export interface ReadyProductRepositoryAdapter {

  readonly repository:
    ReadyProductRepositoryProvider;

}

/**
 * ===========================================================
 * Database Adapter
 * ===========================================================
 */

export interface ReadyProductDatabaseAdapter {

  readonly database:
    ReadyProductDatabaseProvider;

}

/**
 * ===========================================================
 * Adapter Bundle
 * ===========================================================
 */

export interface ReadyProductAdapterBundle
  extends
    ReadyProductRepositoryAdapter,
    ReadyProductDatabaseAdapter {}
/* ===========================================================
 * DTO Contract
 * =========================================================== */

export interface ReadyProductDto {

  readonly id: string;

  readonly organizationId: string;

  readonly snapshotId: string;

  readonly title: string;

  readonly description: string;

  readonly salePrice: number;

  readonly currency: string;

  readonly status: string;

}


/* ===========================================================
 * Domain Adapter
 * =========================================================== */

export interface ReadyProductDomainAdapter {

  toDomain(
    dto: ReadyProductDto,
  ): ReadyProduct;

  fromDomain(
    product: ReadyProduct,
  ): ReadyProductDto;

}


/* ===========================================================
 * Serialization Contract
 * =========================================================== */

export interface ReadyProductSerializationAdapter {

  serialize(
    product: ReadyProduct,
  ): string;

  deserialize(
    payload: string,
  ): ReadyProduct;

}


/* ===========================================================
 * DTO Mapper Contract
 * =========================================================== */

export interface ReadyProductDtoMapper {

  mapToDto(
    product: ReadyProduct,
  ): ReadyProductDto;

  mapFromDto(
    dto: ReadyProductDto,
  ): ReadyProduct;

}
/* ===========================================================
 * Persistence Adapter
 * =========================================================== */

export interface ReadyProductPersistenceAdapter {

  save(
    product: ReadyProduct,
  ): Promise<void>;

  update(
    product: ReadyProduct,
  ): Promise<void>;

  delete(
    id: string,
  ): Promise<void>;

}

/* ===========================================================
 * Query Adapter
 * =========================================================== */

export interface ReadyProductQueryAdapter {

  findById(
    id: string,
  ): Promise<ReadyProduct | null>;

  findMany(
    organizationId: string,
  ): Promise<readonly ReadyProduct[]>;

  exists(
    id: string,
  ): Promise<boolean>;

}

/* ===========================================================
 * Transaction Adapter
 * =========================================================== */

export interface ReadyProductTransactionAdapter {

  begin(): Promise<void>;

  commit(): Promise<void>;

  rollback(): Promise<void>;

}

/* ===========================================================
 * Health Adapter
 * =========================================================== */

export interface ReadyProductAdapterHealth {

  readonly healthy: boolean;

  readonly provider: string;

  readonly timestamp: Date;

}

export interface ReadyProductHealthAdapter {

  health():
    Promise<ReadyProductAdapterHealth>;

}

/* ===========================================================
 * Storage Adapter
 * =========================================================== */

export interface ReadyProductStorageAdapter {

  upload(
    path: string,
    content: Uint8Array,
  ): Promise<string>;

  download(
    path: string,
  ): Promise<Uint8Array>;

  remove(
    path: string,
  ): Promise<void>;

}
/* ===========================================================
 * Import Adapter
 * =========================================================== */

export interface ReadyProductImportAdapter {

  import(
    payload: ReadyProductDto,
  ): Promise<ReadyProduct>;

}

/* ===========================================================
 * Export Adapter
 * =========================================================== */

export interface ReadyProductExportAdapter {

  export(
    product: ReadyProduct,
  ): Promise<ReadyProductDto>;

}

/* ===========================================================
 * Complete Adapter Provider
 * =========================================================== */

export interface ReadyProductAdapterProvider
  extends
    ReadyProductDomainAdapter,
    ReadyProductDtoMapper,
    ReadyProductSerializationAdapter,
    ReadyProductPersistenceAdapter,
    ReadyProductQueryAdapter,
    ReadyProductTransactionAdapter,
    ReadyProductHealthAdapter,
    ReadyProductStorageAdapter,
    ReadyProductImportAdapter,
    ReadyProductExportAdapter {

  readonly repository:
    ReadyProductRepositoryProvider;

  readonly database:
    ReadyProductDatabaseProvider;

}

/* ===========================================================
 * Adapter Factory
 * =========================================================== */

export interface ReadyProductAdapterFactory {

  create(
    repository: ReadyProductRepositoryProvider,
    database: ReadyProductDatabaseProvider,
  ): ReadyProductAdapterProvider;

}

/* ===========================================================
 * Adapter Constants
 * =========================================================== */

export const READY_PRODUCT_ADAPTER_NAME =
  "ReadyProductAdapter" as const;

export const READY_PRODUCT_ADAPTER_VERSION =
  "1.0.0" as const;
