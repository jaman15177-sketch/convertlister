/**
 * ==========================================================
 * IMPORT TRANSACTION
 * ==========================================================
 *
 * Production-safe transaction abstraction
 * for Import subsystem.
 *
 * Responsibilities
 * - Transaction lifecycle
 * - Commit / rollback contract
 * - Safe execution wrapper
 *
 * MUST NOT contain
 * - Database logic
 * - ORM dependency
 * - Supabase dependency
 * - Repository implementation
 *
 * ==========================================================
 */


/* ==========================================================
 * TRANSACTION CONTEXT
 * ==========================================================
 */

export interface ImportTransactionContext {

  readonly transactionId: string;

  readonly startedAt: Date;

  readonly metadata?: Readonly<
    Record<string, unknown>
  >;

}


/* ==========================================================
 * TRANSACTION HANDLER
 * ==========================================================
 */

export interface ImportTransactionHandler<T> {

  execute(
    context: ImportTransactionContext
  ): Promise<T>;

}


/* ==========================================================
 * TRANSACTION RESULT
 * ==========================================================
 */

export interface ImportTransactionResult<T> {

  readonly success: boolean;

  readonly data?: T;

  readonly error?: Error;

}


/* ==========================================================
 * TRANSACTION MANAGER
 * ==========================================================
 */

export class ImportTransactionManager {


  async run<T>(
    context: ImportTransactionContext,
    handler: ImportTransactionHandler<T>
  ): Promise<ImportTransactionResult<T>> {

    try {

      const data =
        await handler.execute(context);


      return {
        success: true,
        data,
      };


    } catch (error) {

      return {
        success: false,
        error:
          error instanceof Error
            ? error
            : new Error(
                "Unknown transaction error"
              ),
      };

    }

  }


}


/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const importTransaction =
  new ImportTransactionManager();
