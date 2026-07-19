/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Engine
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Core execution engine for canonical product processing.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Execute canonical workflow
 * ✓ Coordinate service layer
 * ✓ Provide stable engine contract
 * ✓ Prepare future queue / worker integration
 *
 * MUST NOT contain:
 * ✗ Database access
 * ✗ Repository persistence
 * ✗ Marketplace API logic
 * ✗ Direct AI processing
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Stateless execution
 * ✓ Enterprise scalable
 * ✓ Universal Store ready
 * ✓ AI pipeline ready
 * ============================================================
 */
import type {
  NormalizedProduct,
} from "@/core/normalization";

import type {
  CanonicalServiceResult,
} from "./canonical.service";

import {
  CanonicalService,
} from "./canonical.service";

import {
  DuplicateDetector,
} from "./duplicate.detector";

import type {
  CanonicalProduct,
  DuplicateResult,
} from "./canonical.types";

/**
 * ============================================================
 * ENGINE INPUT
 * ============================================================
 */

export interface CanonicalEngineInput {

  readonly product:
    NormalizedProduct;

  readonly existingProducts?:
    ReadonlyArray<CanonicalProduct>;

}



/**
 * ============================================================
 * ENGINE RESULT
 * ============================================================
 */

export interface CanonicalEngineOutput {

  readonly canonical:
    CanonicalServiceResult;


  readonly duplicate:
    DuplicateResult;

}



/**
 * ============================================================
 * CANONICAL ENGINE
 * ============================================================
 */

export class CanonicalEngine {


  private readonly service:
    CanonicalService;


  private readonly duplicateDetector:
    DuplicateDetector;



  constructor() {

    this.service =
      new CanonicalService();


    this.duplicateDetector =
      new DuplicateDetector();

  }



  /**
   * ==========================================================
   * PROCESS PRODUCT
   * ==========================================================
   */

  public execute(
    input: CanonicalEngineInput
  ): CanonicalEngineOutput {


    /**
     * Step 1
     * Create canonical identity
     */
    const canonical =
      this.service.create(
        input.product
      );



    /**
     * Step 2
     * Detect duplicate
     */
    const duplicate =
      this.duplicateDetector.detect(

        canonical.product,

        input.existingProducts ?? []

      );



    return {

      canonical,

      duplicate,

    };

  }

}
