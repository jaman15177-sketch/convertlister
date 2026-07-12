/**
 * ==========================================================
 * UNIVERSAL DEDUPLICATOR
 * ==========================================================
 *
 * Duplicate detection layer for Universal Store.
 *
 * Responsibilities:
 * - Detect duplicate entities
 * - Generate comparison fingerprints
 * - Prevent duplicate storage
 *
 * Rules:
 * - No database dependency
 * - No persistence logic
 * - No external services
 * ==========================================================
 */


/* ==========================================================
 * DUPLICATION RESULT
 * ========================================================== */

export interface DeduplicationResult {

  readonly duplicate: boolean;

  readonly fingerprint: string;

}



/* ==========================================================
 * DEDUPLICATOR
 * ========================================================== */

export class UniversalDeduplicator<T = unknown> {



  /**
   * Create fingerprint
   */

  fingerprint(
    value: T
  ): string {

    const serialized =
      JSON.stringify(
        value,
        Object.keys(
          value as object
        ).sort()
      );


    return this.hash(
      serialized
    );

  }



  /**
   * Compare two entities
   */

  compare(
    first: T,
    second: T
  ): DeduplicationResult {


    const firstHash =
      this.fingerprint(first);


    const secondHash =
      this.fingerprint(second);


    return {

      duplicate:
        firstHash === secondHash,

      fingerprint:
        firstHash,

    };

  }



  /**
   * Check duplicate
   */

  isDuplicate(
    existing: T[],
    incoming: T
  ): boolean {


    const incomingHash =
      this.fingerprint(
        incoming
      );


    return existing.some(
      item =>
        this.fingerprint(item) === incomingHash
    );

  }



  /**
   * Internal hash generator
   */

  private hash(
    input: string
  ): string {

    let hash = 0;


    for (
      let index = 0;
      index < input.length;
      index++
    ) {

      hash =
        (
          hash << 5
        ) -
        hash +
        input.charCodeAt(index);


      hash |= 0;

    }


    return Math.abs(hash).toString(36);

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalDeduplicator =
  new UniversalDeduplicator();
