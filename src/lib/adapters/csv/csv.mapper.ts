/**
 * ==========================================================
 * CSV MAPPER
 * ==========================================================
 *
 * Enterprise Generic CSV Mapper
 *
 * Responsibilities
 * - Convert CsvRow -> RawProduct
 * - Use ProfileDefinition only
 *
 * Rules
 * - No normalization
 * - No validation
 * - No marketplace logic
 * ==========================================================
 */

import type {
  RawProduct,
} from "@/core/normalization/product-normalizer";

import type {
  CsvRow,
} from "./csv.types";

import type {
  ProfileDefinition,
} from "./profiles/profile.types";


export class CsvMapper {


  async map(
    row: CsvRow,
    profile: ProfileDefinition
  ): Promise<RawProduct> {


    const product =
      {} as RawProduct;


    for (
      const column of profile.columns
    ) {

      (
        product as Record<
          string,
          unknown
        >
      )[column.target] =
        row[column.source];

    }


    return product;

  }

}


export const csvMapper =
  new CsvMapper();
