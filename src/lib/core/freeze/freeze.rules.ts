/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE RULES
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Define validation rules before freezing.
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
 * Freeze Rule Result
 */
export interface FreezeRuleResult {


  readonly passed:

    boolean;



  readonly errors:

    string[];


}



/**
 * Validate Freeze Rules
 */
export function validateFreezeRules(

  input:

    FreezeInput,

):

  FreezeRuleResult {


  const errors:

    string[] = [];



  if (!input.productId) {

    errors.push(
      "Product id is required.",
    );

  }



  if (!input.organizationId) {

    errors.push(
      "Organization id is required.",
    );

  }



  if (!input.approvalId) {

    errors.push(
      "Approval id is required.",
    );

  }



  if (!input.payload) {

    errors.push(
      "Freeze payload is required.",
    );

  }



  if (!input.requestedBy) {

    errors.push(
      "Requested by is required.",
    );

  }



  return {


    passed:

      errors.length === 0,



    errors,


  };

}
