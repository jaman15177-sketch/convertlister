/**
 * ==========================================================
 * CENTRAL EVENT CONTRACT (SINGLE SOURCE OF TRUTH)
 * ==========================================================
 * - Used by worker
 * - Used by websocket
 * - Used by redis bus
 * ==========================================================
 */

export type WorkerEventType =
  | "IMPORT"
  | "SCORE"
  | "DELETE"
  | "UPDATE"
  | "SYSTEM";

export type WorkerEvent<T = unknown> = {
  id: string;
  organizationId: string;
  type: WorkerEventType;
  data: T;
  timestamp: number;
};

export type ClusterEvent<T = unknown> = {
  id: string;
  organizationId: string;
  type: string;
  payload: T;
  timestamp: number;
};

/**
 * Safe generic handler type (used everywhere)
 */
export type EventHandler<T = any> = (event: WorkerEvent<T>) => Promise<void> | void;
