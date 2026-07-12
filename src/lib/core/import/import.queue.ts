/**
 * ==========================================================
 * IMPORT QUEUE CONTRACT
 * ==========================================================
 *
 * Queue abstraction layer for Import subsystem.
 *
 * Responsibilities
 * - Queue job contract
 * - Queue lifecycle states
 * - Queue adapter interface
 *
 * MUST NOT contain
 * - Redis logic
 * - BullMQ implementation
 * - Worker execution
 * - Infrastructure code
 *
 * ==========================================================
 */

import type { ImportJobRecord } from "./import.job";


/* ==========================================================
 * QUEUE STATUS
 * ==========================================================
 */

export enum ImportQueueStatus {

  WAITING = "WAITING",

  PROCESSING = "PROCESSING",

  COMPLETED = "COMPLETED",

  FAILED = "FAILED",

  CANCELLED = "CANCELLED",

}



/* ==========================================================
 * QUEUE ITEM
 * ==========================================================
 */

export interface ImportQueueItem {


  readonly id: string;


  readonly job:
    ImportJobRecord;


  readonly status:
    ImportQueueStatus;


  readonly createdAt:
    Date;


  readonly startedAt?:
    Date;


  readonly completedAt?:
    Date;


  readonly attempts:
    number;

}



/* ==========================================================
 * QUEUE OPTIONS
 * ==========================================================
 */

export interface ImportQueueOptions {


  readonly priority?:
    number;


  readonly delayMs?:
    number;


  readonly retry?:
    boolean;

}



/* ==========================================================
 * QUEUE CONTRACT
 * ==========================================================
 */

export interface ImportQueue {


  add(
    job: ImportJobRecord,
    options?: ImportQueueOptions
  ): Promise<ImportQueueItem>;



  get(
    jobId: string
  ): Promise<ImportQueueItem | null>;



  remove(
    jobId: string
  ): Promise<void>;



  update(
    item: ImportQueueItem
  ): Promise<ImportQueueItem>;

}



/* ==========================================================
 * IN MEMORY QUEUE
 * ==========================================================
 *
 * Development safe implementation.
 *
 * Production:
 * Replace with Redis/BullMQ adapter.
 *
 * ==========================================================
 */

export class ImportQueueManager
implements ImportQueue {


  private readonly queue =
    new Map<string, ImportQueueItem>();



  async add(
    job: ImportJobRecord,
    options?: ImportQueueOptions
  ): Promise<ImportQueueItem> {


    const item: ImportQueueItem = {

      id: job.id,

      job,

      status:
        ImportQueueStatus.WAITING,

      createdAt:
        new Date(),

      attempts:
        0,

    };


    this.queue.set(
      job.id,
      item
    );


    return item;

  }



  async get(
    jobId: string
  ): Promise<ImportQueueItem | null> {


    return (
      this.queue.get(jobId)
      ?? null
    );

  }



  async remove(
    jobId: string
  ): Promise<void> {


    this.queue.delete(
      jobId
    );

  }



  async update(
    item: ImportQueueItem
  ): Promise<ImportQueueItem> {


    this.queue.set(
      item.id,
      item
    );


    return item;

  }

}



/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const importQueue =
  new ImportQueueManager();
