/**
 * ==========================================================
 * UNIVERSAL SEARCH
 * ==========================================================
 *
 * Search abstraction layer.
 *
 * Responsibilities:
 * - Entity filtering
 * - Query matching
 * - Search condition handling
 * - Future Elasticsearch/Meilisearch adapter support
 *
 * Rules:
 * - No database dependency
 * - No external search engine
 * - Pure search logic only
 * ==========================================================
 */


/* ==========================================================
 * SEARCH TYPES
 * ========================================================== */

export interface UniversalSearchQuery {

  readonly field?: string;

  readonly value?: string;

  readonly limit?: number;

}



/* ==========================================================
 * SEARCH RESULT
 * ========================================================== */

export interface UniversalSearchResult<T> {

  readonly total: number;

  readonly items: readonly T[];

}



/* ==========================================================
 * SEARCH ENGINE
 * ========================================================== */

export class UniversalSearchEngine<T extends Record<string, unknown>> {



  /**
   * Search collection
   */

  search(
    items: readonly T[],
    query: UniversalSearchQuery
  ): UniversalSearchResult<T> {


    let results =
      [...items];



    if (
      query.field &&
      query.value
    ) {

      results =
        results.filter(
          item => {

            const fieldValue =
              item[
                query.field as keyof T
              ];



            return String(fieldValue)
              .toLowerCase()
              .includes(
                query.value!
                  .toLowerCase()
              );

          }
        );

    }



    if (
      query.limit &&
      query.limit > 0
    ) {

      results =
        results.slice(
          0,
          query.limit
        );

    }



    return {

      total:
        results.length,

      items:
        results,

    };

  }



  /**
   * Exact match
   */

  matches(
    item: T,
    field: keyof T,
    value: unknown
  ): boolean {

    return (
      item[field] === value
    );

  }

}


/* ==========================================================
 * SINGLETON
 * ========================================================== */

export const universalSearch =
  new UniversalSearchEngine();
