/**
 * ============================================================
 * CONVERTLISTER
 * APPLICATION INIT
 * Enterprise Production Ready
 * ============================================================
 *
 * Responsibilities
 * ------------------------------------------------------------
 * • Application startup entry
 * • Execute bootstrap sequence
 * • Ensure one-time initialization
 *
 * Must NOT
 * ------------------------------------------------------------
 * ✗ Business logic
 * ✗ Import products
 * ✗ Queue processing
 * ✗ Marketplace API calls
 * ============================================================
 */

import { bootstrap } from "./bootstrap";

let initialized = false;

/**
 * Initialize application.
 */
export async function initializeApplication(): Promise<void> {

  if (initialized) {
    return;
  }

  await bootstrap();

  initialized = true;

}

/**
 * Application status.
 */
export function isApplicationInitialized(): boolean {

  return initialized;

}
