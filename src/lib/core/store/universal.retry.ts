/**
 * ==========================================================
 * UNIVERSAL RETRY
 * ==========================================================
 *
 * Retry policy management layer.
 *
 * Responsibilities:
 * - Retry failed operations
 * - Control retry attempts
 * - Delay strategy
 * - Failure propagation
 *
 * Rules:
 * - No queue dependency
 * - No external service
 * - Queue layer can consume this policy later
 * ==========================================================
 */


/* ==========================================================
 * RETRY CONFIG
 * ========================================================== */

export interface UniversalRetryConfig {

  readonly attempts: number;

  readonly delayMs: number;

}



/* ==========================================================
 * RETRY RESULT
 * ========================================================== */

export interface UniversalRetryResult<T> {

  readonly success: boolean;

  readonly attempts: number;

  readonly data?: T;

  readonly error?: Error;

}



/* ==========================================================
 * RETRY MANAGER
 * ========================================================== */

export class UniversalRetryManager {



  /**
   * Execute with retry
   */

  async execute<T>(
    operation: () => Promise<T>,
    config?: Partial<UniversalRetryConfig>
  ): Promise<
    UniversalRetryResult<T>
  > {


    const attempts =
      config?.attempts ?? 3;


    const delayMs =
      config?.delayMs ?? 500;



    let currentAttempt = 0;



    while (
      currentAttempt < attempts
    ) {


      currentAttempt++;



      try {


        const result =
          await operation();



        return {

          success: true,

          attempts:
            currentAttempt,

          data:
            result,

        };


      } catch (error) {



        if (
          currentAttempt >= attempts
        ) {


          return {

            success: false,

            attempts:
              currentAttempt,

            error:
              error instanceof Error
                ? error
                : new Error(
                    "Unknown error"
                  ),

          };

        }



        await this.delay(
          delayMs
        );

      }

    }



    return {

      success: false,

      attempts,

      error:
        new Error(
          "Retry failed"
        ),

    };

  }



  /**
   * Delay helper
   */

  private delay(
    ms: number
  ): Promise<void> {

    return new Promise(
      resolve =>
        setTimeout(
          resolve,
          ms
        )
    );

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalRetry =
  new UniversalRetryManager();
