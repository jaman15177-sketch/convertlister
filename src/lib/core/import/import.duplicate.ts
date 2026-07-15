/**
 * ==========================================================
 * IMPORT DUPLICATE POLICY
 * ==========================================================
 *
 * Enterprise Import Subsystem
 *
 * Responsibilities
 * ----------------------------
 * • Decide duplicate action
 * • Skip / Update / Merge policy
 * • Pure decision engine
 * • No database
 * • No queue
 * • No persistence
 * • No Universal Store access
 *
 * Build-safe
 * Stateless
 * Production-ready
 * ==========================================================
 */

import type {
  CanonicalEngineOutput,
} from "@/lib/core/canonical/canonical.engine";
import {
  DuplicateReason,
} from "@/lib/core/canonical/canonical.types";
/* ==========================================================
 * IMPORT ACTION
 * ==========================================================
 */


export enum ImportAction {
  CREATE = "create",
  SKIP = "skip",
  UPDATE = "update",
  MERGE = "merge",
}

/* ==========================================================
 * IMPORT DUPLICATE DECISION
 * ==========================================================
 */

export interface ImportDuplicateDecision {

  readonly duplicate: boolean;

  readonly action: ImportAction;

  readonly reason?: string;

}

/* ==========================================================
 * IMPORT DUPLICATE POLICY
 * ==========================================================
 */

export class ImportDuplicatePolicy {

  /**
   * Decide import action.
   */
  static decide(
    canonical: CanonicalEngineOutput,
  ): ImportDuplicateDecision {

    const duplicate =
      canonical.duplicate;

    if (!duplicate.duplicate) {

      return {

        duplicate: false,

        action: ImportAction.CREATE,

      };

    }

    

     switch (duplicate.reason) {

  case DuplicateReason.MARKETPLACE_ID:
  case DuplicateReason.SKU:
  case DuplicateReason.BARCODE:

    return {
      duplicate: true,
      action: ImportAction.UPDATE,
      reason: duplicate.reason,
    };

  case DuplicateReason.CONTENT:

    return {
      duplicate: true,
      action: ImportAction.MERGE,
      reason: duplicate.reason,
    };

  case DuplicateReason.UNKNOWN:
  default:

    return {
      duplicate: true,
      action: ImportAction.SKIP,
      reason: duplicate.reason,
    };

}

  }

  /**
   * Convenience helper.
   */
  static shouldCreate(
    decision: ImportDuplicateDecision,
  ): boolean {

    return decision.action === ImportAction.CREATE;

  }

  static shouldUpdate(
    decision: ImportDuplicateDecision,
  ): boolean {

    return decision.action === ImportAction.UPDATE;

  }

  static shouldMerge(
    decision: ImportDuplicateDecision,
  ): boolean {

    return decision.action === ImportAction.MERGE;

  }

  static shouldSkip(
    decision: ImportDuplicateDecision,
  ): boolean {

    return decision.action === ImportAction.SKIP;

  }

}
