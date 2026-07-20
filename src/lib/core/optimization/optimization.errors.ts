/**
 * ==========================================================
 * AI OPTIMIZATION ERRORS
 * ==========================================================
 *
 * Enterprise AI Optimization Engine
 *
 * Responsibility:
 * - Optimization error definitions
 * - Typed error hierarchy
 *
 * Rules:
 * - Error classes only
 * - No business logic
 * - No AI execution
 * - No quality logic
 * - No approval logic
 * ==========================================================
 */


/* ==========================================================
 * BASE ERROR
 * ==========================================================
 */

export class OptimizationError
  extends Error {

  override readonly name: string =
  "OptimizationError";

  constructor(
    message: string
  ) {

    super(message);

  }

}


/* ==========================================================
 * INPUT ERROR
 * ==========================================================
 */

export class OptimizationInputError
  extends OptimizationError {

  override readonly name: string =
  "OptimizationInputError";
}


/* ==========================================================
 * AI ERROR
 * ==========================================================
 */

export class OptimizationAIError
  extends OptimizationError {

  override readonly name: string =
  "OptimizationAIError";

}


/* ==========================================================
 * TIMEOUT ERROR
 * ==========================================================
 */

export class OptimizationTimeoutError
  extends OptimizationError {

  override readonly name: string =
  "OptimizationTimeoutError";

}


/* ==========================================================
 * CONFIG ERROR
 * ==========================================================
 */

export class OptimizationConfigError
  extends OptimizationError {

  override readonly name: string =
  "OptimizationConfigError";

}


/* ==========================================================
 * PROVIDER ERROR
 * ==========================================================
 */

export class OptimizationProviderError
  extends OptimizationError {

  override readonly name: string =
  "OptimizationProviderError";

}


/* ==========================================================
 * PIPELINE ERROR
 * ==========================================================
 */

export class OptimizationPipelineError
  extends OptimizationError {

  override readonly name: string =
  "OptimizationPipelineError";

}


/* ==========================================================
 * MAPPING ERROR
 * ==========================================================
 */

export class OptimizationMappingError
  extends OptimizationError {

  override readonly name: string =
  "OptimizationMappingError";

}
