/**
 * ============================================================
 * CONVERTLISTER
 * TITLE NORMALIZER
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Clean product titles
 * • Remove unnecessary noise
 * • Prepare title for downstream engines
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Generate AI title
 * ✗ Detect winning products
 * ✗ Save database
 * ============================================================
 */


import {
  NORMALIZER_TEXT_RULES,
} from "./normalizer.constants";

import {
  NormalizationFailedError,
} from "./normalizer.errors";



export class TitleNormalizer {


  /**
   * Normalize product title
   */
  public normalize(
    title: unknown
  ): string {


    if (
      typeof title !== "string" ||
      !title.trim()
    ) {

      throw new NormalizationFailedError(
        "Product title is empty."
      );

    }


    let normalized =
      title.trim();



    /**
     * Remove multiple spaces
     */
    if (
      NORMALIZER_TEXT_RULES
        .collapseSpaces
    ) {

      normalized =
        normalized.replace(
          /\s+/g,
          " "
        );

    }



    /**
     * Remove unnecessary symbols
     */
    normalized =
      normalized.replace(
        /[<>]/g,
        ""
      );



    /**
     * Limit title length
     */
    if (
      normalized.length >
      NORMALIZER_TEXT_RULES
        .maxTitleLength
    ) {

      normalized =
        normalized.slice(
          0,
          NORMALIZER_TEXT_RULES
            .maxTitleLength
        );

    }



    return normalized.trim();

  }



  /**
   * Extract simple keywords
   */
  public extractKeywords(
    title: string
  ): string[] {


    return title
      .toLowerCase()
      .split(" ")
      .map(
        word =>
          word.trim()
      )
      .filter(
        word =>
          word.length >= 3
      );

  }


}



export const titleNormalizer =
  new TitleNormalizer();
