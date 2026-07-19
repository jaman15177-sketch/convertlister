/**
 * ============================================================
 * CONVERTLISTER
 * CATEGORY NORMALIZER
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Normalize marketplace categories
 * • Convert different names into universal category
 * • Keep category structure consistent
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Winning decision
 * ✗ AI classification
 * ✗ Database access
 * ============================================================
 */



export class CategoryNormalizer {



  /**
   * Category mapping dictionary
   *
   * Marketplace categories
   *        ↓
   * Universal categories
   */
  private readonly categoryMap =
    new Map<string, string>([

      [
        "computer accessories",
        "electronics",
      ],

      [
        "pc accessories",
        "electronics",
      ],

      [
        "mobile accessories",
        "electronics",
      ],

      [
        "home decor",
        "home",
      ],

      [
        "home decoration",
        "home",
      ],

      [
        "kitchen tools",
        "kitchen",
      ],

      [
        "beauty products",
        "beauty",
      ],

      [
        "fashion accessories",
        "fashion",
      ],

    ]);



  /**
   * Normalize category
   */
  public normalize(
    category?: unknown
  ): string {


    if (
      typeof category !== "string" ||
      !category.trim()
    ) {

      return "uncategorized";

    }



    const cleaned =
      category
        .trim()
        .toLowerCase();



    return (
      this.categoryMap.get(
        cleaned
      )
      ??
      this.formatDefault(
        cleaned
      )
    );

  }



  /**
   * Default formatter
   */
  private formatDefault(
    value: string
  ): string {


    return value
      .replace(
        /\s+/g,
        " "
      )
      .replace(
        /\b\w/g,
        char =>
          char.toUpperCase()
      );

  }


}



export const categoryNormalizer =
  new CategoryNormalizer();
