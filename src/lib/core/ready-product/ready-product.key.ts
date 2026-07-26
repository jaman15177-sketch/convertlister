/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.key.ts
 *
 * Responsibility
 * -----------------------------------------------------------
 * Ready Product key generation.
 *
 * Must NOT
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ API
 * ✗ Marketplace Push
 * ✗ Business Logic
 *
 * ===========================================================
 */


/**
 * Ready Product Key Input
 */
export interface ReadyProductKeyInput {

  readonly organizationId: string;

  readonly productId: string;

  readonly snapshotId: string;

}



/**
 * Ready Product Key Result
 */
export interface ReadyProductKeyResult {

  readonly value: string;

}
/**
 * ===========================================================
 * Ready Product Key Builder
 * Part-2
 * ===========================================================
 */


/**
 * Build Ready Product Key
 */
export function buildReadyProductKey(
  input: ReadyProductKeyInput,
): ReadyProductKeyResult {

  return {

    value: [

      input.organizationId,

      input.productId,

      input.snapshotId,

    ].join(":"),

  };

}



/**
 * Build Product Scope Key
 */
export function buildReadyProductScopeKey(
  organizationId: string,
  productId: string,
): string {

  return [

    organizationId,

    productId,

  ].join(":");

}
/**
 * ===========================================================
 * Ready Product Key Utilities
 * Part-3
 * ===========================================================
 */


/**
 * Parse Ready Product Key
 */
export function parseReadyProductKey(
  key: string,
): ReadyProductKeyInput {

  const [
    organizationId,
    productId,
    snapshotId,
  ] = key.split(":");


  return {

    organizationId,

    productId,

    snapshotId,

  };

}



/**
 * Validate Ready Product Key
 */
export function isReadyProductKey(
  key: string,
): boolean {

  const parts =
    key.split(":");


  return (

    parts.length === 3 &&

    parts.every(
      (part) => part.trim().length > 0,
    )

  );

}
/**
 * ===========================================================
 * Ready Product Key Helpers
 * Part-4 Final
 * ===========================================================
 */


/**
 * Compare Ready Product Keys
 */
export function isSameReadyProductKey(
  first: ReadyProductKeyResult,
  second: ReadyProductKeyResult,
): boolean {

  return first.value === second.value;

}



/**
 * Get Organization Id From Key
 */
export function getOrganizationIdFromKey(
  key: string,
): string {

  return parseReadyProductKey(
    key,
  ).organizationId;

}



/**
 * Get Product Id From Key
 */
export function getProductIdFromKey(
  key: string,
): string {

  return parseReadyProductKey(
    key,
  ).productId;

}



/**
 * Get Snapshot Id From Key
 */
export function getSnapshotIdFromKey(
  key: string,
): string {

  return parseReadyProductKey(
    key,
  ).snapshotId;

}
