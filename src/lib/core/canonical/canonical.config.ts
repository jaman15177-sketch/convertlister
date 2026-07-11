/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Configuration
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Central configuration contract for Canonical Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Identity thresholds
 * ✓ Feature flags
 * ✓ Processing rules
 * ✓ Future AI matching controls
 *
 * MUST NOT contain:
 * ✗ Database logic
 * ✗ Repository access
 * ✗ Runtime mutation
 * ✗ Business workflow
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Immutable
 * ✓ Environment independent
 * ✓ Enterprise scalable
 * ✓ AI-ready
 * ============================================================
 */


/* ============================================================
 * CANONICAL CONFIG TYPE
 * ============================================================
 */

export interface CanonicalConfig {

  /**
   * Identity matching
   */
  readonly identity: {

    readonly enableFuzzyMatch: boolean;

    readonly enableContentMatch: boolean;

    readonly enableBarcodePriority: boolean;

    readonly enableSkuPriority: boolean;

  };


  /**
   * Duplicate detection
   */
  readonly duplicate: {

    readonly minimumConfidence: number;

    readonly strictMode: boolean;

  };


  /**
   * Merge behaviour
   */
  readonly merge: {

    readonly allowAutoMerge: boolean;

    readonly preserveSourceHistory: boolean;

  };


  /**
   * AI preparation
   */
  readonly ai: {

    readonly enabled: boolean;

    readonly requireHumanApproval: boolean;

  };

}



/* ============================================================
 * DEFAULT CONFIGURATION
 * ============================================================
 */

export const DEFAULT_CANONICAL_CONFIG:
  CanonicalConfig =
{

  identity: {

    enableFuzzyMatch: true,

    enableContentMatch: true,

    enableBarcodePriority: true,

    enableSkuPriority: true,

  },


  duplicate: {

    minimumConfidence: 80,

    strictMode: false,

  },


  merge: {

    allowAutoMerge: true,

    preserveSourceHistory: true,

  },


  ai: {

    enabled: false,

    requireHumanApproval: true,

  },

};



/* ============================================================
 * CONFIG FACTORY
 * ============================================================
 */

export function createCanonicalConfig(
  override?: Partial<CanonicalConfig>
): CanonicalConfig {


  return {

    ...DEFAULT_CANONICAL_CONFIG,

    ...override,

  };

}
