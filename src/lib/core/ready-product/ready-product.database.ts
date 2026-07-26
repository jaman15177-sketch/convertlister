/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.database.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Ready Product database boundary.
 *
 * Layer
 * -----------------------------------------------------------
 * Database Boundary
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ SQL
 * ✗ Prisma
 * ✗ Supabase
 * ✗ Business Logic
 * ✗ Repository Logic
 * ✗ API
 *
 * ===========================================================
 */

import type {
  ReadyProduct,
} from "./ready-product.types";

/* ===========================================================
 * Database Provider
 * =========================================================== */

export const READY_PRODUCT_DATABASE_PROVIDER = {

  POSTGRES: "POSTGRES",

  SUPABASE: "SUPABASE",

  SQLITE: "SQLITE",

  MYSQL: "MYSQL",

  MEMORY: "MEMORY",

} as const;

export type ReadyProductDatabaseProvider =
  (typeof READY_PRODUCT_DATABASE_PROVIDER)[keyof typeof READY_PRODUCT_DATABASE_PROVIDER];

/* ===========================================================
 * Database Configuration
 * =========================================================== */

export interface ReadyProductDatabaseConfig {

  readonly provider:
    ReadyProductDatabaseProvider;

  readonly connectionName: string;

  readonly schema: string;

  readonly readOnly: boolean;

}

/* ===========================================================
 * Database Connection
 * =========================================================== */

export interface ReadyProductDatabaseConnection {

  readonly provider:
    ReadyProductDatabaseProvider;

  readonly connected: boolean;

  readonly database: string;

  readonly schema: string;

}

/* ===========================================================
 * Database Context
 * =========================================================== */

export interface ReadyProductDatabaseContext {

  readonly organizationId: string;

  readonly requestId: string;

  readonly timestamp: Date;

}

/* ===========================================================
 * Database Boundary
 * =========================================================== */

export interface ReadyProductDatabase {

  readonly config:
    ReadyProductDatabaseConfig;

  readonly connection:
    ReadyProductDatabaseConnection;

}
/* ===========================================================
 * Transaction Interface
 * =========================================================== */

export interface ReadyProductDatabaseTransaction {

  readonly id: string;

  readonly startedAt: Date;

  commit(): Promise<void>;

  rollback(): Promise<void>;

}
/* ===========================================================
 * Database Writer
 * =========================================================== */

export interface ReadyProductDatabaseWriter {

  insert(
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
 * Query Interface
 * =========================================================== */

export interface ReadyProductDatabaseQuery {

  readonly organizationId: string;

  readonly productId?: string;

  readonly snapshotId?: string;

  readonly status?: string;

}

/* ===========================================================
 * Insert Contract
 * =========================================================== */

export interface ReadyProductDatabaseInsert {

  insert(
    product: ReadyProduct,
    context: ReadyProductDatabaseContext,
  ): Promise<void>;

}

/* ===========================================================
 * Update Contract
 * =========================================================== */

export interface ReadyProductDatabaseUpdate {

  update(
    product: ReadyProduct,
    context: ReadyProductDatabaseContext,
  ): Promise<void>;

}

/* ===========================================================
 * Delete Contract
 * =========================================================== */

export interface ReadyProductDatabaseDelete {

  delete(
    productId: string,
    context: ReadyProductDatabaseContext,
  ): Promise<void>;

}
/* ===========================================================
 * Read Operations
 * =========================================================== */

export interface ReadyProductDatabaseReader {

  findById(
    id: string,
  ): Promise<ReadyProduct | null>;

  findMany(
    query: ReadyProductDatabaseQuery,
  ): Promise<readonly ReadyProduct[]>;

  exists(
    id: string,
  ): Promise<boolean>;

}


/* ===========================================================
 * Pagination
 * =========================================================== */

export interface ReadyProductDatabasePagination {

  readonly page: number;

  readonly limit: number;

  readonly total: number;

}


export interface ReadyProductDatabasePage<T> {

  readonly items: readonly T[];

  readonly pagination:
    ReadyProductDatabasePagination;

}


/* ===========================================================
 * Batch Operations
 * =========================================================== */

export interface ReadyProductDatabaseBatch {

  insertMany(
    products: readonly ReadyProduct[],
  ): Promise<number>;

  updateMany(
    products: readonly ReadyProduct[],
  ): Promise<number>;

  deleteMany(
    ids: readonly string[],
  ): Promise<number>;

}


/* ===========================================================
 * Database Health
 * =========================================================== */

export interface ReadyProductDatabaseHealth {

  readonly healthy: boolean;

  readonly provider:
    ReadyProductDatabaseProvider;

  readonly latencyMs: number;

  readonly timestamp: Date;

}


/* ===========================================================
 * Database Metrics
 * =========================================================== */

export interface ReadyProductDatabaseMetrics {

  readonly totalReads: number;

  readonly totalWrites: number;

  readonly totalTransactions: number;

  readonly totalFailures: number;

}


/* ===========================================================
 * Database Monitoring
 * =========================================================== */

export interface ReadyProductDatabaseMonitor {

  health():
    Promise<ReadyProductDatabaseHealth>;

  metrics():
    Promise<ReadyProductDatabaseMetrics>;

}
/* ===========================================================
 * Persistence Boundary
 * =========================================================== */

export interface ReadyProductPersistenceBoundary
  extends
    ReadyProductDatabaseReader,
    ReadyProductDatabaseWriter,
    ReadyProductDatabaseBatch,
    ReadyProductDatabaseMonitor {}


/* ===========================================================
 * Readonly Database
 * =========================================================== */

export interface ReadyProductReadonlyDatabase {

  readonly database:
    ReadyProductDatabase;

  readonly reader:
    ReadyProductDatabaseReader;

}


/* ===========================================================
 * Writable Database
 * =========================================================== */

export interface ReadyProductWritableDatabase {

  readonly database:
    ReadyProductDatabase;

  readonly writer:
    ReadyProductDatabaseWriter;

  readonly transaction:
    ReadyProductDatabaseTransaction;

}


/* ===========================================================
 * Complete Database Provider
 * =========================================================== */

export interface ReadyProductDatabaseProviderContract
  extends
    ReadyProductPersistenceBoundary {

  readonly config:
    ReadyProductDatabaseConfig;

  readonly connection:
    ReadyProductDatabaseConnection;

}


/* ===========================================================
 * Database Factory
 * =========================================================== */

export interface ReadyProductDatabaseFactory {

  create(
    config: ReadyProductDatabaseConfig,
  ): ReadyProductDatabaseProviderContract;

}


/* ===========================================================
 * Provider Name
 * =========================================================== */

export const READY_PRODUCT_DATABASE_NAME =
  "ReadyProductDatabase" as const;


/* ===========================================================
 * Version
 * =========================================================== */

export const READY_PRODUCT_DATABASE_VERSION =
  "1.0.0" as const;
