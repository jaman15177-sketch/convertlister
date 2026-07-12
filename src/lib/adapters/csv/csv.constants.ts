/**
 * ==========================================================
 * CSV CONSTANTS
 * ==========================================================
 *
 * Enterprise CSV Engine Constants
 *
 * Responsibilities
 * - Shared CSV constants
 * - Default parser configuration
 * - File limitations
 *
 * Rules
 * - Constants only
 * - No business logic
 * - No parsing logic
 * ==========================================================
 */

/* ==========================================================
 * FILE LIMITS
 * ==========================================================
 */

export const DEFAULT_CSV_DELIMITER = ",";

export const DEFAULT_CSV_ENCODING = "utf-8";

export const DEFAULT_CSV_MAX_FILE_SIZE =
  50 * 1024 * 1024; // 50 MB

export const DEFAULT_CSV_MAX_ROWS =
  100000;

export const DEFAULT_CSV_MAX_COLUMNS =
  500;

/* ==========================================================
 * PARSER
 * ==========================================================
 */

export const CSV_SUPPORTED_DELIMITERS = [
  ",",
  ";",
  "\t",
] as const;

/* ==========================================================
 * FILE EXTENSIONS
 * ==========================================================
 */

export const CSV_SUPPORTED_EXTENSIONS = [
  ".csv",
] as const;

/* ==========================================================
 * MIME TYPES
 * ==========================================================
 */

export const CSV_SUPPORTED_MIME_TYPES = [
  "text/csv",
  "application/csv",
  "text/plain",
  "application/vnd.ms-excel",
] as const;

/* ==========================================================
 * DETECTION
 * ==========================================================
 */

export const CSV_PROFILE_CONFIDENCE_THRESHOLD =
  80;

/* ==========================================================
 * UNKNOWN PROFILE
 * ==========================================================
 */

export const CSV_UNKNOWN_PROFILE =
  "unknown";
