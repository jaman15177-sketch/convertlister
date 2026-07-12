/**
 * ==========================================================
 * CSV PROFILES
 * ==========================================================
 *
 * Enterprise CSV Profiles Public API
 *
 * Responsibilities
 * - Export profile contracts
 * - Register available profiles
 *
 * ==========================================================
 */

import {
  csvProfileRegistry,
} from "./profile.registry";

import {
  aliexpressProfile,
} from "./aliexpress.profile";


/* ==========================================================
 * PROFILE REGISTRATION
 * ==========================================================
 */

csvProfileRegistry.register(
  aliexpressProfile
);


/* ==========================================================
 * EXPORTS
 * ==========================================================
 */

export * from "./profile.types";
export * from "./profile.contract";
export * from "./profile.registry";

export * from "./aliexpress.profile";
