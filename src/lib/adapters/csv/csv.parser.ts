/**
 * ==========================================================
 * CSV PARSER
 * ==========================================================
 *
 * Enterprise CSV Parser
 *
 * Responsibilities
 * - Parse raw CSV content
 * - Extract headers
 * - Extract rows
 *
 * Rules
 * - No mapping
 * - No validation
 * - No profile detection
 * - No import logic
 * ==========================================================
 */

import type {
  CsvFile,
  CsvParseResult,
  CsvRow,
} from "./csv.types";

import type {
  CsvParserContract,
} from "./csv.contract";

import {
  DEFAULT_CSV_DELIMITER,
} from "./csv.constants";

export class CsvParser
  implements CsvParserContract
{

  async parse(
    content: string
  ): Promise<CsvParseResult> {

    const lines =
      content
        .split(/\r?\n/)
        .filter(
          line => line.trim().length > 0
        );

    if (lines.length === 0) {

      return {
        success: false,
        headers: [],
        rows: [],
        message: "CSV is empty.",
      };

    }

    const headers =
      lines[0]
        .split(DEFAULT_CSV_DELIMITER)
        .map(
          header => header.trim()
        );

    const rows: CsvRow[] = [];

    for (
      let index = 1;
      index < lines.length;
      index++
    ) {

      const values =
        lines[index]
          .split(DEFAULT_CSV_DELIMITER);

      const row: CsvRow = {};

      headers.forEach(
        (
          header,
          columnIndex
        ) => {

          row[header] =
            values[columnIndex]?.trim() ?? "";

        }
      );

      rows.push(row);

    }

    return {

      success: true,

      headers,

      rows,

    };

  }

  toFile(
    name: string,
    result: CsvParseResult
  ): CsvFile {

    return {

      name,

      headers:
        result.headers,

      rows:
        result.rows,

    };

  }

}

export const csvParser =
  new CsvParser();
