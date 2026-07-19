/**
 * ==========================================================
 * WINNING EVENTS
 * ==========================================================
 *
 * Enterprise Winning Events
 *
 * Responsibilities
 * - Winning subsystem event definitions
 * - Shared event contracts
 * - Event payload types
 *
 * Rules
 * - No business logic
 * - No repository
 * - No persistence
 * - Type definitions only
 * ==========================================================
 */

import type {
  WinningCandidate,
} from "./winning.types";

/* ==========================================================
 * EVENT TYPES
 * ==========================================================
 */

export type WinningEventType =
  | "winning.started"
  | "winning.completed"
  | "winning.failed"
  | "winning.detected"
  | "winning.rejected";

/* ==========================================================
 * BASE EVENT
 * ==========================================================
 */

export interface WinningEvent {

  readonly id: string;

  readonly type: WinningEventType;

  readonly occurredAt: Date;

}

/* ==========================================================
 * STARTED
 * ==========================================================
 */

export interface WinningStartedEvent
  extends WinningEvent {

  readonly organizationId: string;

  readonly totalProducts: number;

}

/* ==========================================================
 * COMPLETED
 * ==========================================================
 */

export interface WinningCompletedEvent
  extends WinningEvent {

  readonly organizationId: string;

  readonly totalProducts: number;

  readonly winners: number;

}

/* ==========================================================
 * DETECTED
 * ==========================================================
 */

export interface WinningDetectedEvent
  extends WinningEvent {

  readonly candidate:
    WinningCandidate;

}

/* ==========================================================
 * REJECTED
 * ==========================================================
 */

export interface WinningRejectedEvent
  extends WinningEvent {

  readonly candidate:
    WinningCandidate;

  readonly reasons:
    readonly string[];

}

/* ==========================================================
 * FAILED
 * ==========================================================
 */

export interface WinningFailedEvent
  extends WinningEvent {

  readonly message: string;

}
