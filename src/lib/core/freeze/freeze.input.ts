/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE INPUT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Define data required by Freeze Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute freeze logic
 * ✗ Access database
 * ✗ Create snapshot
 *
 * Flow
 * ------------------------------------------------------------
 *
 * Approval Gate Result
 *          ↓
 * FreezeInput
 *          ↓
 * Freeze Engine
 *
 * ============================================================
 */


import type {
  FreezeReason,
} from "./freeze.types";



/**
 * Freeze Input
 */
export interface FreezeInput {


  /**
   * Product identity
   */
  readonly productId:

    string;



  /**
   * Organization ownership
   */
  readonly organizationId:

    string;



  /**
   * Approved result reference
   */
  readonly approvalId:

    string;



  /**
   * Product payload to freeze
   */
  readonly payload:

    unknown;



  /**
   * Freeze reason
   */
  readonly reason:

    FreezeReason;



    /**
   * User/system initiating freeze
   */
  readonly requestedBy:

    string;



  /**
   * Request timestamp
   */
  readonly requestedAt:

    Date;



  /**
   * Approval user
   */
  readonly approvedBy:

    string;



  /**
   * Approval timestamp
   */
  readonly approvedAt:

    Date;

}
