/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Public Module Export
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Single entry point for Canonical module.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Expose public contracts
 * ✓ Hide internal file structure
 * ✓ Stable import boundary
 *
 * MUST NOT contain:
 * ✗ Business logic
 * ✗ Runtime processing
 * ✗ Database access
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Clean architecture
 * ✓ Future refactor safe
 * ✓ Enterprise package style
 * ============================================================
 */

/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Public API
 * ============================================================
 */

/* ============================================================
 * FOUNDATION
 * ============================================================
 */

export * from "./canonical.types";
export * from "./canonical.constants";
export * from "./canonical.config";
export * from "./canonical.errors";

/* ============================================================
 * CORE
 * ============================================================
 */

export * from "./canonical.normalizer";
export * from "./canonical.validator";
export * from "./canonical.key";
export * from "./canonical.mapper";


/* ============================================================
 * ORCHESTRATION
 * ============================================================
 */

export * from "./canonical.audit";
export * from "./canonical.service";
export * from "./canonical.engine";
/* ============================================================
 * TYPES
 * ============================================================
 */

export type {

  CanonicalProduct,

  CanonicalVariant,

  CanonicalSource,

  CanonicalMetadata,

  CanonicalNormalizedProduct,

  CanonicalBuildInput,

  CanonicalEngineResult,

  IdentityMatchResult,

  DuplicateResult,

  MergeResult,

} from "./canonical.types";
export type {
  CanonicalKey,
} from "./canonical.key";
export {

  IdentityMatchLevel,

  DuplicateReason,

  MergeStrategy,

} from "./canonical.types";



/* ============================================================
 * CONSTANTS
 * ============================================================
 */

export {

  CANONICAL_VERSION,

  IDENTITY_SCORE,

  MATCH_THRESHOLD,

  CANONICAL_LIMITS,

} from "./canonical.constants";



/* ============================================================
 * ERRORS
 * ============================================================
 */

export {

  CanonicalError,

  CanonicalErrorCode,

  CanonicalErrorFactory,

} from "./canonical.errors";



/* ============================================================
 * VALIDATION
 * ============================================================
 */

export {

  CanonicalValidator,

} from "./canonical.validator";



/* ============================================================
 * NORMALIZATION
 * ============================================================
 */

export {

  CanonicalNormalizer,

} from "./canonical.normalizer";



/* ============================================================
 * MAPPING
 * ============================================================
 */

export {

  CanonicalMapper,

} from "./canonical.mapper";



/* ============================================================
 * BUILDING
 * ============================================================
 */

export {

  CanonicalBuilder,

} from "./canonical.builder";



/* ============================================================
 * IDENTITY
 * ============================================================
 */

export {

  CanonicalKeyGenerator,

} from "./canonical.key";


export {

  IdentityEngine,

} from "./identity.engine";



/* ============================================================
 * DUPLICATE
 * ============================================================
 */

export {

  DuplicateDetector,

} from "./duplicate.detector";



/* ============================================================
 * MERGE
 * ============================================================
 */

export {

  MergeEngine,

} from "./merge.engine";



/* ============================================================
 * SERVICE
 * ============================================================
 */

export {

  CanonicalService,

} from "./canonical.service";



/* ============================================================
 * ENGINE
 * ============================================================
 */

export {

  CanonicalEngine,

} from "./canonical.engine";
export * from "./identity.engine";
export * from "./duplicate.detector";
export * from "./merge.engine";
export * from "./canonical.builder";
