/**
 * ==========================================================
 * PROFILE REGISTRY
 * ==========================================================
 *
 * Enterprise CSV Profile Registry
 *
 * Responsibilities
 * - Register CSV profiles
 * - Lookup profiles
 * - Detect profile by CSV headers
 *
 * Rules
 * - No parsing logic
 * - No mapping logic
 * - No import logic
 * ==========================================================
 */

import type {
  CsvProfileName,
} from "../csv.types";

import type {
  CsvProfileContract,
  CsvProfileRegistryContract,
} from "./profile.contract";

export class CsvProfileRegistry
  implements CsvProfileRegistryContract
{

  private readonly profiles =
    new Map<
      CsvProfileName,
      CsvProfileContract
    >();

  /* ========================================================
   * REGISTER
   * ========================================================
   */

  register(
    profile: CsvProfileContract
  ): void {

    this.profiles.set(
      profile.definition.name,
      profile
    );

  }

  /* ========================================================
   * GET
   * ========================================================
   */

  get(
    name: CsvProfileName
  ):
    | CsvProfileContract
    | undefined {

    return this.profiles.get(
      name
    );

  }

  /* ========================================================
   * GET ALL
   * ========================================================
   */

  getAll():
    readonly CsvProfileContract[] {

    return Array.from(
      this.profiles.values()
    );

  }

  /* ========================================================
   * DETECT
   * ========================================================
   */

  async detect(
    headers:
      readonly string[]
  ): Promise<
    CsvProfileContract
      | undefined
  > {

    let bestMatch:
      CsvProfileContract
      | undefined;

    let highestConfidence =
      -1;

    for (
      const profile of
      this.profiles.values()
    ) {

      const result =
        await profile.matches(
          headers
        );

      if (
        result.matched &&
        result.confidence >
          highestConfidence
      ) {

        highestConfidence =
          result.confidence;

        bestMatch =
          profile;

      }

    }

    return bestMatch;

  }

}

/* ==========================================================
 * DEFAULT REGISTRY
 * ==========================================================
 */

export const csvProfileRegistry =
  new CsvProfileRegistry();
