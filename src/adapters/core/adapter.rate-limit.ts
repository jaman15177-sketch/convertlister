/**
 * ==========================================================
 * ADAPTER RATE LIMIT
 * ==========================================================
 *
 * Request throttling layer for marketplace adapters.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Control adapter request frequency
 * • Prevent API overload
 * • Handle request intervals
 * • Provide quota protection
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Call marketplace API
 * ✗ Store products
 * ✗ Handle business rules
 * ==========================================================
 */


import {
  DEFAULT_RATE_LIMIT_WINDOW,
  DEFAULT_RATE_LIMIT_REQUESTS,
} from "./adapter.constants";


export interface RateLimitOptions {

  maxRequests?: number;

  windowMs?: number;

}


export class AdapterRateLimit {


  private requests:
    number[] = [];



  /**
   * Check request permission
   */
  public allow(
    options?: RateLimitOptions
  ): boolean {


    const maxRequests =
      options?.maxRequests ??
      DEFAULT_RATE_LIMIT_REQUESTS;


    const windowMs =
      options?.windowMs ??
      DEFAULT_RATE_LIMIT_WINDOW;


    const now =
      Date.now();



    /**
     * Remove expired requests
     */
    this.requests =
      this.requests.filter(
        timestamp =>
          now - timestamp < windowMs
      );



    if (
      this.requests.length >= maxRequests
    ) {

      return false;

    }



    this.requests.push(
      now
    );


    return true;

  }



  /**
   * Execute with rate protection
   */
  public async execute<T>(
    operation: () => Promise<T>,
    options?: RateLimitOptions
  ): Promise<T> {


    if (
      !this.allow(options)
    ) {

      throw new Error(
        "Adapter rate limit exceeded."
      );

    }


    return operation();

  }



  /**
   * Reset limiter
   */
  public reset(): void {

    this.requests = [];

  }


}


export const adapterRateLimit =
  new AdapterRateLimit();
