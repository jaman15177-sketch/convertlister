/**
 * ==========================================================
 * IMPORT RETRY POLICY
 * ==========================================================
 *
 * Production-safe retry abstraction
 * for Import subsystem.
 *
 * Responsibilities
 * - Retry configuration
 * - Retry decision
 * - Backoff calculation
 * - Attempt tracking
 *
 * MUST NOT contain
 * - Queue implementation
 * - Worker logic
 * - External services
 *
 * ==========================================================
 */


/* ==========================================================
 * RETRY CONFIG
 * ==========================================================
 */

export interface ImportRetryConfig {

  /**
   * Maximum retry attempts
   */
  readonly maxAttempts: number;


  /**
   * Initial delay milliseconds
   */
  readonly initialDelayMs: number;


  /**
   * Maximum delay limit
   */
  readonly maxDelayMs: number;


  /**
   * Exponential multiplier
   */
  readonly backoffMultiplier: number;

}


/* ==========================================================
 * RETRY CONTEXT
 * ==========================================================
 */

export interface ImportRetryContext {

  readonly jobId: string;

  readonly attempt: number;

  readonly error?: Error;

}


/* ==========================================================
 * RETRY RESULT
 * ==========================================================
 */

export interface ImportRetryDecision {

  readonly retry: boolean;

  readonly delayMs: number;

  readonly nextAttempt: number;

}


/* ==========================================================
 * DEFAULT POLICY
 * ==========================================================
 */

export const DEFAULT_IMPORT_RETRY_CONFIG:
ImportRetryConfig = {

  maxAttempts: 3,

  initialDelayMs: 1000,

  maxDelayMs: 30000,

  backoffMultiplier: 2,

};


/* ==========================================================
 * RETRY ENGINE
 * ==========================================================
 */

export class ImportRetryPolicy {


  constructor(
    private readonly config:
      ImportRetryConfig = DEFAULT_IMPORT_RETRY_CONFIG
  ) {}


  shouldRetry(
    context: ImportRetryContext
  ): ImportRetryDecision {


    const nextAttempt =
      context.attempt + 1;


    if (
      nextAttempt >
      this.config.maxAttempts
    ) {

      return {

        retry: false,

        delayMs: 0,

        nextAttempt,

      };

    }


    return {

      retry: true,

      delayMs:
        this.calculateDelay(
          context.attempt
        ),

      nextAttempt,

    };

  }



  private calculateDelay(
    attempt: number
  ): number {


    const delay =
      this.config.initialDelayMs *
      Math.pow(
        this.config.backoffMultiplier,
        attempt
      );


    return Math.min(
      delay,
      this.config.maxDelayMs
    );

  }

}


/* ==========================================================
 * SINGLETON
 * ==========================================================
 */

export const importRetry =
  new ImportRetryPolicy();
