/**
 * ============================================================
 * CONVERTLISTER
 * Catalog Health Framework
 * Metadata Engine
 * ============================================================
 *
 * Shared metadata builder.
 *
 * Goals
 * ------------------------------------------------------------
 * ✓ Stateless
 * ✓ Immutable
 * ✓ Enterprise reusable
 * ✓ Build-safe
 * ============================================================
 */

export interface CatalogMetadata {
  version: string;

  validator: string;

  marketplace: string;

  engine: string;

  generatedAt: Date;

  executionTimeMs?: number;

  validatorCount?: number;

  ruleCount?: number;
}

/**
 * ============================================================
 * METADATA ENGINE
 * ============================================================
 */
export class MetadataEngine {

  /**
   * ============================================================
   * DEFAULT VERSION
   * ============================================================
   */
  public readonly version = "1.0.0";

  /**
   * ============================================================
   * ENGINE NAME
   * ============================================================
   */
  public readonly engineName =
    "Catalog Health Framework";

  /**
   * ============================================================
   * CURRENT TIMESTAMP
   * ============================================================
   */
  public now(): Date {
    return new Date();
  }
  /**
   * ============================================================
   * BUILD METADATA
   * ------------------------------------------------------------
   * Creates the standard metadata object used by
   * CatalogHealthEngine and validators.
   * ============================================================
   */
  public build(params: {
    validator: string;
    marketplace: string;
    executionTimeMs?: number;
    validatorCount?: number;
    ruleCount?: number;
  }): CatalogMetadata {
    return {
      version: this.version,

      validator: params.validator,

      marketplace: params.marketplace,

      engine: this.engineName,

      generatedAt: this.now(),

      executionTimeMs: params.executionTimeMs,

      validatorCount: params.validatorCount,

      ruleCount: params.ruleCount,
    };
  }

  /**
   * ============================================================
   * BUILD VALIDATOR METADATA
   * ------------------------------------------------------------
   * Creates metadata for a single validator execution.
   * ============================================================
   */
  public buildValidatorMetadata(
    validator: string,
    executionTimeMs: number
  ): CatalogMetadata {
    return this.build({
      validator,
      marketplace: "generic",
      executionTimeMs,
      validatorCount: 1,
      ruleCount: 0,
    });
  }

  /**
   * ============================================================
   * BUILD ENGINE METADATA
   * ------------------------------------------------------------
   * Creates metadata for the complete engine execution.
   * ============================================================
   */
  public buildEngineMetadata(params: {
    marketplace: string;
    executionTimeMs: number;
    validatorCount: number;
    ruleCount: number;
  }): CatalogMetadata {
    return this.build({
      validator: "CatalogHealthEngine",

      marketplace: params.marketplace,

      executionTimeMs: params.executionTimeMs,

      validatorCount: params.validatorCount,

      ruleCount: params.ruleCount,
    });
  }  /**
   * ============================================================
   * CLONE METADATA
   * ------------------------------------------------------------
   * Creates an immutable copy of metadata.
   * ============================================================
   */
  public clone(
    metadata: CatalogMetadata
  ): CatalogMetadata {
    return {
      ...metadata,
      generatedAt: new Date(metadata.generatedAt),
    };
  }

  /**
   * ============================================================
   * MERGE METADATA
   * ------------------------------------------------------------
   * Combines base metadata with additional fields.
   * Existing values are preserved unless overridden.
   * ============================================================
   */
  public merge(
    base: CatalogMetadata,
    extra: Partial<CatalogMetadata>
  ): CatalogMetadata {
    return {
      ...base,
      ...extra,
      generatedAt:
        extra.generatedAt ??
        new Date(base.generatedAt),
    };
  }

  /**
   * ============================================================
   * UPDATE EXECUTION TIME
   * ============================================================
   */
  public withExecutionTime(
    metadata: CatalogMetadata,
    executionTimeMs: number
  ): CatalogMetadata {
    return {
      ...metadata,
      executionTimeMs,
    };
  }

  /**
   * ============================================================
   * UPDATE MARKETPLACE
   * ============================================================
   */
  public withMarketplace(
    metadata: CatalogMetadata,
    marketplace: string
  ): CatalogMetadata {
    return {
      ...metadata,
      marketplace,
    };
  }
}
