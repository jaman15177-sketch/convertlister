/**
 * ==========================================================
 * CSV DETECTOR
 * ==========================================================
 *
 * Enterprise CSV Profile Detector
 *
 * Responsibilities
 * - Detect CSV profile
 * - Delegate detection to Profile Registry
 *
 * Rules
 * - No mapping logic
 * - No parsing logic
 * - No validation logic
 * ==========================================================
 */

import type {
  CsvDetectionResult,
  CsvFile,
} from "./csv.types";

import type {
  CsvDetectorContract,
} from "./csv.contract";

import {
  csvProfileRegistry,
} from "./profiles/profile.registry";

export class CsvDetector
  implements CsvDetectorContract
{

  async detect(
    file: CsvFile
  ): Promise<CsvDetectionResult> {

    const profile =
      await csvProfileRegistry.detect(
        file.headers
      );

    if (!profile) {

      return {

        success: false,

        profile: "unknown",

        confidence: 0,

      };

    }

    const result =
      await profile.matches(
        file.headers
      );

    return {

      success: result.matched,

      profile:
        profile.definition.name,

      confidence:
        result.confidence,

    };

  }

}

export const csvDetector =
  new CsvDetector();
