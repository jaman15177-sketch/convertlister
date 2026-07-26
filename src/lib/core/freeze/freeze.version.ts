/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE VERSION
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Manage freeze version information.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Store versions
 * ✗ Access database
 * ✗ Create snapshots
 *
 * ============================================================
 */



/**
 * Freeze Version
 */
export interface FreezeVersion {


  /**
   * Version number
   */
  readonly version:

    number;



  /**
   * Product identifier
   */
  readonly productId:

    string;



  /**
   * Freeze reference
   */
  readonly freezeId:

    string;



  /**
   * Version creation time
   */
  readonly createdAt:

    Date;



}



/**
 * Initial Freeze Version
 */
export const INITIAL_FREEZE_VERSION:

  number = 1;
