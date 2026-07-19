/**
 * ==========================================================
 * WINNING REPOSITORY
 * ==========================================================
 *
 * Enterprise Winning Repository
 *
 * Responsibilities
 * - Repository abstraction
 * - Winner persistence contract
 * - Infrastructure boundary
 *
 * Rules
 * - Interface only
 * - No implementation
 * - No database logic
 * - No business logic
 * ==========================================================
 */

import type {
  WinningCandidate,
} from "./winning.types";

/* ==========================================================
 * REPOSITORY CONTRACT
 * ==========================================================
 */

export interface WinningRepository {

  /**
   * Save winner
   */
  save(
    candidate: WinningCandidate
  ): Promise<void>;

  /**
   * Save many winners
   */
  saveMany(
    candidates:
      readonly WinningCandidate[]
  ): Promise<void>;

  /**
   * Find winner
   */
  findById(
    id: string
  ): Promise<
    WinningCandidate | null
  >;

  /**
   * List winners
   */
  findAll(): Promise<
    readonly WinningCandidate[]
  >;

  /**
   * Delete winner
   */
  delete(
    id: string
  ): Promise<void>;

}
