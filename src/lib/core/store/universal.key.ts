/**
 * ==========================================================
 * UNIVERSAL KEY
 * ==========================================================
 *
 * Entity key generation layer.
 *
 * Responsibilities:
 * - Generate unique lookup keys
 * - Create composite keys
 * - Normalize identity keys
 *
 * Rules:
 * - No database dependency
 * - No storage dependency
 * - Deterministic output
 * ==========================================================
 */


/* ==========================================================
 * KEY TYPES
 * ========================================================== */

export type UniversalKey =
  string;



export interface UniversalCompositeKey {

  readonly namespace: string;

  readonly value: string;

}



/* ==========================================================
 * KEY GENERATOR
 * ========================================================== */

export class UniversalKeyGenerator {



  /**
   * Generate simple key
   */

  create(
    value: string
  ): UniversalKey {

    return this.normalize(value);

  }



  /**
   * Generate namespaced key
   */

  createNamespaced(
    namespace: string,
    value: string
  ): UniversalKey {

    return `${this.normalize(namespace)}:${this.normalize(value)}`;

  }



  /**
   * Generate composite key
   */

  createComposite(
    key: UniversalCompositeKey
  ): UniversalKey {

    return this.createNamespaced(
      key.namespace,
      key.value
    );

  }



  /**
   * Normalize key
   */

  normalize(
    value: string
  ): string {

    return value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");

  }



  /**
   * Validate key
   */

  isValid(
    key: string
  ): boolean {

    return (
      typeof key === "string" &&
      key.length > 0
    );

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalKey =
  new UniversalKeyGenerator();
