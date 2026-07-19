/**
 * ============================================================
 * CONVERTLISTER
 * PRODUCT MAPPER
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Map raw product to normalized product
 * • Combine normalization results
 * • Create universal structure
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Save product
 * ✗ Create canonical identity
 * ✗ Make business decisions
 * ============================================================
 */


import type {
  RawProduct,
  NormalizedProduct,
} from "./normalizer.types";


import {
  NORMALIZER_DEFAULTS,
} from "./normalizer.constants";

import {
  titleNormalizer,
} from "./title.normalizer";


import {
  descriptionNormalizer,
} from "./description.normalizer";


import {
  priceNormalizer,
} from "./price.normalizer";


import {
  imageNormalizer,
} from "./image.normalizer";


import {
  categoryNormalizer,
} from "./category.normalizer";


import {
  attributeExtractor,
} from "./attribute.extractor";


import {
  keywordExtractor,
} from "./keyword.extractor";



export class ProductMapper {



  /**
   * Map raw product
   */
  public map(
    input: RawProduct,
    source: string
  ): NormalizedProduct {


    const title =
      titleNormalizer.normalize(
        input.title
      );


    const description =
      descriptionNormalizer.normalize(
        input.description
      );


    const price =
      priceNormalizer.normalize(
        input.price,
        input.currency
      );


    const images =
      imageNormalizer.normalize(
        input.images,
        input.image
      );


    const category =
      categoryNormalizer.normalize(
        input.category
      );


    const attributes =
      attributeExtractor.extract(
        input
      );


    const keywords =
      keywordExtractor.extract(
        title,
        description
      );



    return {

  id:
    input.id,

  externalId:
    input.externalId,

  source:
    source.toLowerCase(),

  marketplace:
    input.marketplace ??
    source,

  title,

  description,

  brand:
    input.brand,

  sku:
    input.sku,

  barcode:
    input.barcode,

  price,

  images,

  category,

  attributes,

  variants:
    input.variants,

  keywords,

  status:
    NORMALIZER_DEFAULTS.status,

  metadata: {
    raw: input,
  },

};

  }


}



export const productMapper =
  new ProductMapper();
