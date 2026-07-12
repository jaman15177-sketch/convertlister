/**
 * ==========================================================
 * CSV CONTRACT
 * ==========================================================
 *
 * Enterprise CSV Engine Contracts
 *
 * Responsibilities
 * - Parser abstraction
 * - Detector abstraction
 * - Mapper abstraction
 * - Validator abstraction
 * - Adapter abstraction
 *
 * Rules
 * - Interfaces only
 * - No business logic
 * - No implementation
 * ==========================================================
 */

import type {
  RawProduct,
} from "@/core/normalization/product-normalizer";

import type {
  CsvDetectionResult,
  CsvFile,
  CsvParseResult,
  CsvRow,
} from "./csv.types";

import type {
  ProfileDefinition,
} from "./profiles/profile.types";

/* ==========================================================
 * CSV PARSER
 * ==========================================================
 */

export interface CsvParserContract {

  parse(
    content: string
  ): Promise<CsvParseResult>;

}

/* ==========================================================
 * CSV DETECTOR
 * ==========================================================
 */

export interface CsvDetectorContract {

  detect(
    file: CsvFile
  ): Promise<CsvDetectionResult>;

}

/* ==========================================================
 * CSV MAPPER
 * ==========================================================
 */

export interface CsvMapperContract {

  map(
    row: CsvRow,
    profile: ProfileDefinition
  ): Promise<RawProduct>;

}

/* ==========================================================
 * CSV VALIDATOR
 * ==========================================================
 */

export interface CsvValidatorContract {

  validate(
    products: readonly RawProduct[]
  ): Promise<boolean>;

}

/* ==========================================================
 * CSV ADAPTER
 * ==========================================================
 */

export interface CsvAdapterContract {

  import(
  content: string
): Promise<
  readonly RawProduct[]
>;

}
