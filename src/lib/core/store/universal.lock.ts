/**
 * ==========================================================
 * UNIVERSAL LOCK
 * ==========================================================
 *
 * Concurrency control layer.
 *
 * Responsibilities:
 * - Entity locking
 * - Lock ownership tracking
 * - Safe release mechanism
 *
 * Rules:
 * - No database dependency
 * - No distributed lock implementation
 * - Can be extended by Redis adapter later
 * ==========================================================
 */


/* ==========================================================
 * LOCK TYPES
 * ========================================================== */

export interface UniversalLock {

  readonly key: string;

  readonly ownerId: string;

  readonly acquiredAt: Date;

}



/* ==========================================================
 * LOCK MANAGER
 * ========================================================== */

export class UniversalLockManager {


  private readonly locks:
    Map<string, UniversalLock> =
    new Map();



  /**
   * Acquire lock
   */

  acquire(
    key: string,
    ownerId: string
  ): UniversalLock {


    const existing =
      this.locks.get(key);



    if (existing) {

      throw new Error(
        `Lock already exists: ${key}`
      );

    }



    const lock: UniversalLock = {

      key,

      ownerId,

      acquiredAt: new Date(),

    };



    this.locks.set(
      key,
      lock
    );



    return lock;

  }



  /**
   * Release lock
   */

  release(
    key: string,
    ownerId: string
  ): boolean {


    const lock =
      this.locks.get(key);



    if (
      !lock ||
      lock.ownerId !== ownerId
    ) {

      return false;

    }



    return this.locks.delete(
      key
    );

  }



  /**
   * Check lock status
   */

  isLocked(
    key: string
  ): boolean {

    return this.locks.has(
      key
    );

  }



  /**
   * Get lock information
   */

  get(
    key: string
  ):
    UniversalLock | undefined {

    return this.locks.get(
      key
    );

  }



  /**
   * Clear all locks
   */

  clear(): void {

    this.locks.clear();

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalLock =
  new UniversalLockManager();
