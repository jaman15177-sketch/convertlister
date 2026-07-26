/**
 * ============================================================
 * CONVERTLISTER
 * SNAPSHOT REPOSITORY INPUT
 * ============================================================
 *
 * Layer
 * ------------------------------------------------------------
 * Snapshot Repository
 *
 * Responsibility
 * ------------------------------------------------------------
 * Defines immutable input received from Snapshot Engine.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute repository logic
 * ✗ Access database
 * ✗ Access storage
 * ✗ Execute Snapshot Engine
 *
 * ============================================================
 */

import type {
  ProductSnapshot,
} from "../snapshot/snapshot.types";


/**
 * ============================================================
 * Snapshot Repository Input
 * ============================================================
 */
export interface SnapshotRepositoryInput {


  /**
   * Immutable Product Snapshot
   */
  readonly snapshot:

    ProductSnapshot;



  /**
   * Organization identifier
   */
  readonly organizationId:

    string;



  /**
   * Execution actor
   */
  readonly actorId:

    string;



  /**
   * Correlation identifier
   */
  readonly correlationId:

    string;



  /**
   * Request identifier
   */
  readonly requestId:

    string;



  /**
   * Repository request timestamp
   */
  readonly requestedAt:

    Date;

}
