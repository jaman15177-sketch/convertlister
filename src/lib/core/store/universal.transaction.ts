/**
 * ==========================================================
 * UNIVERSAL TRANSACTION
 * ==========================================================
 *
 * Transaction boundary for Universal Store.
 *
 * Responsibilities:
 * - Execute atomic operations
 * - Commit successful operations
 * - Rollback failed operations
 * - Maintain transaction lifecycle
 *
 * Rules:
 * - No database dependency
 * - No external service
 * - Storage layer decides persistence
 * ==========================================================
 */


/* ==========================================================
 * TRANSACTION STATUS
 * ========================================================== */

export enum UniversalTransactionStatus {

  ACTIVE = "ACTIVE",

  COMMITTED = "COMMITTED",

  ROLLED_BACK = "ROLLED_BACK",

  FAILED = "FAILED",

}



/* ==========================================================
 * TRANSACTION CONTEXT
 * ========================================================== */

export interface UniversalTransactionContext {

  readonly id: string;

  readonly startedAt: Date;

  status:
    UniversalTransactionStatus;

}



/* ==========================================================
 * TRANSACTION MANAGER
 * ========================================================== */

export class UniversalTransactionManager {



  /**
   * Start transaction
   */

  begin(): UniversalTransactionContext {

    return {

      id: this.generateId(),

      startedAt: new Date(),

      status:
        UniversalTransactionStatus.ACTIVE,

    };

  }



  /**
   * Commit transaction
   */

  commit(
    transaction:
      UniversalTransactionContext
  ):
    UniversalTransactionContext {

    return {

      ...transaction,

      status:
        UniversalTransactionStatus.COMMITTED,

    };

  }



  /**
   * Rollback transaction
   */

  rollback(
    transaction:
      UniversalTransactionContext
  ):
    UniversalTransactionContext {

    return {

      ...transaction,

      status:
        UniversalTransactionStatus.ROLLED_BACK,

    };

  }



  /**
   * Execute transaction wrapper
   */

  async execute<T>(
    callback:
      () => Promise<T>
  ): Promise<T> {


    const transaction =
      this.begin();


    try {

      const result =
        await callback();


      this.commit(transaction);


      return result;


    } catch (error) {


      this.rollback(transaction);


      throw error;

    }

  }



  /**
   * Generate transaction id
   */

  private generateId(): string {

    return (
      "txn_" +
      Date.now().toString(36) +
      "_" +
      Math.random()
        .toString(36)
        .substring(2, 10)
    );

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalTransaction =
  new UniversalTransactionManager();
