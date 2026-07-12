/**
 * ==========================================================
 * IMPORT AUDIT
 * ==========================================================
 *
 * Production-grade audit model for Import subsystem.
 *
 * Responsibilities:
 * - Immutable import lifecycle record
 * - Tenant aware tracking
 * - Request tracing
 * - User tracking
 * - Duration calculation
 * - Import statistics snapshot
 * - Metadata capture
 *
 * Rules:
 * - No database
 * - No logger
 * - No infrastructure
 * - Pure domain layer
 *
 * ==========================================================
 */

import type { ImportSource } from "./import.types";

/**
 * ==========================================================
 * AUDIT STATUS
 * ==========================================================
 */

export enum ImportAuditStatus {
  PENDING = "pending",
  RUNNING = "running",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}


/**
 * ==========================================================
 * AUDIT RECORD
 * ==========================================================
 */

export interface ImportAuditRecord {

  /**
   * Unique audit id
   */
  readonly id: string;


  /**
   * Tenant ownership
   */
  readonly organizationId: string;


  /**
   * User who triggered import
   */
  readonly userId?: string;


  /**
   * API / request trace id
   */
  readonly requestId?: string;


  /**
   * Marketplace/source
   */
  readonly source: ImportSource;


  /**
   * Current lifecycle state
   */
  readonly status: ImportAuditStatus;


  /**
   * Lifecycle timestamps
   */
  readonly startedAt: Date;

  readonly completedAt?: Date;


  /**
   * Processing duration
   */
  readonly durationMs?: number;


  /**
   * Result counters
   */
  readonly imported: number;

  readonly failed: number;

  readonly skipped: number;

  readonly duplicated: number;


  /**
   * Human readable message
   */
  readonly message?: string;


  /**
   * Extra information
   */
  readonly metadata?: Readonly<
    Record<string, unknown>
  >;
}


/**
 * ==========================================================
 * AUDIT BUILDER
 * ==========================================================
 */

export class ImportAuditBuilder {


  /**
   * Create initial audit record
   */

  create(input: {
    id: string;
    organizationId: string;
    source: ImportSource;
    userId?: string;
    requestId?: string;
  }): ImportAuditRecord {

    return {

      id: input.id,

      organizationId:
        input.organizationId,

      userId:
        input.userId,

      requestId:
        input.requestId,

      source:
        input.source,

      status:
        ImportAuditStatus.PENDING,

      startedAt:
        new Date(),

      imported: 0,

      failed: 0,

      skipped: 0,

      duplicated: 0,
    };
  }



  /**
   * Mark running
   */

  start(
    record: ImportAuditRecord
  ): ImportAuditRecord {

    return {
      ...record,
      status:
        ImportAuditStatus.RUNNING,
      startedAt:
        new Date(),
    };
  }



  /**
   * Complete audit
   */

  complete(
    record: ImportAuditRecord,
    result: {
      imported: number;
      failed: number;
      skipped: number;
      duplicated: number;
      message?: string;
      metadata?: Readonly<
        Record<string, unknown>
      >;
    }
  ): ImportAuditRecord {

    const completedAt =
      new Date();


    return {

      ...record,

      status:
        ImportAuditStatus.COMPLETED,

      completedAt,

      durationMs:
        completedAt.getTime()
        -
        record.startedAt.getTime(),

      imported:
        result.imported,

      failed:
        result.failed,

      skipped:
        result.skipped,

      duplicated:
        result.duplicated,

      message:
        result.message,

      metadata:
        result.metadata,
    };
  }



  /**
   * Fail audit
   */

  fail(
    record: ImportAuditRecord,
    message: string,
    metadata?: Readonly<
      Record<string, unknown>
    >
  ): ImportAuditRecord {

    const completedAt =
      new Date();


    return {

      ...record,

      status:
        ImportAuditStatus.FAILED,

      completedAt,

      durationMs:
        completedAt.getTime()
        -
        record.startedAt.getTime(),

      message,

      metadata,
    };
  }




  /**
   * Cancel audit
   */

  cancel(
    record: ImportAuditRecord,
    message?: string
  ): ImportAuditRecord {

    const completedAt =
      new Date();


    return {

      ...record,

      status:
        ImportAuditStatus.CANCELLED,

      completedAt,

      durationMs:
        completedAt.getTime()
        -
        record.startedAt.getTime(),

      message,
    };
  }

}



/**
 * ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const importAudit =
  new ImportAuditBuilder();
