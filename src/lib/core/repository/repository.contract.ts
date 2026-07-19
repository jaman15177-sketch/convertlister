/**
 * Repository Layer
 * Repository Contracts
 *
 * Responsibility:
 * - Define repository behavior
 * - Abstract storage implementation
 * - Database agnostic contract
 *
 * No:
 * - Supabase
 * - Prisma
 * - SQL
 * - Business logic
 */


import type {
  RepositoryContext,
  RepositoryCreateInput,
  RepositoryDeleteInput,
  RepositoryQuery,
  RepositoryResult,
  RepositoryUpdateInput,
  RepositoryBatchInput,
} from "./repository.types";



export interface RepositoryContract<T> {

  findById(
    id: string,
    context?: RepositoryContext,
  ): Promise<
    RepositoryResult<T | null>
  >;



  findMany(
    query?: RepositoryQuery,
    context?: RepositoryContext,
  ): Promise<
    RepositoryResult<readonly T[]>
  >;



  create(
    input: RepositoryCreateInput<T>,
  ): Promise<
    RepositoryResult<T>
  >;



  update(
    input: RepositoryUpdateInput<T>,
  ): Promise<
    RepositoryResult<T>
  >;



  delete(
    input: RepositoryDeleteInput,
  ): Promise<
    RepositoryResult<boolean>
  >;



  exists(
    id: string,
    context?: RepositoryContext,
  ): Promise<
    RepositoryResult<boolean>
  >;



  count(
    query?: RepositoryQuery,
    context?: RepositoryContext,
  ): Promise<
    RepositoryResult<number>
  >;

}



export interface BatchRepositoryContract<T>
  extends RepositoryContract<T> {


  createMany(
    input: RepositoryBatchInput<T>,
  ): Promise<
    RepositoryResult<readonly T[]>
  >;



  updateMany(
    input: RepositoryBatchInput<Partial<T>>,
  ): Promise<
    RepositoryResult<readonly T[]>
  >;



  deleteMany(
    ids: readonly string[],
    context?: RepositoryContext,
  ): Promise<
    RepositoryResult<number>
  >;

}



export interface SearchRepositoryContract<T>
{

  search(
    query: string,
    context?: RepositoryContext,
  ): Promise<
    RepositoryResult<readonly T[]>
  >;

}



export interface TransactionRepositoryContract
{

  beginTransaction(
    context?: RepositoryContext,
  ): Promise<
    RepositoryResult<string>
  >;



  commitTransaction(
    transactionId: string,
  ): Promise<
    RepositoryResult<boolean>
  >;



  rollbackTransaction(
    transactionId: string,
  ): Promise<
    RepositoryResult<boolean>
  >;

}



export interface HealthRepositoryContract
{

  healthCheck(): Promise<{
    healthy: boolean;
    message?: string;
    latency?: number;
  }>;

}
