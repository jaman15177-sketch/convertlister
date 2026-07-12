/**
 * ==========================================================
 * CSV ERRORS
 * ==========================================================
 *
 * Enterprise CSV Engine Errors
 *
 * Responsibilities
 * - CSV specific error hierarchy
 * - Shared error definitions
 *
 * Rules
 * - Error classes only
 * - No business logic
 * ==========================================================
 */

/* ==========================================================
 * BASE ERROR
 * ==========================================================
 */

export class CsvError extends Error {

  constructor(message: string) {

    super(message);

    this.name = "CsvError";

  }

}

/* ==========================================================
 * FILE ERRORS
 * ==========================================================
 */

export class CsvFileNotFoundError
  extends CsvError {

  constructor(fileName: string) {

    super(
      `CSV file not found: ${fileName}`
    );

    this.name =
      "CsvFileNotFoundError";

  }

}

export class CsvEmptyFileError
  extends CsvError {

  constructor() {

    super(
      "CSV file is empty."
    );

    this.name =
      "CsvEmptyFileError";

  }

}

export class CsvUnsupportedFileError
  extends CsvError {

  constructor(extension: string) {

    super(
      `Unsupported CSV file type: ${extension}`
    );

    this.name =
      "CsvUnsupportedFileError";

  }

}

/* ==========================================================
 * PARSER ERRORS
 * ==========================================================
 */

export class CsvParseError
  extends CsvError {

  constructor(message: string) {

    super(message);

    this.name =
      "CsvParseError";

  }

}

/* ==========================================================
 * PROFILE ERRORS
 * ==========================================================
 */

export class CsvProfileNotFoundError
  extends CsvError {

  constructor(profile: string) {

    super(
      `CSV profile not found: ${profile}`
    );

    this.name =
      "CsvProfileNotFoundError";

  }

}

/* ==========================================================
 * VALIDATION ERRORS
 * ==========================================================
 */

export class CsvValidationError
  extends CsvError {

  constructor(message: string) {

    super(message);

    this.name =
      "CsvValidationError";

  }

}

/* ==========================================================
 * MAPPING ERRORS
 * ==========================================================
 */

export class CsvMappingError
  extends CsvError {

  constructor(message: string) {

    super(message);

    this.name =
      "CsvMappingError";

  }

}
