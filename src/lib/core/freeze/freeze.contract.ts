/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE CONTRACT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Define freeze engine boundaries.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Implement freeze logic
 * ✗ Access database
 * ✗ Call Supabase directly
 * ✗ Create snapshots
 *
 * Flow
 * ------------------------------------------------------------
 *
 * Approval Gate
 *        ↓
 * Freeze Contract
 *        ↓
 * Freeze Engine
 *
 * ============================================================
 */


import type {
  FreezeInput,
} from "./freeze.input";


import type {
  FreezeResult,
} from "./freeze.types";



/**
 * Freeze Engine Contract
 */
export interface FreezeEngineContract {


  /**
   * Execute freeze operation
   */
  freeze(

    input:
      FreezeInput,

  ):
    Promise<FreezeResult>;



}



/**
 * Freeze Policy Contract
 */
export interface FreezePolicyContract {


  /**
   * Check freeze eligibility
   */
  canFreeze(

    input:
      FreezeInput,

  ):
    Promise<boolean>;



}
