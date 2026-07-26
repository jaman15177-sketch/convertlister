/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE SNAPSHOT ORCHESTRATION CONTRACT
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Freeze → Snapshot Orchestration
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines orchestration contract between Freeze Engine
 * and Snapshot Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Implement snapshot creation
 * ✗ Access database
 * ✗ Access storage
 * ✗ Execute persistence logic
 *
 * ============================================================
 */

import type {

  FreezeSnapshotRequest,

  FreezeSnapshotResult,

} from "./freeze.snapshot.types";



/* ============================================================
 * Freeze Snapshot Orchestrator Contract
 * ============================================================
 */

export interface FreezeSnapshotOrchestratorContract {


  /**
   * ----------------------------------------------------------
   * Create Snapshot from Approved Freeze
   * ----------------------------------------------------------
   */

  createSnapshot(

    request:

      FreezeSnapshotRequest,

  ):

    Promise<FreezeSnapshotResult>;



  /**
   * ----------------------------------------------------------
   * Validate Freeze Snapshot Eligibility
   * ----------------------------------------------------------
   */

  canCreateSnapshot(

    request:

      FreezeSnapshotRequest,

  ):

    boolean;


}
