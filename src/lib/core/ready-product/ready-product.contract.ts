/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.contract.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Enterprise contract definitions for the Ready Product module.
 *
 * Layer
 * -----------------------------------------------------------
 * Contract Layer
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ Business Logic
 * ✗ Database Logic
 * ✗ Repository Logic
 * ✗ API
 * ✗ Marketplace
 * ✗ Runtime Implementation
 *
 * ===========================================================
 */

import type { ReadyProduct } from "./ready-product.types";

/* ===========================================================
 * Module Information
 * =========================================================== */

export const READY_PRODUCT_MODULE = "READY_PRODUCT" as const;

export const READY_PRODUCT_CONTRACT_VERSION = 1 as const;

/* ===========================================================
 * Public Contract
 * =========================================================== */

export interface ReadyProductPublicContract {
  readonly module: typeof READY_PRODUCT_MODULE;
  readonly version: typeof READY_PRODUCT_CONTRACT_VERSION;
}

/* ===========================================================
 * Base Contract
 * =========================================================== */

export interface ReadyProductBaseContract {
  readonly product: ReadyProduct;
}

/* ===========================================================
 * Metadata Contract
 * =========================================================== */

export interface ReadyProductMetadataContract {
  readonly createdBy: string;
  readonly organizationId: string;
  readonly timestamp: Date;
}

/* ===========================================================
 * Health Contract
 * =========================================================== */

export interface ReadyProductHealthContract {
  readonly healthy: boolean;
  readonly message?: string;
}
/* ===========================================================
 * Store Contract
 * =========================================================== */

import type { ReadyProductStore } from "./ready-product.store";
import type {
  ReadyProductRepositoryProvider,
} from "./ready-product.repository";
import type {
  ReadyProductServiceInput,
  ReadyProductServiceOutput,
} from "./ready-product.service";

/**
 * Ready Product Store Contract
 */
export interface ReadyProductStoreContract {

  readonly store: ReadyProductStore;

}


/* ===========================================================
 * Repository Contract
 * =========================================================== */

/**
 * Ready Product Repository Contract
 */
export interface ReadyProductRepositoryContract {

  readonly repository:
    ReadyProductRepositoryProvider;

}


/* ===========================================================
 * Service Contract
 * =========================================================== */

/**
 * Ready Product Service Contract
 */
export interface ReadyProductServiceContract {

  build(
    input: ReadyProductServiceInput,
  ): ReadyProductServiceOutput;

}


/* ===========================================================
 * Validation Contract
 * =========================================================== */

/**
 * Ready Product Validation Contract
 */
export interface ReadyProductValidationContract {

  validate(
    input: ReadyProductServiceInput,
  ): boolean;

}
/* ===========================================================
 * Engine Contract
 * =========================================================== */

import type {
  ReadyProductEngine,
} from "./ready-product.engine";

import type {
  ReadyProductIdentityResult,
} from "./ready-product.identity";

import type {
  ReadyProductKeyResult,
} from "./ready-product.key";

import type {
  ReadyProductSearch,
} from "./ready-product.types";

/**
 * Ready Product Engine Contract
 */
export interface ReadyProductEngineContract {

  readonly engine:
    ReadyProductEngine;

}


/* ===========================================================
 * Identity Contract
 * =========================================================== */

/**
 * Ready Product Identity Contract
 */
export interface ReadyProductIdentityContract {

  createIdentity(): ReadyProductIdentityResult;

}


/* ===========================================================
 * Key Contract
 * =========================================================== */

/**
 * Ready Product Key Contract
 */
export interface ReadyProductKeyContract {

  createKey(): ReadyProductKeyResult;

}


/* ===========================================================
 * Search Contract
 * =========================================================== */

/**
 * Ready Product Search Contract
 */
export interface ReadyProductSearchContract {

  search(
    query: ReadyProductSearch,
  ): Promise<
    readonly ReadyProduct[]
  >;

}


/* ===========================================================
 * Statistics Contract
 * =========================================================== */

export interface ReadyProductStatistics {

  readonly totalProducts: number;

  readonly totalOrganizations: number;

  readonly totalSnapshots: number;

  readonly averageAiScore: number;

  readonly averageHealthScore: number;

}


/**
 * Ready Product Statistics Contract
 */
export interface ReadyProductStatisticsContract {

  statistics():
    Promise<ReadyProductStatistics>;

}
/* ===========================================================
 * Dependency Contract
 * =========================================================== */

/**
 * Complete Dependency Contract
 */
export interface ReadyProductDependencyContract
  extends
    ReadyProductRepositoryContract,
    ReadyProductStoreContract,
    ReadyProductServiceContract,
    ReadyProductEngineContract,
    ReadyProductValidationContract,
    ReadyProductIdentityContract,
    ReadyProductKeyContract,
    ReadyProductSearchContract,
    ReadyProductStatisticsContract {}


/* ===========================================================
 * Readonly Contract
 * =========================================================== */

export interface ReadyProductReadonlyContract {

  get(
    id: string,
  ): Promise<ReadyProduct | null>;

}


/* ===========================================================
 * Writable Contract
 * =========================================================== */

export interface ReadyProductWritableContract {

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
 * Factory Contract
 * =========================================================== */

export interface ReadyProductFactoryContract {

  create(
    product: ReadyProduct,
  ): ReadyProduct;

}


/* ===========================================================
 * Module Contract
 * =========================================================== */

export interface ReadyProductModuleContract
  extends
    ReadyProductPublicContract,
    ReadyProductDependencyContract,
    ReadyProductReadonlyContract,
    ReadyProductWritableContract,
    ReadyProductFactoryContract,
    ReadyProductHealthContract {}


/* ===========================================================
 * Contract Version
 * =========================================================== */

export const READY_PRODUCT_CONTRACT_NAME =
  "ReadyProductContract" as const;
