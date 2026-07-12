/**
 * ==========================================================
 * UNIVERSAL VERSION
 * ==========================================================
 *
 * Entity version management layer.
 *
 * Responsibilities:
 * - Version generation
 * - Version increment
 * - Optimistic version comparison
 * - Change tracking support
 *
 * Rules:
 * - No database dependency
 * - No persistence logic
 * - No business rules
 * ==========================================================
 */


/* ==========================================================
 * VERSION TYPES
 * ========================================================== */

export interface UniversalVersion {

  readonly version: number;

  readonly updatedAt: Date;

}



/* ==========================================================
 * VERSION MANAGER
 * ========================================================== */

export class UniversalVersionManager {



  /**
   * Create initial version
   */

  create(): UniversalVersion {

    return {

      version: 1,

      updatedAt: new Date(),

    };

  }



  /**
   * Increment version
   */

  increment(
    current: UniversalVersion
  ): UniversalVersion {

    return {

      version:
        current.version + 1,

      updatedAt:
        new Date(),

    };

  }



  /**
   * Compare versions
   */

  compare(
    current: UniversalVersion,
    expected: UniversalVersion
  ): boolean {

    return (
      current.version ===
      expected.version
    );

  }



  /**
   * Check latest version
   */

  isLatest(
    currentVersion: number,
    incomingVersion: number
  ): boolean {

    return (
      currentVersion >= incomingVersion
    );

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalVersion =
  new UniversalVersionManager();
