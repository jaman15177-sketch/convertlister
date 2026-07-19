/**
 * ==========================================================
 * WINNING RULES
 * ==========================================================
 *
 * Enterprise Winning Rule Library
 *
 * Responsibilities
 * - Define winning rules
 * - Register rules
 * - Provide immutable rule collection
 *
 * Rules
 * - No scoring
 * - No ranking
 * - No metrics
 * - No persistence
 * - No business orchestration
 * ==========================================================
 */

import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";

/* ==========================================================
 * RULE RESULT
 * ==========================================================
 */

export interface WinningRuleResult {

  readonly passed: boolean;

  readonly score: number;

  readonly reason: string;

}

/* ==========================================================
 * RULE
 * ==========================================================
 */

export interface WinningRule {

  readonly id: string;

  readonly name: string;

  readonly description: string;

  readonly weight: number;

  readonly enabled: boolean;

  evaluate(
    product: NormalizedProduct
  ): WinningRuleResult;

}

/* ==========================================================
 * RULES
 * ==========================================================
 */

export const winningRules:
  readonly WinningRule[] = [

  // Rules will be added here.

] as const;
