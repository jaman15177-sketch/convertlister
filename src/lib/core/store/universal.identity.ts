/**
 * ==========================================================
 * UNIVERSAL IDENTITY
 * ==========================================================
 *
 * Identity generation and management layer.
 *
 * Responsibilities:
 * - Generate unique entity identity
 * - Maintain identity format
 * - Provide deterministic identity helpers
 *
 * Rules:
 * - No database dependency
 * - No external service
 * - No business logic
 * ==========================================================
 */


/* ==========================================================
 * IDENTITY TYPES
 * ========================================================== */

export interface UniversalIdentity {

  readonly id: string;

  readonly createdAt: Date;

}



/* ==========================================================
 * IDENTITY GENERATOR
 * ========================================================== */

export class UniversalIdentityGenerator {



  /**
   * Generate unique ID
   */

  generate(
    prefix = "usr"
  ): string {

    const timestamp =
      Date.now()
        .toString(36);


    const random =
      Math.random()
        .toString(36)
        .substring(2, 10);


    return `${prefix}_${timestamp}_${random}`;

  }



  /**
   * Create identity object
   */

  create(
    prefix = "usr"
  ): UniversalIdentity {

    return {

      id: this.generate(prefix),

      createdAt: new Date(),

    };

  }



  /**
   * Validate identity
   */

  isValid(
    id: string
  ): boolean {

    if (!id) return false;


    return (
      typeof id === "string" &&
      id.length >= 5
    );

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalIdentity =
  new UniversalIdentityGenerator();
