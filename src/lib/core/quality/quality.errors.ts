/**
 * ============================================================
 * CONVERTLISTER
 * QUALITY ENGINE
 * ENTERPRISE ERRORS
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Centralized error hierarchy for the Quality Engine.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Define quality engine errors
 * • Standardize error names
 * • Preserve stack traces
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute validation
 * ✗ Execute scoring
 * ✗ Execute approval logic
 * ✗ Execute AI
 * ============================================================
 */

/* ============================================================
 * BASE ERROR
 * ============================================================
 */

export class QualityError
  extends Error {

  constructor(
    message: string,
  ) {

    super(message);

    this.name =
      "QualityError";

  }

}

/* ============================================================
 * INPUT ERROR
 * ============================================================
 */

export class QualityInputError
  extends QualityError {

  constructor(
    message =
      "Invalid quality input.",
  ) {

    super(message);

    this.name =
      "QualityInputError";

  }

}

/* ============================================================
 * VALIDATION ERROR
 * ============================================================
 */

export class QualityValidationError
  extends QualityError {

  constructor(
    message =
      "Quality validation failed.",
  ) {

    super(message);

    this.name =
      "QualityValidationError";

  }

}

/* ============================================================
 * SCORING ERROR
 * ============================================================
 */

export class QualityScoringError
  extends QualityError {

  constructor(
    message =
      "Quality scoring failed.",
  ) {

    super(message);

    this.name =
      "QualityScoringError";

  }

}

/* ============================================================
 * ANALYZER ERROR
 * ============================================================
 */

export class QualityAnalyzerError
  extends QualityError {

  constructor(
    message =
      "Quality analyzer failed.",
  ) {

    super(message);

    this.name =
      "QualityAnalyzerError";

  }

}

/* ============================================================
 * ENGINE ERROR
 * ============================================================
 */

export class QualityEngineError
  extends QualityError {

  constructor(
    message =
      "Quality engine execution failed.",
  ) {

    super(message);

    this.name =
      "QualityEngineError";

  }

}
