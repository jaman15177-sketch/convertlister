/**
 * ==========================================================
 * ALIEXPRESS CLIENT RETRY
 * ==========================================================
 *
 * Retry wrapper for AliExpress requests.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Retry failed marketplace requests
 * • Handle temporary failures
 * • Provide controlled retry strategy
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Change product data
 * ✗ Normalize data
 * ✗ Save data
 * ✗ Make business decisions
 * ==========================================================
 */


import {
  ALIEXPRESS_RETRY,
} from "./aliexpress.constants";



export interface RetryOptions {

  attempts?: number;

  delay?: number;

}



export class AliExpressRetry {



  /**
   * Execute function with retry
   */
  public async execute<T>(
    operation: () => Promise<T>,
    options?: RetryOptions
  ): Promise<T> {


    const attempts =
      options?.attempts ??
      ALIEXPRESS_RETRY.MAX_ATTEMPTS;


    const delay =
      options?.delay ??
      ALIEXPRESS_RETRY.INITIAL_DELAY;



    let lastError: unknown;



    for (
      let attempt = 1;
      attempt <= attempts;
      attempt++
    ) {


      try {

        return await operation();

      } catch (error) {

        lastError =
          error;


        if (
          attempt < attempts
        ) {

          await this.wait(
            delay * attempt
          );

        }

      }

    }



    throw lastError;

  }



  /**
   * Delay helper
   */
  private async wait(
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



export const aliExpressRetry =
  new AliExpressRetry();
