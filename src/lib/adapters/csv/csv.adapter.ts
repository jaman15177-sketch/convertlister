/**
 * ==========================================================
 * CSV ADAPTER
 * ==========================================================
 *
 * Enterprise CSV Adapter
 *
 * Responsibilities
 * - Orchestrate CSV import pipeline
 * - Parse CSV
 * - Detect profile
 * - Map rows
 * - Validate products
 *
 * Rules
 * - No parsing logic
 * - No mapping logic
 * - No validation logic
 * - No profile logic
 * ==========================================================
 */
import type {
  RawProduct,
} from "@/core/normalization/product-normalizer";

import type {
  CsvAdapterContract,
} from "./csv.contract";

import { csvParser } from "./csv.parser";
import { csvDetector } from "./csv.detector";
import { csvMapper } from "./csv.mapper";
import { csvValidator } from "./csv.validator";

import { csvProfileRegistry } from "./profiles/profile.registry";

export class CsvAdapter
  implements CsvAdapterContract
{

  async import(
    content: string
  ): Promise<
  readonly RawProduct[]
>{

    const parsed =
      await csvParser.parse(
        content
      );

    if (!parsed.success) {

      throw new Error(
        parsed.message ??
        "CSV parse failed."
      );

    }

    const file =
      csvParser.toFile(
        "import.csv",
        parsed
      );

    const detection =
      await csvDetector.detect(
        file
      );

    if (
      !detection.success
    ) {

      throw new Error(
        "Unable to detect CSV profile."
      );

    }

    const profile =
      csvProfileRegistry.get(
        detection.profile
      );

    if (!profile) {

      throw new Error(
        "CSV profile not registered."
      );

    }

    const products:
  RawProduct[] = [];

    for (
      const row of file.rows
    ) {

      const product =
        await csvMapper.map(
          row,
          profile.definition
        );

      products.push(
        product
      );

    }

    const valid =
      await csvValidator.validate(
        products
      );

    if (!valid) {

      throw new Error(
        "CSV validation failed."
      );

    }

    return products;

  }

}

export const csvAdapter =
  new CsvAdapter();
