/**
 * ============================================================
 * CONVERTLISTER
 * IMAGE NORMALIZER
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Normalize product images
 * • Remove invalid URLs
 * • Remove duplicates
 * • Standardize image output
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Image processing
 * ✗ Image hosting
 * ✗ AI image generation
 * ============================================================
 */


import {
  NORMALIZER_IMAGE_RULES,
} from "./normalizer.constants";

import type {
  NormalizedImages,
} from "./normalizer.types";



export class ImageNormalizer {


  /**
   * Normalize images
   */
  public normalize(
    images?: unknown,
    image?: unknown
  ): NormalizedImages {


    const collected =
      this.collectImages(
        images,
        image
      );


    const cleaned =
      collected
        .filter(
          url =>
            this.isValidUrl(url)
        )
        .map(
          url =>
            url.trim()
        );


    const unique =
      Array.from(
        new Set(cleaned)
      );


    return {

      urls:
        unique.slice(
          0,
          NORMALIZER_IMAGE_RULES.maxImages
        ),

    };

  }



  /**
   * Collect images from different formats
   */
  private collectImages(
    images: unknown,
    image: unknown
  ): string[] {


    const result: string[] = [];



    if (
      Array.isArray(images)
    ) {

      result.push(
        ...images.filter(
          item =>
            typeof item === "string"
        )
      );

    }



    if (
      typeof image === "string"
    ) {

      result.push(
        image
      );

    }



    return result;

  }



  /**
   * Validate image URL
   */
  private isValidUrl(
    value: string
  ): boolean {


    if (
      !value.trim()
    ) {

      return false;

    }


    if (
      !NORMALIZER_IMAGE_RULES
        .validateUrl
    ) {

      return true;

    }



    return (
      value.startsWith(
        "http://"
      )
      ||
      value.startsWith(
        "https://"
      )
    );

  }


}



export const imageNormalizer =
  new ImageNormalizer();
