/**
 * ==========================================================
 * WINNING ERRORS
 * ==========================================================
 *
 * Enterprise Winning Detection Errors
 *
 * Responsibilities
 * - Winning subsystem errors
 * - Validation errors
 * - Configuration errors
 * - Engine errors
 *
 * Rules
 * - Error classes only
 * - No business logic
 * ==========================================================
 */

/* ==========================================================
 * BASE ERROR
 * ==========================================================
 */

export class WinningError extends Error {

  constructor(
    message: string
  ) {

    super(message);

    this.name = "WinningError";

  }

}

/* ==========================================================
 * VALIDATION ERROR
 * ==========================================================
 */

export class WinningValidationError
  extends WinningError {

  constructor(
    message: string
  ) {

    super(message);

    this.name =
      "WinningValidationError";

  }

}

/* ==========================================================
 * CONFIGURATION ERROR
 * ==========================================================
 */

export class WinningConfigurationError
  extends WinningError {

  constructor(
    message: string
  ) {

    super(message);

    this.name =
      "WinningConfigurationError";

  }

}

/* ==========================================================
 * DETECTION ERROR
 * ==========================================================
 */

export class WinningDetectionError
  extends WinningError {

  constructor(
    message: string
  ) {

    super(message);

    this.name =
      "WinningDetectionError";

  }

}

/* ==========================================================
 * SCORING ERROR
 * ==========================================================
 */

export class WinningScoreError
  extends WinningError {

  constructor(
    message: string
  ) {

    super(message);

    this.name =
      "WinningScoreError";

  }

}

/* ==========================================================
 * ENGINE ERROR
 * ==========================================================
 */

export class WinningEngineError
  extends WinningError {

  constructor(
    message: string
  ) {

    super(message);

    this.name =
      "WinningEngineError";

  }

}

/* ==========================================================
 * REPOSITORY ERROR
 * ==========================================================
 */

export class WinningRepositoryError
  extends WinningError {

  constructor(
    message: string
  ) {

    super(message);

    this.name =
      "WinningRepositoryError";

  }

}

/* ==========================================================
 * SNAPSHOT ERROR
 * ==========================================================
 */

export class WinningSnapshotError
  extends WinningError {

  constructor(
    message: string
  ) {

    super(message);

    this.name =
      "WinningSnapshotError";

  }

}

/* ==========================================================
 * METRICS ERROR
 * ==========================================================
 */

export class WinningMetricsError
  extends WinningError {

  constructor(
    message: string
  ) {

    super(message);

    this.name =
      "WinningMetricsError";

  }

}
