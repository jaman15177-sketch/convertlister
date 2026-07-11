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
