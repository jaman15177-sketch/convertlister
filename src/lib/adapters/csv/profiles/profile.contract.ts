/**
 * ==========================================================
 * PROFILE CONTRACT
 * ==========================================================
 *
 * Enterprise CSV Profile Contract
 *
 * Responsibilities
 * - Marketplace profile abstraction
 * - Header detection contract
 *
 * Rules
 * - Interfaces only
 * - No business logic
 * - No mapping logic
 * ==========================================================
 */

import type {
  CsvProfileName,
} from "../csv.types";

import type {
  ProfileDefinition,
  ProfileMatchResult,
} from "./profile.types";


/* ==========================================================
 * PROFILE CONTRACT
 * ==========================================================
 */

export interface CsvProfileContract {

  /**
   * Profile metadata
   */
  readonly definition:
    ProfileDefinition;


  /**
   * Detect CSV headers
   */
  matches(
    headers: readonly string[]
  ): Promise<
    ProfileMatchResult
  >;

}


/* ==========================================================
 * PROFILE REGISTRY CONTRACT
 * ==========================================================
 */

export interface CsvProfileRegistryContract {

  /**
   * Register profile
   */
  register(
    profile: CsvProfileContract
  ): void;


  /**
   * Find profile by name
   */
  get(
    name: CsvProfileName
  ):
    | CsvProfileContract
    | undefined;


  /**
   * Detect profile from headers
   */
  detect(
    headers:
      readonly string[]
  ): Promise<
    CsvProfileContract
    | undefined
  >;


  /**
   * Get all profiles
   */
  getAll():
    readonly CsvProfileContract[];

}
