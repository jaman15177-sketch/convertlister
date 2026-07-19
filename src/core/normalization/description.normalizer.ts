/**
 * ============================================================
 * CONVERTLISTER
 * DESCRIPTION NORMALIZER
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Clean product descriptions
 * • Remove unnecessary noise
 * • Prepare description for AI pipeline
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Generate marketing copy
 * ✗ Execute AI optimization
 * ✗ Save database
 * ============================================================
 */


import {
  NORMALIZER_TEXT_RULES,
} from "./normalizer.constants";

import {
  NormalizationFailedError,
} from "./normalizer.errors";



export class DescriptionNormalizer {


  /**
   * Normalize product description
   */
  public normalize(
    description: unknown
  ): string {


    if (
      description === undefined ||
      description === null
    ) {

      return "";

    }


    if (
      typeof description !== "string"
    ) {

      throw new NormalizationFailedError(
        "Invalid product description."
      );

    }



    let normalized =
      description.trim();



    /**
     * Remove HTML tags
     */
    normalized =
      normalized.replace(
        /<[^>]*>/g,
        " "
      );



    /**
     * Decode common spaces
     */
    normalized =
      normalized.replace(
        /&nbsp;/gi,
        " "
      );



    /**
     * Collapse spaces
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
     * Limit description length
     */
    if (
      normalized.length >
      NORMALIZER_TEXT_RULES
        .maxDescriptionLength
    ) {

      normalized =
        normalized.slice(
          0,
          NORMALIZER_TEXT_RULES
            .maxDescriptionLength
        );

    }



    return normalized.trim();

  }


}



export const descriptionNormalizer =
  new DescriptionNormalizer();
