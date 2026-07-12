/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Engine
 * ------------------------------------------------------------
 * Production Integration Pipeline
 * Version: 1.0.0
 * ============================================================
 */
import { AggregationEngine } from "./base/aggregation.engine";
import { MetadataEngine } from "./base/metadata.engine";

import type { CatalogHealthEngine } from "./health.interface";

import type {
  CatalogHealthResult,
  HealthScoreBreakdown,
} from "./health.types";

import type {
  ValidatorInput,
  ValidatorResult,
} from "./base/validator.types";

import type { AdapterProduct } from "@/adapters/core/adapter.contract";
import { universalStore }
from "@/lib/core/store/universal.store";
import { TitleValidator } from "./validators/title.validator";
import { DescriptionValidator } from "./validators/description.validator";
import { BulletPointValidator } from "./validators/bullet-point.validator";
import { BrandValidator } from "./validators/brand.validator";
import { CategoryValidator } from "./validators/category.validator";
import { PriceValidator } from "./validators/price.validator";
import { ImageValidator } from "./validators/image.validator";
import SEOValidator from "./validators/seo.validator";
import { DuplicateValidator } from "./validators/duplicate.validator";
import { VariantValidator } from "./validators/variant.validator";
import { MarketplaceValidator } from "./validators/marketplace.validator";
import { validatorRegistry } from "./validator.registry";import { loadCatalogValidators } from "./validator.loader";/**
 * ============================================================
 * DEFAULT CATALOG HEALTH ENGINE
 * ============================================================
 */

export class DefaultCatalogHealthEngine
  implements CatalogHealthEngine
{


  
  /**
   * ==========================================================
   * VALIDATOR REGISTRY
   * ==========================================================
   */

  private readonly registry = validatorRegistry;

  public constructor() {
    loadCatalogValidators();
  }
  /**
   * ==========================================================
   * ENGINES
   * ==========================================================
   */

  private readonly aggregationEngine =
    new AggregationEngine();


  private readonly metadataEngine =
    new MetadataEngine();




  /**
   * ==========================================================
   * ANALYZE
   * ==========================================================
   */

  public async analyze(
    product: AdapterProduct
  ): Promise<CatalogHealthResult> {


    const startedAt =
      Date.now();



    /**
     * ========================================================
     * VALIDATOR INPUT
     * ========================================================
     */

    const input: ValidatorInput =
    {

      product,


      context:
      {

        marketplace:
          String(
            product.marketplace ??
            "generic"
          ),


        strictMode:
          false,


        validatorVersion:
          "1.0.0",


        enableWarnings:
          true,

      },

    };




    /**
     * ========================================================
     * EXECUTE VALIDATORS
     * ========================================================
     */

const results: ValidatorResult[] = [];

for (const item of this.registry.getValidators()) {
  const result =
    await item.validator.validate(input);

  results.push(result);
}





    /**
     * ========================================================
     * HEALTH BREAKDOWN
     * ========================================================
     */

    

const breakdown =
  this.aggregationEngine.buildBreakdownFromResults(
    results
  );




    /**
     * ========================================================
     * METADATA
     * ========================================================
     */

    const metadata =
  this.metadataEngine.buildEngineMetadata({

    marketplace:
      String(
        product.marketplace ?? "generic"
      ),

    executionTimeMs:
      Date.now() - startedAt,

    validatorCount:
      results.length,

    ruleCount:
      0,

  });






    /**
     * ========================================================
     * FINAL AGGREGATION
     * ========================================================
     */

    

return this.aggregationEngine.aggregate({
  results,
  breakdown,
  metadata,
});

} // analyze()

} // DefaultCatalogHealthEngine

export const catalogHealthEngine =
  new DefaultCatalogHealthEngine();
