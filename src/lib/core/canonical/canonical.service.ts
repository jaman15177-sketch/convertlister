/**
 * ============================================================
 * CONVERTLISTER
 * Canonical Identity System
 * Canonical Service
 * ============================================================
 *
 * Purpose
 * ------------------------------------------------------------
 * Application service layer for Canonical workflow.
 *
 * Responsibilities
 * ------------------------------------------------------------
 * ✓ Coordinate canonical pipeline
 * ✓ Validate product
 * ✓ Normalize product
 * ✓ Generate identity key
 * ✓ Build canonical product
 *
 * MUST NOT contain:
 * ✗ Database access
 * ✗ Repository logic
 * ✗ Queue processing
 * ✗ Marketplace API logic
 *
 * Design Goals
 * ------------------------------------------------------------
 * ✓ Thin orchestration layer
 * ✓ Production safe
 * ✓ Universal Store ready
 * ✓ AI pipeline compatible
 * ============================================================
 */
import type {
  CanonicalProduct,
} from "./canonical.types";

import type {
  CanonicalKey,
} from "./canonical.key";
import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";


import {
  CanonicalValidator,
} from "./canonical.validator";


import {
  CanonicalNormalizer,
} from "./canonical.normalizer";


import {
  CanonicalBuilder,
} from "./canonical.builder";


import {
  CanonicalKeyGenerator,
} from "./canonical.key";


/**
 * ============================================================
 * SERVICE RESULT
 * ============================================================
 */

export interface CanonicalServiceResult {

  readonly product:
    CanonicalProduct;

  readonly key:
    CanonicalKey;

}


/**
 * ============================================================
 * CANONICAL SERVICE
 * ============================================================
 */

export class CanonicalService {


  private readonly validator:
    CanonicalValidator;


  private readonly normalizer:
    CanonicalNormalizer;


  private readonly builder:
    CanonicalBuilder;


  private readonly keyGenerator:
    CanonicalKeyGenerator;



  constructor() {

    this.validator =
      new CanonicalValidator();


    this.normalizer =
      new CanonicalNormalizer();


    this.builder =
      new CanonicalBuilder();


    this.keyGenerator =
      new CanonicalKeyGenerator();

  }



  /**
   * ==========================================================
   * CREATE CANONICAL PRODUCT
   * ==========================================================
   */

  public create(
    product: AdapterProduct
  ): CanonicalServiceResult {


    /**
     * Step 1
     * Validate input
     */
    this.validator.assertValid(
      product
    );



    /**
     * Step 2
     * Normalize fields
     */
    const normalized =
      this.normalizer.normalize(
        product
      );



    /**
     * Step 3
     * Generate identity key
     */
    const key =
      this.keyGenerator.generate(
        normalized
      );



    /**
     * Step 4
     * Build canonical entity
     */
    const canonicalProduct =
      this.builder.build({

        product,

        normalized,

        fingerprint:
          key.value,

      });



    return {

      product:
        canonicalProduct,


      key,

    };

  }

}
