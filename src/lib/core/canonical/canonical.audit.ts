/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Audit
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Tracks canonical decision history.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Identity decision trace
 * ✓ Duplicate decision record
 * ✓ Merge history record
 * ✓ AI explainability foundation
 *
 * MUST NOT contain:
 * ✗ Database persistence
 * ✗ Repository logic
 * ✗ External logging
 * ✗ Queue processing
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Immutable records
 * ✓ Enterprise audit ready
 * ✓ Compliance friendly
 * ✓ AI explainable
 * ============================================================
 */
import {
  CANONICAL_VERSION,
} from "./canonical.constants";

/* ============================================================
 * AUDIT ACTION
 * ============================================================
 */

export enum CanonicalAuditAction {

  CREATED =
    "created",

  MATCHED =
    "matched",

  DUPLICATE_FOUND =
    "duplicate_found",

  MERGED =
    "merged",

  UPDATED =
    "updated",

}



/* ============================================================
 * AUDIT RECORD
 * ============================================================
 */

export interface CanonicalAuditRecord {


  readonly id: string;


  readonly action:
    CanonicalAuditAction;


  readonly productId: string;


  readonly timestamp: Date;

readonly stage?: string;
  readonly actor?:
    string;
readonly durationMs?: number;
readonly version: string;
readonly duplicateReason?: string;
  readonly reason?:
    string;
readonly fingerprint?: string;
readonly confidence?: number;
  readonly metadata?:
    Readonly<
      Record<string, unknown>
    >;

}



/* ============================================================
 * AUDIT BUILDER
 * ============================================================
 */

export class CanonicalAuditBuilder {


  /**
   * Create audit record
   */
  public create(
    params: {

      action:
        CanonicalAuditAction;


      productId:
        string;


      reason?:
        string;


      actor?:
        string;


      metadata?:
        Readonly<
          Record<string, unknown>
        >;

    }

  ): CanonicalAuditRecord {


    return {

  id:
    this.generateId(),

  version:
    CANONICAL_VERSION,

  action:
    params.action,

  productId:
    params.productId,

  timestamp:
    new Date(),

  stage:
    params.metadata?.stage as string | undefined,

  actor:
    params.actor,

  durationMs:
    params.metadata?.durationMs as number | undefined,

  duplicateReason:
    params.reason,

  reason:
    params.reason,

  metadata:
    params.metadata,

 };

}


  /**
   * Generate audit id
   */
  private generateId(): string {


    return (

      "audit_" +

      Date.now().toString(36)

    );

  }

}
