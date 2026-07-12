/**
 * ==========================================================
 * IMPORT JOB
 * ==========================================================
 * Production-safe Import Job model.
 *
 * Responsibilities
 * - Job metadata
 * - Job lifecycle
 * - Progress tracking
 * - Immutable state transitions
 *
 * No queue
 * No persistence
 * No infrastructure
 * ==========================================================
 */

import type { ImportRequest } from "./import.types";

/* ==========================================================
 * JOB STATUS
 * ========================================================== */

export enum ImportJobStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

/* ==========================================================
 * JOB PROGRESS
 * ========================================================== */

export interface ImportJobProgress {
  readonly total: number;
  readonly processed: number;
  readonly imported: number;
  readonly skipped: number;
  readonly failed: number;
  readonly duplicated: number;
}

/* ==========================================================
 * IMPORT JOB
 * ========================================================== */

export interface ImportJobRecord {
  readonly id: string;

  readonly status: ImportJobStatus;

  readonly request: ImportRequest;

  readonly progress: ImportJobProgress;

  readonly createdAt: Date;

  readonly startedAt?: Date;

  readonly completedAt?: Date;

  readonly message?: string;
}

/* ==========================================================
 * JOB FACTORY
 * ========================================================== */

export class ImportJobFactory {
  create(
    id: string,
    request: ImportRequest
  ): ImportJobRecord {
    return {
      id,
      status: ImportJobStatus.PENDING,
      request,
      createdAt: new Date(),
      progress: {
        total: request.products.length,
        processed: 0,
        imported: 0,
        skipped: 0,
        failed: 0,
        duplicated: 0,
      },
    };
  }

  start(
    job: ImportJobRecord
  ): ImportJobRecord {
    return {
      ...job,
      status: ImportJobStatus.RUNNING,
      startedAt: new Date(),
    };
  }

  updateProgress(
    job: ImportJobRecord,
    progress: Partial<ImportJobProgress>
  ): ImportJobRecord {
    return {
      ...job,
      progress: {
        ...job.progress,
        ...progress,
      },
    };
  }

  complete(
    job: ImportJobRecord,
    message?: string
  ): ImportJobRecord {
    return {
      ...job,
      status: ImportJobStatus.COMPLETED,
      completedAt: new Date(),
      message,
    };
  }

  fail(
    job: ImportJobRecord,
    message: string
  ): ImportJobRecord {
    return {
      ...job,
      status: ImportJobStatus.FAILED,
      completedAt: new Date(),
      message,
    };
  }

  cancel(
    job: ImportJobRecord,
    message?: string
  ): ImportJobRecord {
    return {
      ...job,
      status: ImportJobStatus.CANCELLED,
      completedAt: new Date(),
      message,
    };
  }
}

/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const importJobFactory = new ImportJobFactory();
