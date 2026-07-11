/**
 * ============================================================
 * CONVERTLISTER
 * Shared Foundation
 * Shared Result Contracts
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Standard operation result contracts shared across
 * every module.
 *
 * This file MUST NOT contain:
 * • Business logic
 * • Canonical logic
 * • Repository logic
 * • Marketplace logic
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Zero dependencies
 * ✓ Immutable contracts
 * ✓ Enterprise reusable
 * ✓ Build-safe
 * ============================================================
 */

import type { ErrorDetails } from "./shared.errors";
import type {
  PageInfo,
} from "./shared.types";
/* ============================================================
 * STATUS
 * ============================================================
 */

export enum ResultStatus {
  SUCCESS = "success",

  FAILURE = "failure",
}

/* ============================================================
 * ERROR
 * ============================================================
 */

export interface ResultError {
  readonly code: string;

  readonly message: string;

  readonly details?: ErrorDetails;
}

/* ============================================================
 * BASE RESULT
 * ============================================================
 */

export interface BaseResult {
  readonly success: boolean;

  readonly status: ResultStatus;
}

/* ============================================================
 * SUCCESS RESULT
 * ============================================================
 */

export interface SuccessResult<T>
  extends BaseResult {

  readonly success: true;

  readonly status: ResultStatus.SUCCESS;

  readonly data: T;
}

/* ============================================================
 * FAILURE RESULT
 * ============================================================
 */

export interface FailureResult
  extends BaseResult {

  readonly success: false;

  readonly status: ResultStatus.FAILURE;

  readonly error: ResultError;
}

/* ============================================================
 * OPERATION RESULT
 * ============================================================
 */

export type OperationResult<T> =
  | SuccessResult<T>
  | FailureResult;

/* ============================================================
 * PAGINATED RESULT
 * ============================================================
 */



export interface PaginatedResult<T>
  extends SuccessResult<ReadonlyArray<T>> {

  readonly pageInfo: PageInfo;
}

/* ============================================================
 * FACTORY
 * ============================================================
 */

export const Result = Object.freeze({

  success<T>(
    data: T
  ): SuccessResult<T> {

    return {
      success: true,
      status: ResultStatus.SUCCESS,
      data,
    };

  },

  failure(
    code: string,
    message: string,
    details?: ErrorDetails
  ): FailureResult {

    return {
      success: false,
      status: ResultStatus.FAILURE,
      error: {
        code,
        message,
        details,
      },
    };

  },

});
