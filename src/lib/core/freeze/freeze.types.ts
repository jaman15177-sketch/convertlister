/**
 * ============================================================
 * CONVERTLISTER
 * FREEZE ENGINE TYPES
 * ============================================================
 *
 * Responsibility
 * ------------------------------------------------------------
 * Define immutable freeze domain types.
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute freeze logic
 * ✗ Access database
 * ✗ Call snapshot repository
 * ✗ Publish marketplace data
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


/**
 * Freeze lifecycle status
 */
export type FreezeStatus =

  | "PENDING"

  | "FREEZING"

  | "FROZEN"

  | "FAILED"

  | "UNFROZEN";



/**
 * Freeze reason
 */
export type FreezeReason =

  | "APPROVED_PRODUCT"

  | "MANUAL_APPROVAL"

  | "SYSTEM_POLICY"

  | "RECOVERY";



/**
 * Frozen product identity
 */
export interface FrozenProductIdentity {

  readonly productId:
    string;

  readonly organizationId:
    string;

  readonly version:
    number;

}



/**
 * Freeze metadata
 */
export interface FreezeMetadata {

  readonly reason:
    FreezeReason;

  readonly createdAt:
    Date;

  readonly createdBy:
    string;

}



/**
 * Frozen product state
 */
export interface FrozenProduct {

  readonly id:
    string;

  readonly identity:
    FrozenProductIdentity;

  readonly status:
    FreezeStatus;

  readonly metadata:
    FreezeMetadata;

  readonly payload:
    unknown;

}



/**
 * Freeze result
 */
export interface FreezeResult {

  /**
   * Freeze identity
   */
  readonly id:

    string;


  /**
   * Product identity
   */
  readonly productId:

    string;


  /**
   * Organization identity
   */
  readonly organizationId:

    string;


  /**
   * Approval reference
   */
  readonly approvalId:

    string;


  /**
   * Freeze lifecycle status
   */
  readonly status:

    FreezeStatus;


  /**
   * Snapshot reference
   *
   * Filled after successful
   * Freeze → Snapshot orchestration.
   */
  readonly snapshotId?:

    string;


  /**
   * Snapshot status
   */
  readonly snapshotStatus?:

    "PENDING"

    | "CREATED"

    | "FAILED";


  /**
   * Freeze timestamp
   */
  readonly frozenAt:

    Date;

}
