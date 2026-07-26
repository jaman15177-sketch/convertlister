/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE OUTPUT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Define data returned after freeze execution.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access database
 * ✗ Create snapshot
 * ✗ Publish marketplace
 *
 * ============================================================
 */



import type {
  FreezeStatus,
} from "./freeze.types";



/**
 * Freeze Output
 */
export interface FreezeOutput {


  /**
   * Freeze operation id
   */
  readonly freezeId:

    string;



  /**
   * Product reference
   */
  readonly productId:

    string;



  /**
   * Organization reference
   */
  readonly organizationId:

    string;



  /**
   * Final freeze status
   */
  readonly status:

    FreezeStatus;



  /**
   * Frozen version
   */
  readonly version:

    number;



  /**
   * Freeze timestamp
   */
  readonly frozenAt:

    Date;



}
