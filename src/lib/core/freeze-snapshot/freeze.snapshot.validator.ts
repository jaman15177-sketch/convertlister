/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE SNAPSHOT ORCHESTRATION VALIDATOR
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Freeze → Snapshot Orchestration
 *
 * Responsibility
 * ------------------------------------------------------------
 * Validates whether an approved freeze can create
 * a permanent snapshot.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Create snapshot
 * ✗ Call Snapshot Engine
 * ✗ Access Database
 * ✗ Access Storage
 *
 * ============================================================
 */

import type {

  FreezeSnapshotRequest,

} from "./freeze.snapshot.types";



/* ============================================================
 * Validation Result
 * ============================================================
 */

export interface FreezeSnapshotValidationResult {


  readonly valid:

    boolean;



  readonly errors:

    readonly string[];

}



/* ============================================================
 * Validator Contract
 * ============================================================
 */

export interface FreezeSnapshotValidatorContract {


  validate(

    request:

      FreezeSnapshotRequest,

  ):

    FreezeSnapshotValidationResult;

}



/* ============================================================
 * Validator Implementation
 * ============================================================
 */

export class FreezeSnapshotValidator

  implements FreezeSnapshotValidatorContract {



  validate(

    request:

      FreezeSnapshotRequest,

  ):

    FreezeSnapshotValidationResult {


    const errors:

      string[] = [];



    /**
     * Freeze ID
     */

    if (

      !request.context.identity.freezeId

    ) {

      errors.push(

        "Freeze ID is required.",

      );

    }



    /**
     * Organization
     */

    if (

      !request.context.identity.organizationId

    ) {

      errors.push(

        "Organization ID is required.",

      );

    }



    /**
     * Product
     */

    if (

      !request.context.identity.productId

    ) {

      errors.push(

        "Product ID is required.",

      );

    }



    /**
     * Approval User
     */

    if (

      !request.context.approvedBy

    ) {

      errors.push(

        "Approval user is required.",

      );

    }



    /**
     * Approval Date
     */

    if (

      !(request.context.approvedAt instanceof Date)

    ) {

      errors.push(

        "Approval date must be valid.",

      );

    }



    /**
     * Status Check
     */

    if (

      request.status !== "PENDING" &&

      request.status !== "PROCESSING"

    ) {

      errors.push(

        "Invalid freeze snapshot status.",

      );

    }



    return {


      valid:

        errors.length === 0,



      errors,


    };

  }


}
