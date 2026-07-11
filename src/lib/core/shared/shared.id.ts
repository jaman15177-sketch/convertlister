/**
 * ============================================================
 * CONVERTLISTER
 * Shared Foundation
 * Identity Helpers
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Shared identifier validation
 * ✓ Shared identifier generation
 * ✓ Runtime safe
 * ✓ Zero business logic
 * ✓ Zero marketplace logic
 * ✓ Zero canonical logic
 *
 * This file is intentionally very small.
 * ============================================================
 */

import type { UUID } from "./shared.types";
import {
  ErrorCode,
  SharedError,
} from "./shared.errors";
/* ============================================================
 * UUID REGEX
 * ============================================================
 */

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/* ============================================================
 * ID ENGINE
 * ============================================================
 */

export class SharedId {

  /**
   * Generate UUID
   *
   * Uses native crypto implementation.
   */
  public generate(): UUID {

  return globalThis.crypto.randomUUID();

}

  /**
   * Validate UUID v4
   */
  public isValid(id: string): boolean {
    return UUID_V4_REGEX.test(id);
  }

  /**
   * Safe assertion
   */
  public assert(
  id: string
): asserts id is UUID {

  if (!this.isValid(id)) {
    throw new SharedError(
      ErrorCode.INVALID_ARGUMENT,
      `Invalid UUID: ${id}`,
      {
        value: id,
      }
    );
  }
}   

}   

/* ============================================================
 * SINGLETON
 * ============================================================
 */

export const SharedIdentity =
  Object.freeze(new SharedId());
