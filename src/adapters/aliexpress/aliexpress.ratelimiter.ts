/**
 * ============================================================
 * CONVERTLISTER
 * ALIEXPRESS RATE LIMITER
 * Enterprise Production Ready
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Control request rate
 * • Prevent API flooding
 * • Queue concurrent requests
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Execute HTTP requests
 * ✗ Retry failed requests
 * ✗ Parse API responses
 * ✗ Contain business logic
 * ============================================================
 */

export interface RateLimiterOptions {

  readonly requestsPerSecond: number;

  readonly burst: number;

}

const DEFAULT_OPTIONS: RateLimiterOptions = {

  requestsPerSecond: 5,

  burst: 5,

};

export class AliExpressRateLimiter {

  private readonly options: RateLimiterOptions;

  private tokens: number;

  private lastRefill: number;

  constructor(
    options: RateLimiterOptions = DEFAULT_OPTIONS
  ) {

    this.options = options;

    this.tokens = options.burst;

    this.lastRefill = Date.now();

  }

  /**
   * Wait until a request slot becomes available.
   */
  public async acquire(): Promise<void> {

    while (true) {

      this.refill();

      if (this.tokens >= 1) {

        this.tokens--;

        return;

      }

      await this.sleep(100);

    }

  }

  /**
   * Current available tokens.
   */
  public available(): number {

    this.refill();

    return Math.floor(this.tokens);

  }

  /**
   * Reset limiter.
   */
  public reset(): void {

    this.tokens = this.options.burst;

    this.lastRefill = Date.now();

  }

  /**
   * Refill token bucket.
   */
  private refill(): void {

    const now = Date.now();

    const elapsed = now - this.lastRefill;

    const refillAmount =
      (elapsed / 1000) *
      this.options.requestsPerSecond;

    if (refillAmount <= 0) {
      return;
    }

    this.tokens = Math.min(

      this.options.burst,

      this.tokens + refillAmount

    );

    this.lastRefill = now;

  }

  private async sleep(
    ms: number
  ): Promise<void> {

    await new Promise(

      resolve => setTimeout(resolve, ms)

    );

  }

}

export const aliExpressRateLimiter =
  new AliExpressRateLimiter();
