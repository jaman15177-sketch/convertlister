/**
 * ============================================================
 * CONVERTLISTER
 * ALIEXPRESS RETRY POLICY
 * Enterprise Production Ready
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Retry transient failures
 * • Exponential backoff
 * • Retry only retryable errors
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute HTTP requests directly
 * ✗ Parse API responses
 * ✗ Perform business logic
 * ============================================================
 */

export interface RetryOptions {
  readonly maxAttempts: number;
  readonly initialDelay: number;
  readonly maxDelay: number;
  readonly multiplier: number;
}

export const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  initialDelay: 500,
  maxDelay: 5_000,
  multiplier: 2,
};

export class AliExpressRetryPolicy {

  public async execute<T>(
    operation: () => Promise<T>,
    options: RetryOptions = DEFAULT_RETRY_OPTIONS
  ): Promise<T> {

    let attempt = 1;
    let delay = options.initialDelay;
    let lastError: unknown;

    while (attempt <= options.maxAttempts) {

      try {

        return await operation();

      } catch (error) {

        lastError = error;

        if (
          attempt >= options.maxAttempts ||
          !this.isRetryable(error)
        ) {
          throw error;
        }

        await this.sleep(delay);

        delay = Math.min(
          delay * options.multiplier,
          options.maxDelay
        );

        attempt++;

      }

    }

    throw lastError;

  }

  /**
   * Retry only temporary failures.
   */
  private isRetryable(
    error: unknown
  ): boolean {

    if (!(error instanceof Error)) {
      return false;
    }

    const message =
      error.message.toLowerCase();

    return (
      message.includes("timeout") ||
      message.includes("network") ||
      message.includes("fetch") ||
      message.includes("429") ||
      message.includes("500") ||
      message.includes("502") ||
      message.includes("503") ||
      message.includes("504")
    );

  }

  private async sleep(
    ms: number
  ): Promise<void> {

    await new Promise(
      resolve =>
        setTimeout(resolve, ms)
    );

  }

}

export const aliExpressRetryPolicy =
  new AliExpressRetryPolicy();
