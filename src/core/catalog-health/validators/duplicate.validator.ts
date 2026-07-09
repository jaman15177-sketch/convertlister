/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Duplicate Validator
 * ------------------------------------------------------------
 * Phase 1 Foundation
 *
 * Responsibilities:
 * ✓ Duplicate identifier detection
 * ✓ SKU duplicate risk
 * ✓ Barcode duplicate risk
 * ✓ Product fingerprint generation
 * ✓ Issue generation
 * ✓ Score calculation
 * ✓ Telemetry
 * ✓ Metadata
 *
 * Note:
 * Real catalog-wide duplicate matching requires
 * external product index/search engine.
 * This validator provides foundation signals.
 * ============================================================
 */

import { BaseValidator } from "../base/base-validator";

import type {
  ValidatorInput,
  ValidatorResult,
} from "../base/validator.types";

import type {
  HealthCategory,
} from "../health.types";

import type {
  AdapterProduct,
} from "@/adapters/core/adapter.contract";



interface DuplicateFingerprint {

  title: string;

  brand: string;

  sku: string;

  barcode: string;

}



export class DuplicateValidator
  extends BaseValidator
{


  public readonly category:
    HealthCategory = "DUPLICATE";



  public constructor() {

    super();

  }




  public async validate(
    input: ValidatorInput
  ): Promise<ValidatorResult> {


    const startedAt =
      this.startTelemetry();



    await this.beforeValidate(
      input
    );



    const result =
      this.emptyResult();



    const product:
      AdapterProduct =
      input.product;



    /**
     * ========================================================
     * NORMALIZATION
     * ========================================================
     */


    const title =
      this.normalizeText(
        product.title
      ).toLowerCase();



    const brand =
      this.normalizeBrand(
        product.brand ??
        String(
          product.metadata?.brand ??
          ""
        )
      ).toLowerCase();



    const sku =
      this.normalizeSKU(
        product.sku ??
        ""
      ).toLowerCase();



    const barcode =
      this.normalizeBarcode(
        product.barcode ??
        ""
      ).toLowerCase();





    /**
     * ========================================================
     * DUPLICATE FINGERPRINT
     * ========================================================
     */


    const fingerprint:
      DuplicateFingerprint =
    {

      title,

      brand,

      sku,

      barcode,

    };



    void fingerprint;




    /**
     * ========================================================
     * SKU DUPLICATE RISK
     * ========================================================
     *
     * Same SKU should not exist across
     * multiple catalog entries.
     *
     * Current phase:
     * Detect missing / suspicious identifiers.
     *
     */


    if (
      sku.length > 0 &&
      sku.length < 3
    ) {


      this.warning(
        result,
        "DUPLICATE_SUSPICIOUS_SKU",
        "Product SKU may create duplicate matching problems.",
        "Use a unique SKU identifier."
      );


      this.deductScore(
        result,
        10
      );

    }





    /**
     * ========================================================
     * BARCODE VALIDATION
     * ========================================================
     */


    if (
      barcode.length > 0 &&
      barcode.length < 8
    ) {


      this.warning(
        result,
        "DUPLICATE_INVALID_BARCODE",
        "Barcode identifier is too short for reliable matching.",
        "Provide a valid barcode."
      );


      this.deductScore(
        result,
        10
      );

    }





    /**
     * ========================================================
     * MISSING UNIQUE IDENTIFIER
     * ========================================================
     */


    if (
      !sku &&
      !barcode
    ) {


      this.warning(
        result,
        "DUPLICATE_NO_IDENTIFIER",
        "No unique product identifier detected.",
        "Add SKU or barcode for duplicate prevention."
      );


      this.deductScore(
        result,
        15
      );

    }





    /**
     * ========================================================
     * TITLE FINGERPRINT RISK
     * ========================================================
     */


    if (
      title.length < 5
    ) {


      this.warning(
        result,
        "DUPLICATE_WEAK_TITLE_FINGERPRINT",
        "Product title is too weak for duplicate matching.",
        "Improve product title information."
      );


      this.deductScore(
        result,
        10
      );

    }





    /**
     * ========================================================
     * FINAL SCORE
     * ========================================================
     */


    result.score =
      this.normalizeScore(
        result.score
      );





    /**
     * ========================================================
     * TELEMETRY
     * ========================================================
     */


    const finished =
      this.finishTelemetry(
        startedAt
      );



    const telemetry =
      this.buildTelemetryReport({

        validator:
          "DuplicateValidator",


        startedAt,


        finishedAt:
          finished.finishedAt,


        rules: [],

      });





    /**
     * ========================================================
     * METADATA
     * ========================================================
     */


    const metadata =
      this.buildMetadata({

        validator:
          "DuplicateValidator",


        marketplace:
          this.getMarketplace(
            input
          ),


        executionTimeMs:
          finished.durationMs,

      });





    await this.afterValidate(
      input,
      result
    );





    return {

      ...result,

      metadata,

      telemetry,

    };


  }


}




export const duplicateValidator =
  new DuplicateValidator();


export default DuplicateValidator;
