/**
 * ==========================================================
 * ADAPTER RETRY
 * ==========================================================
 *
 * Shared retry mechanism for marketplace adapters.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Retry failed adapter operations
 * • Exponential backoff handling
 * • Control retry attempts
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Marketplace logic
 * ✗ API implementation
 * ✗ Error transformation
 * ==========================================================
 */

import {
  DEFAULT_RETRY_COUNT,
} from "./adapter.constants";


export interface RetryOptions {

  retries?: number;

  delay?: number;

}


export class AdapterRetry {


  /**
   * Execute function with retry support
   */
  public async execute<T>(
    operation: () => Promise<T>,
    options?: RetryOptions
  ): Promise<T> {


    const retries =
      options?.retries ??
      DEFAULT_RETRY_COUNT;


    const baseDelay =
      options?.delay ??
      1000;


    let lastError: unknown;


    for (
      let attempt = 0;
      attempt <= retries;
      attempt++
    ) {


      try {

        return await operation();

      } catch (error) {

        lastError = error;


        if (
          attempt === retries
        ) {
          break;
        }


        await this.delay(
          baseDelay * (attempt + 1)
        );

      }

    }


    throw lastError instanceof Error
      ? lastError
      : new Error(
          "Adapter retry failed"
        );

  }



  /**
   * Delay helper
   */
  private async delay(
    milliseconds: number
  ): Promise<void> {

    await new Promise(
      resolve =>
        setTimeout(
          resolve,
          milliseconds
        )
    );

  }


}


export const adapterRetry =
  new AdapterRetry();
