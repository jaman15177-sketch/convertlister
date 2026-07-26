/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE POLICY
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Define business rules for freeze eligibility.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute freeze operation
 * ✗ Access database
 * ✗ Create snapshot
 *
 * ============================================================
 */


import type {
  FreezeInput,
} from "./freeze.input";



/**
 * Freeze Policy
 */
export interface FreezePolicy {


  /**
   * Check whether product can be frozen
   */
  canFreeze(

    input:

      FreezeInput,

  ):

    boolean;



}



/**
 * Default Freeze Policy
 */
export const defaultFreezePolicy:

  FreezePolicy = {


    canFreeze(

      input:

        FreezeInput,

    ):


      boolean {


      return Boolean(

        input.productId &&

        input.organizationId &&

        input.approvalId &&

        input.requestedBy

      );


    },


  };
