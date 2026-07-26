/**
 * ===========================================================
 * CONVERTLISTER
 * READY PRODUCT LIBRARY
 * ===========================================================
 *
 * File:
 * ready-product.identity.ts
 *
 * Responsibility:
 * -----------------------------------------------------------
 * Ready Product identity management.
 *
 * Must NOT:
 * -----------------------------------------------------------
 * ✗ Database
 * ✗ Repository
 * ✗ API
 * ✗ Marketplace Push
 * ✗ Business Logic
 *
 * Purpose:
 * -----------------------------------------------------------
 * Create stable identity representation for Ready Product.
 *
 * ===========================================================
 */


/**
 * Ready Product Identity Input
 */
export interface ReadyProductIdentityInput {

  readonly productId: string;

  readonly organizationId: string;

  readonly snapshotId: string;

}



/**
 * Ready Product Identity Output
 */
export interface ReadyProductIdentityResult {

  readonly productId: string;

  readonly organizationId: string;

  readonly snapshotId: string;

  readonly identityKey: string;

}
/**
 * ===========================================================
 * Ready Product Identity Builder
 * Part-2
 * ===========================================================
 */


/**
 * Build Stable Identity Key
 */
export function buildReadyProductIdentityKey(
  input: ReadyProductIdentityInput,
): string {

  return [

    input.organizationId,

    input.productId,

    input.snapshotId,

  ].join(":");

}



/**
 * Create Ready Product Identity
 */
export function createReadyProductIdentity(
  input: ReadyProductIdentityInput,
): ReadyProductIdentityResult {

  return {

    productId:
      input.productId,

    organizationId:
      input.organizationId,

    snapshotId:
      input.snapshotId,

    identityKey:
      buildReadyProductIdentityKey(
        input,
      ),

  };

}
/**
 * ===========================================================
 * Ready Product Identity Validation
 * Part-3
 * ===========================================================
 */


/**
 * Validate Identity Input
 */
export function validateReadyProductIdentityInput(
  input: ReadyProductIdentityInput,
): boolean {

  return (

    typeof input.productId === "string" &&

    input.productId.trim().length > 0 &&

    typeof input.organizationId === "string" &&

    input.organizationId.trim().length > 0 &&

    typeof input.snapshotId === "string" &&

    input.snapshotId.trim().length > 0

  );

}



/**
 * Compare Ready Product Identity
 */
export function compareReadyProductIdentity(
  first: ReadyProductIdentityResult,
  second: ReadyProductIdentityResult,
): boolean {

  return (

    first.identityKey ===
    second.identityKey

  );

}
/**
 * ===========================================================
 * Ready Product Identity Utilities
 * Part-4 Final
 * ===========================================================
 */


/**
 * Extract Organization Scope
 */
export function getReadyProductOrganizationScope(
  identity: ReadyProductIdentityResult,
): string {

  return identity.organizationId;

}



/**
 * Extract Product Scope
 */
export function getReadyProductScope(
  identity: ReadyProductIdentityResult,
): string {

  return identity.productId;

}



/**
 * Extract Snapshot Reference
 */
export function getReadyProductSnapshotReference(
  identity: ReadyProductIdentityResult,
): string {

  return identity.snapshotId;

}



/**
 * Identity Equality Guard
 */
export function isSameReadyProductIdentity(
  a: ReadyProductIdentityResult,
  b: ReadyProductIdentityResult,
): boolean {

  return (
    a.identityKey === b.identityKey
  );

}
