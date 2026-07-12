/**
 * ==========================================================
 * UNIVERSAL SNAPSHOT
 * ==========================================================
 *
 * Snapshot management layer.
 *
 * Responsibilities:
 * - Create immutable entity snapshots
 * - Restore previous state
 * - Track snapshot metadata
 *
 * Rules:
 * - No database dependency
 * - No persistence logic
 * - Immutable design
 * ==========================================================
 */


/* ==========================================================
 * SNAPSHOT TYPES
 * ========================================================== */

export interface UniversalSnapshot<T = unknown> {

  readonly id: string;

  readonly entityId: string;

  readonly data: Readonly<T>;

  readonly version: number;

  readonly createdAt: Date;

}



/* ==========================================================
 * SNAPSHOT MANAGER
 * ========================================================== */

export class UniversalSnapshotManager<T = unknown> {



  /**
   * Create snapshot
   */

  create(
    entityId: string,
    data: T,
    version: number
  ): UniversalSnapshot<T> {

    return {

      id: this.generateId(),

      entityId,

      data: structuredClone(data),

      version,

      createdAt: new Date(),

    };

  }



  /**
   * Restore snapshot data
   */

  restore(
    snapshot: UniversalSnapshot<T>
  ): T {

    return structuredClone(
      snapshot.data
    );

  }



  /**
   * Compare snapshots
   */

  isSameVersion(
    first: UniversalSnapshot<T>,
    second: UniversalSnapshot<T>
  ): boolean {

    return (
      first.entityId === second.entityId &&
      first.version === second.version
    );

  }



  /**
   * Generate snapshot id
   */

  private generateId(): string {

    return (
      "snap_" +
      Date.now().toString(36) +
      "_" +
      Math.random()
        .toString(36)
        .substring(2, 8)
    );

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalSnapshot =
  new UniversalSnapshotManager();
