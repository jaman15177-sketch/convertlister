/**
 * ============================================================
 * CONVERTLISTER
 * Shared Foundation
 * Shared Constants
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Global immutable constants shared across every module.
 *
 * This file MUST NOT contain:
 * • Business constants
 * • Marketplace constants
 * • Canonical constants
 * • Repository constants
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Runtime-safe
 * ✓ Zero dependencies
 * ✓ Enterprise reusable
 * ✓ Immutable
 * ✓ Tree-shakable
 * ============================================================
 */

/* ============================================================
 * APPLICATION
 * ============================================================
 */

export const APP_NAME = "ConvertLister";

export const APP_VERSION = "2.0.0";

/* ============================================================
 * NUMERIC DEFAULTS
 * ============================================================
 */

export const DEFAULT_PAGE = 1;

export const DEFAULT_PAGE_SIZE = 50;

export const MAX_PAGE_SIZE = 1000;

export const MIN_PAGE_SIZE = 1;

/* ============================================================
 * STRING DEFAULTS
 * ============================================================
 */

export const EMPTY_STRING = "";

export const SPACE = " ";

export const UNKNOWN = "unknown";

/* ============================================================
 * COMMON LIMITS
 * ============================================================
 */

export const MAX_STRING_LENGTH = 10000;

export const MAX_ARRAY_SIZE = 100000;

export const MAX_OBJECT_KEYS = 10000;

/* ============================================================
 * REGULAR EXPRESSIONS
 * ============================================================
 */

export const REGEX = Object.freeze({
  WHITESPACE: /\s+/g,

  MULTIPLE_WHITESPACE: /\s{2,}/g,

  HTML_TAG: /<[^>]*>/g,

  NON_DIGIT: /\D/g,

  TRAILING_SLASH: /\/+$/,

  SLUG_INVALID: /[^a-z0-9]+/g,

  NON_ALPHANUMERIC: /[^a-z0-9]/gi,
});

/* ============================================================
 * BOOLEAN FLAGS
 * ============================================================
 */

export const ENABLED = true;

export const DISABLED = false;

/* ============================================================
 * OBJECTS
 * ============================================================
 */

export const EMPTY_OBJECT = Object.freeze({});

export const EMPTY_ARRAY = Object.freeze([]);

/* ============================================================
 * EXPORT BUNDLE
 * ============================================================
 */

export const SHARED_CONSTANTS = Object.freeze({
  APP_NAME,
  APP_VERSION,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
  EMPTY_STRING,
  SPACE,
  UNKNOWN,
  MAX_STRING_LENGTH,
  MAX_ARRAY_SIZE,
  MAX_OBJECT_KEYS,
  REGEX,
  ENABLED,
  DISABLED,
  EMPTY_OBJECT,
  EMPTY_ARRAY,
});
