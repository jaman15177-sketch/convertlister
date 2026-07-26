/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Convert approved product state into frozen state.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Access Supabase
 * ✗ Create snapshot storage
 * ✗ Publish marketplace
 * ✗ Handle distribution
 *
 * Flow
 * ------------------------------------------------------------
 *
 * Approval Gate
 *        ↓
 * Freeze Engine
 *        ↓
 * Snapshot Module
 *
 * ============================================================
 */


import type {
  FreezeEngineContract,
} from "./freeze.contract";


import type {
  FreezeInput,
} from "./freeze.input";


import type {
  FreezeResult,
} from "./freeze.types";


import {
  validateFreezeRules,
} from "./freeze.rules";


import {
  FreezeOperationError,
} from "./freeze.errors";



/**
 * Freeze Engine Implementation
 */
export class FreezeEngine

  implements FreezeEngineContract {



  async freeze(

    input:

      FreezeInput,

  ):

    Promise<FreezeResult> {



    const validation =

      validateFreezeRules(input);



    if (!validation.passed) {

      throw new FreezeOperationError(

        validation.errors.join(", "),

      );

    }



    const now =

      new Date();



    return {

  id:

    crypto.randomUUID(),

  productId:

    input.productId,

  organizationId:

    input.organizationId,

  approvalId:

    input.approvalId,

  status:

    "FROZEN",

  frozenAt:

    now,

};
  }

}
