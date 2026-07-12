/**
 * ==========================================================
 * IMPORT ROLLBACK
 * ==========================================================
 *
 * Production-safe rollback abstraction
 * for Import subsystem.
 *
 * Responsibilities
 * - Rollback contract
 * - Restore operation tracking
 * - Failure recovery metadata
 *
 * MUST NOT contain
 * - Database operations
 * - Queue logic
 * - External services
 *
 * ==========================================================
 */


/* ==========================================================
 * ROLLBACK CONTEXT
 * ==========================================================
 */

export interface ImportRollbackContext {

  readonly importId: string;

  readonly jobId: string;

  readonly reason: string;

  readonly createdAt: Date;

}


/* ==========================================================
 * ROLLBACK ACTION
 * ==========================================================
 */

export interface ImportRollbackAction {

  readonly id: string;

  readonly description: string;

  execute():
    Promise<void>;

}


/* ==========================================================
 * ROLLBACK RESULT
 * ==========================================================
 */

export interface ImportRollbackResult {

  readonly success: boolean;

  readonly executedActions: number;

  readonly failedActions: number;

  readonly error?: Error;

}


/* ==========================================================
 * ROLLBACK MANAGER
 * ==========================================================
 */

export class ImportRollbackManager {


  async rollback(
    context: ImportRollbackContext,
    actions: readonly ImportRollbackAction[]
  ): Promise<ImportRollbackResult> {

    let executedActions = 0;
    let failedActions = 0;


    for (const action of actions) {

      try {

        await action.execute();

        executedActions++;

      } catch {

        failedActions++;

      }

    }


    return {

      success:
        failedActions === 0,

      executedActions,

      failedActions,

    };

  }

}


/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const importRollback =
  new ImportRollbackManager();
