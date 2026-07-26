/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE SNAPSHOT ORCHESTRATOR
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Freeze → Snapshot Orchestration
 *
 * Responsibility
 * ------------------------------------------------------------
 * Connects Freeze Engine approval flow with Snapshot Engine.
 *
 * Flow:
 *
 * Freeze Approved
 *        ↓
 * Validate
 *        ↓
 * Build Snapshot Input
 *        ↓
 * Call Snapshot Engine
 *        ↓
 * Return Snapshot Result
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Direct database access
 * ✗ Direct storage access
 * ✗ Replace Snapshot Engine logic
 *
 * ============================================================
 */

import type {

  FreezeSnapshotOrchestratorContract,

} from "./freeze.snapshot.contract";


import type {

  FreezeSnapshotRequest,

  FreezeSnapshotResult,

} from "./freeze.snapshot.types";


import {

  FreezeSnapshotValidator,

} from "./freeze.snapshot.validator";


import {

  FreezeSnapshotApprovalRequiredError,

  FreezeSnapshotCreationError,

} from "./freeze.snapshot.errors";



/**
 * Snapshot Engine Contract
 *
 * Kept minimal intentionally.
 * Actual Snapshot Engine implementation
 * will be injected later.
 */

export interface SnapshotEngineAdapter {


  create(

    input: unknown,

  ):

    Promise<{

      snapshotId: string;

    }>;

}



/**
 * ============================================================
 * Freeze Snapshot Orchestrator
 * ============================================================
 */

export class FreezeSnapshotOrchestrator

  implements FreezeSnapshotOrchestratorContract {



  constructor(

    private readonly snapshotEngine:

      SnapshotEngineAdapter,


    private readonly validator =

      new FreezeSnapshotValidator(),

  ) {}



  /**
   * ----------------------------------------------------------
   * Create Permanent Snapshot
   * ----------------------------------------------------------
   */

  async createSnapshot(

    request:

      FreezeSnapshotRequest,

  ):

    Promise<FreezeSnapshotResult> {


    if (

      !this.canCreateSnapshot(request)

    ) {


      throw new FreezeSnapshotApprovalRequiredError();

    }



    const validation =

      this.validator.validate(request);



    if (!validation.valid) {


      throw new FreezeSnapshotCreationError(

        validation.errors.join(", "),

      );

    }



    try {


      const snapshot =

        await this.snapshotEngine.create({

          freezeId:

            request.context.identity.freezeId,


          organizationId:

            request.context.identity.organizationId,


          productId:

            request.context.identity.productId,


          approvedBy:

            request.context.approvedBy,


          approvedAt:

            request.context.approvedAt,


        });



      return {


        freezeId:

          request.context.identity.freezeId,


        snapshotId:

          snapshot.snapshotId,


        status:

          "SNAPSHOT_CREATED",


        createdAt:

          new Date(),


      };


    }

    catch (error) {


      throw new FreezeSnapshotCreationError(

        error instanceof Error

          ? error.message

          : "Unknown snapshot creation error.",

      );

    }

  }



  /**
   * ----------------------------------------------------------
   * Freeze Eligibility Check
   * ----------------------------------------------------------
   */

  canCreateSnapshot(

    request:

      FreezeSnapshotRequest,

  ):

    boolean {


    return (

      Boolean(

        request.context.approvedBy

      )

      &&

      Boolean(

        request.context.approvedAt

      )

    );

  }


}
