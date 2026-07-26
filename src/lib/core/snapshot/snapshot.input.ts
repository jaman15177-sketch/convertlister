/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT ENGINE INPUT
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines immutable input received from Freeze Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute snapshot logic
 * ✗ Access repository
 * ✗ Access Supabase
 *
 * Flow
 * ------------------------------------------------------------
 *
 * Freeze Engine
 *        ↓
 * SnapshotInput
 *        ↓
 * Snapshot Engine
 *
 * ============================================================
 */

import type {
  FreezeOutput,
} from "../freeze/freeze.output";


/**
 * Snapshot Input
 */
export interface SnapshotInput {


  /**
   * Frozen product output
   */
  readonly freeze:

    FreezeOutput;



  /**
   * Immutable payload
   */
  readonly payload:

    unknown;



  /**
   * Organization identifier
   */
  readonly organizationId:

    string;



  /**
   * Snapshot creator
   */
  readonly createdBy:

    string;



  /**
   * Snapshot source
   */
  readonly source:

    string;



  /**
   * Request timestamp
   */
  readonly requestedAt:

    Date;

}
