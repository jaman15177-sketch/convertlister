/**
 * Repository Layer
 * Shared Type Definitions
 *
 * Responsibility:
 * - Pure repository contracts data types
 * - No business logic
 * - No database dependency
 * - No implementation
 */

export type RepositoryID = string;

export type RepositoryTimestamp = Date;

export type RepositoryStatus =
  | "idle"
  | "loading"
  | "success"
  | "failed";


export interface RepositoryMetadata {
  readonly id?: RepositoryID;

  readonly createdAt?: RepositoryTimestamp;

  readonly updatedAt?: RepositoryTimestamp;

  readonly createdBy?: string;

  readonly updatedBy?: string;

  readonly version?: number;
}


export interface RepositoryContext {
  readonly tenantId?: string;

  readonly organizationId?: string;

  readonly userId?: string;

  readonly requestId?: string;
}


export interface RepositoryPagination {
  readonly page?: number;

  readonly limit?: number;

  readonly offset?: number;
}


export interface RepositorySort {
  readonly field: string;

  readonly direction:
    | "asc"
    | "desc";
}


export interface RepositoryFilter {
  readonly field: string;

  readonly operator:
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "contains"
    | "in";

  readonly value: unknown;
}


export interface RepositoryQuery {
  readonly filters?: readonly RepositoryFilter[];

  readonly sort?: readonly RepositorySort[];

  readonly pagination?: RepositoryPagination;
}


export interface RepositoryCreateInput<T> {
  readonly data: T;

  readonly context?: RepositoryContext;
}


export interface RepositoryUpdateInput<T> {
  readonly id: RepositoryID;

  readonly data: Partial<T>;

  readonly context?: RepositoryContext;
}


export interface RepositoryDeleteInput {
  readonly id: RepositoryID;

  readonly context?: RepositoryContext;
}


export interface RepositoryResult<T> {
  readonly success: boolean;

  readonly data?: T;

  readonly error?: string;

  readonly status?: RepositoryStatus;
}


export interface RepositoryBatchInput<T> {
  readonly items: readonly T[];

  readonly context?: RepositoryContext;
}


export interface RepositoryTransactionContext {
  readonly transactionId: string;

  readonly startedAt: RepositoryTimestamp;

  readonly context?: RepositoryContext;
}


export interface RepositoryHealthStatus {
  readonly healthy: boolean;

  readonly latency?: number;

  readonly message?: string;
}


export interface RepositoryMetric {
  readonly name: string;

  readonly value: number;

  readonly timestamp: RepositoryTimestamp;
}


export interface RepositoryAuditRecord {
  readonly action:
    | "create"
    | "update"
    | "delete"
    | "read";

  readonly entity: string;

  readonly entityId?: RepositoryID;

  readonly timestamp: RepositoryTimestamp;

  readonly context?: RepositoryContext;
}


export interface RepositoryCacheEntry<T> {
  readonly key: string;

  readonly value: T;

  readonly expiresAt?: RepositoryTimestamp;
}


export interface RepositoryTelemetry {
  readonly operation: string;

  readonly duration?: number;

  readonly success: boolean;

  readonly timestamp: RepositoryTimestamp;
}


export interface RepositoryEventMetadata {
  readonly eventName: string;

  readonly entityId?: RepositoryID;

  readonly timestamp: RepositoryTimestamp;
}


export interface RepositoryQueueMetadata {
  readonly jobId?: string;

  readonly queueName?: string;

  readonly retryCount?: number;
}
